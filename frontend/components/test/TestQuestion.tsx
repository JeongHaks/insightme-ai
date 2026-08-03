"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuestionHeader from "./QuestionHeader";
import QuestionCard from "./QuestionCard";
import QuestionOption from "./QuestionOption";

import { getTestQuestions, getTestOptions } from "@/lib/api";

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

  // 백엔드에서 조회한 전체 테스트 문항 목록
  const [questions, setQuestions] = useState<TestQuestionData[]>([]);

  // 현재 문항의 DB 선택지 목록
  const [options, setOptions] = useState<TestOptionData[]>([]);

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
  const currentQuestion = questions[0];

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

  
  return (
    // 화면 전체 배경 영역
    <main className="min-h-screen bg-[#F7F4FF] px-4 py-5">
      {/* 모바일 카드 영역 */}
      <section className="mx-auto min-h-[720px] max-w-sm rounded-[28px] bg-white px-6 py-8 shadow-xl">
        {/* 제목과 진행률 */}
        <QuestionHeader
          current={2}
          total={7}
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
            onClick={() => setSelectedOption(option.optionId)}
          />
        ))}
      </div>

        {/* 이전 버튼과 다음 버튼 */}
        <div className="mt-10 flex justify-between gap-4">
          {/* 이전 버튼 */}
          <button
            type="button"
            onClick={() => router.push("/test/info")}
            className="flex-1 cursor-pointer rounded-2xl border border-violet-300 bg-white py-4 text-base font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            이전
          </button>

          {/* 다음 버튼 */}
          <button
            type="button"
            onClick={() => router.push("/test/result")}
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