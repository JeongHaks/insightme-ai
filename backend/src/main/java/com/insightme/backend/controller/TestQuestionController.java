package com.insightme.backend.controller;

import com.insightme.backend.dto.TestQuestionResponse;
import com.insightme.backend.service.TestQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 테스트 문항 API Controller
 *
 * 프론트에서 테스트 문항을 요청하면
 * Service를 통해 DB 문항을 조회하여 응답한다.
 */
@RestController // HTTP 요청을 받고 JSON 데이터를 반환하는 Controller
@RequestMapping("/api/test-questions") // 이 Controller의 기본 API 주소
@RequiredArgsConstructor // final 필드를 받는 생성자를 Lombok이 자동 생성
public class TestQuestionController {

    // 테스트 문항 조회 로직을 처리하는 Service
    private final TestQuestionService testQuestionService;

    /**
     * 사용 중인 테스트 문항을 순서대로 조회한다.
     *
     * 요청 주소:
     * GET /api/test-questions
     */
    @GetMapping
    public ResponseEntity<List<TestQuestionResponse>> getActiveQuestions() {

        // Service에서 조회한 문항 목록을 받는다.
        List<TestQuestionResponse> questions =
                testQuestionService.getActiveQuestions();

        // HTTP 상태 코드 200과 문항 목록을 프론트에 반환한다.
        return ResponseEntity.ok(questions);
    }
}