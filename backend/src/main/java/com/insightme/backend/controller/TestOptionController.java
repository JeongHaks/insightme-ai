package com.insightme.backend.controller;

import com.insightme.backend.dto.TestOptionResponse;
import com.insightme.backend.service.TestOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 테스트 선택지 API Controller
 *
 * 프론트에서 특정 문항의 선택지를 요청하면
 * Service를 통해 DB에서 조회하여 응답한다.
 */
@RestController // HTTP 요청을 받고 JSON 데이터를 반환하는 Controller
@RequestMapping("/api/test-options") // 이 Controller의 기본 API 주소
@RequiredArgsConstructor // final 필드를 받는 생성자를 Lombok이 자동 생성
public class TestOptionController {

    // 테스트 선택지 조회 로직을 처리하는 Service
    private final TestOptionService testOptionService;

    /**
     * 특정 문항의 선택지를 조회한다.
     *
     * 요청 예시
     * GET /api/test-options/1
     */
    @GetMapping("/{questionId}")
    public ResponseEntity<List<TestOptionResponse>> getOptions(
            @PathVariable Long questionId) {

        // Service에서 선택지를 조회한다.
        List<TestOptionResponse> options =
                testOptionService.getOptionsByQuestionId(questionId);

        // HTTP 200과 함께 선택지 목록을 반환한다.
        return ResponseEntity.ok(options);
    }
}