"use client";

import { useState } from "react";
// 회원가입 정보를 Spring Boot로 전송하는 API 함수
import { signup } from "@/lib/api";

// 회원가입 성공 후 로그인 화면으로 이동하기 위해 사용한다.
import { useRouter } from "next/navigation";

/**
 * 회원가입 화면
 *
 * 사용자가 로그인 아이디, 비밀번호, 닉네임을 입력하고
 * InsightMe 회원으로 가입하는 화면이다.
 */
export default function SignupPage() {

  // ==================== 회원가입 입력값 ====================

  // 로그인할 때 사용할 아이디
  const [loginId, setLoginId] = useState("");

  // 사용자가 입력한 비밀번호
  const [password, setPassword] = useState("");

  // 서비스에서 사용할 닉네임
  const [nickname, setNickname] = useState("");
  
  // 페이지 이동을 처리하는 Next.js Router
  const router = useRouter();

  // ==================== 회원가입 처리 ====================
    const handleSignup = async () => {

    // 아이디, 비밀번호, 닉네임 중 하나라도 입력하지 않았으면
    // 회원가입 요청을 보내지 않는다.
    if (!loginId.trim() || !password.trim() || !nickname.trim()) {
        alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");
        return;
    }

    try {
        // 비회원으로 테스트를 진행할 때 저장해둔 attemptId를 가져온다.
        // 테스트 없이 바로 회원가입한 경우에는 null이 될 수 있다.
        const attemptId = localStorage.getItem("attemptId");
      
        // 입력한 회원정보를 Spring Boot 회원가입 API로 전송한다.
        const response = await signup({
        loginId: loginId.trim(),
        password,
        nickname: nickname.trim(),
        // attemptId가 존재하면 백엔드에서
        // 기존 비회원 테스트를 새 회원에게 연결한다.
        attemptId: attemptId ?? undefined,
        });

        // 회원가입 성공 확인
        console.log("회원가입 성공:", response);

        // 사용자에게 회원가입 완료 안내
        alert("회원가입이 완료되었습니다.");
        // 회원가입이 완료되면 로그인 화면으로 이동한다.
        router.push("/login");

    } catch (error) {
        console.error("회원가입 실패:", error);

        // api.ts에서 전달한 오류 메시지를 사용자에게 보여준다.
        if (error instanceof Error) {
        alert(error.message);
        } else {
        alert("회원가입 중 오류가 발생했습니다.");
        }
    }
    };

  return (
    // ==================== 전체 회원가입 화면 ====================
    <main className="min-h-screen bg-gradient-to-b from-[#f4efff] via-[#faf8ff] to-white px-4 py-8">

      {/* 모바일 앱 형태의 회원가입 카드 */}
      <section className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-[0_24px_70px_rgba(116,91,191,0.18)] backdrop-blur-2xl">

        {/* ==================== 제목 ==================== */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-[#241f3a]">
            회원가입
          </h1>

          <p className="mt-2 text-sm text-[#8b83aa]">
            간단한 정보만 입력하고 시작해보세요.
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

          {/* 닉네임 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#4c426f]">
              닉네임
            </label>

            <input
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="사용할 닉네임을 입력해주세요"
              className="h-12 w-full rounded-2xl border border-[#ded7f7] bg-white px-4 text-sm text-[#241f3a] outline-none transition focus:border-[#6d55dc]"
            />
          </div>

        </div>

        {/* ==================== 회원가입 버튼 ==================== */}
        <button
          type="button"
          onClick={handleSignup}
          className="mt-8 h-12 w-full rounded-2xl bg-[#6d55dc] font-bold text-white transition hover:bg-[#5f48c9]"
        >
          회원가입
        </button>

      </section>
    </main>
  );
}