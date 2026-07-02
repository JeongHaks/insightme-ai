const tests = [
  {
    tag: "커리어",
    title: "커리어 방향 테스트",
    desc: "나에게 맞는 직업 방향과 성장 가능성이 높은 커리어를 찾아보세요.",
    emoji: "🧭",
  },
  {
    tag: "심리",
    title: "마음 회복 테스트",
    desc: "지금 내 마음 상태를 점검하고, 회복 방법을 제안받아보세요.",
    emoji: "🌱",
  },
  {
    tag: "조직문화",
    title: "조직문화 성향 테스트",
    desc: "나와 잘 맞는 조직문화는 무엇인지 재미있게 알아보세요.",
    emoji: "☁️",
  },
  {
    tag: "직장인",
    title: "직장인 흑화 지수 테스트",
    desc: "회사에서 쌓인 스트레스와 감정 상태를 가볍게 확인해보세요.",
    emoji: "💼",
  },
];

export default function TestList() {
  return (
    <main className="min-h-screen bg-[#F7F4FF] px-4 py-5">
      <section className="mx-auto flex min-h-[720px] max-w-sm flex-col rounded-[28px] bg-white p-5 shadow-xl">
        {/* 상단 */}
        <header className="flex items-center justify-between">
          <div className="text-sm font-bold text-violet-600">InsightMe</div>
          <button className="text-xl text-gray-700">☰</button>
        </header>

        {/* 제목 + 캐릭터 영역 */}
        <section className="relative mt-9 min-h-[130px]">
          <div>
            <h1 className="text-[25px] font-extrabold leading-snug text-slate-900">
              어떤 테스트를
              <br />
              시작해볼까요?
            </h1>

            <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
              나를 이해하고 더 나은 방향으로
              <br />
              나아갈 수 있도록 도와드릴게요.
            </p>
          </div>

          <div className="absolute right-1 top-0 flex h-32 w-32 items-center justify-center rounded-full bg-violet-100 text-6xl">
            🧸
          </div>
        </section>

        {/* 테스트 카드 */}
        <section className="mt-4 space-y-3">
          {tests.map((test) => (
            <article
              key={test.title}
              className="flex items-center gap-4 rounded-[20px] bg-white p-3 shadow-[0_8px_24px_rgba(92,62,180,0.12)]"
            >
              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-4xl">
                {test.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-bold text-violet-600">
                  {test.tag}
                </span>

                <h2 className="mt-2 text-[16px] font-extrabold text-slate-900">
                  {test.title}
                </h2>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                  {test.desc}
                </p>
              </div>

              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                ›
              </button>
            </article>
          ))}
        </section>

        {/* 무료 안내 */}
        <section className="mt-5 flex items-center gap-3 rounded-[18px] bg-violet-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
            ✓
          </div>

          <div>
            <p className="text-[13px] font-bold text-violet-700">
              모든 테스트는 무료로 제공돼요
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              회원가입 없이도 자유롭게 이용할 수 있어요.
            </p>
          </div>
        </section>

        {/* 하단 탭 */}
        <nav className="mt-auto grid grid-cols-4 rounded-[22px] bg-white pt-4 text-center text-[11px] shadow-[0_-6px_20px_rgba(92,62,180,0.08)]">
          <div className="text-slate-400">🛖<br />홈</div>
          <div className="font-bold text-violet-600">📜<br />테스트</div>
          <div className="text-slate-400">😜<br />AI 상담</div>
          <div className="text-slate-400">📊<br />내 기록</div>
        </nav>
      </section>
    </main>
  );
}