package com.insightme.backend.repository;

import com.insightme.backend.entity.ChatDailyUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

/**
 * 비회원의 하루 AI 상담 사용시간을
 * 조회하고 저장하기 위한 Repository
 */
public interface ChatDailyUsageRepository
        extends JpaRepository<ChatDailyUsage, Long> {

    /**
     * 특정 비회원의 특정 날짜 상담 사용량을 조회한다.
     *
     * 예:
     * guestId = ABC
     * usageDate = 2026-08-27
     *
     * → ABC 비회원이 오늘 사용한 상담시간 조회
     */
    Optional<ChatDailyUsage> findByGuestIdAndUsageDate(
            UUID guestId,
            LocalDate usageDate
    );
}
