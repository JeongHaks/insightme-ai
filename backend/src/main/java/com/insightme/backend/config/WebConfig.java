package com.insightme.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS 설정
 *
 * 프론트엔드(Next.js)에서 백엔드(Spring Boot) API를 호출할 수 있도록 허용한다.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * CORS 허용 설정
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**") // 모든 API 경로 허용
                .allowedOrigins("http://localhost:3000", // 로컬
                                "https://insightme-ai.vercel.app" // 실제 배포된 프론트
                        ) // Next.js 개발 서버
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 허용할 HTTP Method
                .allowedHeaders("*") // 모든 Header 허용
                .allowCredentials(true); // 쿠키 및 인증정보 허용
    }
}
