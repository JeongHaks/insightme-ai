// QuestionHeader 컴포넌트 Props
// 부모(TestQuestion)가 전달하는 데이터의 타입이다. 
// 현재 문항과 전체 문항 수를 받는다.
type QuestionHeaderProps = {
  current: number;
  total: number;
};

// TCI 문항 상단(Header) 컴포넌트
export default function QuestionHeader({
  current,
  total,
}: QuestionHeaderProps) {

  // 진행률 계산 (%)
  const progress = (current / total) * 100;

  return (
    <div>
      {/* 화면 제목 */}
      <h1 className="text-center text-2xl font-bold text-gray-900">
        기질 성향 테스트
      </h1>

      {/* 진행률 영역 */}
      <div className="mt-8 flex items-center gap-3">

        {/* 회색 진행 바 */}
        <div className="h-2 flex-1 rounded-full bg-gray-200">

          {/* 현재 진행률 */}
          <div
            className="h-2 rounded-full bg-violet-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 현재 문항 */}
        <span className="text-sm font-semibold text-gray-600">
          {current} / {total}
        </span>
      </div>
    </div>
  );
}