import { useEffect } from "react";

function useDragScroll(boardRef) {
  useEffect(() => {
    if (!boardRef.current) return;

    const board = boardRef.current;

    const handleMouseDown = (e) => {
      const start = {
        left: board.scrollLeft,
        top: board.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      const handleMouseMove = (e) => {
        const curX = e.clientX - start.x;
        const curY = e.clientY - start.y;

        board.style.cursor = "grabbing";
        board.scrollLeft = start.left - curX;
        board.scrollTop = start.top - curY;
      };

      const handleMouseUp = () => {
        board.style.cursor = "grab";
        board.removeEventListener("mousedown", handleMouseDown);
        board.removeEventListener("mousemove", handleMouseMove);
        board.removeEventListener("mouseup", handleMouseUp);
      };

      board.style.cursor = "grabbing";
      board.addEventListener("mousemove", handleMouseMove);
      board.addEventListener("mouseup", handleMouseUp);
    };

    const handleSpaceKeyDown = (e) => {
      if (e.keyCode === 32) {
        e.preventDefault();
        board.style.cursor = "grab";
        board.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keyup", handleSpaceKeyUp);
      }
    };

    const handleSpaceKeyUp = (e) => {
      if (e.keyCode === 32) {
        e.preventDefault();
        board.style.cursor = "default";
        document.removeEventListener("keyup", handleSpaceKeyUp);
        board.removeEventListener("mousedown", handleMouseDown);
      }
    };

    document.addEventListener("keydown", handleSpaceKeyDown);

    return () => document.removeEventListener("keydown", handleSpaceKeyDown);
  }, [boardRef]);
}

export default useDragScroll;
