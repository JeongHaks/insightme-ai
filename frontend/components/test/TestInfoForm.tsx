"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * 기본정보 입력값 타입
 */
interface Profile {
  gender: string;
  age: string;
  job: string;
  mbti: string;
}

/**
 * 선택 팝업 종류
 */
type PickerType = "age" | "job" | "mbti";

/**
 * 선택 팝업 컴포넌트가 전달받는 값
 */
interface OptionPickerModalProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

/**
 * 나이대 선택 목록
 */
const ageGroups = ["10대", "20대", "30대", "40대", "50대 이상"];

/**
 * 직업군 선택 목록
 *
 * 기존 코드에서 공무원과 공기업의 value가 같았던 문제를 방지하기 위해
 * 실제 표시되는 문자열 자체를 값으로 사용합니다.
 */
const jobGroups = [
  "취업준비생",
  "직장인",
  "프리랜서",
  "자영업",
  "공무원",
  "공기업",
  "학생",
  "기타",
];

/**
 * MBTI 선택 목록
 */
const mbtiTypes = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

/**
 * 선택 항목 버튼
 *
 * 나이대, 직업군, MBTI 선택 팝업을 여는 공통 버튼입니다.
 */
function PickerField({
  label,
  value,
  placeholder,
  onClick,
}: {
  label: string;
  value: string;
  placeholder: string;
  onClick: () => void;
}) {
  return (
    <div>
      {/* 항목 제목 */}
      <p className="mb-3 text-sm font-black text-[#4C426F]">{label}</p>

      {/* 선택 팝업 열기 버튼 */}
      <button
        type="button"
        onClick={onClick}
        className="flex h-13 w-full cursor-pointer items-center justify-between rounded-xl border border-[#E7E4F2] bg-white/60 px-4 text-left text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition hover:border-[#CFC6FF]"
      >
        <span className={value ? "text-[#4C426F]" : "text-[#AAA3BA]"}>
          {value || placeholder}
        </span>

        {/* 아래 방향 화살표 */}
        <span className="text-xs text-[#8B83AA]">▼</span>
      </button>
    </div>
  );
}

/**
 * 선택 팝업
 *
 * 나이대, 직업군, MBTI 항목을 선택할 때 화면 아래에서 표시됩니다.
 */
