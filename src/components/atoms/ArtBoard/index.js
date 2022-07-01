import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ArtBoard.module.scss";
import useDragScroll from "../../../hooks/useDragScroll";
import {
  createCanvas,
  selectAllCanvas,
} from "../../../features/canvas/canvasSlice";
import Canvas from "../Canvas";
import useMockZoom from "../../../hooks/useMockZoom";
import computePreviewElement from "../../../utilities/computePreviewElement";
import { selectCurrentScale } from "../../../features/utility/utilitySlice";

let isFirstRender = true;

function ArtBoard() {
  const dispatch = useDispatch();
  const currentScale = useSelector(selectCurrentScale);

  const boardRef = useRef();
  const innerBoardRef = useRef();

  const [isDragScrolling, setIsDragScrolling] = useState(false);

  const canvases = useSelector(selectAllCanvas);

  useDragScroll(boardRef, setIsDragScrolling);

  useMockZoom(boardRef, innerBoardRef);

  useEffect(() => {
    if (!boardRef.current || !isFirstRender) return;

    const { top, left, width } = canvases[canvases.length - 1];

    isFirstRender = false;
    boardRef.current.scrollTop = top - 100;
    boardRef.current.scrollLeft =
      left - boardRef.current.clientWidth / 2 + width / 2;
  }, [canvases]);

  useEffect(() => {
    if (!innerBoardRef.current) return;

    const innerBoard = innerBoardRef.current;

    const handleMouseDownCanvas = (e) => {
      if (isDragScrolling) return;

      const canvasPreview = document.createElement("div");
      const artboardNode = innerBoard.getBoundingClientRect();
      const artboardTop = artboardNode.top;
      const artboardLeft = artboardNode.left;
      const startTop = (e.clientY - artboardTop) / currentScale;
      const startLeft = (e.clientX - artboardLeft) / currentScale;

      canvasPreview.style.top = startTop + "px";
      canvasPreview.style.left = startLeft + "px";
      canvasPreview.style.backgroundColor = "#4faaff36";
      canvasPreview.style.border = "1px solid #94beff";
      canvasPreview.style.position = "absolute";
      canvasPreview.style.boxSizing = "border-box";

      const sizePreview = document.createElement("div");

      innerBoard.appendChild(canvasPreview);
      innerBoard.appendChild(sizePreview);

      const handleMouseMove = (e) => {
        const { height, left, top, width } = computePreviewElement(
          { x: startLeft, y: startTop },
          {
            x: (e.clientX - artboardLeft) / currentScale,
            y: (e.clientY - artboardTop) / currentScale,
          }
        );

        canvasPreview.style.height = height + "px";
        canvasPreview.style.width = width + "px";
        canvasPreview.style.top = top + "px";
        canvasPreview.style.left = left + "px";

        sizePreview.textContent = `${width} X ${height}`;
        sizePreview.style.position = "absolute";
        sizePreview.style.top = top + height + 10 + "px";
        sizePreview.style.left = left + width + 10 + "px";
        sizePreview.style.backgroundColor = "black";
        sizePreview.style.color = "white";
        sizePreview.style.fontSize = "10px";
        sizePreview.style.opacity = 0.3;
        sizePreview.style.padding = "0 2px";
      };

      const handleMouseUp = (e) => {
        if (e.button === 2) {
          canvasPreview.remove();
          sizePreview.remove();
          innerBoard.removeEventListener("mousemove", handleMouseMove);
          innerBoard.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        const coordinates = {
          top: canvasPreview.offsetTop,
          left: canvasPreview.offsetLeft,
          height: canvasPreview.offsetHeight,
          width: canvasPreview.offsetWidth,
        };

        coordinates.height + coordinates.width > 4 &&
          dispatch(createCanvas(coordinates));

        canvasPreview.remove();
        sizePreview.remove();
        innerBoard.removeEventListener("mousemove", handleMouseMove);
        innerBoard.removeEventListener("mouseup", handleMouseUp);
      };

      innerBoard.addEventListener("mousemove", handleMouseMove);
      innerBoard.addEventListener("mouseup", handleMouseUp);
    };

    innerBoard.addEventListener("mousedown", handleMouseDownCanvas);

    return () =>
      innerBoard.removeEventListener("mousedown", handleMouseDownCanvas);
  }, [currentScale, dispatch, isDragScrolling]);

  return (
    <div ref={boardRef} className={styles["artboard-wrapper"]}>
      <div ref={innerBoardRef} className={styles.artboard}>
        {canvases.map((canvas, i) => (
          <Canvas {...canvas} index={i} key={i} />
        ))}
      </div>
    </div>
  );
}

export default ArtBoard;
