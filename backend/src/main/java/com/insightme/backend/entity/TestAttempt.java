package com.insightme.backend.entity;

// DB 테이블과 Java 객체를 연결해주는 매핑 클래스
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter // 모든 필드의 getter 메서드를 자동 생성
@Setter // 모든 필드의 setter 메서드를 자동 생성
@NoArgsConstructor // JPA가 객체를 생성할 때 필요한 기본 생성자를 자동 생성
@Entity // 이 클래스를 JPA Entity로 지정
@Table(name = "test_attempts") // DB의 test_attempts 테이블과 연결
public class TestAttempt {

    @Id // 기본키(PK) 필드
    @UuidGenerator // 엔티티 저장 전에 UUID를 자동 생성
    @Column(name = "attempt_id")
    private UUID attemptId; // 비회원 테스트 진행 건을 위한 고유식별 (UUID)

    // 사용자가 선택한 성별
    @Column(name = "gender", nullable = false)
    private String gender;

    // 사용자가 선택한 연령대
    @Column(name = "age_group", nullable = false)
    private String ageGroup;

    // 사용자가 선택한 직업군
    @Column(name = "job_group", nullable = false)
    private String jobGroup;

    // 사용자가 선택한 MBTI
    @Column(name = "mbti", nullable = false)
    private String mbti;

    // 테스트 진행 상태
    // DB 기본값: IN_PROGRESS
    @Column(name = "status", nullable = false)
    private String status;

    // 테스트 시작 시간
    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    // 테스트 완료 전에는 null일 수 있음
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
