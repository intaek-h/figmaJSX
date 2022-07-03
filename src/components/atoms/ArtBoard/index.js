import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./ArtBoard.module.scss";
import useDragToScroll from "../../../hooks/useDragToScroll";
import { selectAllCanvas } from "../../../features/canvas/canvasSlice";
import Canvas from "../Canvas";
import useMockZoom from "../../../hooks/useMockZoom";
import useDrawCanvas from "../../../hooks/useDrawCanvas";

let isFirstRender = true;

function ArtBoard() {
  const boardRef = useRef();
  const innerBoardRef = useRef();

  const canvases = useSelector(selectAllCanvas);

  useDragToScroll(boardRef);

  useMockZoom(boardRef, innerBoardRef);

  useDrawCanvas(innerBoardRef);

  useEffect(() => {
    if (!boardRef.current || !isFirstRender) return;

    const { top, left, width } = canvases[canvases.length - 1];

    isFirstRender = false;
    boardRef.current.scrollTop = top - 100;
    boardRef.current.scrollLeft =
      left - boardRef.current.clientWidth / 2 + width / 2;
  }, [canvases]);

  return (
    <div ref={boardRef} className={styles["artboard-wrapper"]}>
      <div ref={innerBoardRef} className={styles.artboard}>
        {canvases.map((canvas, i) => (
          <Canvas {...canvas} canvasIndex={i} key={i} />
        ))}
      </div>
    </div>
  );
}

export default ArtBoard;
