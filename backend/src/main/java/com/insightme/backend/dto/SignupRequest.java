package com.insightme.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 회원가입 요청 DTO
 *
 * 프론트엔드에서 전달하는
 * 아이디, 비밀번호, 닉네임을 받는다.
 */
@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {

    // 사용자가 로그인할 때 사용할 아이디
    private String loginId;

    // 사용자가 회원가입 화면에서 입력한 비밀번호
    // 여기서는 아직 원문이고, Service에서 BCrypt로 변환한 뒤 DB에 저장한다.
    private String password;

    // 서비스에서 사용할 닉네임
    private String nickname;
}
