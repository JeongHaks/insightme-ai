package com.insightme.backend.service;

import com.insightme.backend.entity.TestAnswer;
import com.insightme.backend.entity.TestQuestion;
import com.insightme.backend.entity.TestResult;
import com.insightme.backend.repository.TestAnswerRepository;
import com.insightme.backend.repository.TestQuestionRepository;
import com.insightme.backend.repository.TestResultRepository;
import com.insightme.backend.dto.TestResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * 저장된 답변을 이용해 기질 점수를 계산하고
 * 최종 결과를 DB에 저장하는 Service
 */
@Service
@RequiredArgsConstructor
public class TestResultService {

    // 사용자가 선택한 답변을 조회하는 Repository
    private final TestAnswerRepository testAnswerRepository;

    // 문항의 기질 코드와 점수 답변을 조회하는 Repository
    private final TestQuestionRepository testQuestionRepository;

    // 계산한 최종 결과를 저장하는 Repository
    private final TestResultRepository testResultRepository;

    /**
     * 특정 테스트 실행의 답변을 계산해 최종 결과를 만든다.
     *
     * @param attemptId 테스트 실행 고유 ID
     * @return 계산 및 저장된 최종 결과
     */
    public TestResultResponse calculateAndSaveResult(UUID attemptId) {

        // 같은 attemptId로 저장된 전체 답변을 조회한다.
        List<TestAnswer> answers =
                testAnswerRepository.findByAttemptId(attemptId);

        // 저장된 답변이 없으면 결과를 계산할 수 없다.
        if (answers.isEmpty()) {
            throw new IllegalArgumentException("저장된 테스트 답변이 없습니다.");
        }

        // 기질별 점수 초기값
        int nsScore = 0;
        int haScore = 0;
        int rdScore = 0;
        int sdScore = 0;

        // 사용자의 답변을 하나씩 확인한다.
        for (TestAnswer answer : answers) {

            // 답변에 연결된 문항을 DB에서 조회한다.
            TestQuestion question = testQuestionRepository
                    .findById(answer.getQuestionId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "문항을 찾을 수 없습니다: "
                                            + answer.getQuestionId()
                            )
                    );

            /*
             * 사용자가 선택한 A/B와 문항의 scoreAnswer가 같으면
             * 해당 기질 점수를 1점 증가시킨다.
             */
            boolean isScoreAnswer =
                    question.getScoreAnswer()
                            .equalsIgnoreCase(
                                    answer.getSelectedOptionCode()
                            );

            // 점수 답변이 아니면 다음 답변으로 넘어간다.
            if (!isScoreAnswer) {
                continue;
            }

            // 문항의 기질 코드에 따라 점수를 증가시킨다.
            switch (question.getTraitCode().toUpperCase()) {
                case "NS" -> nsScore++;
                case "HA" -> haScore++;
                case "RD" -> rdScore++;
                case "SD" -> sdScore++;
                default -> {
                    // 정의되지 않은 기질 코드는 점수에 반영하지 않는다.
                }
            }
        }

        // 같은 attemptId의 결과가 이미 있으면 기존 결과를 가져오고,
        // 없으면 새로운 결과 Entity를 생성한다.
        // 결과 API가 같은 테스트에 대해 여러 번 호출되어도
        // test_results에 결과가 중복 저장되지 않도록 하기 위해서다.
                TestResult result = testResultRepository
                        .findByAttemptId(attemptId)
                        .orElseGet(TestResult::new);

        result.setAttemptId(attemptId);
        result.setNsScore(nsScore);
        result.setHaScore(haScore);
        result.setRdScore(rdScore);
        result.setSdScore(sdScore);

        // 점수 조합에 따라 기질 유형 문구를 만든다.
        String resultType;

        if (haScore >= nsScore && haScore >= rdScore && haScore >= sdScore) {
            resultType = "신중형 · 안정지향형";
        } else if (nsScore >= haScore && nsScore >= rdScore && nsScore >= sdScore) {
            resultType = "도전형 · 변화추구형";
        } else if (rdScore >= nsScore && rdScore >= haScore && rdScore >= sdScore) {
            resultType = "공감형 · 관계중심형";
        } else {
            resultType = "자율형 · 목표지향형";
        }

        // 우선 점수 확인용 기본 결과 문구를 저장한다.
        result.setResultType(resultType);

        // 기질 유형에 따라 직업 분석 문구를 만든다.
        String careerAnalysis;

