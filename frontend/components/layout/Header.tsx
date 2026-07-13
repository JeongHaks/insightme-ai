
export default function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between">
      <p className="text-lg font-black tracking-normal text-[#5f46d1]">
        InsightMe
      </p>
      <button
        aria-label="메뉴"
        className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#302a45] transition hover:bg-white/45"
      >
        ☰
      </button>
    </header>
  );
}