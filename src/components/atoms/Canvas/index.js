import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { changeCanvasName } from "../../../features/canvas/canvasSlice";
import cn from "./Canvas.module.scss";

function Canvas({ index, ...canvas }) {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

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
        style={{ ...canvas, position: "absolute", backgroundColor: "white" }}
      ></div>
    </>
  );
}

export default Canvas;