function OptionPickerModal({
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: OptionPickerModalProps) {
  return (
    // 팝업 바깥 영역을 누르면 닫힙니다.
    <div
        className="fixed inset-0 z-50 grid place-items-center bg-[#241C45]/30 px-4 py-6 backdrop-blur-sm"
        onClick={onClose}
        >
      {/* 팝업 본체 */}
      <section
        className="max-h-[70vh] w-full max-w-[390px] overflow-hidden rounded-[26px] border border-white/80 bg-white/95 p-5 shadow-[0_24px_70px_rgba(62,44,120,0.28)]"
        onClick={(event) => event.stopPropagation()}
        >
        {/* 팝업 제목과 닫기 버튼 */}
        <header className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#2B2541]">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F2EEFF] text-sm font-bold text-[#6D55DC]"
            aria-label="선택창 닫기"
          >
            ✕
          </button>
        </header>

        {/* 선택 목록 */}
        <div className="mt-4 max-h-[52vh] space-y-2 overflow-y-auto pr-1">
          {options.map((option) => {
            const isSelected = selectedValue === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                  isSelected
                    ? "border-[#6D55DC] bg-[#6D55DC] text-white"
                    : "border-[#E7E4F2] bg-white text-[#4C426F] hover:border-[#CFC6FF] hover:bg-[#F8F6FF]"
                }`}
              >
                <span>{option}</span>

                {isSelected && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/**
 * 기본 정보 입력 화면
 */
export default function TestInfoForm() {
  // 페이지 이동을 위한 Next.js 라우터
  const router = useRouter();

  // 사용자가 입력한 기본정보
  const [profile, setProfile] = useState<Profile>({
    gender: "",
    age: "",
    job: "",
    mbti: "",
  });

  // 현재 열려 있는 선택 팝업
  const [picker, setPicker] = useState<PickerType | null>(null);

  /**
   * 기본정보 한 항목을 변경하는 함수
   */
  const updateProfile = (key: keyof Profile, value: string) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      [key]: value,
    }));
  };

  /**
   * 모든 필수 항목이 입력됐는지 확인
   *
   * 모든 값이 있어야 다음 버튼을 사용할 수 있습니다.
   */
  const canStart =
    profile.gender !== "" &&
    profile.age !== "" &&
    profile.job !== "" &&
    profile.mbti !== "";

  /**
   * 다음 버튼 클릭 처리
   */
  const handleNext = () => {
    if (!canStart) {
      return;
    }

    router.push("/test/questions");
  };

  /**
   * 현재 열린 선택 팝업의 설정
   */
  const pickerConfig = {
    age: {
      title: "나이대를 선택해주세요",
      options: ageGroups,
      value: profile.age,
      onSelect: (value: string) => updateProfile("age", value),
    },
    job: {
      title: "직업군을 선택해주세요",
      options: jobGroups,
      value: profile.job,
      onSelect: (value: string) => updateProfile("job", value),
    },
    mbti: {
      title: "MBTI 유형을 선택해주세요",
      options: mbtiTypes,
      value: profile.mbti,
      onSelect: (value: string) => updateProfile("mbti", value),
    },
  };

  // picker가 선택된 경우 해당 선택창 설정을 가져옵니다.
  const activePicker = picker ? pickerConfig[picker] : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8F6FF] via-[#F3EFFF] to-[#ECE7FF] px-4 py-4">
      {/* 가운데 모바일 화면 */}
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[390px] flex-col justify-center">
        {/* 반투명 유리 카드 */}
        <div className="relative w-full overflow-hidden rounded-[30px] border border-white/75 bg-white/50 px-5 py-6 shadow-[0_24px_70px_rgba(116,91,191,0.14)] backdrop-blur-2xl">
          {/* 배경 장식 */}
          <div className="pointer-events-none absolute -right-14 top-12 h-32 w-32 rounded-full bg-[#E6DCFF]/70 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-32 h-36 w-36 rounded-full bg-[#F4EAFF]/80 blur-3xl" />

          {/* 상단 헤더 */}
          <header className="relative z-10 flex items-center justify-between">
            {/* 뒤로가기 버튼 */}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex cursor-pointer items-center gap-2 text-lg font-black text-[#5F46D1]"
              aria-label="이전 화면으로 이동"
            >
              <span>InsightMe</span>
            </button>

            {/* 현재 진행 단계 */}
            <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-black text-[#8B83AA] backdrop-blur-xl">
              1 / 7
            </span>
          </header>

          {/* 캐릭터와 화면 설명 */}
          <section className="relative z-10 mt-5 rounded-[26px] border border-white/70 bg-white/30 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl">
            <Image
              src="/image/main.png"
              alt="기본 정보 입력 캐릭터"
              width={92}
              height={92}
              priority
              className="mx-auto mb-2 h-auto w-[76px] object-contain"
            />

            <h1 className="text-[19px] font-black tracking-[-0.02em] text-[#2B2541]">
              기본 정보를 입력해주세요
            </h1>

            <p className="mt-2 text-xs font-bold leading-5 text-[#8B83AA]">
              나에게 맞는 커리어 분석을 위해
              <br />
              간단한 정보를 먼저 알려주세요
            </p>
          </section>

          {/* 기본정보 입력 영역 */}
          <section className="relative z-10 mt-5 grid gap-5">
            {/* 성별 선택 */}
            <div>
              <p className="mb-3 text-sm font-black text-[#4C426F]">성별</p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "남성", value: "남성" },
                  { label: "여성", value: "여성" },
                  { label: "선택안함", value: "응답 안 함" },
                ].map((item) => {
                  const isSelected = profile.gender === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateProfile("gender", item.value)}
                      className={`h-12 cursor-pointer rounded-lg border text-sm font-black transition ${
                        isSelected
                          ? "border-[#6D55DC] bg-[#6D55DC] text-white shadow-[0_10px_22px_rgba(109,85,220,0.24)]"
                          : "border-[#E7E4F2] bg-white/55 text-[#4C426F] backdrop-blur-xl hover:border-[#CFC6FF]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 나이대 선택 */}
            <PickerField
              label="나이대"
              value={profile.age}
              placeholder="선택해주세요"
              onClick={() => setPicker("age")}
            />

            {/* 직업군 선택 */}
            <div>
              <PickerField
                label="직업군"
                value={profile.job}
                placeholder="선택해주세요"
                onClick={() => setPicker("job")}
              />

              {/* 학생 또는 취업준비생 빠른 선택 */}
              <button
                type="button"
                onClick={() =>
                  updateProfile("job", "해당없음(학생/취준생)")
                }
                className="mt-2 cursor-pointer text-xs font-black text-[#6D55DC]"
              >
                해당없음(학생/취준생)
              </button>
            </div>

            {/* MBTI 선택 */}
            <div>
              <PickerField
                label="MBTI 유형"
                value={profile.mbti}
                placeholder="선택해주세요 (16가지)"
                onClick={() => setPicker("mbti")}
              />

              <p className="mt-2 text-xs font-bold leading-5 text-[#8B83AA]">
                정확한 분석을 위해 본인의 MBTI를 선택해주세요.
              </p>
            </div>
          </section>

          {/* 다음 버튼 */}
          <button
            type="button"
            disabled={!canStart}
            onClick={handleNext}
            className="relative z-10 mt-7 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5B42F3] to-[#7657F4] text-base font-black text-white shadow-[0_18px_34px_rgba(91,66,243,0.3)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            다음
            <span aria-hidden="true">→</span>
          </button>

          {/* 진행률 */}
          <div className="relative z-10 mt-6 flex items-center gap-4">
            <div className="h-1.5 flex-1 rounded-full bg-[#EEEAF8]">
              {/* 기본정보 단계는 전체 7단계 중 첫 번째 */}
              <div className="h-1.5 w-[14.28%] rounded-full bg-[#6D55DC]" />
            </div>

            <span className="text-sm font-black text-[#4C426F]">1 / 7</span>
          </div>
        </div>

        {/* 개인정보 사용 안내 */}
        <p className="w-full px-2 pb-2 pt-4 text-xs font-bold leading-5 text-[#8B83AA]">
          * 입력 정보는 분석 및 통계 용도로만 사용됩니다.
        </p>
      </section>

      {/* 선택 팝업 */}
      {activePicker && (
        <OptionPickerModal
          title={activePicker.title}
          options={activePicker.options}
          selectedValue={activePicker.value}
          onClose={() => setPicker(null)}
          onSelect={(value) => {
            activePicker.onSelect(value);
            setPicker(null);
          }}
        />
      )}
    </main>
  );
}