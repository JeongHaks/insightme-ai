package com.insightme.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 이 클래스가 HTTP 요청을 처리하는 Controller임을 Spring에 알려준다.
@RestController
public class HealthController {

    // 브라우저나 프론트엔드에서 GET /api/health로 요청하면 실행된다.
    @GetMapping("/api/health")
    public String healthCheck() {

        // 서버가 정상 실행 중이라는 문자열을 응답한다.
        return "InsightMe Backend OK";
    }
}
