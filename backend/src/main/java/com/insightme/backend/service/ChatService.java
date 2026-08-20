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

               사용자의 현재 질문과 대화 흐름을 가장 우선해서 답변해주세요.
                
               검사 결과는 사용자의 질문과 관련이 있을 때만 참고해주세요.
               인사, 일상 대화, 간단한 질문처럼 검사 결과와 관련 없는 질문에는
               검사 결과나 커리어 분석을 억지로 언급하지 마세요.

               커리어, 직무, 번아웃, 성향, 조직문화 등 검사 결과와 관련된 질문을 할 경우에는
               위 검사 결과와 이전 상담 내용을 자연스럽게 활용해주세요.

               상담에서는 사용자의 질문에 직접 답하고,
               질문하지 않은 내용을 한 번에 과도하게 설명하지 마세요.

               질문의 성격과 사용자의 의도에 따라 답변 길이를 자연스럽게 조절해주세요.
               인사, 간단한 확인, 일상적인 질문에는 1~2문장으로 짧고 자연스럽게 답변해주세요.
               일반적인 고민이나 커리어 상담에는 핵심 내용을 중심으로 3~5문장 정도로 답변해주세요.
               사용자가 자세한 설명, 비교, 분석 또는 여러 개의 추천을 요청한 경우에는 필요한 만큼 자세히 답변해주세요.
               모든 질문에 같은 길이나 형식으로 답변하지 마세요.
               한 번의 답변에 너무 많은 정보를 모두 설명하려 하지 말고,
               필요한 경우 사용자의 다음 질문을 통해 자연스럽게 상담을 이어가세요.
               대화의 흐름을 이어가며 실제 상담자와 대화하는 것처럼 자연스럽게 답변해주세요.
               모바일 채팅 화면에서 읽기 어렵게 불필요하게 장황한 답변은 피해주세요.
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
