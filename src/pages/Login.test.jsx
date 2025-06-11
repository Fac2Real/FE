import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import axiosInstance from "../api/axiosInstance";

// 1. 변수를 최상단에 선언
let navigateMock;

// 2. vi.mock 에서는 선언된 변수를 참조만 하도록 설정
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  // navigateMock에 대한 할당을 여기서 하지 않습니다.
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// 정적 자산 모킹
vi.mock("../assets/img/monitory_character_sit.png", () => ({
  default: "test-img.png",
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("<Login />", () => {
  let alertSpy;

  beforeEach(() => {
    // axiosInstance 메서드 모킹 초기화
    axiosInstance.post = vi.fn(() =>
      Promise.resolve({ data: { token: "mock" } })
    );
    axiosInstance.get = vi.fn(() => Promise.resolve({ data: 0 }));

    // 3. beforeEach 에서 모의 함수를 '할당'
    navigateMock = vi.fn();

    // alert 스파이 설정
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    // 사용한 스파이나 모의 객체를 복원하여 테스트 간 격리 보장
    vi.restoreAllMocks();
  });

  it("아이디/비밀번호 입력창과 버튼을 렌더링한다", () => {
    renderWithRouter(<Login />);

    expect(
      screen.getByPlaceholderText("아이디를 입력하세요")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("비밀번호를 입력하세요")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
  });

  it("올바른 자격 증명으로 로그인 시 POST/GET 호출 후 홈으로 이동한다", async () => {
    renderWithRouter(<Login />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("아이디를 입력하세요"),
      "tester"
    );
    await user.type(
      screen.getByPlaceholderText("비밀번호를 입력하세요"),
      "password"
    );
    await user.click(screen.getByRole("button", { name: /로그인/i }));

    expect(axiosInstance.post).toHaveBeenCalledWith("/api/auth/login", {
      username: "tester",
      password: "password",
    });

    await vi.waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith(
        "/api/abnormal/unread-count"
      );
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });

  it("로그인 실패 시 alert를 띄운다", async () => {
    axiosInstance.post.mockRejectedValueOnce(new Error("401 Unauthorized"));
    renderWithRouter(<Login />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("아이디를 입력하세요"),
      "wrong"
    );
    await user.type(
      screen.getByPlaceholderText("비밀번호를 입력하세요"),
      "wrongpw"
    );
    await user.click(screen.getByRole("button", { name: /로그인/i }));

    await vi.waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "아이디 또는 비밀번호가 잘못되었습니다."
      );
    });

    expect(navigateMock).not.toHaveBeenCalled();
    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  it("화면 너비에 따라 로봇 이미지를 보여주거나 숨긴다", () => {
    // 넓은 화면 (초기값으로 인해 보임)
    window.innerWidth = 1024;
    renderWithRouter(<Login />);
    expect(screen.getByRole("img", { name: "" })).toBeInTheDocument();

    // 좁은 화면으로 리사이즈
    window.innerWidth = 500;
    fireEvent(window, new Event("resize"));

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

// 의존성 모킹 (Mocking) 👍:
// useNavigate를 vi.mock을 통해 정확하게 모킹했습니다.
// useNavigate는 실제 라우팅을 발생시키므로, 테스트 환경에서는 모의 함수(mock function)로 대체하여 "호출되었는지" 여부만 확인하는 것이 정석입니다.
// axiosInstance의 post, get 메서드를 vi.fn()으로 모킹하여 실제 네트워크 요청이 발생하지 않도록 했습니다. 이는 테스트를 빠르고 안정적으로 만듭니다.
// 이미지 파일(monitory_character_sit.png)을 모킹한 것은 정말 훌륭합니다.
// 테스트 환경에서 정적 자산(static asset) 로딩으로 인한 오류를 원천적으로 차단하는 좋은 방법입니다.
// 테스트 구조와 격리 👍:
// describe 블록으로 테스트 스위트를 구성하고, it (또는 test)으로 개별 테스트 케이스를 명확하게 분리했습니다.
// beforeEach를 사용해 각 테스트가 실행되기 전에 모의 객체들을 초기화하고 있습니다.
// 이는 테스트 간의 의존성을 없애고 독립성을 보장하는 핵심적인 부분입니다.
// 사용자 중심 테스트 👍:
// @testing-library/user-event를 사용하여 실제 사용자가 상호작용하는 방식(타이핑, 클릭)과 유사하게 테스트를 작성했습니다.
// 이는 컴포넌트의 내부 구현보다 사용자가 경험하는 결과에 집중하는 좋은 접근 방식입니다.
// getByPlaceholderText, getByRole과 같은 시맨틱한 쿼리를 사용하여 테스트의 가독성과 안정성을 높였습니다.
// 비동기 처리 👍:
// API 호출 및 상태 업데이트와 같은 비동기 동작을 테스트하기 위해 async/await와 vi.waitFor를 적절하게 사용했습니다.
// waitFor를 통해 DOM이 업데이트되거나 모의 함수가 호출될 때까지 기다리는 로직은 비동기 테스트의 필수 요소입니다.
