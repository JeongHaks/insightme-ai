export default function Hero() {
  return (
    <section className="text-center">
      {/* 메인 제목 */}
      <h1 className="text-[clamp(1.38rem,5.5vw,1.7rem)] font-black leading-[1.42] tracking-normal text-[#2b2541]">
        <span className="text-[#5B42F3]">나를</span> 이해하면
        <br />
        진로와 커리어가 보입니다
      </h1>

      {/* 설명 문구 */}
      <p className="mt-5 text-sm font-bold leading-6 text-[#7d7599]">
        MBTI와 기질 분석으로
        <br />
        나에게 맞는 직업 방향을 찾아보세요
      </p>      
    </section>
  );
}