/**
 * @jest-environment jsdom
 */

import ThicknessInputField from ".";
import { LINE_SELECTED_STATE } from "../../../test-utils/mockStates";
import render, { screen } from "../../../test-utils/wrappedRender";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<ThicknessInputField />);
  },
  renderTextSelected: () => {
    render(<ThicknessInputField />, { preloadedState: LINE_SELECTED_STATE });
  },
};

describe("ThicknessInputField", () => {
  test("기본값은 Global Thickness 입니다.", () => {
    setup.render();

    const input = screen.getByTestId("thickness-input");

    expect(input).toHaveValue(
      LINE_SELECTED_STATE.workbench.present.globalStyles.thickness
    );
  });

  test("Line 을 선택했다면 해당 Line 의 두께를 보여줍니다.", () => {
    setup.renderTextSelected();

    const input = screen.getByTestId("thickness-input");

    expect(input).toHaveValue(
      LINE_SELECTED_STATE.workbench.present.canvas[0].children[0].height
    );
  });
});
