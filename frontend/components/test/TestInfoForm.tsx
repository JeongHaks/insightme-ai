"use client";

import { useRouter } from "next/navigation";

// 기본 정보 입력 화면 컴포넌트
export default function TestInfoForm() {
    
    {/** 페이지를 이동하기 위한 객체를 생성 */}
    const router = useRouter();

  return (
    // 화면 전체 영역
    <main className="min-h-screen bg-[#F7F4FF] px-4 py-5">

      {/* 가운데 모바일 화면 */}
      <section className="relative mx-auto min-h-[720px] max-w-sm rounded-[28px] bg-white px-6 py-7 shadow-xl">

        {/* 왼쪽 상단 뒤로가기 버튼 */}
        <button
            type="button"
            className="absolute left-6 top-7 cursor-pointer text-xl font-bold text-gray-400"
        >
            🔙
        </button>
        {/* 제목 */}
        <h1 className="text-center text-xl font-bold text-gray-900">
          기본 정보를 알려주세요.
        </h1>

        {/* 성별 선택 영역 */}
        <div className="mt-8">
            {/* 입력 항목 제목 */}
            <p className="mb-3 text-sm font-semibold text-gray-700">
                성별
            </p>

            {/* 성별 버튼 그룹 */}
            <div className="grid grid-cols-2 gap-3">
                {/* 남성 선택 버튼 */}
                <button className="cursor-pointer rounded-2xl border border-violet-200 bg-violet-50 py-4 text-sm font-semibold text-violet-700">
                남성
                </button>

                {/* 여성 선택 버튼 */}
                <button className="cursor-pointer rounded-2xl border border-gray-200 bg-white py-4 text-sm font-semibold text-gray-600">
                여성
                </button>
            </div>
        </div>

        {/* 나이대 선택 영역 */}
        <div className="mt-7">
            {/* 입력 항목 제목 */}
            <label
             htmlFor="ageGroup"
             className="mb-3 block text-sm font-semibold text-gray-700"
            >
                나이대
            </label>

            {/* 나이대 선택 SelectBox */}
            <select
                id="ageGroup"
                className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-700 outline-none focus:border-violet-500"
                defaultValue=""
            >
                {/** default 값 설정 */}
                <option value="" disabled>
                선택해주세요.
                </option>

                <option value="10">10대</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대 이상</option>
            </select>
        </div>

        {/* 직업군 선택 영역 */}
        <div className="mt-7">
            {/* 입력 항목 제목 */}
            <label
                htmlFor="jobGroup"
                className="mb-3 block text-sm font-semibold text-gray-700"
            >
                직업군
            </label>

            {/* 직업군 선택 SelectBox */}
            <select
                id="jobGroup" //label이랑 연결할 ID
                className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-700 outline-none focus:border-violet-500"
                defaultValue="" 
            >
                <option value="" disabled>
                선택해주세요
                </option>

                <option value="job-seeker">취업준비생</option>
                <option value="office-worker">직장인</option>
                <option value="freelancer">프리랜서</option>
                <option value="self-employed">자영업</option>
                <option value="public-servant">공무원</option>                
                <option value="public-servant">공기업</option>                
                <option value="student">해당없음</option>
                <option value="student">기타</option>
            </select>

            {/* 안내 문구 */}
            <p className="mt-2 text-xs text-violet-500">
                해당없음(학생/취준생)
            </p>
        </div>

        {/* MBTI 선택 영역 */}
        <div className="mt-7">
            {/* 입력 항목 제목 */}
            <label
                htmlFor="mbti"
                className="mb-3 block text-sm font-semibold text-gray-700"
            >
                MBTI 유형
            </label>

            {/* MBTI 선택 SelectBox */}
            <select
                id="mbti"
                className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-700 outline-none focus:border-violet-500"
                defaultValue=""
            >
                <option value="" disabled>
                선택해주세요 (16가지)
                </option>

                <option>INTJ</option>
                <option>INTP</option>
                <option>ENTJ</option>
                <option>ENTP</option>

                <option>INFJ</option>
                <option>INFP</option>
                <option>ENFJ</option>
                <option>ENFP</option>

                <option>ISTJ</option>
                <option>ISFJ</option>
                <option>ESTJ</option>
                <option>ESFJ</option>

                <option>ISTP</option>
                <option>ISFP</option>
                <option>ESTP</option>
                <option>ESFP</option>
            </select>

            {/* 안내 문구 */}
            <p className="mt-2 text-xs text-gray-500">
                정확한 분석을 위해 본인의 MBTI를 선택해주세요.
            </p>
        </div>

        {/* 다음 버튼 */}
        <div className="mt-10 flex justify-center">
        <button
            type="button"
            onClick={() => router.push("/test/questions")}
            className="w-80 cursor-pointer rounded-full bg-violet-600 px-12 py-4 font-semibold text-white transition hover:bg-violet-700"
        >
            다음
        </button>
        </div>

        {/* 진행률 영역 */}
        <div className="mt-8 flex items-center gap-4">
        {/* 회색 진행 바 */}
        <div className="h-2 flex-1 rounded-full bg-gray-200">
            {/* 현재 진행률: 기본 정보는 1 / 7 */}
            <div className="h-2 w-[14%] rounded-full bg-violet-600" />
        </div>

        {/* 현재 단계 / 전체 단계 */}
        <span className="min-w-[36px] text-right text-sm font-bold text-gray-700">
            1 / 7
        </span>
        </div>

        {/* 설명 */}
        <p className="mt-4 text-sm leading-7 text-gray-500">
          *입력한 정보는 분석 및 통계 용도로만 사용됩니다.
        </p>

      </section>
    </main>
  );
}