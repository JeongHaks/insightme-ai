// 선택지 컴포넌트가 받을 데이터 타입
type QuestionOptionProps = {
  text: string;
  selected?: boolean;
};

// TCI 문항의 선택지 하나를 보여주는 컴포넌트
export default function QuestionOption({
  text,
  selected = false,
}: QuestionOptionProps) {
  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition ${
        selected
          ? "border-violet-400 bg-violet-50 text-gray-900"
          : "border-gray-200 bg-white text-gray-600 hover:border-violet-300"
      }`}
    >
      {/* 왼쪽 라디오 아이콘 */}
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-violet-500 bg-violet-500 text-white"
            : "border-gray-300 bg-white"
        }`}
      >
        {selected && "✓"}
      </span>

      {/* 선택지 문구 */}
      <span className="leading-relaxed">{text}</span>
    </button>
  );
}