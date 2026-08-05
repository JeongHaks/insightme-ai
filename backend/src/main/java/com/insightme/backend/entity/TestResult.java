package com.insightme.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 테스트 최종 결과 Entity
 *
 * 계산된 기질 점수와 분석 내용을
 * test_results 테이블에 저장한다.
 */
@Entity
@Table(name = "test_results")
@Getter
@Setter
@NoArgsConstructor
public class TestResult {

    /**
     * 결과 고유 ID (PK)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Long resultId;

    /**
     * 어떤 테스트 실행의 결과인지 구분하는 ID
     */
    @Column(name = "attempt_id", nullable = false)
    private UUID attemptId;

    /**
     * 자극추구(NS) 점수
     */
    @Column(name = "ns_score", nullable = false)
    private Integer nsScore;

    /**
     * 위험회피(HA) 점수
     */
    @Column(name = "ha_score", nullable = false)
    private Integer haScore;

    /**
     * 사회적 민감성(RD) 점수
     */
    @Column(name = "rd_score", nullable = false)
    private Integer rdScore;

    /**
     * 자율성(SD) 점수
     */
    @Column(name = "sd_score", nullable = false)
    private Integer sdScore;

    /**
     * 점수 조합으로 계산된 결과 유형
     *
     * 예: 안정형·분석형
     */
    @Column(name = "result_type")
    private String resultType;

    /**
     * 요약 분석 내용
     */
    @Column(name = "summary_text")
    private String summaryText;

    /**
     * 직업 분석 내용
     */
    @Column(name = "career_analysis")
    private String careerAnalysis;

    /**
     * 번아웃 분석 내용
     */
    @Column(name = "burnout_analysis")
    private String burnoutAnalysis;

    /**
     * 조직문화 분석 내용
     */
    @Column(name = "culture_analysis")
    private String cultureAnalysis;

    /**
     * 결과 생성 시간
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
