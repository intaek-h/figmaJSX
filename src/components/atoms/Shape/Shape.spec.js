/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import Shape from ".";
import {
  deactivateSelector,
  setHoveredShape,
} from "../../../features/utility/utilitySlice";
import { SHAPE_SELECTED_STATE } from "../../../test-utils/mockStates";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const prepare = {
  canvasRef: { current: {} },
  currentCanvasIndex: 0,
  currentShapeIndex: 0,
  shape: {
    top: 0,
    left: 0,
    height: 50,
    width: 50,
  },
};

const setup = {
  render: () => {
    render(
      <div>
        <Shape
          canvasRef={prepare.canvasRef}
          currentCanvasIndex={prepare.currentCanvasIndex}
          currentShapeIndex={prepare.currentShapeIndex}
          {...prepare.shape}
        />
      </div>
    );
  },
};

describe("Shape", () => {
  test("도형에 마우스를 Hover 하면 스토어에 해당 정보가 업데이트 됩니다.", async () => {
    setup.render();

    const user = userEvent.setup();
    const shape = screen.getByTestId("shape");

    await user.hover(shape);

    const canvasIndex = SHAPE_SELECTED_STATE.utility.workingCanvasIndex;
    const shapeIndex = SHAPE_SELECTED_STATE.utility.selectedShapeIndexes[0];

    expect(mockDispatch).toHaveBeenCalledWith(deactivateSelector());
    expect(mockDispatch).toHaveBeenCalledWith(
      setHoveredShape({ canvasIndex, shapeIndex })
    );
  });
});
