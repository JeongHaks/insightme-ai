"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuestionHeader from "./QuestionHeader";
import QuestionCard from "./QuestionCard";
import QuestionOption from "./QuestionOption";

import { getTestQuestions, getTestOptions, saveTestAnswer, calculateTestResult } from "@/lib/api";

/**
 * 백엔드에서 받아오는 테스트 문항 데이터 타입
 */
interface TestQuestionData {
  // 문항 고유 ID
  questionId: number;

  // 성향 코드
  // 예: NS, HA, RD, SD
  traitCode: string;

  // 화면에 표시할 질문 내용
  questionText: string;

  // 사용자가 문항을 푸는 순서
  questionOrder: number;
}

/**
 * 백엔드에서 받아오는 테스트 선택지 데이터 타입
 */
interface TestOptionData {
  // 선택지 고유 ID
  optionId: number;

  // DB에서 받아오는 선택지 코드는 A 또는 B
  optionCode: "A" | "B";

  // 화면에 표시할 선택지 내용
  optionText: string;

  // 화면 표시 순서
  displayOrder: number;
}

/**
 * TCI 문항 화면 컴포넌트
 */
export default function TestQuestion() {
  // 페이지 이동을 위한 Next.js 라우터
  const router = useRouter();
  

  // 사용자가 현재 선택한 답변 번호
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // 문항별로 사용자가 선택한 선택지 ID를 저장한다.
  // key   : questionId
  // value : optionId
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // 문항별로 사용자가 선택한 A/B 코드를 저장한다.
  // key   : questionId
  // value : "A" 또는 "B"
  const [answerCodes, setAnswerCodes] = useState<Record<number, "A" | "B">>({});

  // 현재 보고 있는 문항의 배열 위치
  // 0은 첫 번째 문항, 1은 두 번째 문항을 의미한다.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 백엔드에서 조회한 전체 테스트 문항 목록
  const [questions, setQuestions] = useState<TestQuestionData[]>([]);

  // 현재 문항의 DB 선택지 목록
  const [options, setOptions] = useState<TestOptionData[]>([]);

  // 기본정보 저장 후 localStorage에 보관한 테스트 실행 ID
  const [attemptId, setAttemptId] = useState<string | null>(null);

  // 현재 로그인한 회원인지 저장하는 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * 화면이 처음 열릴 때 백엔드에서 테스트 문항을 조회한다.
   */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // 백엔드 문항 조회 API 호출
        const data = await getTestQuestions();

        // 조회한 문항 목록을 state에 저장
        setQuestions(data);
      } catch (error) {
        // 문항 조회 실패 시 콘솔에 오류 출력
        console.error("문항 조회 실패:", error);
      }
    };

    fetchQuestions();
  }, []);


  // 조회된 문항 목록의 첫 번째 문항
  const currentQuestion = questions[currentQuestionIndex];

  /**
 * 현재 문항이 변경되면 해당 문항의 선택지를 조회한다.
 */
useEffect(() => {
  // 아직 문항이 없으면 조회하지 않는다.
  if (!currentQuestion) {
    return;
  }

  const fetchOptions = async () => {
    try {
      // 현재 문항의 선택지를 조회한다.
      const data = await getTestOptions(currentQuestion.questionId);

      // 조회한 선택지를 state에 저장한다.
      setOptions(data);
    } catch (error) {
      console.error("선택지 조회 실패:", error);
    }
  };

  fetchOptions();
}, [currentQuestion]);

/**
 * 현재 문항이 바뀔 때,
 * answers에 저장된 기존 선택값을 다시 화면 선택 상태에 반영한다.
 */
useEffect(() => {
  // 아직 현재 문항이 없으면 아무 작업도 하지 않는다.
  if (!currentQuestion) {
    return;
  }

  // 현재 문항에 저장된 선택지 ID를 가져온다.
  const savedOptionId = answers[currentQuestion.questionId];

  // 저장된 답변이 있으면 다시 선택 상태로 표시하고,
  // 없으면 선택되지 않은 상태로 초기화한다.
  setSelectedOption(savedOptionId ?? null);
}, [currentQuestion, answers]);

/**
 * 화면이 처음 열릴 때 localStorage에서 attemptId를 가져온다.
 */
