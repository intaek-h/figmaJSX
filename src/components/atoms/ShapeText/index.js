import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHAPE_TEXT_STYLES } from "../../../constants/styles";

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
  setHoveredShape,
  setInputFieldFocused,
  setWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import useDragShape from "../../../hooks/useDragShape";
import style from "./ShapeText.module.scss";

function ShapeText({
  canvasRef,
  currentCanvasIndex,
  currentShapeIndex,
  ...canvas
}) {
  const dispatch = useDispatch();

  const globalColor = useSelector(selectGlobalColor);
  const globalFontSize = useSelector(selectGlobalFontSize);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const { canvasIndex, shapeIndex } = useSelector(selectHoveredShape);

  const shapeRef = useRef();
  const inputRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isMouseHovered, setIsMouseHovered] = useState(false);

  useDragShape(
    shapeRef,
    canvasRef,
    currentCanvasIndex,
    currentShapeIndex,
    !isDoubleClicked
  );

  useEffect(() => {
    if (
      canvasIndex === currentCanvasIndex &&
      shapeIndex === currentShapeIndex
    ) {
      return setIsMouseHovered(true);
    }

    setIsMouseHovered(false);
  }, [canvasIndex, currentShapeIndex, shapeIndex, currentCanvasIndex]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [inputRef, isDoubleClicked]);

  useEffect(() => {
    if (!shapeRef.current) return;
    if (canvas.height !== shapeRef.current.clientHeight) {
      dispatch(
        modifyShape({
          canvasIndex: currentCanvasIndex,
          shapeIndex: currentShapeIndex,
          height: shapeRef.current.clientHeight,
          width: shapeRef.current.clientWidth,
        })
      );
    }
  }, [canvas, currentCanvasIndex, currentShapeIndex, dispatch]);

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
          spellCheck={false}
          onFocus={() => dispatch(setInputFieldFocused())}
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
          top: canvas.top,
          left: canvas.left,
          fontSize: canvas.fontSize,
          color: canvas.color,
          borderBottom: isMouseHovered && SHAPE_TEXT_STYLES.BORDER,
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
    </>
  );
}

export default ShapeText;
