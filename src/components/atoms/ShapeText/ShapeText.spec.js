/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import ShapeText from ".";
import { TEXT_SELECTED_STATE } from "../../../test-utils/mockStates";
import {
  deactivateSelector,
  setHoveredShape,
} from "../../../features/utility/utilitySlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const canvasRef = { current: {} };
const canvasIndex = TEXT_SELECTED_STATE.utility.workingCanvasIndex;
const shapeIndex = TEXT_SELECTED_STATE.utility.selectedShapeIndexes[0];
const shape = TEXT_SELECTED_STATE.workbench.present.canvas[0].children[0];

const setup = {
  render: () => {
    render(
      <ShapeText
        canvasRef={canvasRef}
        currentCanvasIndex={canvasIndex}
        currentShapeIndex={shapeIndex}
        {...shape}
      />
    );
  },
};

describe("ShapeText", () => {
  test("Props 로 전달된 텍스트를 화면에 보여줍니다.", () => {
    setup.render();

    screen.getByText(shape.text);
  });

  test("마우스 Hover 시 해당 정보를 스토어에 업데이트 합니다.", async () => {
    setup.render();

    const user = userEvent.setup();
    const shapeText = screen.getByText(shape.text);

    await user.hover(shapeText);

    expect(mockDispatch).toHaveBeenCalledWith(deactivateSelector());
    expect(mockDispatch).toHaveBeenCalledWith(
      setHoveredShape({ canvasIndex, shapeIndex })
    );
  });
});
