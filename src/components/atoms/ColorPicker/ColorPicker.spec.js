/**
 * @jest-environment jsdom
 */

import ColorPicker from ".";
import { INITIAL_STATE } from "../../../test-utils/mockStates";
import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import {
  setInputFieldBlurred,
  setInputFieldFocused,
} from "../../../features/utility/utilitySlice";
import { setGlobalColor } from "../../../features/globalStyles/globalStylesSlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<ColorPicker />);
  },
  globalColor: INITIAL_STATE.workbench.present.globalStyles.color,
};

describe("ColorPicker", () => {
  test("Color Picker 의 기본 값은 Global Color 입니다.", () => {
    setup.render();

    screen.getByText(setup.globalColor);
  });

  test("Color Picker 를 클릭하면 setInputFieldFocused 액션을 디스패치 합니다.", async () => {
    setup.render();

    const user = userEvent.setup();

    await user.click(screen.getByTestId("color-picker"));

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(setInputFieldFocused());
  });

  test("Blur 이벤트 발생시 Global Color 를 변경합니다.", async () => {
    setup.render();

    const user = userEvent.setup();

    await user.click(screen.getByTestId("color-picker"));
    await user.click(screen.getByTestId("color-picker").parentElement);

    expect(mockDispatch).toBeCalledWith(setInputFieldFocused());
    expect(mockDispatch).toBeCalledWith(setGlobalColor(setup.globalColor));
    expect(mockDispatch).toBeCalledWith(setInputFieldBlurred());
  });
});
