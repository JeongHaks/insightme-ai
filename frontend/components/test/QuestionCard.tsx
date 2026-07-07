// QuestionCard 컴포넌트가 받을 데이터 타입
type QuestionCardProps = {
  questionNumber: number;
  questionText: string;
};

// TCI 문항의 질문 내용을 보여주는 컴포넌트
export default function QuestionCard({
  questionNumber,
  questionText,
}: QuestionCardProps) {
  return (
    <div className="mt-10">
      {/* 질문 번호 + 질문 내용 */}
      <h2 className="text-xl font-bold leading-relaxed text-gray-900">
        Q{questionNumber}. {questionText}
      </h2>
    </div>
  );
}