        switch (resultType) {
            case "신중형 · 안정지향형" ->
                    careerAnalysis =
                            "계획과 기준이 명확한 환경에서 강점을 발휘합니다. "
                                    + "운영, 품질, 분석, 관리처럼 정확성과 안정성이 중요한 역할과 잘 맞습니다.";

            case "도전형 · 변화추구형" ->
                    careerAnalysis =
                            "새로운 아이디어를 빠르게 시도하고 변화를 만들어내는 역할에 강점이 있습니다. "
                                    + "기획, 마케팅, 신규사업, 문제 해결 중심 업무와 잘 맞습니다.";

            case "공감형 · 관계중심형" ->
                    careerAnalysis =
                            "사람의 감정과 관계를 세심하게 살피는 강점이 있습니다. "
                                    + "상담, 교육, 인사, 고객경험처럼 소통이 중요한 역할과 잘 맞습니다.";

            default ->
                    careerAnalysis =
                            "스스로 목표를 세우고 책임 있게 추진하는 강점이 있습니다. "
                                    + "프로젝트 관리, 전문직, 리더 역할처럼 자율성이 높은 업무와 잘 맞습니다.";
        }

        // 기질 유형에 따라 번아웃 분석 문구를 만든다.
        String burnoutAnalysis;

        switch (resultType) {
            case "신중형 · 안정지향형" ->
                    burnoutAnalysis =
                            "실수하지 않으려는 부담과 높은 책임감 때문에 피로가 쌓이기 쉽습니다. "
                                    + "업무 기준을 명확히 하고 완벽함보다 우선순위를 정하는 것이 도움이 됩니다.";

            case "도전형 · 변화추구형" ->
                    burnoutAnalysis =
                            "반복적인 업무나 변화가 적은 환경에서 쉽게 답답함을 느낄 수 있습니다. "
                                    + "새로운 목표를 만들고 짧은 단위로 성취감을 확인하는 것이 좋습니다.";

            case "공감형 · 관계중심형" ->
                    burnoutAnalysis =
                            "주변 사람의 감정과 기대를 지나치게 신경 쓸 때 정서적으로 지치기 쉽습니다. "
                                    + "모든 문제를 혼자 해결하려 하지 말고 관계의 경계를 세우는 것이 필요합니다.";

            default ->
                    burnoutAnalysis =
                            "혼자 책임지고 해결하려는 성향 때문에 부담을 오래 안고 갈 수 있습니다. "
                                    + "중간 피드백을 자주 받고 업무를 나누는 것이 회복에 도움이 됩니다.";
        }

        // 기질 유형에 따라 조직문화 분석 문구를 만든다.
        String cultureAnalysis;

        switch (resultType) {
            case "신중형 · 안정지향형" ->
                    cultureAnalysis =
                            "업무 기준과 역할이 명확하고, 예측 가능한 방식으로 협업하는 조직과 잘 맞습니다. "
                                    + "갑작스러운 지시 변경이 잦거나 기준이 모호한 환경에서는 스트레스를 받을 수 있습니다.";

            case "도전형 · 변화추구형" ->
                    cultureAnalysis =
                            "새로운 시도를 장려하고 빠른 실행을 존중하는 조직에서 강점이 잘 드러납니다. "
                                    + "지나치게 보수적이거나 변화가 느린 환경에서는 답답함을 느낄 수 있습니다.";

            case "공감형 · 관계중심형" ->
                    cultureAnalysis =
                            "수평적으로 소통하고 서로의 의견을 존중하는 조직과 잘 맞습니다. "
                                    + "경쟁이 지나치게 강하거나 감정적인 갈등이 반복되는 환경은 피하는 것이 좋습니다.";

            default ->
                    cultureAnalysis =
                            "자율성과 책임이 함께 주어지고, 결과 중심으로 신뢰하는 조직에서 강점을 발휘합니다. "
                                    + "세세한 통제가 많거나 의사결정 권한이 지나치게 제한된 환경은 맞지 않을 수 있습니다.";
        }


        result.setSummaryText(
                "NS " + nsScore
                        + "점, HA " + haScore
                        + "점, RD " + rdScore
                        + "점, SD " + sdScore
                        + "점입니다."
        );

        // 상세 분석 문구는 다음 단계에서 점수 기준에 맞춰 작성한다.
        result.setCareerAnalysis(careerAnalysis);
        result.setBurnoutAnalysis(burnoutAnalysis);
        result.setCultureAnalysis(cultureAnalysis);

        // 결과 생성 시간 저장
        result.setCreatedAt(LocalDateTime.now());

        // 계산한 결과를 DB에 저장한다.
        TestResult savedResult = testResultRepository.save(result);

        // 저장된 Entity를 프론트 응답용 DTO로 변환해서 반환한다.
        return new TestResultResponse(
                savedResult.getAttemptId(),
                savedResult.getNsScore(),
                savedResult.getHaScore(),
                savedResult.getRdScore(),
                savedResult.getSdScore(),
                savedResult.getResultType(),
                savedResult.getSummaryText(),
                savedResult.getCareerAnalysis(),
                savedResult.getBurnoutAnalysis(),
                savedResult.getCultureAnalysis()
        );
    }
}
