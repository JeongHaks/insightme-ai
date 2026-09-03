package com.insightme.backend.dto;

/**
 * 프론트에서 비회원의 AI 상담 사용시간을
 * 백엔드로 전달하기 위한 요청 DTO
 */
public class ChatDailyUsageRequest {

    // 비회원 브라우저를 식별하는 ID
    private String guestId;

    // 이번 요청에서 추가로 사용한 상담시간(초)
    private int seconds;

    // guestId 값을 가져오기 위한 getter
    public String getGuestId() {
        return guestId;
    }

    // guestId 값을 저장하기 위한 setter
    public void setGuestId(String guestId) {
        this.guestId = guestId;
    }

    // 사용한 초를 가져오기 위한 getter
    public int getSeconds() {
        return seconds;
    }

    // 사용한 초를 저장하기 위한 setter
    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }
}