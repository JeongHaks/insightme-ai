export default function Hero() {
  return (
    <section className="text-center">
      {/* 메인 제목 */}
      <h2 className="text-3xl font-extrabold leading-tight text-gray-900">
        <span className="text-purple-600">나를</span> 이해하면
        <br />
        진로와 커리어가 보입니다
      </h2>

      {/* 설명 문구 */}
      <p className="mt-5 text-sm leading-6 text-gray-500">
        MBTI와 기질 분석으로
        <br />
        나에게 맞는 직업 방향을 찾아보세요
      </p>
    </section>
  );
}