package com.insightme.backend.controller;

import com.insightme.backend.dto.ChatMessageRequest;
import com.insightme.backend.dto.ChatMessageResponse;
import com.insightme.backend.entity.ChatRoom;
import com.insightme.backend.entity.TestResult;
import com.insightme.backend.service.ChatService;
import com.insightme.backend.dto.ChatHistoryResponse;
// 비회원의 하루 AI 상담 사용시간을 관리하는 Service
import com.insightme.backend.service.ChatDailyUsageService;
// 상담시간 조회 결과를 프론트에 반환하는 DTO
import com.insightme.backend.dto.ChatDailyUsageResponse;
// 프론트에서 전달한 상담 사용시간을 받는 DTO
import com.insightme.backend.dto.ChatDailyUsageRequest;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AI 채팅 상담 API Controller
 * 실제 AI를 붙이기 전에 먼저 프론트 요청 → Controller → 채팅방 생성 → USER/AI 메시지 DB 저장 → 응답 흐름이 정상인지 테스트
 */
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    // 채팅 관련 비즈니스 로직을 처리하는 Service
    private final ChatService chatService;

    // 비회원의 하루 무료 상담 사용시간을 조회하고 관리하는 Service
    private final ChatDailyUsageService chatDailyUsageService;

    /**
     * 사용자의 채팅 질문을 받는다.
     *
     * 아직 실제 AI 연결 전이므로
     * 임시 AI 답변을 만들어 저장한다.
     */
    @PostMapping("/messages")
    public ResponseEntity<ChatMessageResponse> sendMessage(
            @RequestBody ChatMessageRequest request) {

        // attemptId에 연결된 기존 채팅방을 찾거나 새로 만든다.
        ChatRoom chatRoom =
                chatService.getOrCreateChatRoom(request.getAttemptId());

        // 해당 테스트 진행의 최종 결과를 조회한다.
        TestResult testResult =
                chatService.getTestResult(request.getAttemptId());

        // 현재 채팅방에 저장되어 있는 이전 상담 내용을 가져온다. (기존 대화면 가져온다)
        String chatHistory =
                chatService.buildChatHistory(
                        chatRoom.getChatRoomId()
                );

        // 테스트 결과 + 이전 대화 + 현재 질문으로 Gemini 프롬프트를 만든다. (기존 대화 + 현재 질문으로 프롬프트 생성)
        String prompt =
                chatService.buildPrompt(
                        testResult,
                        chatHistory,
                        request.getMessage()
                );

        // 사용자가 입력한 질문을 DB에 저장한다.
        chatService.saveUserMessage(
                chatRoom.getChatRoomId(),
                request.getMessage()
        );

        // Gemini API를 호출해서 실제 AI 답변을 받는다.
        String aiMessage =
                chatService.askGemini(prompt);

        // 임시 AI 답변도 DB에 저장한다.
        chatService.saveAiMessage(
                chatRoom.getChatRoomId(),
                aiMessage
        );

        // 프론트에 채팅방 ID와 AI 답변을 반환한다.
        ChatMessageResponse response =
                new ChatMessageResponse(
                        chatRoom.getChatRoomId(),
                        aiMessage
                );

        return ResponseEntity.ok(response);
    }

    /**
     * 특정 채팅방의 전체 대화 내역을 조회한다.
     */
    @GetMapping("/rooms/{chatRoomId}/messages")
    public ResponseEntity<List<ChatHistoryResponse>> getChatHistory(
            @PathVariable Long chatRoomId) {

        // 채팅방의 전체 메시지를 시간순으로 조회한다.
        List<ChatHistoryResponse> history =
                chatService.getChatHistory(chatRoomId);

        // 프론트에 JSON 배열로 반환한다.
        return ResponseEntity.ok(history);
    }

    /**
     * 비회원의 오늘 AI 상담 사용시간을 조회한다.
     *
     * GET /api/chat/usage/{guestId}
     */
    @GetMapping("/usage/{guestId}")
    public ResponseEntity<ChatDailyUsageResponse> getDailyUsage(
            @PathVariable String guestId) {

        // 해당 비회원이 오늘 이미 사용한 상담시간을 조회한다.
        int usedSeconds =
                chatDailyUsageService.getTodayUsedSeconds(guestId);

        // 하루 무료 상담시간 중 현재 남은 시간을 계산한다.
        int remainingSeconds =
                chatDailyUsageService.getTodayRemainingSeconds(guestId);

        // 프론트에 사용시간과 남은시간을 함께 반환한다.
        ChatDailyUsageResponse response =
                new ChatDailyUsageResponse(
                        usedSeconds,
                        remainingSeconds
                );

        return ResponseEntity.ok(response);
    }

    /**
     * 비회원이 사용한 AI 상담시간을 저장한다.
     *
     * POST /api/chat/usage
     */
    @PostMapping("/usage")
    public ResponseEntity<Void> addDailyUsage(
            @RequestBody ChatDailyUsageRequest request) {

        // 프론트에서 전달받은 guestId와 사용시간(초)을
        // 오늘 상담 사용량에 추가한다.
        chatDailyUsageService.addUsedSeconds(
                request.getGuestId(),
                request.getSeconds()
        );

        // 정상적으로 저장되면 200 OK를 반환한다.
        return ResponseEntity.ok().build();
    }
}
