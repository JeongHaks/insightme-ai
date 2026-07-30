package com.insightme.backend.controller;

import com.insightme.backend.dto.TestAttemptRequest;
import com.insightme.backend.dto.TestAttemptResponse;
import com.insightme.backend.service.TestAttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // JSON 형식으로 요청과 응답을 처리하는 Controller
@RequestMapping("/api/test-attempts") // 이 Controller의 기본 API 주소
@RequiredArgsConstructor // final 필드를 받는 생성자를 Lombok이 자동 생성
public class TestAttemptController {

    // 테스트 시작 업무 로직을 처리하는 Service
    private final TestAttemptService testAttemptService;

    /**
     * 프론트에서 기본 정보를 받아 새로운 테스트 진행 건을 생성한다.
     */
    @PostMapping
    public ResponseEntity<TestAttemptResponse> createAttempt(
            @RequestBody TestAttemptRequest request
    ) {

        // Service를 호출하여 기본 정보를 저장하고 응답 데이터를 받는다.
        TestAttemptResponse response =
                testAttemptService.createAttempt(request);

        // HTTP 상태 코드 200과 함께 응답 데이터를 프론트에 반환한다.
        return ResponseEntity.ok(response);
    }
}
