import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../constants/tools";
import {
  changeShapePosition,
  selectXAxisSnapPoints,
  selectYAxisSnapPoints,
} from "../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
} from "../features/utility/utilitySlice";
import computeSnapPosition from "../utilities/computeSnapPosition";

const GRAVITY = 10;

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
  const xAxisSnapPoints = useSelector(selectXAxisSnapPoints(canvasIndex));
  const yAxisSnapPoints = useSelector(selectYAxisSnapPoints(canvasIndex));

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
      const horTopLine = document.createElement("div");
      const horBotLine = document.createElement("div");
      const verLeftLine = document.createElement("div");
      const verRightLine = document.createElement("div");

      const originalElPositionTop = e.currentTarget.offsetTop;
      const originalElPositionLeft = e.currentTarget.offsetLeft;
      const originalElHeight = e.currentTarget.offsetHeight;
      const originalElWidth = e.currentTarget.offsetWidth;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      let movedTop;
      let movedLeft;
      let isLocked = false; // eslint-disable-line no-unused-vars
      let isLeftAttached = false;
      let isRightAttached = false;
      let isTopAttached = false;
      let isBottomAttached = false;
      let nearestPossibleSnapAtX;
      let nearestPossibleSnapAtY;

      canvas.appendChild(horTopLine);
      canvas.appendChild(horBotLine);
      canvas.appendChild(verLeftLine);
      canvas.appendChild(verRightLine);

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        const currentLeft = originalElPositionLeft + movedLeft;
        const currentTop = originalElPositionTop + movedTop;

        horTopLine.style.visibility = "hidden";
        horBotLine.style.visibility = "hidden";
        verLeftLine.style.visibility = "hidden";
        verRightLine.style.visibility = "hidden";

        nearestPossibleSnapAtX = computeSnapPosition(
          xAxisSnapPoints,
          currentLeft,
          currentLeft + originalElWidth
        );
        nearestPossibleSnapAtY = computeSnapPosition(
          yAxisSnapPoints,
          currentTop,
          currentTop + originalElHeight
        );

        if (Math.abs(currentLeft - nearestPossibleSnapAtX) < GRAVITY) {
          shape.style.left = nearestPossibleSnapAtX + "px";
          isLocked = true;
          isLeftAttached = true;
        } else if (
          Math.abs(currentLeft + originalElWidth - nearestPossibleSnapAtX) <
          GRAVITY
        ) {
          shape.style.left = nearestPossibleSnapAtX - originalElWidth + "px";
          isLocked = true;
          isRightAttached = true;
        } else {
          shape.style.left = currentLeft + "px";
          isLocked = false;
          isLeftAttached = false;
          isRightAttached = false;
        }

        if (Math.abs(currentTop - nearestPossibleSnapAtY) < GRAVITY) {
          shape.style.top = nearestPossibleSnapAtY + "px";
          isLocked = true;
          isTopAttached = true;
        } else if (
          Math.abs(currentTop + originalElHeight - nearestPossibleSnapAtY) <
          GRAVITY
        ) {
          shape.style.top = nearestPossibleSnapAtY - originalElHeight + "px";
          isLocked = true;
          isBottomAttached = true;
        } else {
          shape.style.top = currentTop + "px";
          isLocked = false;
          isTopAttached = false;
          isBottomAttached = false;
        }

        if (isLeftAttached) {
          verLeftLine.style.visibility = "visible";
          verLeftLine.style.left = nearestPossibleSnapAtX + "px";
          verLeftLine.style.position = "absolute";
          verLeftLine.style.width = "1px";
          verLeftLine.style.height = "100%";
          verLeftLine.style.backgroundColor = "#c8deff";
        } else if (isRightAttached) {
          verRightLine.style.visibility = "visible";
          verRightLine.style.left = nearestPossibleSnapAtX + "px";
          verRightLine.style.position = "absolute";
          verRightLine.style.width = "1px";
          verRightLine.style.height = "100%";
          verRightLine.style.backgroundColor = "#c8deff";
        }

        if (isTopAttached) {
          horTopLine.style.visibility = "visible";
          horTopLine.style.top = nearestPossibleSnapAtY + "px";
          horTopLine.style.position = "absolute";
          horTopLine.style.width = "100%";
          horTopLine.style.height = "1px";
          horTopLine.style.backgroundColor = "#c8deff";
        } else if (isBottomAttached) {
          horBotLine.style.visibility = "visible";
          horBotLine.style.top = nearestPossibleSnapAtY + "px";
          horBotLine.style.position = "absolute";
          horBotLine.style.width = "100%";
          horBotLine.style.height = "1px";
          horBotLine.style.backgroundColor = "#c8deff";
        }
      };

      const handleMouseUp = () => {
        const newShapeTop = originalElPositionTop + movedTop;
        const newShapeLeft = originalElPositionLeft + movedLeft;

        horBotLine.remove();
        horTopLine.remove();
        verLeftLine.remove();
        verRightLine.remove();

        if (movedTop || movedLeft) {
          if (isLeftAttached && isTopAttached) {
            dispatch(
              changeShapePosition({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isLeftAttached && isBottomAttached) {
            dispatch(
              changeShapePosition({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached && isTopAttached) {
            dispatch(
              changeShapePosition({
                top: nearestPossibleSnapAtY,
                left: nearestPossibleSnapAtX - originalElWidth,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached && isBottomAttached) {
            dispatch(
              changeShapePosition({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: nearestPossibleSnapAtX - originalElWidth,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isLeftAttached) {
            dispatch(
              changeShapePosition({
                top: newShapeTop,
                left: nearestPossibleSnapAtX,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isRightAttached) {
            dispatch(
              changeShapePosition({
                top: newShapeTop,
                left: nearestPossibleSnapAtX - originalElWidth,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isTopAttached) {
            dispatch(
              changeShapePosition({
                top: nearestPossibleSnapAtY,
                left: newShapeLeft,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else if (isBottomAttached) {
            dispatch(
              changeShapePosition({
                top: nearestPossibleSnapAtY - originalElHeight,
                left: newShapeLeft,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
                canvasIndex,
                shapeIndex,
              })
            );
          } else {
            dispatch(
              changeShapePosition({
                top: newShapeTop,
                left: newShapeLeft,
                prevTop: originalElPositionTop,
                prevLeft: originalElPositionLeft,
                prevHeight: originalElHeight,
                prevWidth: originalElWidth,
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
    currentScale,
    currentTool,
    dispatch,
    isDragScrolling,
    isRendered,
    shapeIndex,
    shapeRef,
    xAxisSnapPoints,
    yAxisSnapPoints,
  ]);
}

export default useDragShape;
