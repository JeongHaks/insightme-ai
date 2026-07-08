"use client";

import { useEffect, useState } from "react";

export default function TestChat() {
    // ==================== 상담 시간(테스트용 1분 = 60초 나중에 60*60) ====================
    const [remainingTime, setRemainingTime] = useState(10);
    // ==================== 상담 종료 팝업 상태 ====================
    const [isTimeOver, setIsTimeOver] = useState(false);
    // ==================== 상담 종료 팝업 닫기 ====================
    const handleClosePopup = () => { setIsTimeOver(false); };

    // ==================== 상담 시간 카운트 ====================
    useEffect(() => {
    // 시간이 0이면 종료
    if (remainingTime <= 0) return;

    // 1초마다 1씩 감소
    const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
    }, 1000);

    // 메모리 누수 방지
    return () => clearInterval(timer);
    }, [remainingTime]);

    // ==================== 상담 시간 종료 체크 ====================
    useEffect(() => {
    if (remainingTime === 0) {
        setIsTimeOver(true);
    }
    }, [remainingTime]);

  return (
    // ==================== AI 상담 화면 전체 ====================
    <main className="min-h-screen bg-white px-4 py-5">
      {/* 모바일 화면 컨테이너 */}
      <section className="mx-auto max-w-sm rounded-3xl border border-gray-200 bg-white shadow-sm">

        {/* ==================== 상단 헤더 ==================== */}
        <header className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          {/* 뒤로가기 버튼 */}
          <button className="text-xl text-gray-700">
            ←
          </button>

          {/* 제목 */}
          <h1 className="text-base font-bold text-gray-900">
            AI 상담
          </h1>

          {/* 더보기 버튼 */}
          <button className="text-xl text-gray-700">
            ⋮
          </button>
        </header>

        {/* ==================== 상담 시간 영역 ==================== */}
        <section className="px-4 py-4">

          {/* 오늘 사용 시간 */}
          <div className="flex items-center justify-between">
            <div>
                 <p className="text-xs text-gray-500">
                 오늘 사용 시간
                </p>

                {/* ==================== 남은 시간 표시 ==================== */}
                <p className="text-lg text-gray-500 font-bold">
                {/* 분 */}
                {String(Math.floor(remainingTime / 60)).padStart(2, "0")}
                :
                {/* 초 */}
                {String(remainingTime % 60).padStart(2, "0")}
                <span className="text-lg text-gray-800">
                    {" "} / 01:00
                </span>
                </p>
            </div>

            {/* 상담 종료 버튼(UI만) */}
            <button className="rounded-xl border border-violet-300 px-4 py-2 text-sm font-semibold text-violet-600">
              상담 종료
            </button>
          </div>

            {/* 진행률 */}
            <div
            className="h-2 rounded-full bg-violet-500 transition-all duration-1000"
            style={{
                width: `${(remainingTime / 60) * 100}%`,
            }}
            />

        </section>

        {/* ==================== 채팅 영역 ==================== */}
        <section className="space-y-5 px-4 py-4">

          {/* AI 말풍선 */}
          <div className="flex items-start gap-2">

            {/* AI 프로필 */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-200">
              🙂
            </div>

            {/* AI 메시지 */}
            <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3">
              <p className="text-sm leading-6 text-gray-800">
                안녕하세요!
                어떤 고민이 있으신가요?
                <br />
                편하게 말씀해주세요 😊
              </p>

              <p className="mt-2 text-right text-xs text-gray-400">
                10:30
              </p>
            </div>

          </div>

          {/* 사용자 말풍선 */}
          <div className="flex justify-end">

            <div className="max-w-[80%] rounded-2xl bg-violet-600 px-4 py-3 text-white">
              <p className="text-sm leading-6">
                제가 원하는 직무를 찾지 못해서
                방향에 대해 고민입니다.
              </p>

              <p className="mt-2 text-right text-xs text-violet-100">
                10:31
              </p>
            </div>

          </div>

          {/* AI 답변 */}
          <div className="flex items-start gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-200">
              🙂
            </div>

            <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3">
              <p className="text-sm leading-6 text-gray-800">
                좋아요.
                지금까지의 경험과 성향을
                바탕으로 함께 정리해볼게요.
                <br />
                먼저 어떤 점이 가장 고민되시나요?
              </p>

              <p className="mt-2 text-right text-xs text-gray-400">
                10:31
              </p>
            </div>

          </div>

        </section>

        {/* ==================== 입력창 ==================== */}
        <section className="border-t border-gray-100 p-4">

          <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-3">

            {/* 입력창(UI만) */}
            <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 text-sm placeholder:text-gray-500 outline-none"
            />

            {/* 전송 버튼(UI만) */}
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white">
              ↗
            </button>

          </div>

        </section>

      </section>

      {/* ==================== 하단 안내 ==================== */}
      <p className="mt-4 text-center text-xs text-gray-500">
        * 하루 1시간 무료 상담 제공
      </p>
        {/* ==================== 상담 종료 팝업 ==================== */}
        {isTimeOver && (
        <>
            {/* 배경 어둡게 */}
            <div className="fixed inset-0 z-40 bg-black/40"/>

            {/* 팝업 */}
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center px-5"
                onClick={handleClosePopup} 
                >
                {/* ==================== 상담 종료 팝업 ==================== */}
                <div 
                    className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    >

                {/* 닫기 버튼(UI만) */}
                <div className="flex justify-end">
                    <button
                         onClick={handleClosePopup}
                         className="text-xl text-gray-500 hover:text-gray-700">
                    ✕
                    </button>
                </div>

                {/* 시계 아이콘 */}
                <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-3xl">
                    🕒
                    </div>
                </div>

                {/* 제목 */}
                <h2 className="text-center text-1xl font-bold text-gray-900">
                    오늘 무료 상담 시간이 종료되었어요
                </h2>

                {/* 설명 */}
                <p className="mt-4 text-center text-sm leading-7 text-gray-500">
                    하루 1시간 무료 상담이 종료되었습니다.
                    <br />
                    내일 다시 이용하거나, 회원가입 후
                    <br />
                    상담 기록을 저장하고 계속 상담을 이어갈 수 있어요.
                </p>

                {/* 혜택 카드 */}
                <div className="mt-6 rounded-2xl bg-violet-50 p-5">

                    {/* 혜택 제목 */}
                    <p className="mb-4 text-sm font-bold text-violet-700">
                    🎁 하루 1시간 무료 상담 혜택
                    </p>

                    {/* 혜택 목록 */}
                    <ul className="space-y-2 text-sm text-gray-700">

                    <li>✔ 하루 1시간 무료 상담 제공</li>

                    <li>✔ AI 기반 맞춤 상담</li>

                    <li>✔ 상담 기록 및 요약 확인</li>

                    </ul>

                </div>

                {/* 회원가입 버튼 */}
                <button className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700">
                    회원가입하고 계속 상담하기
                </button>

                {/* 내일 다시 이용 버튼 */}
                <button className="mt-3 w-full rounded-xl border border-violet-300 py-3 font-semibold text-violet-600 transition hover:bg-violet-50">
                    내일 다시 이용하기
                </button>

                </div>

            </div>
        </>
        )}
    </main>
  );
}