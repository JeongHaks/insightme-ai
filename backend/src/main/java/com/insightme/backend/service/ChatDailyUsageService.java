package com.insightme.backend.service;

import com.insightme.backend.entity.ChatDailyUsage;
import com.insightme.backend.repository.ChatDailyUsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

/**
 * 비회원의 하루 AI 상담 사용시간을 관리하는 Service
 */
@Service
@RequiredArgsConstructor
public class ChatDailyUsageService {

    // 비회원에게 하루 동안 제공하는 무료 AI 상담시간
    // 60분 × 60초 = 3600초
    private static final int DAILY_LIMIT_SECONDS = 60 * 60;

    // 비회원의 날짜별 상담 사용시간을 조회/저장하기 위한 Repository
    private final ChatDailyUsageRepository chatDailyUsageRepository;

    /**
     * 해당 비회원이 오늘 사용한 상담시간을 초 단위로 조회한다.
     *
     * 아직 오늘 사용 기록이 없다면 0초를 반환한다.
     */
    public int getTodayUsedSeconds(String guestId) {

        // 프론트에서 문자열로 받은 guestId를 UUID 타입으로 변환한다.
        UUID guestUuid = UUID.fromString(guestId);

        // 서버 기준 오늘 날짜를 가져온다.
        LocalDate today = LocalDate.now();

        // guestId + 오늘 날짜로 사용량 기록을 조회한다.
        return chatDailyUsageRepository
                .findByGuestIdAndUsageDate(guestUuid, today)

                // 오늘 기록이 존재하면 usedSeconds 값을 가져온다.
                .map(ChatDailyUsage::getUsedSeconds)

                // 오늘 처음 이용하는 비회원이면 아직 기록이 없으므로 0초
                .orElse(0);
    }

    /**
     * 해당 비회원이 오늘 사용할 수 있는
     * 남은 AI 상담시간을 초 단위로 계산한다.
     */
    public int getTodayRemainingSeconds(String guestId) {

        // DB에서 오늘 이미 사용한 상담시간을 조회한다.
        int usedSeconds = getTodayUsedSeconds(guestId);

        // 하루 전체 상담시간에서 사용한 시간을 뺀다.
        int remainingSeconds = DAILY_LIMIT_SECONDS - usedSeconds;

        // 혹시 사용시간이 한도를 넘어가더라도
        // 남은 시간이 음수가 되지 않도록 최소값을 0으로 제한한다.
        return Math.max(remainingSeconds, 0);
    }

    /**
     * 비회원이 사용한 AI 상담시간을 오늘 사용량에 추가한다.
     *
     * @param guestId 비회원 식별 ID
     * @param seconds 이번에 추가할 사용시간(초)
     */
    public void addUsedSeconds(String guestId, int seconds) {

        // 문자열로 전달받은 guestId를 UUID 타입으로 변환한다.
        UUID guestUuid = UUID.fromString(guestId);

        // 오늘 날짜를 가져온다.
        LocalDate today = LocalDate.now();

        // 해당 비회원의 오늘 사용량 기록을 조회한다.
        // 오늘 처음 사용하는 경우에는 새로운 사용량 객체를 생성한다.
        ChatDailyUsage usage = chatDailyUsageRepository
                .findByGuestIdAndUsageDate(guestUuid, today)
                .orElseGet(() -> {

                    ChatDailyUsage newUsage = new ChatDailyUsage();

                    // 현재 비회원 ID 저장
                    newUsage.setGuestId(guestUuid);

                    // 오늘 날짜 저장
                    newUsage.setUsageDate(today);

                    // 처음 사용하므로 0초부터 시작
                    newUsage.setUsedSeconds(0);

                    return newUsage;
                });

        // 현재까지 사용한 시간에 이번 사용시간을 더한다.
        int newUsedSeconds = usage.getUsedSeconds() + seconds;

        // 하루 최대 사용시간인 3600초를 넘어서 저장되지 않도록 제한한다.
        usage.setUsedSeconds(
                Math.min(newUsedSeconds, DAILY_LIMIT_SECONDS)
        );

        // 변경된 사용시간을 DB에 저장한다.
        chatDailyUsageRepository.save(usage);
    }

    /**
     * 해당 회원이 오늘 사용한 상담시간을 초 단위로 조회한다.
     *
     * 오늘 처음 이용하는 회원이면 0초를 반환한다.
     */
    public int getTodayUsedSecondsByUser(Long userId) {

        // 서버 기준 오늘 날짜를 가져온다.
        LocalDate today = LocalDate.now();

        // userId + 오늘 날짜로 회원의 사용량을 조회한다.
        return chatDailyUsageRepository
                .findByUserIdAndUsageDate(userId, today)

                // 오늘 사용 기록이 있다면 사용한 초를 반환한다.
                .map(ChatDailyUsage::getUsedSeconds)

                // 오늘 처음 이용하는 회원이면 0초
                .orElse(0);
    }

    /**
     * 해당 회원이 오늘 사용할 수 있는
     * 남은 AI 상담시간을 계산한다.
     */
    public int getTodayRemainingSecondsByUser(Long userId) {

        // 회원이 오늘 이미 사용한 시간을 조회한다.
        int usedSeconds = getTodayUsedSecondsByUser(userId);

        // 하루 제한시간에서 사용시간을 뺀다.
        int remainingSeconds = DAILY_LIMIT_SECONDS - usedSeconds;

        // 음수가 되지 않도록 최소 0초로 제한한다.
        return Math.max(remainingSeconds, 0);
    }

    /**
     * 회원이 사용한 AI 상담시간을 오늘 사용량에 추가한다.
     *
     * @param userId 회원 ID
     * @param seconds 이번에 사용한 상담시간(초)
     */
    public void addUsedSecondsByUser(Long userId, int seconds) {

        // 서버 기준 오늘 날짜를 가져온다.
        LocalDate today = LocalDate.now();

        // 해당 회원의 오늘 사용시간을 조회한다.
        // 오늘 처음 상담하는 회원이면 새로운 데이터를 생성한다.
        ChatDailyUsage usage = chatDailyUsageRepository
                .findByUserIdAndUsageDate(userId, today)
                .orElseGet(() -> {

                    ChatDailyUsage newUsage = new ChatDailyUsage();

                    // 회원 ID를 저장한다.
                    newUsage.setUserId(userId);

                    // 오늘 날짜를 저장한다.
                    newUsage.setUsageDate(today);

                    // 처음 사용하므로 0초부터 시작한다.
                    newUsage.setUsedSeconds(0);

                    return newUsage;
                });

        // 기존 사용시간 + 이번 사용시간
        int newUsedSeconds = usage.getUsedSeconds() + seconds;

        // 하루 최대 상담시간을 넘지 않도록 제한한다.
        usage.setUsedSeconds(
                Math.min(newUsedSeconds, DAILY_LIMIT_SECONDS)
        );

        // DB에 저장한다.
        chatDailyUsageRepository.save(usage);
    }
}