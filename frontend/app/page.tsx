import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import FeatureSection from "@/components/landing/FeatureSection";
import StartButton from "@/components/common/Button";
import Footer from "@/components/layout/Footer";
import CharacterSection from "@/components/landing/CharacterSection";

// ==================== 메인 랜딩 페이지 ====================
export default function Home() {
  return (
    // 전체 랜딩페이지 배경 영역
    <main className="min-h-screen bg-gradient-to-br from-[#eee9ff] via-[#faf8ff] to-[#e8e2ff] px-4 py-1 sm:py-6">
      {/* 모바일 화면 형태의 메인 컨테이너 */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-sm flex-col overflow-hidden rounded-[28px] border border-white/75 bg-white/55 px-6 pb-7 pt-6 shadow-[0_28px_90px_rgba(116,91,191,0.18)] backdrop-blur-2xl sm:min-h-[760px]">
        {/* 배경 장식 효과 */}
        <div className="pointer-events-none absolute -right-14 top-16 h-32 w-32 rounded-full bg-[#e9e1ff]/70 blur-2xl" />
        <div className="pointer-events-none absolute -left-14 bottom-36 h-36 w-36 rounded-full bg-[#f0ebff]/80 blur-3xl" />
        <div className="pointer-events-none absolute right-8 top-32 h-3 w-3 rotate-45 rounded-sm bg-[#b9a9ff]/70" />
        <div className="pointer-events-none absolute left-12 top-60 h-2.5 w-2.5 rotate-45 rounded-sm bg-[#c7bbff]/75" />
        <div className="pointer-events-none absolute right-10 top-[340px] h-2.5 w-2.5 rotate-45 rounded-sm bg-[#a996ff]/70" />

        {/* 상단 헤더 */}
        <Header />

        {/* 메인 문구 */}
        <div className="relative z-10 mt-12">
          <Hero />
        </div>

        {/* 메인 캐릭터 */}
        <div className="relative z-10 mt-6">
          <CharacterSection />
        </div>

        {/* 기능 안내 카드 */}
        <div className="relative z-10">
          <FeatureSection />
        </div>

        {/* 시작 버튼 */}
        <div className="relative z-10 mt-auto">
          <StartButton />
        </div>

        {/* 하단 안내 */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}