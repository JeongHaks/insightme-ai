package com.insightme.backend.controller;

import com.insightme.backend.dto.SignupRequest;
import com.insightme.backend.dto.SignupResponse;
import com.insightme.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// 로그인 요청 DTO
import com.insightme.backend.dto.LoginRequest;

// 로그인 성공 응답 DTO
import com.insightme.backend.dto.LoginResponse;

/**
 * 회원 관련 API 요청을 처리하는 Controller
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    // 실제 회원가입 로직을 처리하는 Service
    private final UserService userService;

    /**
     * 회원가입 API
     *
     * POST /api/users/signup
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        try {
            // 회원가입 처리
            SignupResponse response = userService.signup(request);

            // 정상적으로 가입되면 200 OK 반환
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            // 이미 사용 중인 아이디처럼
            // 사용자의 요청 때문에 회원가입할 수 없는 경우
            // 서버 오류(500)가 아닌 409 Conflict로 반환한다.
            return ResponseEntity
                    .status(409)
                    .body(e.getMessage());
        }
    }

    /**
     * 로그인 API
     *
     * POST /api/users/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            // UserService에서 아이디와 비밀번호를 확인한다.
            LoginResponse response = userService.login(request);

            // 로그인에 성공하면 회원 정보를 200 OK와 함께 반환한다.
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            // 아이디가 존재하지 않거나 비밀번호가 틀린 경우
            // 로그인 실패 응답을 반환한다.
            return ResponseEntity
                    .status(401)
                    .body(e.getMessage());
        }
    }
}
