import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import directions from "../../../constants/directions";
import tools from "../../../constants/tools";
import { changeCanvasName } from "../../../features/canvas/canvasSlice";
import {
  selectCurrentWorkingCanvasIndex,
  selectIsDraggingShape,
  selectSelectedShapeIndexes,
  setInputFieldBlurred,
  setInputFieldFocused,
} from "../../../features/utility/utilitySlice";
import useDragCanvas from "../../../hooks/useDragCanvas";
import useDrawShape from "../../../hooks/useDrawShape";
import Shape from "../Shape";
import ShapeText from "../ShapeText";
import EditPointer from "../EditPointer";
import cn from "./Canvas.module.scss";
import computeSelectionBox from "../../../utilities/computeSelectionBox";

function Canvas({ canvasIndex, ...canvas }) {
  const dispatch = useDispatch();

  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const isDraggingShape = useSelector(selectIsDraggingShape);

  const canvasRef = useRef();
  const inputRef = useRef();
  const nameRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  useDrawShape(canvasRef, canvasIndex, canvas.children);

  useDragCanvas(canvasRef, nameRef, canvasIndex, !isDoubleClicked);

  return (
    <>
      {isDoubleClicked ? (
        <input
          ref={inputRef}
          type="text"
          className={cn.input}
          style={{
            top: canvas.top,
            left: canvas.left,
          }}
          defaultValue={canvas.canvasName}
          autoFocus
          onFocus={() => dispatch(setInputFieldFocused())}
          onBlur={() => {
            setIsDoubleClicked(false);
            dispatch(setInputFieldBlurred());
            dispatch(
              changeCanvasName({ name: inputRef.current.value, canvasIndex })
            );
          }}
        />
      ) : (
        <span
          ref={nameRef}
          className={cn.name}
          style={{
            top: canvas.top,
            left: canvas.left,
          }}
          onDoubleClick={() => {
            setIsDoubleClicked(true);
          }}
        >
          {canvas.canvasName}
        </span>
      )}
      <div ref={canvasRef} className={cn.canvas} style={{ ...canvas }}>
        {canvas.children.map((shape, i) =>
          shape.type === tools.TEXT ? (
            <ShapeText
              key={i}
              currentCanvasIndex={canvasIndex}
              currentShapeIndex={i}
              canvasRef={canvasRef}
              {...shape}
            />
          ) : (
            <Shape
              key={i}
              currentCanvasIndex={canvasIndex}
              currentShapeIndex={i}
              canvasRef={canvasRef}
              {...shape}
            />
          )
        )}
        {workingCanvasIndex === canvasIndex &&
        selectedShapeIndexes.length &&
        !isDraggingShape
          ? Object.values(directions).map((direction) => (
              <EditPointer
                direction={direction}
                key={direction}
                {...computeSelectionBox(canvas.children, selectedShapeIndexes)}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default Canvas;
