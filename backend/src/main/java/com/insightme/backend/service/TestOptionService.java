package com.insightme.backend.service;

import com.insightme.backend.dto.TestOptionResponse;
import com.insightme.backend.repository.TestOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 이 클래스를 Spring의 Service 객체로 등록
@RequiredArgsConstructor // final 필드를 받는 생성자를 Lombok이 자동 생성
public class TestOptionService {

    // test_options 테이블에 접근하는 Repository
    private final TestOptionRepository testOptionRepository;

    /**
     * 특정 문항의 선택지를 화면 표시 순서대로 조회한다.
     */
    public List<TestOptionResponse> getOptionsByQuestionId(Long questionId) {

        // 전달받은 문항 ID에 해당하는 선택지를 DB에서 조회한 뒤,
        // Entity를 프론트 응답용 DTO로 변환한다.
        return testOptionRepository
                .findByQuestionIdOrderByDisplayOrderAsc(questionId)
                .stream()
                .map(option -> new TestOptionResponse(
                        option.getOptionId(),
                        option.getOptionCode(),
                        option.getOptionText(),
                        option.getDisplayOrder()
                ))
                .toList();
    }
}
