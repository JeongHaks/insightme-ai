package com.insightme.backend.dto;

// 로그인 요청 시 프론트엔드에서 전달받는 데이터를 담는 DTO
public class LoginRequest {

    // 사용자가 입력한 로그인 아이디
    private String loginId;

    // 사용자가 입력한 비밀번호
    private String password;

    // loginId 값을 가져오기 위한 Getter
    public String getLoginId() {
        return loginId;
    }

    // loginId 값을 저장하기 위한 Setter
    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    // password 값을 가져오기 위한 Getter
    public String getPassword() {
        return password;
    }

    // password 값을 저장하기 위한 Setter
    public void setPassword(String password) {
        this.password = password;
    }
}
