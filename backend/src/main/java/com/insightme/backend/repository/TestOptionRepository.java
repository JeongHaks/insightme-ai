package com.insightme.backend.repository;

import com.insightme.backend.entity.TestOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 테스트 선택지 DB 접근 Repository
 *
 * test_options 테이블의 조회, 저장, 수정, 삭제 기능을 제공한다.
 */
public interface TestOptionRepository extends JpaRepository<TestOption, Long> {

    /**
     * 특정 문항의 선택지를 화면 표시 순서대로 조회한다.
     *
     * Spring Data JPA가 메서드 이름을 해석해서
     * 아래 조건의 SQL을 자동 생성한다.
     *
     * 조건:
     * question_id = 전달받은 문항 ID
     * display_order 오름차순
     */
    List<TestOption> findByQuestionIdOrderByDisplayOrderAsc(Long questionId);
}
