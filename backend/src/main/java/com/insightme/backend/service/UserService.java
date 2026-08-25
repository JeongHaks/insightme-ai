package com.insightme.backend.service;

import com.insightme.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.insightme.backend.dto.SignupRequest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.insightme.backend.dto.SignupResponse;
import com.insightme.backend.entity.User;

import java.time.LocalDateTime;

/**
 * 회원 관련 비즈니스 로직을 처리하는 Service
 *
 * 회원가입, 로그인 등의 회원 기능을 담당한다.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    // users 테이블의 회원 저장 및 조회에 사용한다.
    private final UserRepository userRepository;

    // 사용자가 입력한 비밀번호를 그대로 DB에 저장하지 않고
    // BCrypt 방식으로 해시하기 위해 사용한다.
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 회원가입 시 로그인 아이디가 이미 사용 중인지 확인한다.
     *
     * @param request 프론트에서 전달받은 회원가입 정보
     */
    public void validateDuplicateLoginId(SignupRequest request) {

        // 입력한 loginId로 기존 회원이 있는지 조회한다.
        if (userRepository.findByLoginId(request.getLoginId()).isPresent()) {

            // 이미 같은 아이디가 존재하면 회원가입을 진행하지 않는다.
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
    }

    /**
     * 회원가입을 처리한다.
     *
     * 아이디 중복 확인 → 비밀번호 BCrypt 해시
     * → 회원정보 DB 저장 → 가입 결과 반환 순서로 처리한다.
     */
    public SignupResponse signup(SignupRequest request) {

        // 1. 동일한 로그인 아이디가 이미 존재하는지 확인한다.
        validateDuplicateLoginId(request);

        // 2. 사용자가 입력한 비밀번호를 BCrypt 방식으로 해시한다.
        // 원래 비밀번호는 DB에 저장하지 않는다.
        String encodedPassword =
                passwordEncoder.encode(request.getPassword());

        // 3. DB에 저장할 회원 Entity를 생성한다.
        User user = new User();

        user.setLoginId(request.getLoginId());
        user.setPassword(encodedPassword);
        user.setNickname(request.getNickname());

        // 4. 회원 생성/수정 시간을 저장한다.
        LocalDateTime now = LocalDateTime.now();

        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        // 5. users 테이블에 회원정보를 저장한다.
        User savedUser = userRepository.save(user);

        // 6. 비밀번호를 제외한 회원가입 결과만 프론트에 반환한다.
        return new SignupResponse(
                savedUser.getId(),
                savedUser.getLoginId(),
                savedUser.getNickname()
        );
    }
}