"use client";

import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();

  return (
    <section className="mt-8">
      <button
        onClick={() => router.push("/test")}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#5B42F3] to-[#7657F4] px-5 py-4 text-base font-black text-white shadow-[0_18px_34px_rgba(91,66,243,0.34)] transition hover:brightness-105"
      >
        지금 시작하기
      </button>
    </section>
  );
}