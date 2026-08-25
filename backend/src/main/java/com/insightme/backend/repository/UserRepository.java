package com.insightme.backend.repository;

import com.insightme.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 회원 정보 DB 접근 Repository
 *
 * users 테이블의 회원 저장 및 조회 기능을 담당한다.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 로그인 아이디로 회원을 조회한다.
     *
     * 회원가입 시 아이디 중복 확인,
     * 이후 로그인 시 회원 조회에 사용한다.
     *
     * @param loginId 사용자가 입력한 로그인 아이디
     * @return 해당 아이디의 회원
     */
    Optional<User> findByLoginId(String loginId);
}
