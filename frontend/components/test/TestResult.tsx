"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 결과 화면에서 사용할 탭 이름 타입
type ResultTab = "요약" | "직업분석" | "번아웃" | "조직문화";

// 상단 탭 목록
const resultTabs: ResultTab[] = [
  "요약",
  "직업분석",
  "번아웃",
  "조직문화",
];

// AI 결과 분석 화면
export default function TestResult() {
  // 페이지 이동을 위한 Next.js 라우터
  const router = useRouter();

  // 현재 선택된 결과 탭
  const [activeTab, setActiveTab] = useState<ResultTab>("요약");

  return (
    // 전체 결과 화면 배경
    <main className="min-h-screen bg-gradient-to-b from-[#F8F6FF] via-[#F2EEFF] to-[#ECE7FF] px-4 py-4">
      {/* 모바일 앱 형태의 결과 화면 */}
      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[390px] flex-col overflow-hidden rounded-[30px] border border-white/75 bg-white/50 shadow-[0_24px_70px_rgba(116,91,191,0.16)] backdrop-blur-2xl">
        {/* 배경 장식 */}
        <div className="pointer-events-none absolute -right-16 top-16 h-40 w-40 rounded-full bg-[#E5DCFF]/75 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-28 h-40 w-40 rounded-full bg-[#F8E9FF]/75 blur-3xl" />

        {/* 상단 헤더 */}
        <header className="relative z-10 flex items-center justify-between px-5 py-5">
          {/* 이전 화면 이동 */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-white/40 text-xl font-bold text-[#4C426F] backdrop-blur-xl transition hover:bg-white/65"
            aria-label="이전 화면으로 이동"
          >
            ←
          </button>

          {/* 화면 제목 */}
          <h1 className="text-base font-black text-[#2B2541]">
            AI 결과 분석
          </h1>

          {/* 메뉴 버튼 */}
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-white/40 text-xl font-bold text-[#4C426F] backdrop-blur-xl transition hover:bg-white/65"
            aria-label="결과 메뉴 열기"
          >
            ⋮
          </button>
        </header>

        {/* AI 안내 카드 */}
        <section className="relative z-10 mx-4 flex min-h-[78px] items-center justify-between overflow-hidden rounded-[22px] border border-white/70 bg-white/35 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl">
          {/* 안내 문구 */}
          <p className="relative z-10 text-[12px] font-black leading-5 text-[#4C426F]">
            안녕하세요! 당신의 결과를 분석했어요.
            <br />
            지금부터 자세히 설명드릴게요 😊
          </p>

          {/* 캐릭터 */}
          <Image
            src="/image/main.png"
            alt="결과 안내 캐릭터"
            width={72}
            height={72}
            priority
            className="h-auto w-[68px] shrink-0 object-contain"
          />

          {/* 카드 내부 장식 */}
          <span className="pointer-events-none absolute right-20 top-4 h-2 w-2 rotate-45 rounded-sm bg-[#C8BBFF]/70" />
          <span className="pointer-events-none absolute bottom-4 right-3 h-2 w-2 rotate-45 rounded-sm bg-[#B6A6FF]/60" />
        </section>

        {/* 결과 탭 메뉴 */}
        <nav className="relative z-10 mx-4 mt-4 grid grid-cols-4 bg-white/25 backdrop-blur-xl">
          {resultTabs.map((tab) => {
            // 현재 선택된 탭인지 확인
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-1 py-3 text-[12px] font-black transition ${
                  isActive
                    ? "border-[#6D55DC] text-[#6D55DC]"
                    : "border-transparent text-[#4C426F] hover:text-[#6D55DC]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* 탭별 결과 본문 */}
        <section className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
          {/* 요약 탭 */}
          {activeTab === "요약" && (
            <div className="space-y-3">
              {/* 성향 요약 카드 */}
              <article className="rounded-[22px] border border-white/75 bg-white/40 p-5 shadow-[0_10px_30px_rgba(116,91,191,0.08)] backdrop-blur-2xl">
                <h2 className="text-base font-black text-[#2B2541]">
                  당신의 성향 요약
                </h2>

                <p className="mt-4 text-sm font-bold text-[#4C426F]">
                  <span className="font-black text-[#6D55DC]">MBTI:</span>{" "}
                  INFJ (옹호자)
                </p>

                <p className="mt-2 text-sm font-bold text-[#4C426F]">
                  <span className="font-black text-[#6D55DC]">
                    기질 유형:
                  </span>{" "}
                  안정형 · 분석적 · 신중형
                </p>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  깊이 있는 통찰력과 공감 능력을 가지고 있으며, 신중한
                  분석과 계획으로 목표를 달성하는 성향입니다.
                </p>
              </article>

              {/* 결과 요약 카드 영역 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 직업 궁합률 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    직업 궁합률
                  </p>

                  <p className="mt-3 text-2xl font-black text-[#2B2541]">
                    85%
                  </p>

                  <div className="mt-3 h-2 rounded-full bg-[#EAE5F5]">
                    <div className="h-2 w-[85%] rounded-full bg-gradient-to-r from-[#5B42F3] to-[#B388FF]" />
                  </div>
                </article>

                {/* 추천 직업 방향 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    추천 직업 방향
                  </p>

                  <p className="mt-3 text-sm font-black leading-6 text-[#4C426F]">
                    전략·기획
                    <br />
                    상담·코칭
                    <br />
                    연구·분석
                  </p>
                </article>

                {/* 시너지 역할 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    시너지가 좋은 역할
                  </p>

                  <p className="mt-3 text-sm font-black leading-6 text-[#4C426F]">
                    기획자
                    <br />
                    컨설턴트
                    <br />
                    HRD 전문가
                  </p>
                </article>

                {/* 조직문화 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    잘 맞는 조직문화
                  </p>

                  <p className="mt-3 text-sm font-black leading-6 text-[#4C426F]">
                    수평적 소통
                    <br />
                    자율과 신뢰
                    <br />
                    협업 중심
                  </p>
                </article>
              </div>
            </div>
          )}

          {/* 직업분석 탭 */}
          {activeTab === "직업분석" && (
            <div className="space-y-3">
              {/* 대표 결과 카드 */}
              <article className="rounded-[22px] border border-white/75 bg-white/40 p-5 shadow-[0_10px_30px_rgba(116,91,191,0.08)] backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  ESTP × 파수꾼
                </p>

                <h2 className="mt-2 text-lg font-black leading-7 text-[#2B2541]">
                  일할 때 강점이 선명해지는 방식
                </h2>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  구체적인 사실과 현실적인 개선점을 빠르게 찾아내는
                  능력이 강합니다. 즉각적인 피드백과 실행이 가능한
                  환경에서 성과가 자연스럽게 올라갑니다.
                </p>
              </article>

              {/* 핵심 업무 강점 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  핵심 업무 강점
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  안정 · 품질 · 예측을 바탕으로 논리적인 기준과 데이터가
                  분명한 의사결정에 강점이 있습니다.
                </p>
              </article>

              {/* 추천 직업 방향 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  추천 직업 방향
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  운영·품질·데이터 검수 분야와 잘 맞으며, 현재 선택한
                  운영·관리 안에서는 기획·개선·전문성 역할을 우선
                  탐색해보세요.
                </p>
              </article>
            </div>
          )}

          {/* 번아웃 탭 */}
          {activeTab === "번아웃" && (
            <div className="space-y-3">
              {/* 번아웃 원인 */}
              <article className="rounded-[22px] border border-white/75 bg-white/40 p-5 shadow-[0_10px_30px_rgba(116,91,191,0.08)] backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  번아웃이 오는 이유
                </p>

                <h2 className="mt-2 text-lg font-black text-[#2B2541]">
                  책임을 혼자 감당할 때 지치기 쉬워요
                </h2>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  맡은 일을 끝까지 책임지려는 성향 때문에 도움을 요청하지
                  못하고 혼자 해결하려 할 수 있습니다. 기준이 모호하거나
                  감정 소모가 큰 환경에서는 피로가 빠르게 누적됩니다.
                </p>
              </article>

              {/* 번아웃 신호 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  주의해야 할 신호
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  작은 실수에도 자책이 커지고, 사람과의 대화가 줄어들며,
                  일을 시작하기 전부터 피로감을 느낄 수 있습니다.
                </p>
              </article>

              {/* 회복 방법 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  회복 방법
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  업무 범위를 명확히 나누고, 완벽한 해결보다 우선순위를
                  정해 처리하세요. 혼자 고민하는 시간을 줄이고 중간
                  피드백을 요청하는 것이 도움이 됩니다.
                </p>
              </article>
            </div>
          )}

          {/* 조직문화 탭 */}
          {activeTab === "조직문화" && (
            <div className="space-y-3">
              {/* 잘 맞는 조직문화 */}
              <article className="rounded-[22px] border border-white/75 bg-white/40 p-5 shadow-[0_10px_30px_rgba(116,91,191,0.08)] backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  잘 맞는 조직문화
                </p>

                <h2 className="mt-2 text-lg font-black leading-7 text-[#2B2541]">
                  자율성과 신뢰가 함께 있는 환경
                </h2>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  목표와 기준은 분명하지만 세부적인 실행 방식은 개인에게
                  맡기는 문화와 잘 맞습니다. 의견을 존중하고 충분한
                  피드백을 주고받을 수 있는 조직에서 강점이 잘 드러납니다.
                </p>
              </article>

              {/* 선호하는 소통 방식 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  선호하는 소통 방식
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  감정적인 압박보다 근거와 목적이 분명한 대화를 선호하고,
                  일방적인 지시보다 의견을 교환하는 방식에서 안정감을
                  느낍니다.
                </p>
              </article>

              {/* 피해야 할 조직문화 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  피해야 할 조직문화
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  역할과 책임이 계속 바뀌거나, 기준 없이 감정적으로
                  평가하는 환경에서는 스트레스가 커질 수 있습니다.
                </p>
              </article>
            </div>
          )}
        </section>

        {/* 하단 AI 상담 이동 영역 */}
        <footer className="relative z-10 border-t border-white/60 bg-white/35 px-4 py-3 backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => router.push("/test/chat")}
            className="flex w-full cursor-pointer items-center justify-between rounded-[16px] border border-white/75 bg-white/60 px-4 py-3 shadow-[0_8px_22px_rgba(116,91,191,0.08)] transition hover:border-[#CFC6FF] hover:bg-white/80"
          >
            {/* AI 상담 안내 */}
            <span className="text-sm font-black text-[#A49DB5]">
              더 궁금한 점을 물어보세요!
            </span>

            {/* 오른쪽 이동 아이콘 */}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#5B42F3] to-[#7657F4] text-lg font-black text-white shadow-[0_8px_18px_rgba(91,66,243,0.26)]">
              →
            </span>
          </button>

          {/* 하단 설명 */}
          <p className="mt-3 text-center text-xs font-bold text-[#9A93AA]">
            채팅형으로 결과를 단계별 확인 가능
          </p>
        </footer>
      </section>
    </main>
  );
}