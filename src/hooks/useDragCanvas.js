import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CANVAS_NAME_STYLES,
  HOR_SNAP_LINE_STYLES,
  VER_SNAP_LINE_STYLES,
} from "../constants/styles";
import { modifyCanvas, selectAllCanvas } from "../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentWorkingCanvasIndex,
} from "../features/utility/utilitySlice";
import computeSnapPosition from "../utilities/computeSnapPosition";

const GRAVITY = 5;

function useDragCanvas(
  canvasRef,
  canvasNameRef,
  artBoardRef,
  canvasIndex,
  isRendered = true
) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const canvases = useSelector(selectAllCanvas);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);

  useEffect(() => {
    if (
      !canvasNameRef.current ||
      !canvasRef.current ||
      !artBoardRef.current ||
      !isRendered
    )
      return;

    const artBoard = artBoardRef.current;
    const canvas = canvasRef.current;
    const canvasName = canvasNameRef.current;

    const handleMouseDown = (e) => {
      const verticalLine = document.createElement("div");
      const horizontalLine = document.createElement("div");

      const currentCanvasIndex =
        Array.from(e.currentTarget.parentNode.childNodes).indexOf(
          e.currentTarget
        ) / 2;
      const originalElPositionTop = e.currentTarget.nextSibling.offsetTop;
      const originalElPositionLeft = e.currentTarget.nextSibling.offsetLeft;
      const originalElHeight = e.currentTarget.nextSibling.offsetHeight;
      const originalElWidth = e.currentTarget.nextSibling.offsetWidth;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      const canvasList = canvases.slice();
      const filteredXAxisSnapPoints = [];
      const filteredYAxisSnapPoints = [];

      canvasList.splice(currentCanvasIndex, 1);

      canvasList.forEach((canvas) => {
        filteredXAxisSnapPoints.push(
          canvas.left,
          canvas.left + canvas.width / 2,
          canvas.left + canvas.width
        );
        filteredYAxisSnapPoints.push(
          canvas.top,
          canvas.top + canvas.height / 2,
          canvas.top + canvas.height
        );
      });

      canvasName.style.opacity = CANVAS_NAME_STYLES.OPACITY;

      let movedTop;
      let movedLeft;
      let isLeftAttached = false;
      let isRightAttached = false;
      let isTopAttached = false;
      let isBottomAttached = false;
      let nearestPossibleSnapAtX;
      let nearestPossibleSnapAtY;

      artBoard.appendChild(verticalLine);
      artBoard.appendChild(horizontalLine);

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        const currentLeft = originalElPositionLeft + movedLeft;
        const currentTop = originalElPositionTop + movedTop;

        canvasName.style.top = originalElPositionTop + movedTop + "px";
        canvasName.style.left = originalElPositionLeft + movedLeft + "px";

        verticalLine.style.visibility = VER_SNAP_LINE_STYLES.HIDDEN;
        verticalLine.style.position = VER_SNAP_LINE_STYLES.POSITION;
        verticalLine.style.width = VER_SNAP_LINE_STYLES.WIDTH;
        verticalLine.style.height = VER_SNAP_LINE_STYLES.HEIGHT;
        verticalLine.style.backgroundColor = VER_SNAP_LINE_STYLES.BG_COLOR;

        horizontalLine.style.visibility = HOR_SNAP_LINE_STYLES.HIDDEN;
        horizontalLine.style.position = HOR_SNAP_LINE_STYLES.POSITION;
        horizontalLine.style.width = HOR_SNAP_LINE_STYLES.WIDTH;
        horizontalLine.style.height = HOR_SNAP_LINE_STYLES.HEIGHT;
        horizontalLine.style.backgroundColor = HOR_SNAP_LINE_STYLES.BG_COLOR;

        nearestPossibleSnapAtX = computeSnapPosition(
          filteredXAxisSnapPoints,
          currentLeft,
          currentLeft + originalElWidth,
          currentLeft + originalElWidth / 2
        );
        nearestPossibleSnapAtY = computeSnapPosition(
          filteredYAxisSnapPoints,
          currentTop,
          currentTop + originalElHeight,
          currentTop + originalElHeight / 2
        );

        if (Math.abs(currentLeft - nearestPossibleSnapAtX) < GRAVITY) {
          canvas.style.left = nearestPossibleSnapAtX + "px";
          isLeftAttached = true;
          isRightAttached = false;
        } else if (
          Math.abs(currentLeft + originalElWidth - nearestPossibleSnapAtX) <
          GRAVITY
        ) {
          canvas.style.left = nearestPossibleSnapAtX - originalElWidth + "px";
          isRightAttached = true;
          isLeftAttached = false;
        } else {
          canvas.style.left = currentLeft + "px";
          isLeftAttached = false;
          isRightAttached = false;
        }

        if (Math.abs(currentTop - nearestPossibleSnapAtY) < GRAVITY) {
          canvas.style.top = nearestPossibleSnapAtY + "px";
          isTopAttached = true;
          isBottomAttached = false;
        } else if (
          Math.abs(currentTop + originalElHeight - nearestPossibleSnapAtY) <
          GRAVITY
        ) {
          canvas.style.top = nearestPossibleSnapAtY - originalElHeight + "px";
          isBottomAttached = true;
          isTopAttached = false;
        } else {
          canvas.style.top = currentTop + "px";
          isTopAttached = false;
          isBottomAttached = false;
        }

        if (isLeftAttached || isRightAttached) {
          verticalLine.style.visibility = VER_SNAP_LINE_STYLES.VISIBLE;
          verticalLine.style.left = nearestPossibleSnapAtX + "px";
        }

        if (isTopAttached || isBottomAttached) {
          horizontalLine.style.visibility = VER_SNAP_LINE_STYLES.VISIBLE;
          horizontalLine.style.top = nearestPossibleSnapAtY + "px";
        }
      };

      const handleMouseUp = () => {
        const newShapeTop = originalElPositionTop + movedTop;
        const newShapeLeft = originalElPositionLeft + movedLeft;

        verticalLine.remove();
        horizontalLine.remove();
        canvasName.style.removeProperty("opacity");

        if (movedTop || movedLeft) {
          if (isLeftAttached && isTopAttached) {
            dispatch(
              modifyCanvas({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX,
                canvasIndex,
              })
            );
            canvasName.style.top = nearestPossibleSnapAtY + "px";
            canvasName.style.left = nearestPossibleSnapAtX + "px";
          } else if (isLeftAttached && isBottomAttached) {
            dispatch(
              modifyCanvas({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX,
                canvasIndex,
              })
            );
            canvasName.style.top =
              nearestPossibleSnapAtY - originalElHeight + "px";
            canvasName.style.left = nearestPossibleSnapAtX + "px";
          } else if (isRightAttached && isTopAttached) {
            dispatch(
              modifyCanvas({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
              })
            );
            canvasName.style.top = nearestPossibleSnapAtY + "px";
            canvasName.style.left =
              nearestPossibleSnapAtX - originalElWidth + "px";
          } else if (isRightAttached && isBottomAttached) {
            dispatch(
              modifyCanvas({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
              })
            );
            canvasName.style.top =
              nearestPossibleSnapAtY - originalElHeight + "px";
            canvasName.style.left =
              nearestPossibleSnapAtX - originalElWidth + "px";
          } else if (isLeftAttached) {
            dispatch(
              modifyCanvas({
                top: newShapeTop,
                left: nearestPossibleSnapAtX,
                canvasIndex,
              })
            );
            canvasName.style.top = newShapeTop + "px";
            canvasName.style.left = nearestPossibleSnapAtX + "px";
          } else if (isRightAttached) {
            dispatch(
              modifyCanvas({
                top: newShapeTop,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
              })
            );
            canvasName.style.top = newShapeTop + "px";
            canvasName.style.left =
              nearestPossibleSnapAtX - originalElWidth + "px";
          } else if (isTopAttached) {
            dispatch(
              modifyCanvas({
                top: nearestPossibleSnapAtY,
                left: newShapeLeft,
                canvasIndex,
              })
            );
            canvasName.style.top = nearestPossibleSnapAtY + "px";
            canvasName.style.left = newShapeLeft + "px";
          } else if (isBottomAttached) {
            dispatch(
              modifyCanvas({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: newShapeLeft,
                canvasIndex,
              })
            );
            canvasName.style.top =
              nearestPossibleSnapAtY - originalElHeight + "px";
            canvasName.style.left = newShapeLeft + "px";
          } else {
            dispatch(
              modifyCanvas({
                top: newShapeTop,
                left: newShapeLeft,
                canvasIndex,
              })
            );
            canvasName.style.top = newShapeTop + "px";
            canvasName.style.left = newShapeLeft + "px";
          }
        }

        movedTop = 0;
        movedLeft = 0;

        window.removeEventListener("mousemove", handleMouseMove);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    canvasName.addEventListener("mousedown", handleMouseDown);

    return () => canvasName.removeEventListener("mousedown", handleMouseDown);
  }, [
    currentScale,
    dispatch,
    canvasIndex,
    canvasNameRef,
    canvasRef,
    isRendered,
    artBoardRef,
    canvases,
    workingCanvasIndex,
  ]);
}

export default useDragCanvas;
