import { useEffect, useRef } from "react";

import styles from "./ArtBoard.module.scss";
import useDragScroll from "../../../hooks/useDragScroll";

function ArtBoard({ children, lastCanvasCoords }) {
  const boardRef = useRef();

  useDragScroll(boardRef);

  useEffect(() => {
    if (!boardRef.current) return;

    boardRef.current.scrollTop = lastCanvasCoords.top - 100;
    boardRef.current.scrollLeft =
      lastCanvasCoords.left -
      boardRef.current.clientWidth / 2 +
      lastCanvasCoords.width / 2;
  }, [lastCanvasCoords.left, lastCanvasCoords.top, lastCanvasCoords.width]);

  return (
    <div ref={boardRef} className={styles["artboard-wrapper"]}>
      <div className={styles.artboard}>{children}</div>
    </div>
  );
}

export default ArtBoard;
