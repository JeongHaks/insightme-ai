"use client";

import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();

  return (
    <section className="py-10 text-center">
      <button
        onClick={() => router.push("/test")}
        className="w-80 rounded-full bg-violet-600 px-12 py-4 text-white font-semibold hover:bg-violet-700 cursor-pointer transition"
      >
        지금 시작하기
      </button>
    </section>
  );
}