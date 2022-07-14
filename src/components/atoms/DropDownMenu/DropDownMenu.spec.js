/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import DropDownMenu from ".";
import { setCurrentScale } from "../../../features/utility/utilitySlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<DropDownMenu />);
  },
};

describe("DropDownMenu", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("100% 줌과 줌아웃 버튼이 기본 옵션입니다.", () => {
    setup.render();

    screen.getByText("100 %");
    screen.getByText("zoom out");
  });

  test("버튼을 클릭하면 해당 배율로 확대/축소 됩니다.", async () => {
    setup.render();

    const user = userEvent.setup();

    const zoomOut = screen.getByText("zoom out");

    await user.click(zoomOut);

    expect(mockDispatch).toBeCalledWith(setCurrentScale(0.9));
  });

  test("현재 줌 배율을 보여줍니다.", () => {
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue(0.5);

    setup.render();

    screen.getByText("50 %");
  });
});
