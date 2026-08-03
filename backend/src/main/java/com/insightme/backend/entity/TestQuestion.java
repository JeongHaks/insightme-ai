package com.insightme.backend.entity;

// 문항 Entity
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 테스트 문항 Entity
 *
 * test_questions 테이블과 매핑된다.
 */
@Entity // Entity 클래스가 DB 테이블과 연결되는 의미
@Table(name = "test_questions") // 테이블과 연결
@Getter      // Lombok : Getter 자동 생성
@Setter      // Lombok : Setter 자동 생성
@NoArgsConstructor // 기본 생성자 자동 생성
public class TestQuestion {
    // 사용하는 이유는 DB 테이블을 Java 객체로 표현하기 위해서
    /**
     * 문항 ID (PK)
     */
    @Id // 기본키를 의미한다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB에서 자동 1씩 증가 (question_id 컬럼)
    @Column(name = "question_id") // 자바 변수와 DB 컬럼을 연결
    private Long questionId;

    /**
     * 기질 코드
     * 예) NS, HA, RD, P
     */
    @Column(name = "trait_code", nullable = false)
    private String traitCode;

    /**
     * 질문 내용
     */
    @Column(name = "question_text", nullable = false)
    private String questionText;

    /**
     * 점수를 주는 정답
     * 예) A 또는 B
     */
    @Column(name = "score_answer", nullable = false)
    private String scoreAnswer;

    /**
     * 문항 순서
     */
    @Column(name = "question_order", nullable = false)
    private Integer questionOrder;

    /**
     * 사용 여부
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    /**
     * 생성일
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
