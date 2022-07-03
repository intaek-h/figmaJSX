import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { modifyShape } from "../../../features/canvas/canvasSlice";
import {
  selectGlobalColor,
  selectGlobalFontSize,
} from "../../../features/globalStyles/globalStylesSlice";
import {
  activateSelector,
  deactivateSelector,
} from "../../../features/utility/utilitySlice";
import useDragShape from "../../../hooks/useDragShape";
import style from "./ShapeText.module.scss";

function ShapeText({ canvasIndex, shapeIndex, ...canvas }) {
  const dispatch = useDispatch();

  const globalColor = useSelector(selectGlobalColor);
  const globalFontSize = useSelector(selectGlobalFontSize);

  const shapeRef = useRef();
  const inputRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isMouseHovered, setIsMouseHovered] = useState(false);

  useDragShape(shapeRef, canvasIndex, shapeIndex);

  if (isDoubleClicked)
    return (
      <form>
        <div
          ref={inputRef}
          className={style.input}
          style={{
            top: canvas.top,
            left: canvas.left,
            fontSize: globalFontSize,
            color: globalColor,
          }}
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          onBlur={() => {
            const newText = {
              text: inputRef.current.textContent,
              color: globalColor,
              fontSize: globalFontSize,
              canvasIndex,
              shapeIndex,
            };

            setIsDoubleClicked(false);
            setIsMouseHovered(false);
            dispatch(modifyShape(newText));
            dispatch(activateSelector());
          }}
        >
          {canvas.text}
        </div>
      </form>
    );

  return (
    <div
      ref={shapeRef}
      className={style.idle}
      style={{
        ...canvas,
        borderBottom: isMouseHovered ? "1px dotted black" : "none",
      }}
      onMouseEnter={() => {
        console.log("entered");
        dispatch(deactivateSelector());
        setIsMouseHovered(true);
      }}
      onMouseLeave={() => {
        dispatch(activateSelector());
        setIsMouseHovered(false);
      }}
      onDoubleClick={() => {
        setIsDoubleClicked(true);
      }}
    >
      {canvas.text}
    </div>
  );
}

export default ShapeText;
