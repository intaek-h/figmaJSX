import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  activateSelector,
  deactivateSelector,
} from "../../../features/utility/utilitySlice";
import useDragShape from "../../../hooks/useDragShape";
import styles from "./Shape.module.scss";

function Shape({ canvasIndex, shapeIndex, ...shape }) {
  const dispatch = useDispatch();

  const shapeRef = useRef();

  const [isMouseHovered, setIsMouseHovered] = useState(false);

  useDragShape(shapeRef, canvasIndex, shapeIndex);

  return (
    <div
      ref={shapeRef}
      className={styles.shape}
      style={{ ...shape, border: isMouseHovered && "2px solid #b0d0ff" }}
      onMouseEnter={() => {
        dispatch(deactivateSelector());
        setIsMouseHovered(true);
      }}
      onMouseLeave={() => {
        dispatch(activateSelector());
        setIsMouseHovered(false);
      }}
    ></div>
  );
}

export default Shape;
