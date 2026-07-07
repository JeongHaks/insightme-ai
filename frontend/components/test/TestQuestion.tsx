"use client";

// TCI 문항 화면 상단 컴포넌트 import
import QuestionHeader from "./QuestionHeader";
import QuestionCard from "./QuestionCard";
import QuestionOption from "./QuestionOption";

import { useRouter } from "next/navigation";

// TCI 문항 화면 컴포넌트
export default function TestQuestion() {
    const router = useRouter();

    // 임시 선택지 데이터
    const options = [
    "혼자만의 시간을 가지며 생각을 정리한다.",
    "가까운 사람에게 이야기하며 해결한다.",
    "운동이나 취미로 기분 전환을 한다.",
    "원인을 분석하고 해결책을 찾는다.",
    ];

  return (
    // 화면 전체 배경 영역
    <main className="min-h-screen bg-[#F7F4FF] px-4 py-5">
      {/* 모바일 카드 영역 */}
      <section className="mx-auto min-h-[720px] max-w-sm rounded-[28px] bg-white px-6 py-8 shadow-xl">
        {/* 제목 + 진행률 */}
        <QuestionHeader current={2} total={7} />

        {/* 임시 문항 영역 */}
        <div className="mt-10">
          <QuestionCard
            questionNumber={1}
            questionText="스트레스를 받을 때 나는 주로 어떻게 하나요?"
            />
        </div>
        
        {/* 선택지 목록 */}
        <div className="mt-8 space-y-3">
            {options.map((option, index) => (
                <QuestionOption
                key={option}
                text={option}
                selected={index === 0}
                />
            ))}
        </div>

        {/* 이전 / 다음 버튼 */}
        <div className="mt-10 flex justify-between gap-4">

        {/* 이전 버튼 */}
        <button
            type="button"
            onClick={()=> router.push("/test/info")}
            className="flex-1 cursor-pointer rounded-2xl border border-violet-300 bg-white py-4 text-base font-semibold text-violet-600 transition hover:bg-violet-50"
        >
            이전
        </button>

        {/* 다음 버튼 */}
        <button
            type="button"
            className="flex-1 cursor-pointer rounded-2xl bg-violet-600 py-4 text-base font-semibold text-white transition hover:bg-violet-700"
        >
            다음
        </button>

        </div>

        {/* 안내 문구 */}
        <p className="mt-12 text-center text-sm text-gray-500">
        * 5~8개의 문항으로 구성 (선택형)
        </p>
      </section>
    </main>
  );
}