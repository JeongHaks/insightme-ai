package com.insightme.backend.controller;

import com.insightme.backend.dto.TestResultResponse;
import com.insightme.backend.service.TestResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * 테스트 결과 계산 API Controller
 */
@RestController // HTTP 요청을 받고 JSON 결과를 반환하는 Controller
@RequestMapping("/api/test-results") // 결과 API의 기본 주소
@RequiredArgsConstructor // final 필드를 받는 생성자 자동 생성
public class TestResultController {

    // 결과 계산과 저장을 처리하는 Service
    private final TestResultService testResultService;

    /**
     * 특정 테스트 실행의 최종 결과를 계산하고 저장한다.
     *
     * 요청 예시:
     * POST /api/test-results/{attemptId}
     */
    @PostMapping("/{attemptId}")
    public ResponseEntity<TestResultResponse> calculateResult(
            @PathVariable UUID attemptId) {

        // URL로 전달받은 attemptId를 사용해 결과를 계산하고 저장한다.
        TestResultResponse result =
                testResultService.calculateAndSaveResult(attemptId);

        // 계산된 결과를 HTTP 200과 JSON으로 반환한다.
        return ResponseEntity.ok(result);
    }
}