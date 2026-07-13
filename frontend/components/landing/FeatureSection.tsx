// ==================== 랜딩 기능 소개 영역 ====================
const features = [
  {
    icon: "/icon/icon-analysis.png",
    title: "MBTI + 기질 분석",
  },
  {
    icon: "/icon/icon-career.png",
    title: "직업 궁합 및 추천",
  },
  {
    icon: "/icon/icon-burnout.png",
    title: "번아웃 원인과 대처법",
  },
  {
    icon: "/icon/icon-chat.png",
    title: "AI 상담으로 고민 해결",
  },
];

export default function FeatureSection() {
  return (
    <section className="mx-auto mt-2 w-full max-w-[250px] overflow-hidden rounded-[30px] border border-white/80 bg-white/25 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-18px_34px_rgba(255,255,255,0.18),0_22px_54px_rgba(116,91,191,0.13)] backdrop-blur-3xl backdrop-saturate-150">
      {/* 배경 효과 */}
      <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#ffb8ed]/35 blur-2xl" />
      <div className="pointer-events-none absolute right-[-34px] top-6 h-28 w-28 rounded-full bg-[#c8b8ff]/45 blur-2xl" />
      <div className="pointer-events-none absolute bottom-[-46px] left-12 h-28 w-28 rounded-full bg-white/50 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/55 via-white/16 to-[#d8ccff]/22" />

      {/* 기능 목록 */}
      <div className="relative grid gap-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/40 backdrop-blur-xl">
              <img
                src={feature.icon}
                alt=""
                className="h-5 w-5 object-contain"
              />
            </span>

            <span className="text-sm font-black leading-5 text-[#3d3659]">
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}