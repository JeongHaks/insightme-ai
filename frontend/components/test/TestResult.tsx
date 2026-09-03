"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  // 현재 로그인한 회원인지 저장하는 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 현재 선택된 결과 탭
  const [activeTab, setActiveTab] = useState<ResultTab>("요약");

  // 백엔드에서 계산한 테스트 결과를 저장한다.
  const [result, setResult] = useState<any>(null);

  // 사용자가 기본정보에서 선택한 MBTI
  const [mbti, setMbti] = useState("");

  /**
   * 결과 화면이 열리면 localStorage에 저장된 결과를 읽어온다.
   */
    useEffect(() => {
    // 마지막 문항에서 저장한 결과 JSON 문자열을 가져온다.
    const savedResult = localStorage.getItem("testResult");

    // 저장된 결과가 있으면 객체로 변환해 state에 저장한다.
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }

    // 기본정보 화면에서 저장한 MBTI를 가져온다.
    const savedMbti = localStorage.getItem("mbti");

    // 저장된 MBTI가 있으면 state에 저장한다.
    if (savedMbti) {
      setMbti(savedMbti);
    }
  }, []);

  // 화면이 처음 열릴 때 회원 로그인 여부를 확인한다.
  useEffect(() => {
    // 로그인 성공 시 localStorage에 저장한 userId를 가져온다.
    const savedUserId = localStorage.getItem("userId");

    // userId가 있으면 회원, 없으면 비회원
    setIsLoggedIn(!!savedUserId);
  }, []);
    
  // 결과 데이터가 아직 없으면 로딩 화면을 보여준다.
  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F4FF]">
        <p className="text-sm font-black text-[#6D55DC]">
          결과를 불러오는 중입니다...
        </p>
      </main>
    );
  }

  // NS, HA, RD, SD 점수의 총합
  const totalScore =
    result.nsScore +
    result.haScore +
    result.rdScore +
    result.sdScore;

  // 전체 10문항 중 점수 답변과 일치한 비율
  const temperamentRate = Math.round((totalScore / 10) * 100);

  // 기질 유형에 따라 시너지가 좋은 역할 문구를 정한다.
  const synergyRoles =
    result.resultType === "신중형 · 안정지향형"
      ? "운영 담당자 · 품질 관리자 · 데이터 분석가"
      : result.resultType === "도전형 · 변화추구형"
        ? "기획자 · 마케터 · 신규사업 담당자"
        : result.resultType === "공감형 · 관계중심형"
          ? "상담가 · 교육 담당자 · HR 담당자"
          : "프로젝트 매니저 · 전문직 · 리더";

  // 기질 유형에 따라 추천 직업 방향을 정한다.
  const recommendedCareer =
    result.resultType === "신중형 · 안정지향형"
      ? "운영 · 품질 · 분석"
      : result.resultType === "도전형 · 변화추구형"
        ? "기획 · 마케팅 · 신규사업"
        : result.resultType === "공감형 · 관계중심형"
          ? "상담 · 교육 · 인사"
          : "프로젝트 관리 · 전문직 · 리더십";

  // 기질 유형에 따라 잘 맞는 조직문화 키워드를 정한다.
  const recommendedCulture =
    result.resultType === "신중형 · 안정지향형"
      ? "명확한 기준 · 안정성 · 예측 가능"
      : result.resultType === "도전형 · 변화추구형"
        ? "빠른 실행 · 새로운 시도 · 유연성"
        : result.resultType === "공감형 · 관계중심형"
          ? "수평적 소통 · 존중 · 협업"
          : "자율성 · 신뢰 · 책임 중심";

  // 기질 유형에 따라 주의해야 할 번아웃 신호를 정한다.
  const burnoutWarning =
    result.resultType === "신중형 · 안정지향형"
      ? "작은 실수에도 자책이 커지고, 결정을 미루거나 업무 확인을 반복할 수 있습니다."
      : result.resultType === "도전형 · 변화추구형"
        ? "반복 업무에 집중력이 떨어지고, 새로운 자극을 찾느라 여러 일을 동시에 벌일 수 있습니다."
        : result.resultType === "공감형 · 관계중심형"
          ? "주변 반응에 예민해지고, 부탁을 거절하지 못해 감정적인 피로가 커질 수 있습니다."
          : "혼자 책임지려는 경향이 강해지고, 도움을 요청하지 않은 채 업무 부담을 쌓을 수 있습니다.";

  // 기질 유형에 따라 도움이 되는 회복 방법을 정한다.
  const burnoutRecovery =
    result.resultType === "신중형 · 안정지향형"
      ? "완벽하게 처리하려는 부담을 줄이고, 우선순위를 정해 작은 단위로 일을 마무리하세요."
      : result.resultType === "도전형 · 변화추구형"
        ? "짧은 목표와 새로운 과제를 적절히 섞고, 진행 중인 일을 먼저 정리하는 습관이 필요합니다."
        : result.resultType === "공감형 · 관계중심형"
          ? "다른 사람의 감정과 내 책임을 구분하고, 부탁을 거절하거나 도움을 요청하는 연습이 필요합니다."
          : "혼자 해결하려 하지 말고 중간 피드백을 받고, 업무를 다른 사람과 나누는 것이 도움이 됩니다.";

  // 기질 유형에 따라 선호하는 소통 방식을 정한다.
  const preferredCommunication =
    result.resultType === "신중형 · 안정지향형"
      ? "업무 목적과 기준이 명확하고, 충분한 검토 시간을 주는 소통 방식을 선호합니다."
      : result.resultType === "도전형 · 변화추구형"
        ? "핵심을 빠르게 공유하고, 아이디어를 자유롭게 제안할 수 있는 소통 방식을 선호합니다."
        : result.resultType === "공감형 · 관계중심형"
          ? "상대의 의견을 존중하고, 감정을 배려하며 피드백을 주고받는 방식을 선호합니다."
          : "과도한 간섭 없이 목표와 책임을 분명히 공유하는 소통 방식을 선호합니다.";

  // 기질 유형에 따라 피해야 할 조직문화를 정한다.
  const avoidCulture =
    result.resultType === "신중형 · 안정지향형"
      ? "기준이 자주 바뀌고 역할이 모호하며, 즉흥적인 지시가 반복되는 조직은 스트레스를 크게 줄 수 있습니다."
      : result.resultType === "도전형 · 변화추구형"
        ? "새로운 제안을 막고 절차만 강조하며, 변화 속도가 지나치게 느린 조직은 답답함을 줄 수 있습니다."
        : result.resultType === "공감형 · 관계중심형"
          ? "과도한 경쟁과 감정적인 비난이 반복되고, 구성원 간 신뢰가 낮은 조직은 피하는 것이 좋습니다."
          : "세세한 통제와 보고가 많고, 자율적인 판단이나 의사결정 권한이 거의 없는 조직은 맞지 않을 수 있습니다.";

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

        {/* 현재 회원 / 비회원 상태 표시 */}
        <div className="relative z-10 mx-5 mb-2 flex justify-end">
          <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black text-[#6D55DC]">
            {isLoggedIn ? "회원" : "비회원"}
          </span>
        </div>

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
                  {mbti || "미입력"}
                </p>

                <p className="mt-2 text-sm font-bold text-[#4C426F]">
                  <span className="font-black text-[#6D55DC]">
                    기질 유형:
                  </span>{" "}
                  {result.resultType}
                </p>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  {result.summaryText}
                </p>
              </article>
              
              {/* 기질별 실제 점수 */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="rounded-xl bg-white/55 px-2 py-3 text-center">
                  <p className="text-xs font-black text-[#6D55DC]">NS</p>
                  <p className="mt-1 text-lg font-black text-[#2B2541]">
                    {result.nsScore}
                  </p>
                </div>

                <div className="rounded-xl bg-white/55 px-2 py-3 text-center">
                  <p className="text-xs font-black text-[#6D55DC]">HA</p>
                  <p className="mt-1 text-lg font-black text-[#2B2541]">
                    {result.haScore}
                  </p>
                </div>

                <div className="rounded-xl bg-white/55 px-2 py-3 text-center">
                  <p className="text-xs font-black text-[#6D55DC]">RD</p>
                  <p className="mt-1 text-lg font-black text-[#2B2541]">
                    {result.rdScore}
                  </p>
                </div>

                <div className="rounded-xl bg-white/55 px-2 py-3 text-center">
                  <p className="text-xs font-black text-[#6D55DC]">SD</p>
                  <p className="mt-1 text-lg font-black text-[#2B2541]">
                    {result.sdScore}
                  </p>
                </div>
              </div>

              {/* 결과 요약 카드 영역 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 직업 궁합률 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    직업 궁합률
                  </p>

                   {/* 계산된 기질 점수 비율 */}
                  <p className="mt-3 text-2xl font-black text-[#2B2541]">
                    {temperamentRate}%
                  </p>

                  {/* 계산된 퍼센트만큼 진행 바 너비를 표시한다. */}
                  <div className="mt-3 h-2 rounded-full bg-[#EAE5F5]">
                    <div
                      style={{ width: `${temperamentRate}%` }}
                      className="h-2 rounded-full bg-gradient-to-r from-[#5B42F3] to-[#B388FF]"
                    />
                  </div>
                </article>

                {/* 추천 직업 방향 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    추천 직업 방향
                  </p>

                  <p className="mt-3 text-sm font-black leading-6 text-[#4C426F]">
                    {recommendedCareer}
                  </p>
                </article>

                {/* 시너지 역할 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    시너지가 좋은 역할
                  </p>

                  <p className="mt-3 text-sm font-black leading-6 text-[#4C426F]">
                    {synergyRoles}
                  </p>
                </article>

                {/* 조직문화 */}
                <article className="rounded-[20px] border border-white/75 bg-white/40 p-4 backdrop-blur-2xl">
                  <p className="text-xs font-black text-[#6D55DC]">
                    잘 맞는 조직문화
                  </p>

                  <p className="mt-3 text-sm font-black leading-6 text-[#4C426F]">
                    {recommendedCulture}
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
                  {mbti || "MBTI 미입력"} × {result.resultType}
                </p>

                <h2 className="mt-2 text-lg font-black leading-7 text-[#2B2541]">
                  {result.resultType}에게 잘 맞는 일하는 방식
                </h2>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  {result.careerAnalysis}
                </p>
              </article>

              {/* 핵심 업무 강점 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  핵심 업무 강점
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  {result.summaryText}
                </p>
              </article>

              {/* 추천 직업 방향 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  추천 직업 방향
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  {recommendedCareer}
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
                  {result.resultType}이(가) 번아웃을 겪기 쉬운 상황
                </h2>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  {result.burnoutAnalysis}
                </p>
              </article>

              {/* 번아웃 신호 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  {burnoutWarning}
                </p>

                <p className="mt-3 text-sm font-black leading-7 text-[#4C426F]">
                  작은 실수에도 자책이 커지고, 사람과의 대화가 줄어들며,
                  일을 시작하기 전부터 피로감을 느낄 수 있습니다.
                </p>
              </article>

              {/* 회복 방법 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  {burnoutRecovery}
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
                  {result.resultType}에게 잘 맞는 조직환경
                </h2>

                <p className="mt-4 text-sm font-bold leading-7 text-[#7F7895]">
                  {result.cultureAnalysis}
                </p>
              </article>

              {/* 선호하는 소통 방식 */}
              <article className="rounded-[20px] border border-white/75 bg-white/35 p-4 backdrop-blur-2xl">
                <p className="text-xs font-black text-[#6D55DC]">
                  {preferredCommunication}
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
                  {avoidCulture}
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