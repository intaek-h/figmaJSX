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
  setWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import useDragCanvas from "../../../hooks/useDragCanvas";
import useDrawShape from "../../../hooks/useDrawShape";
import Shape from "../Shape";
import ShapeText from "../ShapeText";
import EditPointer from "../EditPointer";
import cn from "./Canvas.module.scss";
import computeSelectionBox from "../../../utilities/computeSelectionBox";
import { CANVAS_NAME_STYLES } from "../../../constants/styles";
import useDragMultipleShapes from "../../../hooks/useDragMultipleShapes";

function Canvas({ artBoardRef, canvasIndex, ...canvas }) {
  const dispatch = useDispatch();

  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const isDraggingShape = useSelector(selectIsDraggingShape);

  const canvasRef = useRef();
  const inputRef = useRef();
  const nameRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  useDrawShape(canvasRef, canvasIndex, canvas.children);

  useDragCanvas(canvasRef, nameRef, artBoardRef, canvasIndex, !isDoubleClicked);

  useDragMultipleShapes(canvasRef);

  const handleInputBlur = () => {
    setIsDoubleClicked(false);
    dispatch(setInputFieldBlurred());
    dispatch(changeCanvasName({ name: inputRef.current.value, canvasIndex }));
  };

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
          onBlur={handleInputBlur}
        />
      ) : (
        <span
          ref={nameRef}
          className={cn.name}
          style={{
            top: canvas.top,
            left: canvas.left,
            color:
              workingCanvasIndex === canvasIndex &&
              CANVAS_NAME_STYLES.HIGHLIGHTED_COLOR,
          }}
          onDoubleClick={() => {
            setIsDoubleClicked(true);
          }}
          onClick={() => dispatch(setWorkingCanvasIndex(canvasIndex))}
        >
          {canvas.canvasName}
        </span>
      )}
      <div
        ref={canvasRef}
        className={cn.canvas}
        style={{ ...canvas }}
        data-testid="canvas"
      >
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
