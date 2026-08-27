"use client";

import { useState } from "react";
// 로그인 성공 후 기존 AI 상담 화면으로 이동하기 위해 사용한다.
import { useRouter } from "next/navigation";

// 로그인 정보를 Spring Boot로 전송하는 API 함수
import { login } from "@/lib/api";

/**
 * 로그인 화면
 *
 * 사용자가 아이디와 비밀번호를 입력해서
 * InsightMe 회원 로그인을 진행하는 화면이다.
 */
export default function LoginPage() {

  // ==================== 로그인 입력값 ====================

  // 사용자가 입력한 로그인 아이디
  const [loginId, setLoginId] = useState("");

  // 사용자가 입력한 비밀번호
  const [password, setPassword] = useState("");

  // 페이지 이동을 처리하는 Next.js Router
  const router = useRouter(); 

  // ==================== 로그인 처리 ====================
  const handleLogin = async () => {

    // 아이디 또는 비밀번호를 입력하지 않았다면
    // 백엔드에 로그인 요청을 보내지 않는다.
    if (!loginId.trim() || !password.trim()) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 입력한 로그인 정보를 Spring Boot 로그인 API로 전송한다.
      const response = await login({
        loginId: loginId.trim(),
        password,
      });

      // 로그인 성공 여부를 개발 중 확인하기 위한 로그
      console.log("로그인 성공:", response);

      // 로그인한 회원의 고유 ID를 브라우저에 저장한다.
      // 이후 다른 화면에서 현재 로그인한 회원을 식별할 때 사용한다.
      localStorage.setItem("userId", String(response.userId));

      // 로그인한 회원의 아이디를 저장한다.
      localStorage.setItem("loginId", response.loginId);

      // 화면에서 사용자 이름을 표시할 때 사용할 닉네임을 저장한다.
      localStorage.setItem("nickname", response.nickname);

      // 사용자에게 로그인 성공 안내
      alert("로그인되었습니다.");
      router.push("/test/chat");

    } catch (error) {
      console.error("로그인 실패:", error);

      // api.ts에서 전달한 백엔드 오류 메시지를 보여준다.
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    // ==================== 전체 로그인 화면 ====================
    <main className="min-h-screen bg-gradient-to-b from-[#f4efff] via-[#faf8ff] to-white px-4 py-8">

      {/* 회원가입 화면과 동일한 모바일 앱 형태의 카드 */}
      <section className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-[0_24px_70px_rgba(116,91,191,0.18)] backdrop-blur-2xl">

        {/* ==================== 제목 ==================== */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-[#241f3a]">
            로그인
          </h1>

          <p className="mt-2 text-sm text-[#8b83aa]">
            InsightMe에 로그인해주세요.
          </p>
        </div>

        {/* ==================== 입력 영역 ==================== */}
        <div className="space-y-5">

          {/* 아이디 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#4c426f]">
              아이디
            </label>

            <input
              type="text"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
              placeholder="아이디를 입력해주세요"
              className="h-12 w-full rounded-2xl border border-[#ded7f7] bg-white px-4 text-sm text-[#241f3a] outline-none transition focus:border-[#6d55dc]"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#4c426f]">
              비밀번호
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="h-12 w-full rounded-2xl border border-[#ded7f7] bg-white px-4 text-sm text-[#241f3a] outline-none transition focus:border-[#6d55dc]"
            />
          </div>

        </div>

        {/* ==================== 로그인 버튼 ==================== */}
        <button
          type="button"
          onClick={handleLogin}
          className="mt-8 h-12 w-full rounded-2xl bg-[#6d55dc] font-bold text-white transition hover:bg-[#5f48c9]"
        >
          로그인
        </button>

      </section>
    </main>
  );
}