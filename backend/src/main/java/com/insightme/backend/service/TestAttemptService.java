package com.insightme.backend.service;

import com.insightme.backend.dto.TestAttemptRequest;
import com.insightme.backend.dto.TestAttemptResponse;
import com.insightme.backend.entity.TestAttempt;
import com.insightme.backend.repository.TestAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service // 이 클래스를 Spring의 서비스 객체로 등록
@RequiredArgsConstructor // final 필드를 받는 생성자를 Lombok이 자동 생성
public class TestAttemptService {

    // test_attempts 테이블에 저장하기 위한 Repository
    private final TestAttemptRepository testAttemptRepository;

    /**
     * 프론트에서 받은 기본 정보를 저장하고
     * 생성된 테스트 진행 번호와 상태를 반환한다.
     */
    public TestAttemptResponse createAttempt(TestAttemptRequest request) {

        // 요청받은 기본 정보를 TestAttempt 엔티티에 담는다.
        TestAttempt testAttempt = new TestAttempt();
        testAttempt.setGender(request.getGender());
        testAttempt.setAgeGroup(request.getAgeGroup());
        testAttempt.setJobGroup(request.getJobGroup());
        testAttempt.setMbti(request.getMbti());

        // 현재 테스트가 진행 중임을 표시한다.
        testAttempt.setStatus("IN_PROGRESS");

        // 테스트 시작 시간을 현재 시간으로 저장한다.
        testAttempt.setStartedAt(LocalDateTime.now());

        // DB에 저장하고, UUID가 생성된 엔티티를 반환받는다.
        TestAttempt savedAttempt = testAttemptRepository.save(testAttempt);

        // 프론트에 필요한 테스트 고유번호와 상태만 응답한다.
        return new TestAttemptResponse(
                savedAttempt.getAttemptId(),
                savedAttempt.getStatus()
        );
    }
}
