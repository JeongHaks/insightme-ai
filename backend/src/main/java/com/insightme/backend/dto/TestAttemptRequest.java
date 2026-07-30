package com.insightme.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter // 요청 데이터의 값을 읽는 getter 자동 생성
@Setter // JSON 데이터를 DTO 필드에 담기 위한 setter 자동 생성
@NoArgsConstructor // Spring이 요청 DTO 객체를 생성할 때 사용할 기본 생성자
public class TestAttemptRequest {

    // 기본정보 화면에서 선택한 성별
    private String gender;

    // 기본정보 화면에서 선택한 연령대
    private String ageGroup;

    // 기본정보 화면에서 선택한 직업군
    private String jobGroup;

    // 기본정보 화면에서 선택한 MBTI
    private String mbti;
}
