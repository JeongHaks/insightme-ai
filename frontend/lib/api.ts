// 백엔드 서버의 기본 주소
// NEXT_PUBLIC_API_URL 환경변수가 있으면 해당 주소를 사용한다.
// 환경변수가 없는 로컬 개발에서는 기존 localhost:8080을 사용한다.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * 테스트 시작 API
 * 사용자가 입력한 기본 정보를 백엔드로 전송한다.
 */
export async function createTestAttempt(data: {
  gender: string;
  ageGroup: string;
  jobGroup: string;
  mbti: string;
}) {

  // 백엔드의 테스트 시작 API를 호출한다.
  const response = await fetch(`${BASE_URL}/api/test-attempts`, {
    method: "POST", // POST 방식으로 데이터 전송
    headers: {
      // JSON 형식의 데이터를 전송한다고 알려준다.
      "Content-Type": "application/json",
    },

    // JavaScript 객체를 JSON 문자열로 변환하여 전송한다.
    body: JSON.stringify(data),
  });

  // 응답이 실패한 경우 예외를 발생시킨다.
  if (!response.ok) {
    throw new Error("테스트 시작에 실패했습니다.");
  }

  // 백엔드가 반환한 JSON 데이터를 프론트로 전달한다.
  return response.json();
}

/**
 * 테스트 문항 조회 API
 * 백엔드에서 활성화된 문항 목록을 조회한다.
 */
export async function getTestQuestions() {

  // 백엔드의 문항 조회 API를 호출한다.
  const response = await fetch(`${BASE_URL}/api/test-questions`, {
    method: "GET",
  });

  // 응답이 실패하면 예외를 발생시킨다.
  if (!response.ok) {
    throw new Error("문항 조회에 실패했습니다.");
  }

  // 백엔드가 반환한 JSON 데이터를 반환한다.
  return response.json();
}


/**
 * 특정 문항의 선택지를 조회한다.
 * @param questionId 문항 ID
 */
export async function getTestOptions(questionId: number) {

  // 선택지 조회 API 호출
  const response = await fetch(
    `${BASE_URL}/api/test-options/${questionId}`
  );

  // 실패 시 예외 발생
  if (!response.ok) {
    throw new Error("선택지 조회에 실패했습니다.");
  }

  // JSON 반환
  return response.json();
}


/**
 * 테스트 답변 저장 API
 *
 * 사용자가 선택한 문항 답변을 백엔드로 전송한다.
 */
export async function saveTestAnswer(data: {
  // 기본정보 저장 시 발급받은 테스트 실행 ID
  attemptId: string;

  // 답변한 문항 ID
  questionId: number;

  // 사용자가 선택한 답변 코드
  // 예: A 또는 B
  selectedOptionCode: "A" | "B";
}) {
  // 백엔드의 답변 저장 API를 호출한다.
  const response = await fetch(`${BASE_URL}/api/test-answers`, {
    method: "POST",

    headers: {
      // JSON 데이터를 전송한다고 백엔드에 알려준다.
      "Content-Type": "application/json",
    },

    // JavaScript 객체를 JSON 문자열로 변환해서 전송한다.
    body: JSON.stringify(data),
  });

  // 응답이 실패하면 오류를 발생시킨다.
  if (!response.ok) {
    throw new Error("테스트 답변 저장에 실패했습니다.");
  }
}


/**
 * 테스트 최종 결과 계산 API
 *
 * 저장된 답변을 기준으로 백엔드에서
 * NS, HA, RD, SD 점수를 계산하고 결과를 생성한다.
 */
export async function calculateTestResult(attemptId: string) {
  // attemptId를 URL에 넣어 결과 계산 API를 호출한다.
  const response = await fetch(
    `${BASE_URL}/api/test-results/${attemptId}`,
    {
      method: "POST",
    }
  );

  // 결과 계산에 실패하면 오류를 발생시킨다.
  if (!response.ok) {
    throw new Error("테스트 결과 계산에 실패했습니다.");
  }

  // 백엔드가 반환한 결과 JSON을 프론트로 전달한다.
  return response.json();
}

/**
 * AI 채팅 메시지 전송
 * /test/chat 화면에서 사용자가 입력한 질문을 Spring Boot로 보내고, Gemini 답변을 받아오기 위해서야.
 */
export async function sendChatMessage(data: {
  attemptId: string;
  message: string;
}) {
  const response = await fetch(`${BASE_URL}/api/chat/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("AI 채팅 전송에 실패했습니다.");
  }

  return response.json();
}

/**
 * 특정 채팅방의 기존 대화 내역 조회
 * 사용자가 /test/chat 화면에 다시 들어왔을 때 DB에 저장된 기존 USER/AI 대화를 불러와서 이어서 보여주기 위해
 */
export async function getChatHistory(chatRoomId: number) {
  const response = await fetch(
    `${BASE_URL}/api/chat/rooms/${chatRoomId}/messages`
  );

  if (!response.ok) {
    throw new Error("채팅 내역 조회에 실패했습니다.");
  }

  return response.json();
}


/**
 * 회원가입 API
 *
 * 사용자가 회원가입 화면에서 입력한
 * 아이디, 비밀번호, 닉네임을 Spring Boot로 전송한다.
 */
export async function signup(data: {
  loginId: string;
  password: string;
  nickname: string;
}) {
  // 백엔드 회원가입 API를 호출한다.
  const response = await fetch(`${BASE_URL}/api/users/signup`, {
    method: "POST",

    headers: {
      // JSON 형식으로 회원가입 정보를 전송한다.
      "Content-Type": "application/json",
    },

    // JavaScript 객체를 JSON 문자열로 변환해서 전송한다.
    body: JSON.stringify(data),
  });

  // 회원가입에 실패한 경우
  if (!response.ok) {
    // 백엔드에서 전달한 오류 메시지를 가져온다.
    // 예: "이미 사용 중인 아이디입니다."
    const errorMessage = await response.text();

    throw new Error(
      errorMessage || "회원가입에 실패했습니다."
    );
  }

  // 회원가입 성공 시
  // userId, loginId, nickname을 반환한다.
  return response.json();
}


/**
 * 로그인 API
 *
 * 사용자가 로그인 화면에서 입력한
 * 아이디와 비밀번호를 Spring Boot로 전송한다.
 */
export async function login(data: {
    loginId: string;
    password: string;
  }) {

    // 백엔드 로그인 API를 호출한다.
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",

      headers: {
        // JSON 형식으로 로그인 정보를 전송한다.
        "Content-Type": "application/json",
      },

      // 사용자가 입력한 아이디와 비밀번호를
      // JSON 문자열로 변환해서 백엔드에 전송한다.
      body: JSON.stringify(data),
    });

    // 로그인에 실패한 경우
    if (!response.ok) {

      // 백엔드에서 전달한 오류 메시지를 가져온다.
      // 예: "아이디 또는 비밀번호가 올바르지 않습니다."
      const errorMessage = await response.text();

      throw new Error(
        errorMessage || "로그인에 실패했습니다."
      );
    }

    // 로그인 성공 시
    // 백엔드 LoginResponse의
    // userId, loginId, nickname을 반환한다.
    return response.json();
  }