package com.insightme.backend.controller;

import com.insightme.backend.dto.TestAnswerRequest;
import com.insightme.backend.service.TestAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 테스트 답변 저장 API Controller
 */
@RestController // HTTP 요청을 받고 응답하는 Controller
@RequestMapping("/api/test-answers") // 답변 API의 기본 주소
@RequiredArgsConstructor // final 필드 생성자 자동 생성
public class TestAnswerController {

    // 답변 저장 로직을 처리하는 Service
    private final TestAnswerService testAnswerService;

    /**
     * 사용자가 선택한 답변을 저장한다.
     *
     * 요청 주소:
     * POST /api/test-answers
     */
    @PostMapping
    public ResponseEntity<Void> saveAnswer(
            @RequestBody TestAnswerRequest request) {

        // 프론트에서 받은 답변을 Service에 전달한다.
        testAnswerService.saveAnswer(request);

        // 저장 성공 시 HTTP 200 응답을 반환한다.
        return ResponseEntity.ok().build();
    }
}
