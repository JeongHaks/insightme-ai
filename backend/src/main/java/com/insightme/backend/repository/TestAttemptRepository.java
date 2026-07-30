package com.insightme.backend.repository;

import com.insightme.backend.entity.TestAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

// TestAttempt 엔티티의 DB 저장, 조회, 수정, 삭제 기능을 제공하는 Repository
/*
* extends
* TestAttempt → 이 Repository가 관리할 Entity
* UUID        → TestAttempt의 기본키 타입
* */
public interface TestAttemptRepository extends JpaRepository<TestAttempt, UUID> {
}
