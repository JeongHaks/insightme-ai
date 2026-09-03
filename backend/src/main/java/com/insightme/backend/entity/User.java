package com.insightme.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 회원 정보를 저장하는 Entity
 *
 * DB의 users 테이블과 연결된다.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    /**
     * 회원 고유번호
     *
     * BIGSERIAL로 만든 users.id와 연결된다.
     * 회원이 저장될 때 PostgreSQL이 번호를 자동 생성한다.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 로그인할 때 사용하는 아이디
     *
     * DB 컬럼명은 login_id이다.
     */
    @Column(name = "login_id", nullable = false, unique = true)
    private String loginId;

    /**
     * 회원 비밀번호
     *
     * 사용자가 입력한 비밀번호 원문이 아니라
     * BCrypt로 암호화(해시)한 값을 저장할 예정이다.
     */
    @Column(nullable = false)
    private String password;

    /**
     * 서비스에서 보여줄 닉네임
     */
    @Column(nullable = false)
    private String nickname;

    /**
     * 회원가입 시간
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    /**
     * 회원정보 마지막 수정 시간
     */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
