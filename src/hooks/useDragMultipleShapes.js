import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  HOR_SNAP_LINE_STYLES,
  MULTI_SELECTION_BOX_STYLES,
  VER_SNAP_LINE_STYLES,
} from "../constants/styles";
import tools from "../constants/tools";
import { modifyShape, selectAllCanvas } from "../features/canvas/canvasSlice";
import {
  finishDraggingShape,
  selectCurrentScale,
  selectCurrentTool,
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
  startDraggingShape,
} from "../features/utility/utilitySlice";
import computeSelectionBox from "../utilities/computeSelectionBox";
import computeSnapPosition from "../utilities/computeSnapPosition";

const GRAVITY = 5;

function useDragMultipleShapes(canvasRef) {
  const dispatch = useDispatch();

  const canvases = useSelector(selectAllCanvas);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const currentTool = useSelector(selectCurrentTool);
  const currentScale = useSelector(selectCurrentScale);

  useEffect(() => {
    if (
      !canvasRef.current ||
      currentTool !== tools.SELECTOR ||
      selectedShapeIndexes.length < 2
    )
      return;

    const canvasNodeIndex = workingCanvasIndex * 2 + 1;
    const canvas =
      document.querySelector("#root").childNodes[1].childNodes[1].firstChild
        .childNodes[canvasNodeIndex];

    const selectionWrapper = computeSelectionBox(
      canvases[workingCanvasIndex].children,
      selectedShapeIndexes
    );

    const ghostContainer = document.createElement("div");

    ghostContainer.style.top = selectionWrapper.top + "px";
    ghostContainer.style.left = selectionWrapper.left + "px";
    ghostContainer.style.height =
      selectionWrapper.height - selectionWrapper.top + "px";
    ghostContainer.style.width =
      selectionWrapper.width - selectionWrapper.left + "px";
    ghostContainer.style.position = MULTI_SELECTION_BOX_STYLES.POSITION;
    ghostContainer.style.backgroundColor = MULTI_SELECTION_BOX_STYLES.BG_COLOR;
    ghostContainer.style.border = MULTI_SELECTION_BOX_STYLES.BORDER;
    ghostContainer.style.boxSizing = MULTI_SELECTION_BOX_STYLES.BOX_SIZING;

    canvas.appendChild(ghostContainer);

    const handleMouseDown = (e) => {
      e.stopPropagation();

      const verticalLine = document.createElement("div");
      const horizontalLine = document.createElement("div");

      const originalElPositionTop = selectionWrapper.top;
      const originalElPositionLeft = selectionWrapper.left;
      const originalElHeight = ghostContainer.offsetHeight;
      const originalElWidth = ghostContainer.offsetWidth;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;
      const allShapes = e.currentTarget.parentNode.childNodes;

      const shapeList = canvases[workingCanvasIndex].children.slice();
      const filteredXAxisSnapPoints = [];
      const filteredYAxisSnapPoints = [];
      const selectedShapes = [];
      const unselectedShapes = shapeList.filter(
        (_, i) => selectedShapeIndexes.indexOf(i) === -1
      );

      selectedShapeIndexes.forEach((index) => {
        selectedShapes.push(allShapes[index]);
      });

      unselectedShapes.forEach((shape) => {
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
        0,
        canvas.offsetWidth / 2,
        canvas.offsetWidth
      );
      filteredYAxisSnapPoints.push(
        0,
        canvas.offsetHeight / 2,
        canvas.offsetHeight
      );

      const selectedShapePositions = selectedShapes.map((shape, i) => ({
        top: shape.offsetTop,
        left: shape.offsetLeft,
        horGap: shape.offsetLeft - ghostContainer.offsetLeft,
        verGap: shape.offsetTop - ghostContainer.offsetTop,
        shapeIndex: selectedShapeIndexes[i],
      }));

      let movedTop;
      let movedLeft;
      let isLeftAttached = false;
      let isRightAttached = false;
      let isTopAttached = false;
      let isBottomAttached = false;
      let nearestPossibleSnapAtX;
      let nearestPossibleSnapAtY;
      let isFirstMove = true;

      canvas.appendChild(verticalLine);
      canvas.appendChild(horizontalLine);

      const handleMouseMove = (e) => {
        if (isFirstMove) {
          dispatch(startDraggingShape());
          isFirstMove = false;
        }

        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        const currentTop = originalElPositionTop + movedTop;
        const currentLeft = originalElPositionLeft + movedLeft;

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

        selectedShapes.forEach((shape, i) => {
          shape.style.top = selectedShapePositions[i].top + movedTop + "px";
          shape.style.left = selectedShapePositions[i].left + movedLeft + "px";
        });

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
          ghostContainer.style.left = nearestPossibleSnapAtX + "px";
          selectedShapes.forEach((shape, i) => {
            shape.style.left =
              nearestPossibleSnapAtX + selectedShapePositions[i].horGap + "px";
          });
          isLeftAttached = true;
          isRightAttached = false;
        } else if (
          Math.abs(currentLeft + originalElWidth - nearestPossibleSnapAtX) <
          GRAVITY
        ) {
          ghostContainer.style.left =
            nearestPossibleSnapAtX - originalElWidth + "px";
          selectedShapes.forEach((shape, i) => {
            shape.style.left =
              nearestPossibleSnapAtX +
              selectedShapePositions[i].horGap -
              originalElWidth +
              "px";
          });
          isRightAttached = true;
          isLeftAttached = false;
        } else {
          ghostContainer.style.left = currentLeft + "px";
          isLeftAttached = false;
          isRightAttached = false;
        }

        if (Math.abs(currentTop - nearestPossibleSnapAtY) < GRAVITY) {
          ghostContainer.style.top = nearestPossibleSnapAtY + "px";
          selectedShapes.forEach((shape, i) => {
            shape.style.top =
              nearestPossibleSnapAtY + selectedShapePositions[i].verGap + "px";
          });
          isTopAttached = true;
          isBottomAttached = false;
        } else if (
          Math.abs(currentTop + originalElHeight - nearestPossibleSnapAtY) <
          GRAVITY
        ) {
          ghostContainer.style.top =
            nearestPossibleSnapAtY - originalElHeight + "px";
          selectedShapes.forEach((shape, i) => {
            shape.style.top =
              nearestPossibleSnapAtY +
              selectedShapePositions[i].verGap -
              originalElHeight +
              "px";
          });
          isBottomAttached = true;
          isTopAttached = false;
        } else {
          ghostContainer.style.top = currentTop + "px";
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

        if (movedTop || movedLeft) {
          selectedShapes.forEach((_, i) => {
            if (isLeftAttached && isTopAttached) {
              dispatch(
                modifyShape({
                  top:
                    nearestPossibleSnapAtY + selectedShapePositions[i].verGap,
                  left:
                    nearestPossibleSnapAtX + selectedShapePositions[i].horGap,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isLeftAttached && isBottomAttached) {
              dispatch(
                modifyShape({
                  top:
                    nearestPossibleSnapAtY +
                    selectedShapePositions[i].verGap -
                    originalElHeight,
                  left:
                    nearestPossibleSnapAtX + selectedShapePositions[i].horGap,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isRightAttached && isTopAttached) {
              dispatch(
                modifyShape({
                  top:
                    nearestPossibleSnapAtY + selectedShapePositions[i].verGap,
                  left:
                    nearestPossibleSnapAtX +
                    selectedShapePositions[i].horGap -
                    originalElWidth,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isRightAttached && isBottomAttached) {
              dispatch(
                modifyShape({
                  top:
                    nearestPossibleSnapAtY +
                    selectedShapePositions[i].verGap -
                    originalElHeight,
                  left:
                    nearestPossibleSnapAtX +
                    selectedShapePositions[i].horGap -
                    originalElWidth,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isLeftAttached) {
              dispatch(
                modifyShape({
                  top: newShapeTop + selectedShapePositions[i].verGap,
                  left:
                    nearestPossibleSnapAtX + selectedShapePositions[i].horGap,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isRightAttached) {
              dispatch(
                modifyShape({
                  top: newShapeTop + selectedShapePositions[i].verGap,
                  left:
                    nearestPossibleSnapAtX +
                    selectedShapePositions[i].horGap -
                    originalElWidth,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isTopAttached) {
              dispatch(
                modifyShape({
                  top:
                    nearestPossibleSnapAtY + selectedShapePositions[i].verGap,
                  left: newShapeLeft + selectedShapePositions[i].horGap,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else if (isBottomAttached) {
              dispatch(
                modifyShape({
                  top:
                    nearestPossibleSnapAtY +
                    selectedShapePositions[i].verGap -
                    originalElHeight,
                  left: newShapeLeft + selectedShapePositions[i].horGap,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            } else {
              dispatch(
                modifyShape({
                  top: newShapeTop + selectedShapePositions[i].verGap,
                  left: newShapeLeft + selectedShapePositions[i].horGap,
                  canvasIndex: workingCanvasIndex,
                  shapeIndex: selectedShapePositions[i].shapeIndex,
                })
              );
            }
          });
        }

        !isFirstMove && dispatch(finishDraggingShape());

        movedTop = 0;
        movedLeft = 0;

        window.removeEventListener("mousemove", handleMouseMove);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    ghostContainer.addEventListener("mousedown", handleMouseDown);

    return () => {
      ghostContainer.removeEventListener("mousedown", handleMouseDown);
      ghostContainer.remove();
    };
  }, [
    workingCanvasIndex,
    canvasRef,
    canvases,
    currentScale,
    currentTool,
    dispatch,
    selectedShapeIndexes,
  ]);
}

export default useDragMultipleShapes;
