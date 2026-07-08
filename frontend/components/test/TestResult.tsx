"use client";

import { useRouter } from "next/navigation";

export default function TestResult() {
    const router = useRouter();

  return (
    // 전체 결과 화면 배경
    <main className="min-h-screen bg-white px-4 py-5">
      {/* 모바일 앱 형태의 결과 화면 카드 */}
      <section className="mx-auto max-w-sm rounded-3xl border border-gray-200 bg-white shadow-sm">
        {/* 상단 헤더 영역 */}
        <header className="flex items-center justify-between px-4 py-4">
          <button             
            className="text-xl text-gray-700">←</button>

          <h1 className="text-base font-bold text-gray-900">
            AI 결과 분석
          </h1>

          <button className="text-xl text-gray-700">⋮</button>
        </header>

        {/* AI 안내 말풍선 영역 */}
        <section className="mx-4 flex items-center justify-between rounded-2xl bg-violet-50 px-4 py-3">
          <p className="text-sm font-semibold leading-6 text-gray-800">
            안녕하세요! 당신의 결과를 분석했어요.
            <br />
            지금부터 자세히 설명드릴게요 😊
          </p>

          {/* 임시 캐릭터 영역 */}
          <div className="ml-3 flex h-16 w-16 items-center justify-center rounded-full bg-violet-200 text-3xl">
            🐻
          </div>
        </section>

        {/* 결과 탭 메뉴 영역 */}
        <nav className="mt-5 flex border-b border-gray-200 px-4">
          <button className="flex-1 border-b-2 border-violet-500 pb-3 text-sm font-bold text-violet-600">
            요약
          </button>
          <button className="flex-1 pb-3 text-sm font-semibold text-gray-700">
            직업 분석
          </button>
          <button className="flex-1 pb-3 text-sm font-semibold text-gray-700">
            번아웃
          </button>
          <button className="flex-1 pb-3 text-sm font-semibold text-gray-700">
            조직문화
          </button>
        </nav>

        {/* 결과 본문 영역 */}
        <section className="px-4 py-4">
          {/* 성향 요약 카드 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              당신의 성향 요약
            </h2>

            <p className="mb-2 text-sm text-gray-800">
              <span className="font-bold">MBTI:</span> INFJ (옹호자)
            </p>

            <p className="mb-3 text-sm text-gray-800">
              <span className="font-bold">기질 유형:</span> 안정형 · 분석적 · 신중형
            </p>

            <p className="text-sm leading-6 text-gray-600">
              깊이 있는 통찰력과 공감능력을 가지고 있으며,
              신중한 분석과 계획으로 목표를 달성하는 성향입니다.
            </p>
          </div>

          {/* 2 x 2 결과 요약 카드 영역 */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* 직업 궁합률 카드 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-bold text-violet-600">
                직업 궁합률
              </p>

              <p className="mt-3 text-2xl font-bold text-gray-900">
                85%
              </p>

              {/* 진행률 바 */}
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div className="h-2 w-[85%] rounded-full bg-violet-500" />
              </div>
            </div>

            {/* 추천 직업 방향 카드 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-bold text-violet-600">
                추천 직업 방향
              </p>

              <p className="mt-3 text-sm font-bold leading-6 text-violet-600">
                전략·기획 / 상담·코칭
                <br />
                연구·분석 / 교육·퍼실리
              </p>
            </div>

            {/* 시너지가 좋은 역할 카드 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-bold text-gray-700">
                시너지가 좋은 역할
              </p>

              <p className="mt-3 text-sm font-bold leading-6 text-gray-900">
                기획자, 컨설턴트,
                <br />
                HRD 전문가
              </p>
            </div>

            {/* 잘 맞는 조직 문화 카드 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-bold text-gray-700">
                잘 맞는 조직 문화
              </p>

              <p className="mt-3 text-sm font-bold leading-6 text-gray-900">
                수평적 소통, 자율과
                <br />
                신뢰를 중시하는 문화
              </p>
            </div>
          </div>

          {/* 하단 AI 상담 유도 버튼 영역 */}
          <button
            type="button"
            onClick={() => router.push("/test/chat")}
            className="mt-4 flex w-full items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50"
            >
            {/* 버튼 안내 문구 */}
            <p className="text-sm font-semibold text-gray-400">
                더 궁금한 점을 물어보세요!
            </p>

            {/* 우측 화살표 아이콘 */}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white transition hover:bg-violet-600">
                ↗
            </span>
            </button>

          {/* 하단 안내 문구 */}
          <p className="mt-4 text-center text-xs font-semibold text-gray-400">
            채팅형으로 결과를 단계별 확인 가능
          </p>
        </section>
      </section>
    </main>
  );
}