package com.insightme.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 테스트 선택지 응답 DTO
 *
 * 프론트 화면에 필요한 선택지 정보만 전달한다.
 */
@Getter // JSON 응답을 만들 때 필드 값을 읽을 수 있도록 getter 자동 생성
@AllArgsConstructor // 모든 필드를 받는 생성자 자동 생성
public class TestOptionResponse {

    // 선택지 고유 ID
    private Long optionId;

    // 선택지 코드
    // 예: A, B
    private String optionCode;

    // 화면에 표시할 선택지 내용
    private String optionText;

    // 화면 표시 순서
    private Integer displayOrder;
}
