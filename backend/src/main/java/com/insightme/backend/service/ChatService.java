package com.insightme.backend.service;

import com.insightme.backend.repository.ChatMessageRepository;
import com.insightme.backend.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.insightme.backend.repository.TestResultRepository;
import com.insightme.backend.entity.TestResult;
import com.insightme.backend.dto.ChatHistoryResponse;

import com.insightme.backend.entity.ChatRoom;
import com.insightme.backend.entity.ChatMessage;

import java.util.UUID;
import java.util.List;

/**
 * AI 채팅 상담의 비즈니스 로직을 처리하는 Service
 */
@Service
@RequiredArgsConstructor
public class ChatService {

    // 채팅방 생성 및 조회에 사용
    private final ChatRoomRepository chatRoomRepository;

    // 사용자 질문과 AI 답변 저장 및 조회에 사용
    private final ChatMessageRepository chatMessageRepository;

    // AI 상담 시 사용자의 테스트 결과를 조회하기 위해 사용
    // AI가 그냥 일반적인 답변을 하는 게 아니라, 해당 attemptId의 실제 기질검사 결과를 읽고 그 결과를 참고해서 상담하게 만들기 위해서야
    private final TestResultRepository testResultRepository;

    // 실제 Gemini API 호출에 사용
    // ChatService에서 buildPrompt()로 만든 프롬프트를 GeminiService에 넘겨 실제 AI 답변을 받기 위해
    private final GeminiService geminiService;

    /**
     * 테스트 진행 ID(attemptId)에 연결된 채팅방을 조회한다.
     * 기존 채팅방이 없으면 새로 생성한다.
     */
    public ChatRoom getOrCreateChatRoom(UUID attemptId) {

        return chatRoomRepository.findByAttemptId(attemptId)
                .orElseGet(() -> {
                    ChatRoom chatRoom = new ChatRoom();

                    chatRoom.setAttemptId(attemptId);

                    return chatRoomRepository.save(chatRoom);
                });
    }

    /**
     * 사용자가 입력한 질문을 DB에 저장한다.
     */
    public ChatMessage saveUserMessage(Long chatRoomId, String message) {

        // 저장할 채팅 메시지 객체를 생성한다.
        ChatMessage chatMessage = new ChatMessage();

        // 어느 채팅방의 메시지인지 지정한다.
        chatMessage.setChatRoomId(chatRoomId);

        // 사용자가 작성한 메시지이므로 USER로 저장한다.
        chatMessage.setRole("USER");

        // 사용자가 입력한 실제 질문을 저장한다.
        chatMessage.setMessage(message);

        // chat_messages 테이블에 저장한다.
        return chatMessageRepository.save(chatMessage);
    }

    /**
     * AI가 생성한 답변을 DB에 저장한다.
     */
    public ChatMessage saveAiMessage(Long chatRoomId, String message) {

        // 저장할 채팅 메시지 객체를 생성한다.
        ChatMessage chatMessage = new ChatMessage();

        // 어느 채팅방의 메시지인지 지정한다.
        chatMessage.setChatRoomId(chatRoomId);

        // AI가 작성한 메시지이므로 AI로 저장한다.
        chatMessage.setRole("AI");

        // AI가 생성한 실제 답변을 저장한다.
        chatMessage.setMessage(message);

        // chat_messages 테이블에 저장한다.
        return chatMessageRepository.save(chatMessage);
    }

    /**
     * 특정 채팅방의 전체 메시지를 오래된 순서대로 조회한다.
     * 사용자가 다시 채팅 화면에 들어왔을 때 예전 대화를 불러와서 이어서 상담할 수 있다.
     */
    public List<ChatMessage> getMessages(Long chatRoomId) {

        // 해당 채팅방의 메시지를 createdAt 오름차순으로 조회한다.
        return chatMessageRepository
                .findByChatRoomIdOrderByCreatedAtAsc(chatRoomId);
    }

