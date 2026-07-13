"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * 테스트 목록 데이터 타입
 *
 * 테스트 카드마다 사용하는 제목, 설명, 색상 등의 형태를 정의합니다.
 */
interface TestItem {
  tag: string;
  title: string;
  desc: string;
  emoji: string;
  imageBackground: string;
  tagBackground: string;
  tagColor: string;
}

/**
 * 테스트 목록 데이터
 *
 * 나중에는 Spring Boot API에서 받아온 데이터로 교체할 수 있습니다.
 * 현재는 프론트 화면 구현을 위해 임시 데이터를 사용합니다.
 */
const tests: TestItem[] = [
  {
    tag: "커리어",
    title: "커리어 방향 테스트",
    desc: "나에게 맞는 직업 방향과 성장 가능성이 높은 커리어를 찾아보세요.",
    emoji: "🧭",
    imageBackground: "bg-[#EDE6FF]",
    tagBackground: "bg-[#EEE8FF]",
    tagColor: "text-[#7961E8]",
  },
  {
    tag: "심리",
    title: "마음 회복 테스트",
    desc: "지금 내 마음 상태를 점검하고, 회복 방법을 제안받아보세요.",
    emoji: "🌱",
    imageBackground: "bg-[#DFF8F2]",
    tagBackground: "bg-[#E3F8F2]",
    tagColor: "text-[#53BCA5]",
  },
  {
    tag: "조직문화",
    title: "조직문화 성향 테스트",
    desc: "나와 잘 맞는 조직문화는 무엇인지 재미있게 알아보세요.",
    emoji: "☁️",
    imageBackground: "bg-[#FFF0E8]",
    tagBackground: "bg-[#FFF0E8]",
    tagColor: "text-[#E99466]",
  },
  {
    tag: "직장인",
    title: "직장인 흑화 지수 테스트",
    desc: "회사에서 쌓인 스트레스와 감정 상태를 가볍게 확인해보세요.",
    emoji: "💼",
    imageBackground: "bg-[#F6E3FF]",
    tagBackground: "bg-[#F8E5FA]",
    tagColor: "text-[#D66BC7]",
  },
];

/**
 * 테스트 목록 화면
 *
 * 사용자가 원하는 테스트를 선택하면
 * 기본 정보 입력 화면인 /test/info로 이동합니다.
 */
