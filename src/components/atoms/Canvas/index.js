import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { changeCanvasName } from "../../../features/canvas/canvasSlice";
import useDrawShape from "../../../hooks/useDrawShape";
import Shape from "../Shape";
import cn from "./Canvas.module.scss";

function Canvas({ index, ...canvas }) {
  const dispatch = useDispatch();

  const canvasRef = useRef();
  const inputRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  useDrawShape(canvasRef, index);

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
            dispatch(changeCanvasName({ name: inputRef.current.value, index }));
          }}
        />
      ) : (
        <span
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
      <div
        ref={canvasRef}
        style={{ ...canvas, position: "absolute", backgroundColor: "white" }}
      >
        {canvas.children.map((shape, i) => (
          <Shape key={i} {...shape} />
        ))}
      </div>
    </>
  );
}

export default Canvas;
