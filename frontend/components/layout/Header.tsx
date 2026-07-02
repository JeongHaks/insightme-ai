export default function Header() {
  return (
    <header  className="mb-12 flex items-center">
      {/* 로고 + 서비스명 */}
      <div className="flex items-center gap-0">
        <img
          src="/image/logo.png"
          alt="InsightMe Logo"
          className="h-8 w-auto -mr-1"
        />

        <h1 className="text-2xl font-bold text-purple-600">
          InsightMe
        </h1>
      </div>

      {/* 메뉴 버튼 */}
      <button className="ml-auto text-3xl leading-none text-gray-700">
        ☰
      </button>
    </header>
  );
}