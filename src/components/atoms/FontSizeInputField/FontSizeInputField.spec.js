/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import FontSizeInputField from ".";
import {
  INITIAL_STATE,
  TEXT_SELECTED_STATE,
} from "../../../test-utils/mockStates";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<FontSizeInputField />);
  },
  renderTextSelected: () => {
    render(<FontSizeInputField />, { preloadedState: TEXT_SELECTED_STATE });
  },
};

describe("FontSizeInputField", () => {
  test("기본값은 Global Font Size 입니다.", () => {
    setup.render();

    const input = screen.getByTestId("font-size-input");

    expect(input.value).toBe(
      `${INITIAL_STATE.workbench.present.globalStyles.fontSize}`
    );
  });

  test("텍스트를 선택했다면 해당 텍스트의 폰트 사이즈를 보여줍니다.", () => {
    setup.renderTextSelected();

    const input = screen.getByTestId("font-size-input");

    expect(input.value).toBe(
      `${TEXT_SELECTED_STATE.workbench.present.canvas[0].children[0].fontSize}`
    );
  });
});
