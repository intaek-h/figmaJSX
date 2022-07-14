/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import Canvas from ".";
import { INITIAL_STATE } from "../../../test-utils/mockStates";
import { changeCanvasName } from "../../../features/canvas/canvasSlice";

const mockDispatch = jest.fn();
const artBoardRef = { current: { appendChild: jest.fn() } };
const canvasIndex = 0;
const canvas = INITIAL_STATE.workbench.present.canvas[canvasIndex];

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(
      <Canvas artBoardRef={artBoardRef} canvasIndex={canvasIndex} {...canvas} />
    );
  },
};

describe("Canvas", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("캔버스의 이름을 볼 수 있습니다.", () => {
    setup.render();

    screen.getByText(canvas.canvasName);
  });

  test("캔버스 이름을 더블클릭해서 캔버스 이름을 변경할 수 있습니다.", async () => {
    setup.render();

    const user = userEvent.setup();

    const canvasName = screen.getByText("canvas_0");
    const canvas = screen.getByTestId("canvas");

    await user.dblClick(canvasName);

    const input = screen.getByRole("textbox");

    await user.type(input, "new canvas name!");
    await user.click(canvas);

    expect(mockDispatch).toHaveBeenCalledWith(
      changeCanvasName({ name: "canvas_0new canvas name!", canvasIndex })
    );
  });
});
