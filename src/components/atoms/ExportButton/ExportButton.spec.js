/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import ExportButton from ".";

delete window.location;

window.location = {
  reload: jest.fn(),
};

describe("ExportButton", () => {
  test("Export 버튼을 클릭하면 다운로드가 실행됩니다.", async () => {
    render(<ExportButton />);

    const user = userEvent.setup();

    const download = screen.getByText("Export File");

    const link = {
      click: jest.fn(),
    };

    jest.spyOn(document, "createElement").mockImplementation(() => link);

    await user.click(download);

    expect(link.click).toHaveBeenCalledTimes(1);
  });
});
