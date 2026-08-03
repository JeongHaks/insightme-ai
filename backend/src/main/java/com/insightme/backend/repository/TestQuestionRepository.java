package com.insightme.backend.repository;

import com.insightme.backend.entity.TestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 테스트 문항 DB 접근 Repository
 * Entity를 이용해서 DB 데이터를 조회·저장·수정·삭제하는 역할
 * test_questions 테이블의 조회, 저장, 수정, 삭제 기능을 제공한다.
 */
public interface TestQuestionRepository
        extends JpaRepository<TestQuestion, Long> {

    /**
     * 사용 중인 문항만 문항 순서대로 조회한다.
     *
     * 메서드 이름을 분석해 Spring Data JPA가 자동으로
     * 아래 조건의 SQL을 만들어 실행한다.
     *
     * 조건:
     * is_active = true
     * question_order 오름차순
     */
    List<TestQuestion> findByIsActiveTrueOrderByQuestionOrderAsc();
}