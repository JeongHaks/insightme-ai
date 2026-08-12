package com.insightme.backend.dto;

//프론트에서 보낼 attemptId와 사용자 질문 내용을 백엔드가 받기 위해
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * 프론트에서 보낸 AI 상담 질문을 받는 Request DTO
 */
@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequest {

    // 어떤 테스트 결과를 기준으로 상담하는지 구분하는 ID
    private UUID attemptId;

    // 사용자가 입력한 실제 질문
    private String message;
}
