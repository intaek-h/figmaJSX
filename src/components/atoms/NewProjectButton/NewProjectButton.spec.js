/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import NewProjectButton from ".";
import { resetGlobalStyles } from "../../../features/globalStyles/globalStylesSlice";
import { resetUtility } from "../../../features/utility/utilitySlice";
import { resetCanvas } from "../../../features/canvas/canvasSlice";
import { ActionCreators } from "redux-undo";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<NewProjectButton />);
  },
};

describe("NewProjectButton", () => {
  test("클릭하면 스토어를 리셋합니다.", async () => {
    setup.render();

    const user = userEvent.setup();
    const button = screen.getByText("New Project");

    await user.click(button);

    expect(mockDispatch).toBeCalledWith(resetCanvas());
    expect(mockDispatch).toBeCalledWith(resetUtility());
    expect(mockDispatch).toBeCalledWith(resetGlobalStyles());
    expect(mockDispatch).toBeCalledWith(ActionCreators.clearHistory());
  });
});
