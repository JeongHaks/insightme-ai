"use client";

import { useRouter } from "next/navigation";

// QuestionHeader 컴포넌트 Props
type QuestionHeaderProps = {
  // 현재 문항 번호
  current: number;

  // 전체 문항 수
  total: number;

  // 현재까지 저장된 답변 개수
  answeredCount: number;
};

// TCI 문항 상단(Header) 컴포넌트
export default function QuestionHeader({
  current,
  total,
  answeredCount,
}: QuestionHeaderProps) {
  // 페이지 이동을 위한 라우터
  const router = useRouter();

  // 현재 문항 진행률 계산
  const progress = (current / total) * 100;

  return (
    <div>
      {/* 상단 로고, 뒤로가기, 단계 표시 */}
      <header className="flex items-center justify-between">
        {/* 이전 화면으로 이동 */}
        <button
          type="button"
          onClick={() => router.push("/test/info")}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-white/40 text-xl font-bold text-[#6D55DC] backdrop-blur-xl transition hover:bg-white/60"
          aria-label="기본정보 화면으로 이동"
        >
          ←
        </button>

        {/* 서비스 로고 */}
        <p className="text-xl font-black text-[#5F46D1]">
          InsightMe
        </p>

        {/* 전체 테스트 단계 */}
        <span className="rounded-full bg-white/45 px-3 py-1 text-xs font-black text-[#8B83AA] backdrop-blur-xl">
          2 / 3
        </span>
      </header>

      {/* 문항 진행률 */}
      <div className="mt-7">
        {/* 진행 바 배경 */}
        <div className="h-2 rounded-full bg-white/45">
          {/* 현재 진행률 */}
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#5B42F3] to-[#B388FF] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 답변 개수와 현재 문항 표시 */}
        <div className="mt-2 flex justify-between text-xs font-black text-[#8B83AA]">
          <span>답변 {answeredCount}개 저장됨</span>
          <span>
            {current} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}