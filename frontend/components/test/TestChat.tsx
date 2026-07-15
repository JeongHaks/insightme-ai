"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 채팅 메시지 타입
type ChatMessage = {
  role: "ai" | "user";
  text: string;
};

// 추천 질문 목록
const quickQuestions = [
  "나와 시너지가 좋은 직무는?",
  "내가 번아웃이 오는 이유는?",
  "내가 피해야 할 조직문화는?",
];

export default function TestChat() {
  const router = useRouter();

  // ==================== 상담 시간 ====================
  // 테스트용 10초
  // 실제 1시간으로 변경할 때는 60 * 60 사용
  const totalTime = 10;
  const [remainingTime, setRemainingTime] = useState(totalTime);

  // ==================== 상담 종료 팝업 상태 ====================
  const [isTimeOver, setIsTimeOver] = useState(false);

  // ==================== 채팅 입력값 ====================
  const [inputValue, setInputValue] = useState("");

  // ==================== 채팅 메시지 목록 ====================
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "안녕하세요! 결과 리포트를 바탕으로 상담을 시작할게요. 어떤 점이 가장 궁금하신가요?",
    },
  ]);

  // ==================== 상담 종료 팝업 닫기 ====================
  const handleClosePopup = () => {
    setIsTimeOver(false);
  };

  // ==================== 메시지 전송 ====================
  const handleSubmit = (
    event?: FormEvent<HTMLFormElement>,
    presetQuestion?: string
  ) => {
    event?.preventDefault();

    // 추천 질문을 눌렀으면 추천 질문을 사용하고,
    // 직접 입력했으면 입력창의 값을 사용
    const messageText = presetQuestion ?? inputValue.trim();

    // 빈 메시지이거나 상담 시간이 끝났으면 전송하지 않음
    if (!messageText || remainingTime <= 0) {
      return;
    }

    // 사용자 메시지를 목록에 추가
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: messageText,
      },
    ]);

    // 입력창 초기화
    setInputValue("");

    // 임시 AI 응답
    // 나중에 Spring Boot API 응답으로 교체
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "좋아요. 검사 결과와 현재 고민을 함께 살펴보면서 구체적으로 정리해볼게요.",
        },
      ]);
    }, 500);
  };

  // ==================== 상담 시간 카운트 ====================
  useEffect(() => {
    // 시간이 0이면 타이머를 실행하지 않음
    if (remainingTime <= 0) {
      return;
    }

    // 1초마다 남은 시간을 1초씩 감소
    const timer = window.setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    // 컴포넌트가 다시 렌더링되거나 종료될 때 타이머 정리
    return () => window.clearInterval(timer);
  }, [remainingTime]);

  // ==================== 상담 시간 종료 체크 ====================
  useEffect(() => {
    if (remainingTime === 0) {
      setIsTimeOver(true);
    }
  }, [remainingTime]);

  return (
    // ==================== 전체 AI 상담 화면 ====================
    <main className="min-h-screen bg-gradient-to-b from-[#f4efff] via-[#faf8ff] to-white px-4 py-4">
      {/* 모바일 앱 형태의 채팅 컨테이너 */}
      <section className="mx-auto flex h-[calc(100svh-2rem)] min-h-[560px] w-full max-w-sm flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 shadow-[0_24px_70px_rgba(116,91,191,0.18)] backdrop-blur-2xl">
        {/* ==================== 상단 헤더 ==================== */}
        <header className="bg-[#6d55dc] px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            {/* 결과 화면으로 돌아가기 */}
            <button
              type="button"
              onClick={() => router.push("/test/result")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl transition hover:bg-white/25"
              aria-label="결과 화면으로 돌아가기"
            >
              ←
            </button>

            {/* 화면 제목 */}
            <div className="text-center">
              <h1 className="font-black">AI 상담</h1>

              <p className="text-xs font-semibold text-white/75">
                오늘 무료 1시간
              </p>
            </div>

            {/* 채팅 아이콘 */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              💬
            </div>
          </div>
        </header>

        {/* ==================== 결과 정보 및 사용 시간 ==================== */}
        <section className="border-b border-white/50 bg-white/25 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              {/* 나중에 API 결과 데이터로 변경 */}
              <p className="text-sm font-black text-[#241f3a]">
                탐색형 기질 · ENFP · IT 직군
              </p>

              <p className="mt-1 text-xs font-semibold text-[#8b83aa]">
                결과 리포트를 바탕으로 상담이 시작됩니다.
              </p>
            </div>

            {/* 남은 상담 시간 */}
            <p className="text-sm font-black text-[#6d55dc]">
              {String(Math.floor(remainingTime / 60)).padStart(2, "0")}
              :
              {String(remainingTime % 60).padStart(2, "0")}
            </p>
          </div>

          {/* 시간 진행률 */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5dfff]">
            <div
              className="h-full rounded-full bg-[#6d55dc] transition-all duration-1000"
              style={{
                width: `${(remainingTime / totalTime) * 100}%`,
              }}
            />
          </div>
        </section>

        {/* ==================== 채팅 메시지 영역 ==================== */}
        <section className="flex-1 space-y-3 overflow-y-auto bg-white/20 p-4 backdrop-blur-xl">
          {messages.map((message, index) => (
            <div
              key={`${message.text}-${index}`}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* AI 메시지에는 캐릭터 표시 */}
              {message.role === "ai" && (
                <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8e1ff]">
                  🙂
                </div>
              )}

              {/* 메시지 말풍선 */}
              <div
                className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "rounded-br-md bg-[#6d55dc] text-white"
                    : "rounded-bl-md border border-white/65 bg-white/55 text-[#4c426f] backdrop-blur-xl"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </section>

        {/* ==================== 추천 질문 및 입력창 ==================== */}
        <section className="border-t border-white/60 bg-white/35 p-4 backdrop-blur-2xl">
          {/* 추천 질문 */}
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleSubmit(undefined, question)}
                disabled={remainingTime <= 0}
                className="shrink-0 rounded-full border border-[#d8ceff] bg-[#f4f1ff] px-3 py-2 text-xs font-black text-[#6d55dc] transition hover:bg-[#ebe5ff] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          {/* 메시지 입력 폼 */}
          <form
            className="flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={remainingTime <= 0}
              placeholder={
                remainingTime <= 0
                  ? "무료 상담 시간이 종료되었습니다."
                  : "메시지를 입력해주세요..."
              }
              className="h-12 flex-1 rounded-2xl border border-white/70 bg-white/55 px-4 text-sm font-semibold text-[#241f3a] outline-none backdrop-blur-xl transition placeholder:text-[#aaa4c2] focus:border-[#6d55dc] disabled:cursor-not-allowed disabled:bg-gray-100"
            />

            {/* 메시지 전송 버튼 */}
            <button
              type="submit"
              disabled={!inputValue.trim() || remainingTime <= 0}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6d55dc] text-xl text-white transition hover:bg-[#5f48c9] disabled:cursor-not-allowed disabled:bg-[#c7bdf0]"
              aria-label="메시지 전송"
            >
              ↗
            </button>
          </form>
        </section>
      </section>

      {/* ==================== 상담 종료 팝업 ==================== */}
      {isTimeOver && (
        <>
          {/* 팝업 배경 */}
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

          {/* 팝업 중앙 배치 영역 */}
          <div
            className="fixed inset-0 z-50 grid place-items-center px-5"
            onClick={handleClosePopup}
          >
            {/* 팝업 본체 */}
            <div
              className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="text-xl text-gray-500 transition hover:text-gray-700"
                  aria-label="팝업 닫기"
                >
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
              <h2 className="text-center text-lg font-bold text-gray-900">
                오늘 무료 상담 시간이 종료되었어요
              </h2>

              {/* 안내 문구 */}
              <p className="mt-4 text-center text-sm leading-7 text-gray-500">
                하루 1시간 무료 상담이 종료되었습니다.
                <br />
                내일 다시 이용하거나 회원가입 후
                <br />
                상담 기록을 저장하고 계속 상담할 수 있어요.
              </p>

              {/* 회원가입 혜택 */}
              <div className="mt-6 rounded-2xl bg-violet-50 p-5">
                <p className="mb-4 text-sm font-bold text-violet-700">
                  🎁 회원가입 혜택
                </p>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✔ AI 기반 맞춤 상담</li>
                  <li>✔ 상담 기록 저장</li>
                  <li>✔ 상담 요약 확인</li>
                </ul>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-[#6d55dc] py-3 font-semibold text-white transition hover:bg-[#5f48c9]"
              >
                회원가입하고 계속 상담하기
              </button>

              {/* 팝업 닫기 버튼 */}
              <button
                type="button"
                onClick={handleClosePopup}
                className="mt-3 w-full rounded-xl border border-violet-300 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
              >
                내일 다시 이용하기
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}