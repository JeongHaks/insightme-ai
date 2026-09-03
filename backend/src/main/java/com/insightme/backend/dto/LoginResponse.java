package com.insightme.backend.dto;

// 로그인 성공 후 프론트엔드로 반환할 데이터를 담는 DTO
public class LoginResponse {

    // users 테이블의 회원 고유 ID
    private Long userId;

    // 사용자의 로그인 아이디
    private String loginId;

    // 사용자의 닉네임
    private String nickname;

    // 로그인 성공 응답을 만들 때 사용할 생성자
    public LoginResponse(Long userId, String loginId, String nickname) {
        this.userId = userId;
        this.loginId = loginId;
        this.nickname = nickname;
    }

    // 회원 고유 ID를 가져오는 Getter
    public Long getUserId() {
        return userId;
    }

    // 로그인 아이디를 가져오는 Getter
    public String getLoginId() {
        return loginId;
    }

    // 닉네임을 가져오는 Getter
    public String getNickname() {
        return nickname;
    }
}
