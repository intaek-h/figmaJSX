import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../constants/tools";
import { modifyShape, selectAllCanvas } from "../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
} from "../features/utility/utilitySlice";
import computeSnapPosition from "../utilities/computeSnapPosition";

const GRAVITY = 5;

function useDragShape(
  shapeRef,
  canvasRef,
  canvasIndex,
  shapeIndex,
  isRendered = true
) {
  const dispatch = useDispatch();

  const currentTool = useSelector(selectCurrentTool);
  const currentScale = useSelector(selectCurrentScale);
  const isDragScrolling = useSelector(selectIsDragScrolling);
  const canvases = useSelector(selectAllCanvas);

  useEffect(() => {
    if (
      !shapeRef.current ||
      !canvasRef.current ||
      isDragScrolling ||
      currentTool !== tools.SELECTOR ||
      !isRendered
    )
      return;

    const shape = shapeRef.current;
    const canvas = canvasRef.current;

    const handleMouseDown = (e) => {
      e.stopPropagation();

      const verticalLine = document.createElement("div");
      const horizontalLine = document.createElement("div");

      const originalElPositionTop = e.currentTarget.offsetTop;
      const originalElPositionLeft = e.currentTarget.offsetLeft;
      const originalElHeight = e.currentTarget.offsetHeight;
      const originalElWidth = e.currentTarget.offsetWidth;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;
      const canvasFigures = e.currentTarget.offsetParent;

      const shapes = canvases[canvasIndex].children.slice();
      const filteredXAxisSnapPoints = [];
      const filteredYAxisSnapPoints = [];

      shapes.splice(shapeIndex, 1);

      shapes.forEach((shape) => {
        filteredXAxisSnapPoints.push(
          shape.left,
          shape.left + shape.width / 2,
          shape.left + shape.width
        );
        filteredYAxisSnapPoints.push(
          shape.top,
          shape.top + shape.height / 2,
          shape.top + shape.height
        );
      });

      filteredXAxisSnapPoints.push(
        canvasFigures.clientLeft,
        canvasFigures.clientLeft + canvasFigures.clientWidth / 2,
        canvasFigures.clientLeft + canvasFigures.clientWidth
      );
      filteredYAxisSnapPoints.push(
        canvasFigures.clientTop,
        canvasFigures.clientTop + canvasFigures.clientHeight / 2,
        canvasFigures.clientTop + canvasFigures.clientHeight
      );

      let movedTop;
      let movedLeft;
      let isLocked = false; // eslint-disable-line no-unused-vars
      let isLeftAttached = false;
      let isRightAttached = false;
      let isVerMidAttached = false;
      let isTopAttached = false;
      let isBottomAttached = false;
      let isHorMidAttached = false;
      let nearestPossibleSnapAtX;
      let nearestPossibleSnapAtY;

      canvas.appendChild(verticalLine);
      canvas.appendChild(horizontalLine);

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        const currentLeft = originalElPositionLeft + movedLeft;
        const currentTop = originalElPositionTop + movedTop;

        verticalLine.style.visibility = "hidden";
        verticalLine.style.position = "absolute";
        verticalLine.style.width = "1px";
        verticalLine.style.height = "100%";
        verticalLine.style.backgroundColor = "#c8deff";

        horizontalLine.style.visibility = "hidden";
        horizontalLine.style.position = "absolute";
        horizontalLine.style.width = "100%";
        horizontalLine.style.height = "1px";
        horizontalLine.style.backgroundColor = "#c8deff";

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
          shape.style.left = nearestPossibleSnapAtX + "px";
          isLocked = true;
          isLeftAttached = true;
          isRightAttached = false;
          isVerMidAttached = false;
        } else if (
          Math.abs(currentLeft + originalElWidth - nearestPossibleSnapAtX) <
          GRAVITY
        ) {
          shape.style.left = nearestPossibleSnapAtX - originalElWidth + "px";
          isLocked = true;
          isRightAttached = true;
          isLeftAttached = false;
          isVerMidAttached = false;
        } else if (
          Math.abs(currentLeft + originalElWidth / 2 - nearestPossibleSnapAtX) <
          GRAVITY
        ) {
          shape.style.left =
            nearestPossibleSnapAtX - originalElWidth / 2 + "px";
          isLocked = true;
          isRightAttached = false;
          isLeftAttached = false;
          isVerMidAttached = true;
        } else {
          shape.style.left = currentLeft + "px";
          isLocked = false;
          isLeftAttached = false;
          isRightAttached = false;
          isVerMidAttached = false;
        }

        if (Math.abs(currentTop - nearestPossibleSnapAtY) < GRAVITY) {
          shape.style.top = nearestPossibleSnapAtY + "px";
          isLocked = true;
          isTopAttached = true;
          isBottomAttached = false;
          isHorMidAttached = false;
        } else if (
          Math.abs(currentTop + originalElHeight - nearestPossibleSnapAtY) <
          GRAVITY
        ) {
          shape.style.top = nearestPossibleSnapAtY - originalElHeight + "px";
          isLocked = true;
          isBottomAttached = true;
          isTopAttached = false;
          isHorMidAttached = false;
        } else if (
          Math.abs(currentTop + originalElHeight / 2 - nearestPossibleSnapAtY) <
          GRAVITY
        ) {
          shape.style.top =
            nearestPossibleSnapAtY - originalElHeight / 2 + "px";
          isLocked = true;
          isBottomAttached = false;
          isTopAttached = false;
          isHorMidAttached = true;
        } else {
          shape.style.top = currentTop + "px";
          isLocked = false;
          isTopAttached = false;
          isBottomAttached = false;
          isHorMidAttached = false;
        }

        if (isLeftAttached || isRightAttached || isVerMidAttached) {
          verticalLine.style.visibility = "visible";
          verticalLine.style.left = nearestPossibleSnapAtX + "px";
        }

        if (isTopAttached || isBottomAttached || isHorMidAttached) {
          horizontalLine.style.visibility = "visible";
          horizontalLine.style.top = nearestPossibleSnapAtY + "px";
        }
      };

      const handleMouseUp = () => {
        const newShapeTop = originalElPositionTop + movedTop;
        const newShapeLeft = originalElPositionLeft + movedLeft;

        verticalLine.remove();
        horizontalLine.remove();

        if (movedTop || movedLeft) {
          if (isLeftAttached && isTopAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isLeftAttached && isBottomAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached && isTopAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached && isBottomAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isLeftAttached && isHorMidAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight / 2,
                left: nearestPossibleSnapAtX,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached && isHorMidAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight / 2,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isTopAttached && isVerMidAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX - originalElWidth / 2,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isBottomAttached && isVerMidAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX - originalElWidth / 2,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isHorMidAttached && isVerMidAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight / 2,
                left: nearestPossibleSnapAtX - originalElWidth / 2,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isHorMidAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight / 2,
                left: newShapeLeft,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isVerMidAttached) {
            dispatch(
              modifyShape({
                top: newShapeTop,
                left: nearestPossibleSnapAtX - originalElWidth / 2,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isLeftAttached) {
            dispatch(
              modifyShape({
                top: newShapeTop,
                left: nearestPossibleSnapAtX,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached) {
            dispatch(
              modifyShape({
                top: newShapeTop,
                left: nearestPossibleSnapAtX - originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isTopAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY,
                left: newShapeLeft,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isBottomAttached) {
            dispatch(
              modifyShape({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: newShapeLeft,
                canvasIndex,
                shapeIndex,
              })
            );
          } else {
            dispatch(
              modifyShape({
                top: newShapeTop,
                left: newShapeLeft,
                canvasIndex,
                shapeIndex,
              })
            );
          }
        }

        movedTop = 0;
        movedLeft = 0;

        window.removeEventListener("mousemove", handleMouseMove);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    shape.addEventListener("mousedown", handleMouseDown);

    return () => {
      shape.removeEventListener("mousedown", handleMouseDown);
    };
  }, [
    canvasIndex,
    canvasRef,
    canvases,
    currentScale,
    currentTool,
    dispatch,
    isDragScrolling,
    isRendered,
    shapeIndex,
    shapeRef,
  ]);
}

export default useDragShape;
