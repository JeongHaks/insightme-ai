package com.insightme.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 사용자가 각 문항에서 선택한 답변을 저장하는 Entity
 * 사용자가 문항마다 선택한 답변을 test_answers 테이블에 저장하려고 만드는 Entity
 * */
@Entity
@Table(name = "test_answers")
@Getter
@Setter
public class TestAnswer {

    // 답변 고유 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerId;

    // 어떤 테스트에서 나온 답변인지
    @Column(name = "attempt_id", nullable = false)
    private UUID attemptId;

    // 어떤 문항인지
    @Column(name = "question_id", nullable = false)
    private Long questionId;

    // 사용자가 선택한 답변(A 또는 B)
    @Column(name = "selected_option_code", nullable = false)
    private String selectedOptionCode;

    // 답변한 시간
    @Column(name = "answered_at")
    private LocalDateTime answeredAt;
}
