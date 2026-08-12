package com.insightme.backend.dto;

// DB Entity를 그대로 프론트에 보내지 않고, 채팅 화면에 필요한 role, message만 전달하기 위해
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 기존 채팅 내역을 프론트에 전달하는 Response DTO
 */
@Getter
@AllArgsConstructor
public class ChatHistoryResponse {
    // 기존 대화를 불러올 때 프론트에 role, message, createdAt만 깔끔하게 전달

    // 메시지를 작성한 주체
    // USER 또는 AI
    private String role;

    // 실제 메시지 내용
    private String message;

    // 메시지 작성 시간
    private LocalDateTime createdAt;
}
