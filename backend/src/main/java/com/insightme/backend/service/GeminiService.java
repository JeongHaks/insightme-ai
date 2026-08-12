package com.insightme.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

/**
 * Gemini API 호출을 담당하는 Service
 * ChatService는 채팅 흐름을 담당하고, GeminiService는 Gemini API 호출만 담당하도록 역할을 분리하기 위해
 */
@Service
public class GeminiService {

    /**
     * Gemini에게 프롬프트를 보내고 답변을 받는다.
     */
    public String askGemini(String prompt) {

        // 환경변수의 API 키를 이용해 Gemini Client를 생성한다.
        Client client = new Client();

        // Gemini 모델에 프롬프트를 전달한다.
        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash",
                        prompt,
                        null
                );

        // Gemini가 생성한 텍스트만 반환한다.
        return response.text();
    }
}