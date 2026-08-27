package com.insightme.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

/**
 * 비회원의 하루 AI 상담 사용시간을 저장하는 Entity
 *
 * DB의 chat_daily_usage 테이블과 연결된다.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "chat_daily_usage")
public class ChatDailyUsage {

    // 사용량 기록의 고유 번호
    // DB의 BIGSERIAL 값을 자동으로 사용한다.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usage_id")
    private Long usageId;

    // 비회원 브라우저를 식별하는 UUID
    // 같은 사람이 새 테스트를 진행해도 guestId는 유지된다.
    @Column(name = "guest_id", nullable = false)
    private UUID guestId;

    // 상담시간을 사용한 날짜
    // 날짜가 바뀌면 새로운 하루 사용량으로 관리한다.
    @Column(name = "usage_date", nullable = false)
    private LocalDate usageDate;

    // 해당 날짜에 사용한 총 상담시간(초)
    @Column(name = "used_seconds", nullable = false)
    private Integer usedSeconds;
}
