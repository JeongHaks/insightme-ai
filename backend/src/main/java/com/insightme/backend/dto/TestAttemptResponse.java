package com.insightme.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter // 프론트에 JSON 응답을 만들 때 필드 값을 읽을 수 있도록 getter 자동 생성
@AllArgsConstructor // 모든 필드를 받는 생성자 자동 생성
public class TestAttemptResponse {

    // 생성된 테스트 진행 건의 고유 ID
    private UUID attemptId;

    // 테스트 진행 상태
    private String status;
}
