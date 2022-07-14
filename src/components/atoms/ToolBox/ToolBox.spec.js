/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import ToolBox from ".";
import tools from "../../../constants/tools";
import { setCurrentTool } from "../../../features/utility/utilitySlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<ToolBox tool={tools.RECTANGLE} />);
  },
};

describe("ToolBox", () => {
  test("Props 로 전달된 Tool 을 클래스 이름에 반영합니다.", () => {
    setup.render();

    const toolbox = screen.getByTestId("toolbox");

    expect(toolbox).toHaveClass(`box-${tools.RECTANGLE}`);
  });

  test("클릭하면 Props 로 전달된 Tool 로 스토어를 업데이트 합니다.", async () => {
    setup.render();

    const user = userEvent.setup();
    const toolbox = screen.getByTestId("toolbox");

    await user.click(toolbox);

    expect(mockDispatch).toHaveBeenCalledWith(setCurrentTool(tools.RECTANGLE));
  });
});
