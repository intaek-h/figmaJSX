import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import directions from "../../../constants/directions";

import { modifyShape } from "../../../features/canvas/canvasSlice";
import {
  selectGlobalColor,
  selectGlobalFontSize,
} from "../../../features/globalStyles/globalStylesSlice";
import {
  activateSelector,
  deactivateSelector,
  replaceSelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
  selectHoveredShape,
  selectSelectedShapeIndexes,
  setHoveredShape,
  setWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import useDragShape from "../../../hooks/useDragShape";
import EditPointer from "../EditPointer";
import style from "./ShapeText.module.scss";

function ShapeText({
  canvasIndex: currentCanvasIndex,
  shapeIndex: currentShapeIndex,
  ...canvas
}) {
  const dispatch = useDispatch();

  const globalColor = useSelector(selectGlobalColor);
  const globalFontSize = useSelector(selectGlobalFontSize);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const { canvasIndex, shapeIndex } = useSelector(selectHoveredShape);

  const shapeRef = useRef();
  const inputRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isMouseHovered, setIsMouseHovered] = useState(false);

  useDragShape(shapeRef, currentCanvasIndex, currentShapeIndex);

  useEffect(() => {
    if (
      canvasIndex === currentCanvasIndex &&
      shapeIndex === currentShapeIndex
    ) {
      return setIsMouseHovered(true);
    }

    setIsMouseHovered(false);
  }, [canvasIndex, currentShapeIndex, shapeIndex, currentCanvasIndex]);

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
          onBlur={(e) => {
            const newText = {
              text: inputRef.current.textContent,
              color: globalColor,
              fontSize: globalFontSize,
              height: e.target.clientHeight,
              width: e.target.clientWidth,
              canvasIndex: currentCanvasIndex,
              shapeIndex: currentShapeIndex,
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
    <>
      <div
        ref={shapeRef}
        className={style.idle}
        style={{
          ...canvas,
          borderBottom: isMouseHovered ? "1px dotted black" : "none",
        }}
        onMouseEnter={() => {
          dispatch(deactivateSelector());
          dispatch(
            setHoveredShape({
              canvasIndex: currentCanvasIndex,
              shapeIndex: currentShapeIndex,
            })
          );
          setIsMouseHovered(true);
        }}
        onMouseLeave={() => {
          dispatch(activateSelector());
          dispatch(
            setHoveredShape({
              canvasIndex: null,
              shapeIndex: null,
            })
          );
          setIsMouseHovered(false);
        }}
        onDoubleClick={() => {
          setIsDoubleClicked(true);
        }}
        onClick={() => {
          if (workingCanvasIndex === currentCanvasIndex) {
            return dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
          }

          dispatch(setWorkingCanvasIndex(currentCanvasIndex));
          dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
        }}
      >
        {canvas.text}
      </div>
      {workingCanvasIndex === currentCanvasIndex &&
        selectedShapeIndexes.includes(currentShapeIndex) &&
        shapeRef.current &&
        directions.map((direction) => (
          <EditPointer
            direction={direction}
            key={direction}
            {...{
              height: shapeRef.current.clientHeight,
              width: shapeRef.current.clientWidth,
              ...canvas,
            }}
          />
        ))}
    </>
  );
}

export default ShapeText;