export default function TestList() {
  const router = useRouter();

  /**
   * 테스트 카드 클릭 함수
   *
   * 현재는 모든 테스트가 동일한 기본 정보 입력 화면으로 이동합니다.
   * 추후 테스트 ID를 URL에 넣는 방식으로 확장할 수 있습니다.
   */
  const handleTestClick = () => {
    router.push("/test/info");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8F6FF] via-[#F2EEFF] to-[#ECE7FF] px-4 py-4">
      {/* 모바일 화면 전체 카드 */}
      <section className="relative mx-auto flex min-h-[780px] w-full max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_20px_50px_rgba(92,62,180,0.15)] backdrop-blur-xl">
        {/* 상단 콘텐츠 영역 */}
        <div className="flex-1 px-5 pb-5 pt-5">
          {/* 상단 헤더 */}
          <header className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-[14px] font-extrabold tracking-[-0.02em] text-[#5F46E8]"
              aria-label="홈으로 이동"
            >
              InsightMe
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[22px] text-[#282334] transition-colors hover:bg-[#F2EEFF]"
              aria-label="메뉴 열기"
            >
              ≡
            </button>
          </header>

          {/* 제목과 캐릭터 영역 */}
          <section className="relative mt-7 min-h-[142px]">
            {/* 제목 영역 */}
            <div className="relative z-10 max-w-[205px]">
              <h1 className="text-[25px] font-extrabold leading-[1.38] tracking-[-0.04em] text-[#211B38]">
                어떤 테스트를
                <br />
                시작해볼까요?
              </h1>

              <p className="mt-3 text-[12px] font-medium leading-[1.65] tracking-[-0.02em] text-[#8D879D]">
                나를 이해하고 더 나은 방향으로
                <br />
                나아갈 수 있도록 도와드릴게요.
              </p>
            </div>

            {/* 캐릭터 주변 장식 */}
            <span className="absolute right-[108px] top-2 text-[10px] text-[#B6A6FF]">
              ◆
            </span>

            <span className="absolute right-3 top-3 text-[10px] text-[#E4DDFF]">
              ◆
            </span>

            <span className="absolute right-[2px] top-[78px] text-[8px] text-[#9F88FF]">
              ◆
            </span>

            {/* 랜딩페이지에서 사용한 캐릭터 이미지 */}
            <div className="absolute -right-2 -top-1 h-[150px] w-[150px]">
              <Image
                src="/image/testlist.png"
                alt="InsightMe 캐릭터"
                fill
                priority
                sizes="150px"
                className="object-contain"
              />
            </div>
          </section>

          {/* 테스트 카드 목록 */}
          <section className="mt-3 space-y-3">
            {tests.map((test) => (
              <button
                key={test.title}
                type="button"
                onClick={handleTestClick}
                className="group flex w-full items-center gap-3 rounded-[18px] border border-[#F0ECFA] bg-white p-2.5 text-left shadow-[0_7px_20px_rgba(88,66,160,0.09)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(88,66,160,0.15)] active:scale-[0.99]"
              >
                {/* 테스트 이미지 영역 */}
                <div
                  className={`flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[15px] ${test.imageBackground}`}
                >
                  <span
                    className="text-[36px]"
                    role="img"
                    aria-label={`${test.title} 아이콘`}
                  >
                    {test.emoji}
                  </span>
                </div>

                {/* 테스트 정보 영역 */}
                <div className="min-w-0 flex-1 py-1">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${test.tagBackground} ${test.tagColor}`}
                  >
                    {test.tag}
                  </span>

                  <h2 className="mt-1.5 truncate text-[15px] font-extrabold tracking-[-0.03em] text-[#28223E]">
                    {test.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-[10px] font-medium leading-[1.55] tracking-[-0.02em] text-[#8C8798]">
                    {test.desc}
                  </p>
                </div>

                {/* 오른쪽 화살표 */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F4FF] text-[21px] font-medium text-[#7256E8] transition-colors group-hover:bg-[#EEE8FF]">
                  ›
                </div>
              </button>
            ))}
          </section>

          {/* 무료 제공 안내 */}
          <section className="mt-4 flex items-center gap-3 rounded-[16px] bg-gradient-to-r from-[#F2EEFF] to-[#F7F4FF] px-4 py-3.5">
            {/* 방패 아이콘 */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#7559EA] to-[#5A3DD8] text-[14px] font-bold text-white shadow-[0_5px_12px_rgba(103,76,220,0.25)]">
              ✓
            </div>

            <div>
              <p className="text-[12px] font-extrabold tracking-[-0.02em] text-[#6750DB]">
                모든 테스트는 무료로 제공돼요
              </p>

              <p className="mt-1 text-[10px] font-medium tracking-[-0.02em] text-[#918AA4]">
                회원가입 없이도 자유롭게 이용할 수 있어요.
              </p>
            </div>
          </section>
        </div>

        {/* 하단 네비게이션 */}
        <nav className="grid h-[68px] grid-cols-4 border-t border-[#F1EDF8] bg-white px-2 shadow-[0_-8px_24px_rgba(90,65,160,0.06)]">
          {/* 홈 */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex flex-col items-center justify-center gap-1 text-[#A6A0B5]"
          >
            <span className="text-[18px]">⌂</span>
            <span className="text-[9px] font-semibold">홈</span>
          </button>

          {/* 테스트 */}
          <button
            type="button"
            className="mx-1 my-2 flex flex-col items-center justify-center gap-1 rounded-[12px] bg-[#F2EEFF] text-[#6549DE]"
          >
            <span className="text-[18px]">▣</span>
            <span className="text-[9px] font-extrabold">테스트</span>
          </button>

          {/* AI 상담 */}
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#A6A0B5]"
          >
            <span className="text-[17px]">◉</span>
            <span className="text-[9px] font-semibold">AI 상담</span>
          </button>

          {/* 내 기록 */}
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#A6A0B5]"
          >
            <span className="text-[17px]">▥</span>
            <span className="text-[9px] font-semibold">내 기록</span>
          </button>
        </nav>
      </section>
    </main>
  );
}