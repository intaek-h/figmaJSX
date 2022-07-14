import { useRef } from "react";

import directions from "../../../constants/directions";
import { EDIT_POINTER_STYLES } from "../../../constants/styles";
import useDragToResize from "../../../hooks/useDragToResize";

function EditPointer({ direction, ...shape }) {
  const position = {};
  const pointerHalfWidth = Number(EDIT_POINTER_STYLES.WIDTH.slice(0, 1)) / 2;

  const pointerRef = useRef();

  useDragToResize(pointerRef, direction);

  switch (direction) {
    case directions.N:
      position.top = shape.top - pointerHalfWidth;
      position.left = (shape.left + shape.width) / 2 - pointerHalfWidth;
      position.cursor = "ns-resize";
      break;
    case directions.E:
      position.top = (shape.top + shape.height) / 2 - pointerHalfWidth;
      position.left = shape.width - pointerHalfWidth;
      position.cursor = "ew-resize";
      break;
    case directions.S:
      position.top = shape.height - pointerHalfWidth;
      position.left = (shape.left + shape.width) / 2 - pointerHalfWidth;
      position.cursor = "ns-resize";
      break;
    case directions.W:
      position.top = (shape.top + shape.height) / 2 - pointerHalfWidth;
      position.left = shape.left - pointerHalfWidth;
      position.cursor = "ew-resize";
      break;
    case directions.NE:
      position.top = shape.top - pointerHalfWidth;
      position.left = shape.width - pointerHalfWidth;
      position.cursor = "nesw-resize";
      break;
    case directions.NW:
      position.top = shape.top - pointerHalfWidth;
      position.left = shape.left - pointerHalfWidth;
      position.cursor = "nwse-resize";
      break;
    case directions.SE:
      position.top = shape.height - pointerHalfWidth;
      position.left = shape.width - pointerHalfWidth;
      position.cursor = "nwse-resize";
      break;
    case directions.SW:
      position.top = shape.height - pointerHalfWidth;
      position.left = shape.left - pointerHalfWidth;
      position.cursor = "nesw-resize";
      break;
  }

  const pointerStyle = {
    top: position.top,
    left: position.left,
    width: EDIT_POINTER_STYLES.WIDTH,
    height: EDIT_POINTER_STYLES.HEIGHT,
    backgroundColor: EDIT_POINTER_STYLES.BG_COLOR,
    position: EDIT_POINTER_STYLES.POSITION,
    border: EDIT_POINTER_STYLES.BORDER,
    cursor: position.cursor,
    boxSizing: EDIT_POINTER_STYLES.BOX_SIZING,
  };

  return (
    <div
      ref={pointerRef}
      style={pointerStyle}
      draggable={false}
      data-testid="edit-pointer"
    ></div>
  );
}

export default EditPointer;
