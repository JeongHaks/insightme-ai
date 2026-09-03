package com.insightme.backend.service;

import com.insightme.backend.repository.UserRepository;
// 비회원 테스트 기록을 조회하고 회원과 연결하기 위해 사용한다.
import com.insightme.backend.repository.TestAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.insightme.backend.dto.SignupRequest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.insightme.backend.dto.SignupResponse;
import com.insightme.backend.entity.User;

// 로그인 요청 데이터를 받기 위한 DTO
import com.insightme.backend.dto.LoginRequest;

// 로그인 성공 결과를 반환하기 위한 DTO
import com.insightme.backend.dto.LoginResponse;

import java.time.LocalDateTime;

// 프론트에서 문자열로 전달받은 attemptId를
// TestAttempt의 기본키 타입인 UUID로 변환하기 위해 사용한다.
import java.util.UUID;

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

    // 비회원 상태에서 진행한 테스트 기록을 조회하고
    // 회원가입 후 새 회원에게 연결하기 위해 사용한다.
    private final TestAttemptRepository testAttemptRepository;

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

        // 6. 비회원 상태에서 진행한 테스트가 있다면
        // 해당 테스트 기록을 방금 가입한 회원에게 연결한다.
        if (request.getAttemptId() != null && !request.getAttemptId().isBlank()) {

            // 프론트에서 문자열로 전달받은 attemptId를 UUID 타입으로 변환한다.
            UUID attemptId = UUID.fromString(request.getAttemptId());

            // attemptId에 해당하는 기존 테스트 기록을 조회한다.
            testAttemptRepository.findById(attemptId).ifPresent(testAttempt -> {

                // test_attempts.user_id에 새로 가입한 회원의 ID를 저장한다.
                testAttempt.setUserId(savedUser.getId());

                // 변경된 테스트 기록을 DB에 반영한다.
                testAttemptRepository.save(testAttempt);
            });
        }

        // 6. 비밀번호를 제외한 회원가입 결과만 프론트에 반환한다.
        return new SignupResponse(
                savedUser.getId(),
                savedUser.getLoginId(),
                savedUser.getNickname()
        );
    }

    /**
     * 로그인을 처리한다.
     *
     * 아이디로 회원 조회 → 비밀번호 확인
     * → 로그인 성공 정보 반환 순서로 처리한다.
     */
    public LoginResponse login(LoginRequest request) {

        // 1. 사용자가 입력한 loginId로 회원을 조회한다.
        // 해당 아이디의 회원이 없으면 로그인 실패 처리한다.
        User user = userRepository.findByLoginId(request.getLoginId())
                .orElseThrow(() ->
                        new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.")
                );

        // 2. 사용자가 입력한 비밀번호와
        // DB에 저장되어 있는 BCrypt 비밀번호를 비교한다.
        boolean passwordMatches =
                passwordEncoder.matches(request.getPassword(), user.getPassword());

        // 3. 비밀번호가 일치하지 않으면 로그인 실패 처리한다.
        if (!passwordMatches) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        // 4. 아이디와 비밀번호가 모두 맞으면
        // 비밀번호를 제외한 회원정보를 프론트에 반환한다.
        return new LoginResponse(
                user.getId(),
                user.getLoginId(),
                user.getNickname()
        );
    }

}