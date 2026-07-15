import Image from "next/image";

// QuestionCard 컴포넌트가 받을 데이터 타입
type QuestionCardProps = {
  // 현재 질문 번호
  questionNumber: number;

  // 현재 질문이 어떤 기질 문항인지 표시
  trait: string;

  // 실제 질문 문구
  questionText: string;
};

// TCI 문항의 질문 내용을 보여주는 컴포넌트
export default function QuestionCard({
  questionNumber,
  trait,
  questionText,
}: QuestionCardProps) {
  return (
    // 질문 전체 카드
    <section className="relative rounded-[26px] border border-white/70 bg-white/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl">
      {/* 질문 정보와 캐릭터 영역 */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          {/* 질문 번호 + 기질 코드 */}
          <p className="text-sm font-black text-[#6D55DC]">
            Q{questionNumber}. {trait} 기질 문항
          </p>

          {/* 선택 안내 문구 */}
          <p className="mt-1 text-xs font-bold text-[#8B83AA]">
            선택 즉시 다음 문항으로 넘어가요
          </p>
        </div>

        {/* InsightMe 캐릭터 */}
        <Image
          src="/image/main.png"
          alt="질문 안내 캐릭터"
          width={64}
          height={64}
          className="h-auto w-16 shrink-0 object-contain"
        />
      </div>

      {/* 실제 질문 문구 */}
      <h1 className="text-[18px] font-black leading-[1.6] tracking-[-0.02em] text-[#2B2541]">
        {questionText}
      </h1>
    </section>
  );
}