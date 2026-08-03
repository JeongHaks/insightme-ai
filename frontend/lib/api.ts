// 백엔드 서버의 기본 주소
const BASE_URL = "http://localhost:8080";

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