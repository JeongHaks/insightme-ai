package com.insightme.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * 프론트에서 보낸 테스트 답변을 받는 Request DTO
 */
@Getter
@Setter
@NoArgsConstructor
public class TestAnswerRequest {

    // 어떤 테스트 실행의 답변인지 구분하는 고유 ID
    private UUID attemptId;

    // 어떤 문항에 대한 답변인지
    private Long questionId;

    // 사용자가 선택한 답변 코드
    // 예: A 또는 B
    private String selectedOptionCode;
}
