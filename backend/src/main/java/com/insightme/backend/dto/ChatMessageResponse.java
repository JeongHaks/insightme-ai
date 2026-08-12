package com.insightme.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * AI 상담 결과를 프론트에 전달하는 Response DTO
 */
@Getter
@AllArgsConstructor
public class ChatMessageResponse {

    // 어떤 채팅방에서 나온 답변인지
    private Long chatRoomId;

    // AI가 생성한 답변 내용
    private String message;
}
