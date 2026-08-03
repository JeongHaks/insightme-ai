package com.insightme.backend.entity;

// 선택지 데이터 가져오기
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 테스트 선택지 Entity
 *
 * test_options 테이블과 매핑된다.
 */
@Entity
@Table(name = "test_options")
@Getter      // Getter 자동 생성
@Setter      // Setter 자동 생성
@NoArgsConstructor // 기본 생성자 자동 생성
public class TestOption {

    /**
     * 선택지 고유 ID (PK)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;

    /**
     * 문항 ID (FK)
     */
    @Column(name = "question_id", nullable = false)
    private Long questionId;

    /**
     * 선택지 코드
     * 예) A, B
     */
    @Column(name = "option_code", nullable = false)
    private String optionCode;

    /**
     * 선택지 내용
     */
    @Column(name = "option_text", nullable = false)
    private String optionText;

    /**
     * 화면 표시 순서
     */
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    /**
     * 생성일
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
