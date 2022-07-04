import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import tools from "../../../constants/tools";
import { changeCanvasName } from "../../../features/canvas/canvasSlice";
import useDragCanvas from "../../../hooks/useDragCanvas";
import useDrawShape from "../../../hooks/useDrawShape";
import Shape from "../Shape";
import ShapeText from "../ShapeText";
import cn from "./Canvas.module.scss";

function Canvas({ canvasIndex, ...canvas }) {
  const dispatch = useDispatch();

  const canvasRef = useRef();
  const inputRef = useRef();
  const nameRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  useDrawShape(canvasRef, canvasIndex);

  useDragCanvas(canvasRef, nameRef, canvasIndex);

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
          onBlur={() => {
            setIsDoubleClicked(false);
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
              canvasIndex={canvasIndex}
              shapeIndex={i}
              {...shape}
            />
          ) : (
            <Shape
              key={i}
              canvasIndex={canvasIndex}
              shapeIndex={i}
              {...shape}
            />
          )
        )}
      </div>
    </>
  );
}

export default Canvas;
