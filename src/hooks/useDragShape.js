import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  HOR_SNAP_LINE_STYLES,
  VER_SNAP_LINE_STYLES,
} from "../constants/styles";
import tools from "../constants/tools";
import {
  addShape,
  modifyShape,
  selectAllCanvas,
} from "../features/canvas/canvasSlice";
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

  const [isCloning, setIsCloning] = useState(false);

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
      let lastAnimationFrame;

      canvas.appendChild(verticalLine);
      canvas.appendChild(horizontalLine);

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        if (lastAnimationFrame) cancelAnimationFrame(lastAnimationFrame);

        lastAnimationFrame = requestAnimationFrame(() => {
          renderNextAnimationFrame();
          lastAnimationFrame = null;
        });
      };

      const renderNextAnimationFrame = () => {
        const currentLeft = originalElPositionLeft + movedLeft;
        const currentTop = originalElPositionTop + movedTop;

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
          verticalLine.style.visibility = VER_SNAP_LINE_STYLES.VISIBLE;
          verticalLine.style.left = nearestPossibleSnapAtX + "px";
        }

        if (isTopAttached || isBottomAttached || isHorMidAttached) {
          horizontalLine.style.visibility = VER_SNAP_LINE_STYLES.VISIBLE;
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

    const handleAltKeyDown = (e) => {
      if (e.altKey) {
        e.preventDefault();
        setIsCloning(true);
        shape.addEventListener("mousedown", handleMouseDownClone);
        window.addEventListener("keyup", handleAltKeyUp);
      }
    };

    const handleAltKeyUp = (e) => {
      if (e.code === "AltLeft") {
        e.preventDefault();
        setIsCloning(false);
        shape.removeEventListener("mousedown", handleMouseDownClone);
        window.removeEventListener("keyup", handleAltKeyUp);
      }
    };

    const handleMouseDownClone = (e) => {
      e.stopPropagation();

      const targetShape = canvases[canvasIndex].children[shapeIndex];
      const shapeClone = document.createElement("div");
      const shapeTop = targetShape.top;
      const shapeLeft = targetShape.left;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      shapeClone.style.top = targetShape.top + "px";
      shapeClone.style.left = targetShape.left + "px";
      shapeClone.style.width = targetShape.width + "px";
      shapeClone.style.height = targetShape.height + "px";
      shapeClone.style.position = "absolute";

      if (targetShape.type === tools.TEXT) {
        shapeClone.style.color = targetShape.color;
        shapeClone.style.fontSize = targetShape.fontSize + "px";
        shapeClone.textContent = targetShape.text;
      } else {
        shapeClone.style.backgroundColor = targetShape.backgroundColor;
      }

      if (targetShape.type === tools.ELLIPSE) {
        shapeClone.style.borderRadius = targetShape.borderRadius;
      }

      let movedTop;
      let movedLeft;

      canvas.appendChild(shapeClone);

      const handleMouseMoveClone = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        const currentLeft = shapeLeft + movedLeft;
        const currentTop = shapeTop + movedTop;

        shapeClone.style.top = currentTop + "px";
        shapeClone.style.left = currentLeft + "px";
      };

      const handleMouseUpClone = () => {
        const currentLeft = shapeLeft + movedLeft;
        const currentTop = shapeTop + movedTop;

        const coordinates = {
          type: targetShape.type,
          name: targetShape.type,
          top: currentTop,
          left: currentLeft,
          height: targetShape.height,
          width: targetShape.width,
          canvasIndex,
        };

        if (targetShape.type === tools.RECTANGLE) {
          coordinates.backgroundColor = targetShape.backgroundColor;
        } else if (targetShape.type === tools.ELLIPSE) {
          coordinates.backgroundColor = targetShape.backgroundColor;
          coordinates.borderRadius = targetShape.borderRadius;
        } else if (targetShape.type === tools.LINE) {
          coordinates.backgroundColor = targetShape.backgroundColor;
        } else if (targetShape.type === tools.TEXT) {
          coordinates.text = targetShape.text;
          coordinates.color = targetShape.color;
          coordinates.fontSize = targetShape.fontSize;
        }

        dispatch(addShape(coordinates));
        shapeClone.remove();

        window.removeEventListener("mousemove", handleMouseMoveClone);
      };

      window.addEventListener("mousemove", handleMouseMoveClone);
      window.addEventListener("mouseup", handleMouseUpClone, { once: true });
    };

    window.addEventListener("keydown", handleAltKeyDown);
    shape.addEventListener("mousedown", handleMouseDown);

    if (isCloning) {
      shape.removeEventListener("mousedown", handleMouseDown);
    }

    return () => {
      shape.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleAltKeyDown);
    };
  }, [
    canvasIndex,
    canvasRef,
    canvases,
    currentScale,
    currentTool,
    dispatch,
    isCloning,
    isDragScrolling,
    isRendered,
    shapeIndex,
    shapeRef,
  ]);
}

export default useDragShape;
