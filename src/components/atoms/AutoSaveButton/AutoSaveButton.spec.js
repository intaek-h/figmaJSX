/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AutoSaveButton from ".";

describe("AutoSaveButton", () => {
  // beforeEach(() => {
  //   jest.useFakeTimers();
  // });

  // afterEach(() => {
  //   jest.runOnlyPendingTimers();
  //   jest.useRealTimers();
  // });

  test("기본적으로 자동 저장 켜기 텍스트가 보입니다.", () => {
    render(<AutoSaveButton />);

    const text = screen.getByText("자동 저장 켜기");

    expect(text).toBeInTheDocument();
  });

  test("버튼을 누르면 자동 저장 끄기 텍스트와 체크 아이콘이 보입니다.", async () => {
    render(<AutoSaveButton />);

    const user = userEvent.setup();

    await user.click(screen.getByText("자동 저장 켜기"));
    // jest.runAllTimers();
    // jest.advanceTimersByTime(20000);

    screen
      .getByText("자동 저장 끄기")
      .classList.contains("material-symbols-outlined");

    await user.click(screen.getByText("자동 저장 끄기"));
  });

  // test("버튼을 누르면 타이머가 시작됩니다.", async () => {
  //   render(<AutoSaveButton />);

  //   const user = userEvent.setup();

  //   await user.click(screen.getByText("자동 저장 켜기"));

  //   jest.runAllTimers();

  //   jest.advanceTimersByTime(20000);

  //   screen.getByText("자동 저장 끄기").classList.contains("icon-visible");

  //   expect(setTimeout).toHaveBeenCalledTimes(1);
  //   await user.click(screen.getByText("자동 저장 끄기"));
  //   jest.clearAllTimers();
  // });
});
