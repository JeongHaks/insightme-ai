package com.insightme.backend.service;

import com.insightme.backend.dto.TestAnswerRequest;
import com.insightme.backend.entity.TestAnswer;
import com.insightme.backend.repository.TestAnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 테스트 답변 저장 로직을 처리하는 Service
 */
@Service
@RequiredArgsConstructor
public class TestAnswerService {

    // test_answers 테이블에 접근하는 Repository
    private final TestAnswerRepository testAnswerRepository;

    /**
     * 프론트에서 받은 답변을 DB에 저장한다.
     */
    public void saveAnswer(TestAnswerRequest request) {

        // DB에 저장할 TestAnswer Entity 생성
        TestAnswer testAnswer = new TestAnswer();

        // 어떤 테스트 실행의 답변인지 저장
        testAnswer.setAttemptId(request.getAttemptId());

        // 어떤 문항의 답변인지 저장
        testAnswer.setQuestionId(request.getQuestionId());

        // 사용자가 선택한 A 또는 B 저장
        testAnswer.setSelectedOptionCode(request.getSelectedOptionCode());

        // 현재 시간을 답변 시간으로 저장
        testAnswer.setAnsweredAt(LocalDateTime.now());

        // test_answers 테이블에 답변 저장
        testAnswerRepository.save(testAnswer);
    }
}
