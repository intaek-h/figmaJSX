/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import EditPointer from ".";
import { EDIT_POINTER_STYLES } from "../../../constants/styles";

describe("EditPointer", () => {
  test("편집점의 위치는 주어진 방향에 따라 정해집니다.", () => {
    const shape = {
      top: 0,
      left: 0,
      height: 10,
      width: 10,
    };
    render(<EditPointer direction="n" {...shape} />);

    const pointer = screen.getByTestId("edit-pointer");
    const pointerWidth = Number(EDIT_POINTER_STYLES.WIDTH.slice(0, 1));

    expect(pointer.style.top).toBe(`${shape.top - pointerWidth / 2}px`);
  });
});
