package com.insightme.backend.repository;

import com.insightme.backend.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;
//계산한 최종 결과를 test_results 테이블에 저장하고, 나중에 attemptId로 결과를 조회
/**
 * 테스트 결과 DB 접근 Repository
 *
 * test_results 테이블의 저장, 조회, 수정, 삭제 기능을 제공한다.
 */
public interface TestResultRepository
        extends JpaRepository<TestResult, Long> {

    /**
     * 특정 테스트 실행의 결과를 조회한다.
     *
     * @param attemptId 테스트 실행 고유 ID
     * @return 해당 테스트의 결과
     */
    Optional<TestResult> findByAttemptId(UUID attemptId);
}