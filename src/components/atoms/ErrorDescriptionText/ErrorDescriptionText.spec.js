/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorDescriptionText from ".";
import LOCAL_STORAGE_KEY from "../../../constants/localStorage";

delete window.localStorage;
delete window.location;

window.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

window.location = {
  reload: jest.fn(),
};

describe("ErrorDescriptionText", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("파일로 추출하고 새로고침 클릭시 파일을 다운로드 합니다.", async () => {
    render(<ErrorDescriptionText />);

    const user = userEvent.setup();

    const download = screen.getByText("파일로 추출하고 새로고침 하기.");

    const link = {
      click: jest.fn(),
    };

    jest.spyOn(document, "createElement").mockImplementation(() => link);

    await user.click(download);

    expect(link.click).toHaveBeenCalledTimes(1);
  });

  test("저장하고 새로고침 클릭 시 로컬스토리지에 저장합니다.", async () => {
    render(<ErrorDescriptionText />);

    const user = userEvent.setup();

    const exportData = screen.getByText("저장하고 새로고침 하기.");

    await user.click(exportData);

    expect(window.localStorage.setItem).toBeCalled();
  });

  test("지우고 새로고침 클릭 시 로컬스토리지를 지웁니다.", async () => {
    render(<ErrorDescriptionText />);

    const user = userEvent.setup();

    const removeAndReload = screen.getByText("지우고 새로고침 하기.");

    await user.click(removeAndReload);

    expect(window.localStorage.removeItem).toBeCalledWith(LOCAL_STORAGE_KEY);
  });

  test("새로고침 클릭 시 새로고침 합니다.", async () => {
    render(<ErrorDescriptionText />);

    const user = userEvent.setup();

    const reload = screen.getByText("새로고침 하기.");

    await user.click(reload);

    expect(window.location.reload).toBeCalled();
  });
});
