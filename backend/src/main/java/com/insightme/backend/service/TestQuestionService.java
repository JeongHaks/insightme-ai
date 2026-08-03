package com.insightme.backend.service;

import com.insightme.backend.dto.TestQuestionResponse;
import com.insightme.backend.repository.TestQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 이 클래스를 Spring의 Service 객체로 등록
@RequiredArgsConstructor // final 필드를 받는 생성자를 Lombok이 자동 생성
public class TestQuestionService {
    // DB 조회 결과인 Entity를 그대로 프론트에 보내지 않고, 필요한 정보만 DTO로 변환
    // test_questions 테이블에 접근하는 Repository
    private final TestQuestionRepository testQuestionRepository;

    /**
     * 사용 중인 테스트 문항을 순서대로 조회한다.
     */
    public List<TestQuestionResponse> getActiveQuestions() {

        // DB에서 활성 문항을 question_order 순서대로 조회한 뒤,
        // Entity를 프론트 응답용 DTO로 변환한다.
        return testQuestionRepository
                .findByIsActiveTrueOrderByQuestionOrderAsc()
                .stream() // 하나씩 문항을 꺼낸다.
                .map(question -> new TestQuestionResponse(
                        question.getQuestionId(),
                        question.getTraitCode(),
                        question.getQuestionText(),
                        question.getQuestionOrder()
                ))// 변환 응답 DTO
                .toList(); // List로 변환
    }
}
