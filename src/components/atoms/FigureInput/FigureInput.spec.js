/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import FigureInput from ".";
import {
  MULTIPLE_SHAPE_SELECTED_STATE,
  SHAPE_SELECTED_STATE,
} from "../../../test-utils/mockStates";

const FIGURE = "X";

const setup = {
  render: () => {
    render(<FigureInput figure={FIGURE} />);
  },
  renderSingleShapeSelected: () => {
    render(<FigureInput figure={FIGURE} />, {
      preloadedState: SHAPE_SELECTED_STATE,
    });
  },
  renderMultipleShapeSelected: () => {
    render(<FigureInput figure={FIGURE} />, {
      preloadedState: MULTIPLE_SHAPE_SELECTED_STATE,
    });
  },
};

describe("FigureInput", () => {
  test("Props 로 전달된 Figure 가 Label 값이 됩니다.", () => {
    setup.render();

    screen.getByText(FIGURE);
  });

  test("도형을 선택하지 않았다면 0 을 보여줍니다.", () => {
    setup.render();

    const input = screen.getByTestId("disabled-figure-input");

    expect(input.value).toBe("0");
  });

  test("도형을 1 개 선택했다면 해당 도형의 크기/위치 정보가 보여집니다.", () => {
    setup.renderSingleShapeSelected();

    const selectedShape =
      SHAPE_SELECTED_STATE.workbench.present.canvas[0].children[0];

    const input = screen.getByTestId("figure-input");

    expect(input.value).toBe(`${selectedShape.left}`);
  });

  test("도형을 여러개 선택했다면 0 을 보여줍니다.", () => {
    setup.renderMultipleShapeSelected();

    const input = screen.getByTestId("disabled-figure-input");

    expect(input.value).toBe("0");
  });
});