    /**
     * 특정 채팅방의 전체 메시지를
     * 프론트 응답용 DTO 목록으로 변환한다.
     * DB Entity를 그대로 프론트에 보내지 않고, 채팅 화면에 필요한 role, message, createdAt만 전달하기 위해
     */
    public List<ChatHistoryResponse> getChatHistory(Long chatRoomId) {

        // 기존 메시지를 시간순으로 조회한다.
        List<ChatMessage> messages =
                chatMessageRepository
                        .findByChatRoomIdOrderByCreatedAtAsc(chatRoomId);

        // Entity 목록을 Response DTO 목록으로 변환한다.
        return messages.stream()
                .map(message ->
                        new ChatHistoryResponse(
                                message.getRole(),
                                message.getMessage(),
                                message.getCreatedAt()
                        )
                )
                .toList();
    }

    /**
     * 테스트 진행 ID(attemptId)로 최종 테스트 결과를 조회한다.
     * AI에게 질문을 보내기 전에 해당 사용자의 실제 기질검사 결과를 가져오기 위해
     */
    public TestResult getTestResult(UUID attemptId) {

        // attemptId와 연결된 테스트 결과를 조회한다.
        return testResultRepository.findByAttemptId(attemptId)
                .orElseThrow(() ->
                        new IllegalArgumentException("테스트 결과를 찾을 수 없습니다.")
                );
    }

    /**
     * 테스트 결과와 사용자 질문을 이용해
     * AI에게 전달할 상담 프롬프트를 만든다.
     * AI가 단순히 "개발자가 잘 맞나요?"라는 질문만 보는 게 아니라, 사용자의 실제 기질검사 결과까지 함께 보고 답하도록 하기 위해
     */
    public String buildPrompt(TestResult result, String chatHistory, String userMessage) {

        return """
            당신은 커리어 및 기질 분석을 돕는 AI 상담가입니다.

            아래는 사용자의 기질검사 결과입니다.

            [기질 점수]
            NS: %d
            HA: %d
            RD: %d
            SD: %d

            [기질 유형]
            %s

            [직업 분석]
            %s

            [번아웃 분석]
            %s

            [조직문화 분석]
            %s
            
            [이전 상담 내용]
            %s

            사용자의 질문:
            %s

            위 검사 결과를 참고해서
            너무 단정적으로 말하지 말고,
            현실적인 커리어 상담 관점에서 이해하기 쉽게 답변해주세요.

            답변은 기본적으로 3~5문장 정도로 간결하게 작성해주세요.
            핵심 내용을 먼저 설명해주세요.
            사용자가 자세한 설명을 요청한 경우에만 상세하게 답변해주세요.
            모바일 채팅 화면에서 읽기 편하도록 불필요하게 긴 설명은 피해주세요.
            """.formatted(
                result.getNsScore(),
                result.getHaScore(),
                result.getRdScore(),
                result.getSdScore(),
                result.getResultType(),
                result.getCareerAnalysis(),
                result.getBurnoutAnalysis(),
                result.getCultureAnalysis(),
                chatHistory,
                userMessage
        );
    }

    /**
     * Gemini에게 프롬프트를 보내고 AI 답변을 받는다.
     */
    public String askGemini(String prompt) {
        return geminiService.askGemini(prompt);
    }

    /**
     * 기존 채팅 내역을 Gemini에게 전달할 문자열로 만든다.
     */
    public String buildChatHistory(Long chatRoomId) {

        // DB에서 기존 대화를 시간순으로 가져온다.
        List<ChatMessage> messages = getMessages(chatRoomId);

        StringBuilder history = new StringBuilder();

        // USER / AI 대화를 하나의 문자열로 만든다.
        for (ChatMessage message : messages) {

            history.append(message.getRole())
                    .append(": ")
                    .append(message.getMessage())
                    .append("\n");
        }

        return history.toString();
    }

}
