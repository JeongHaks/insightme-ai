package com.insightme.backend.repository;

import com.insightme.backend.entity.TestAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * 테스트 답변 DB 접근 Repository
 *
 * test_answers 테이블의 저장, 조회, 수정, 삭제 기능을 제공한다.
 */
public interface TestAnswerRepository
        extends JpaRepository<TestAnswer, Long> {

    /**
     * 특정 테스트 실행에 저장된 답변을 조회한다.
     *
     * @param attemptId 테스트 실행 고유 ID
     * @return 해당 테스트에서 선택한 전체 답변
     */
    List<TestAnswer> findByAttemptId(UUID attemptId);
}
