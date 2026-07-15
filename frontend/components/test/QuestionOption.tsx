
// 선택지 컴포넌트가 받을 데이터 타입
type QuestionOptionProps = {
  // A 또는 B 표시
  label: "A" | "B";

  // 선택지 문구
  text: string;

  // 현재 선택 여부
  selected?: boolean;

  // 선택지 클릭 시 실행할 함수
  onClick: () => void;
};

// TCI 문항의 선택지 하나를 보여주는 컴포넌트
export default function QuestionOption({
  label,
  text,
  selected = false,
  onClick,
}: QuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full cursor-pointer items-center gap-4 rounded-[20px] border px-4 py-5 text-left transition-all duration-200 ${
        selected
          ? "border-[#6D55DC] bg-[#F0EBFF] shadow-[0_12px_26px_rgba(109,85,220,0.16)]"
          : "border-white/80 bg-white/55 shadow-[0_8px_22px_rgba(116,91,191,0.08)] backdrop-blur-xl hover:border-[#CFC6FF] hover:bg-white/70"
      }`}
    >
      {/* A 또는 B 라벨 */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-sm font-black transition ${
          selected
            ? "bg-[#6D55DC] text-white shadow-[0_8px_18px_rgba(109,85,220,0.24)]"
            : "bg-[#EEE9FF] text-[#6D55DC] group-hover:bg-[#E4DCFF]"
        }`}
      >
        {label}
      </span>

      {/* 선택지 문구 */}
      <span
        className={`flex-1 text-sm font-black leading-6 tracking-[-0.02em] ${
          selected ? "text-[#2B2541]" : "text-[#4C426F]"
        }`}
      >
        {text}
      </span>

      {/* 선택 완료 표시 */}
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black transition ${
          selected
            ? "border-[#6D55DC] bg-[#6D55DC] text-white"
            : "border-[#D9D3E8] bg-white/70 text-transparent"
        }`}
      >
        ✓
      </span>
    </button>
  );
}