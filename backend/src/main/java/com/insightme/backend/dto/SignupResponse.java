package com.insightme.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 회원가입 성공 응답 DTO
 *
 * 회원가입이 완료된 후 프론트엔드에
 * 필요한 회원 정보만 전달한다.
 *
 * 비밀번호는 응답에 포함하지 않는다.
 */
@Getter
@AllArgsConstructor
public class SignupResponse {

    // 생성된 회원의 고유 ID
    private Long userId;

    // 회원의 로그인 아이디
    private String loginId;

    // 회원이 설정한 닉네임
    private String nickname;
}
