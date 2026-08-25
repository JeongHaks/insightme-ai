package com.insightme.backend.controller;

import com.insightme.backend.dto.SignupRequest;
import com.insightme.backend.dto.SignupResponse;
import com.insightme.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
