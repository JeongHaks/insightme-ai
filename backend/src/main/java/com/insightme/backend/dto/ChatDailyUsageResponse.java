package com.insightme.backend.dto;

/**
 * 비회원의 오늘 AI 상담 사용시간 정보를
 * 프론트엔드에 반환하기 위한 DTO
 */
public class ChatDailyUsageResponse {

    // 오늘 이미 사용한 상담시간(초)
    private int usedSeconds;

    // 오늘 남아있는 상담시간(초)
    private int remainingSeconds;

    /**
     * 상담시간 조회 결과를 생성한다.
     */
    public ChatDailyUsageResponse(
            int usedSeconds,
            int remainingSeconds
    ) {
        this.usedSeconds = usedSeconds;
        this.remainingSeconds = remainingSeconds;
    }

    // 오늘 사용한 시간을 반환한다.
    public int getUsedSeconds() {
        return usedSeconds;
    }

    // 오늘 남은 시간을 반환한다.
    public int getRemainingSeconds() {
        return remainingSeconds;
    }
}
