import Image from "next/image";
import Header from "@/components/layout/Header"; {/**Header.tsx를 가져오는 코드. */}
import Hero from "@/components/landing/Hero"; {/**Hero.tsx를 가져오는 코드. */}
import FeatureSection from "@/components/landing/FeatureSection"; {/**FeatureSection.tsx를 가져오는 코드. */}
import StartButton from "@/components/common/Button"; {/**Button.tsx를 가져오는 코드. */}
import Footer from "@/components/layout/Footer"; {/**Footer.tsx를 가져오는 코드. */}

{/**첫 랜딩페이지 만들 컴포넌트 */}
export default function Home() {
  return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-5 py-6">
      {/* 모바일 화면 기준 컨테이너 */}
        <div className="mx-auto max-w-sm rounded-[32px] bg-white px-6 py-7 shadow-xl shadow-purple-100">
          {/* 상단 로고 */}          
          {/* 로고 + 서비스명 */}
          <Header />          

          {/* 메인 문구 */}          
          <Hero />  

          {/* 캐릭터 영역 */}
          <section className="my-10 flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-purple-100 text-7xl">
              🧸
            </div>
          </section>

          {/* 기능 안내 카드 */}
          <FeatureSection />

          {/* 시작 버튼 */}
          <StartButton />

          {/* 하단 안내 */}
          <Footer />
        </div>
    </main>
  );
}
