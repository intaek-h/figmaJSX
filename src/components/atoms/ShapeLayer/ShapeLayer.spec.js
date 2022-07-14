/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import ShapeLayer from ".";
import { SHAPE_SELECTED_STATE } from "../../../test-utils/mockStates";
import {
  replaceSelectedShapeIndexes,
  setHoveredShape,
} from "../../../features/utility/utilitySlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const SELECTED_SHAPE_NAME =
  SHAPE_SELECTED_STATE.workbench.present.canvas[0].children[0].name;

const canvasIndex = SHAPE_SELECTED_STATE.utility.workingCanvasIndex;
const shapeIndex = SHAPE_SELECTED_STATE.utility.selectedShapeIndexes[0];

const setup = {
  render: () => {
    render(<ShapeLayer name="Rectangle" />);
  },
  renderWithShape: () => {
    render(
      <ShapeLayer
        name={SELECTED_SHAPE_NAME}
        currentCanvasIndex={canvasIndex}
        currentShapeIndex={shapeIndex}
      />,
      {
        preloadedState: SHAPE_SELECTED_STATE,
      }
    );
  },
};

describe("ShapeLayer", () => {
  test("Props 로 전달된 텍스트를 화면에 보여줍니다.", () => {
    setup.render();

    screen.getByText("Rectangle");
  });

  test("마우스 Hover 시 해당 도형이 Hover 되었다는 정보를 스토어에 업데이트 합니다.", async () => {
    setup.renderWithShape();

    const user = userEvent.setup();
    const layer = screen.getByText(SELECTED_SHAPE_NAME);

    await user.hover(layer);

    expect(mockDispatch).toHaveBeenCalledWith(
      setHoveredShape({ canvasIndex, shapeIndex })
    );
  });

  test("마우스 Click 시 해당 도형이 선택 되었다는 정보를 스토어에 업데이트 합니다.", async () => {
    setup.renderWithShape();

    const user = userEvent.setup();
    const layer = screen.getByText(SELECTED_SHAPE_NAME);

    await user.click(layer);

    expect(mockDispatch).toHaveBeenCalledWith(
      replaceSelectedShapeIndexes(shapeIndex)
    );
  });
});
