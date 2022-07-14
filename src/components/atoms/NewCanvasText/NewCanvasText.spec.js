/**
 * @jest-environment jsdom
 */

import NewCanvasText from ".";
import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import { setCurrentTool } from "../../../features/utility/utilitySlice";
import tools from "../../../constants/tools";
import { CANVAS_TOOL_STATE } from "../../../test-utils/mockStates";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<NewCanvasText text="new canvas" />);
  },
  renderRectangleTool: () => {
    render(<NewCanvasText text="new canvas" />, {
      preloadedState: CANVAS_TOOL_STATE,
    });
  },
};

describe("NewCanvasText", () => {
  test("Props 로 전달된 텍스트를 보여줍니다.", () => {
    setup.render();

    screen.getByText("new canvas");
  });

  test("Selector 툴로 텍스트를 클릭하면 Canvas 툴로 변경할 수 있습니다.", async () => {
    setup.render();

    const user = userEvent.setup();
    const button = screen.getByText("new canvas");

    await user.click(button);

    expect(mockDispatch).toBeCalledWith(setCurrentTool(tools.CANVAS));
  });

  test("클릭 했다면 selected 클래스를 갖습니다.", async () => {
    setup.renderRectangleTool();

    const user = userEvent.setup();
    const button = screen.getByText("new canvas");

    await user.click(button);

    expect(button.className).toBe("selected");
  });
});
