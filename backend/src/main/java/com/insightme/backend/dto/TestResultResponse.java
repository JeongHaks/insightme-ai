package com.insightme.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

/**
 * 테스트 최종 결과 응답 DTO
 *
 * 결과 화면에 필요한 데이터만 프론트에 전달한다.
 */
@Getter
@AllArgsConstructor
public class TestResultResponse {

    // 어떤 테스트 실행의 결과인지 구분하는 ID
    private UUID attemptId;

    // 자극추구(NS) 점수
    private Integer nsScore;

    // 위험회피(HA) 점수
    private Integer haScore;

    // 사회적 민감성(RD) 점수
    private Integer rdScore;

    // 자율성(SD) 점수
    private Integer sdScore;

    // 계산된 기질 결과 유형
    private String resultType;

    // 결과 요약 내용
    private String summaryText;

    // 직업 분석 내용
    private String careerAnalysis;

    // 번아웃 분석 내용
    private String burnoutAnalysis;

    // 조직문화 분석 내용
    private String cultureAnalysis;
}
