export default function FeatureSection() {
  return (
    <section className="mt-10 rounded-3xl bg-purple-50 p-6">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧬</span>
          <p className="font-medium text-gray-700">MBTI + 기질 분석</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">💼</span>
          <p className="font-medium text-gray-700">직무 및 커리어 추천</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🏢</span>
          <p className="font-medium text-gray-700">조직문화 궁합 분석</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <p className="font-medium text-gray-700">AI 맞춤 상담</p>
        </div>
      </div>
    </section>
  );
}