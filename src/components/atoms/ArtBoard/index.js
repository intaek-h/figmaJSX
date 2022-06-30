import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./ArtBoard.module.scss";
import useDragScroll from "../../../hooks/useDragScroll";
import { selectAllCanvas } from "../../../features/canvas/canvasSlice";
import Shape from "../Shape";
import useMockZoom from "../../../hooks/useMockZoom";

function ArtBoard() {
  const boardRef = useRef();
  const innerBoardRef = useRef();

  const canvases = useSelector(selectAllCanvas);

  useDragScroll(boardRef);

  useMockZoom(boardRef, innerBoardRef);

  useEffect(() => {
    if (!boardRef.current) return;

    const { top, left, width } = canvases[canvases.length - 1];

    boardRef.current.scrollTop = top - 100;
    boardRef.current.scrollLeft =
      left - boardRef.current.clientWidth / 2 + width / 2;
  }, [canvases]);

  return (
    <div ref={boardRef} className={styles["artboard-wrapper"]}>
      <div ref={innerBoardRef} className={styles.artboard}>
        {canvases.map((canvas, i) => (
          <Shape {...canvas} key={i} />
        ))}
      </div>
    </div>
  );
}

export default ArtBoard;