useEffect(() => {
  const savedAttemptId = localStorage.getItem("attemptId");

  // 로그인한 회원의 ID를 가져온다.
  const savedUserId = localStorage.getItem("userId");

  // 저장된 테스트 실행 ID를 state에 보관한다.
  setAttemptId(savedAttemptId);

  // userId가 있으면 회원, 없으면 비회원으로 처리한다.
  setIsLoggedIn(!!savedUserId);
}, []);

  
  return (
    // 화면 전체 배경 영역
    <main className="min-h-screen bg-[#F7F4FF] px-4 py-5">
      {/* 모바일 카드 영역 */}
      <section className="mx-auto min-h-[720px] max-w-sm rounded-[28px] bg-white px-6 py-8 shadow-xl">
        {/* 현재 회원 / 비회원 상태 표시 */}
        <div className="mb-4 flex justify-end">
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">
            {isLoggedIn ? "회원" : "비회원"}
          </span>
        </div>
        {/* 제목과 진행률 */}
        <QuestionHeader
          // 배열은 0부터 시작하므로 화면 번호는 1을 더한다.
          current={currentQuestionIndex + 1}

          // DB에서 조회한 전체 문항 개수
          total={questions.length}

          // 현재 문항에서 답변을 선택했는지 표시
          answeredCount={selectedOption !== null ? 1 : 0}
        />

        {/* DB에서 문항을 불러온 뒤 첫 번째 문항을 표시 */}
        {currentQuestion && (
          <QuestionCard
            questionNumber={currentQuestion.questionOrder}
            trait={currentQuestion.traitCode}
            questionText={currentQuestion.questionText}
          />
        )}

        {/* DB에서 조회한 현재 문항의 선택지 목록 */}
        <div className="mt-8 space-y-3">
          {options.map((option) => (
            <QuestionOption
              key={option.optionId}
              label={option.optionCode}
              text={option.optionText}
              selected={selectedOption === option.optionId}
              onClick={() => {
                // 현재 화면에서 클릭한 선택지를 표시한다.
                setSelectedOption(option.optionId);

                // 문항별 선택지 ID를 저장한다.
                // 이전 문항으로 돌아왔을 때 선택 표시를 복원하는 데 사용한다.
                setAnswers((previousAnswers) => ({
                  ...previousAnswers,
                  [currentQuestion.questionId]: option.optionId,
                }));

                // 문항별 A/B 코드를 저장한다.
                // 마지막 문항에서 DB로 전체 답변을 보낼 때 사용한다.
                setAnswerCodes((previousAnswerCodes) => ({
                  ...previousAnswerCodes,
                  [currentQuestion.questionId]: option.optionCode,
                }));
              }}
            />
          ))}
        </div>

        {/* 이전 버튼과 다음 버튼 */}
        <div className="mt-10 flex justify-between gap-4">
          {/* 이전 버튼 */}
          <button
            type="button"
            onClick={() => {
              // 첫 번째 문항이면 기본정보 화면으로 이동한다.
              if (currentQuestionIndex === 0) {
                router.push("/test/info");
                return;
              }

              // 첫 번째 문항이 아니면 이전 문항으로 이동한다.
              setCurrentQuestionIndex(currentQuestionIndex - 1);

              // 이전 문항으로 이동할 때 현재 선택 상태를 초기화한다.
              setSelectedOption(null);
            }}
            className="flex-1 cursor-pointer rounded-2xl border border-violet-300 bg-white py-4 text-base font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            이전
          </button>

          {/* 다음 버튼 */}
          <button
            type="button"

            // 선택하지 않았으면 다음 버튼 비활성화
            disabled={selectedOption === null}

            onClick={async () => {
              // 답변을 선택하지 않았으면 아무 작업도 하지 않는다.
              if (selectedOption === null) {
                return;
              }

              // 마지막 문항이 아니라면 다음 문항으로 이동한다.
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);

                // 다음 문항으로 이동할 때 이전 선택 상태를 초기화한다.
                setSelectedOption(null);

                return;
              }

              // ===============================
              // 마지막 문항이면 모든 답변을 저장한다.
              // ===============================
              try {
                // attemptId가 없으면 저장하지 않는다.
                if (!attemptId) {
                  alert("테스트 정보가 없습니다.");
                  return;
                }

                // 저장된 모든 문항의 A/B 답변을 하나씩 백엔드로 전송한다.
                for (const [questionId, selectedOptionCode] of Object.entries(answerCodes)) {
                  await saveTestAnswer({
                    attemptId,

                    // 객체의 key는 문자열이므로 숫자로 변환한다.
                    questionId: Number(questionId),

                    // 해당 문항에서 최종 선택한 A 또는 B
                    selectedOptionCode,
                  });
                }

                // 저장된 답변을 기준으로 최종 결과를 계산한다.
                const result = await calculateTestResult(attemptId);

                // 결과 화면에서 사용할 수 있도록 브라우저에 임시 저장한다.
                localStorage.setItem("testResult", JSON.stringify(result));

                // 결과 계산까지 완료되면 결과 화면으로 이동한다.
                router.push("/test/result");

              } catch (error) {
                console.error(error);
                alert("답변 저장에 실패했습니다.");
              }
            }}
            className="flex-1 cursor-pointer rounded-2xl bg-violet-600 py-4 text-base font-semibold text-white transition hover:bg-violet-700"
          >
            다음
          </button>
        </div>

        {/* 현재 조회된 문항 개수 확인용 */}
        <p className="mt-6 text-center text-xs text-gray-400">
          조회된 문항 수: {questions.length}
        </p>

        {/* 안내 문구 */}
        <p className="mt-3 text-center text-sm text-gray-500">
          * 5~8개의 문항으로 구성 (선택형)
        </p>
      </section>
    </main>
  );
}