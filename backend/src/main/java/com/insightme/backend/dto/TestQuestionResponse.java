package com.insightme.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 테스트 문항 응답 DTO
 *
 * 프론트 화면에 필요한 문항 정보만 전달한다.
 */
@Getter // JSON 응답을 만들 때 필드 값을 읽을 수 있도록 getter 자동 생성
@AllArgsConstructor // 모든 필드를 받는 생성자 자동 생성
public class TestQuestionResponse {

    // 문항 고유 ID
    private Long questionId;

    // 기질 코드
    // 예: NS, HA, RD, SD
    private String traitCode;

    // 화면에 표시할 질문 내용
    private String questionText;

    // 문항 표시 순서
    private Integer questionOrder;
}