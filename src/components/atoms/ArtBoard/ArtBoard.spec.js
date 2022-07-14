/**
 * @jest-environment jsdom
 */

import ArtBoard from ".";
import { INITIAL_STATE } from "../../../test-utils/mockStates";
import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import { emptySelectedShapeIndexes } from "../../../features/utility/utilitySlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<ArtBoard />);
  },
  canvas1: INITIAL_STATE.workbench.present.canvas[0],
};

describe("ArtBoard", () => {
  test("첫 렌더링 시 마지막 캔버스를 화면 정중앙에 놓습니다.", () => {
    setup.render();

    const outerBoard = screen.getByTestId("outer-board");

    expect(outerBoard.scrollTop).toBe(setup.canvas1.top - 100);
    expect(outerBoard.scrollLeft).toBe(
      setup.canvas1.left - outerBoard.clientWidth / 2 + setup.canvas1.width / 2
    );
  });

  test("아트보드를 클릭하면 도형 선택을 초기화 합니다.", async () => {
    setup.render();

    const innerBoard = screen.getByTestId("inner-board");

    const user = userEvent.setup();

    await user.click(innerBoard);

    expect(mockDispatch).toBeCalledWith(emptySelectedShapeIndexes());
  });
});
