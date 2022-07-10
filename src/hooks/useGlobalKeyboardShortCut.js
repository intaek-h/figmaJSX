import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";

import tools from "../constants/tools";
import {
  deleteCanvas,
  deleteShape,
  selectCanvasLength,
} from "../features/canvas/canvasSlice";
import {
  emptySelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
  selectIsInputFieldFocused,
  selectSelectedShapeIndexes,
  setCurrentTool,
  setWorkingCanvasIndex,
} from "../features/utility/utilitySlice";

function useGlobalKeyboardShortCut() {
  const dispatch = useDispatch();

  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const isInputFieldFocused = useSelector(selectIsInputFieldFocused);
  const canvasCount = useSelector(selectCanvasLength);

  useEffect(() => {
    if (isInputFieldFocused) return;

    const deleteShapeShortCut = (e) => {
      if (e.key === "Backspace" && selectedShapeIndexes.length) {
        e.preventDefault();
        dispatch(emptySelectedShapeIndexes());
        dispatch(
          deleteShape({
            canvasIndex: workingCanvasIndex,
            shapeIndexArr: selectedShapeIndexes,
          })
        );
      } else if (
        e.key === "Backspace" &&
        selectedShapeIndexes.length === 0 &&
        canvasCount > 1
      ) {
        e.preventDefault();
        dispatch(deleteCanvas(workingCanvasIndex));
        dispatch(setWorkingCanvasIndex(0));
      }
    };

    const redoShortCut = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.code === "KeyZ") ||
        (e.metaKey && e.shiftKey && e.code === "KeyZ")
      ) {
        e.preventDefault();
        dispatch(ActionCreators.redo());
        dispatch(emptySelectedShapeIndexes());
      }
    };

    const undoShortCut = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.code === "KeyZ") ||
        (e.metaKey && e.shiftKey && e.code === "KeyZ")
      )
        return;
      if (
        (e.ctrlKey && e.code === "KeyZ") ||
        (e.metaKey && e.code === "KeyZ")
      ) {
        e.preventDefault();
        dispatch(ActionCreators.undo());
        dispatch(emptySelectedShapeIndexes());
      }
    };

    const rectangleToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyR") || (e.metaKey && e.code === "KeyR"))
        return;
      if (e.code === "KeyR") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.RECTANGLE));
      }
    };

    const ellipseToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyE") || (e.metaKey && e.code === "KeyE"))
        return;
      if (e.code === "KeyE") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.ELLIPSE));
      }
    };

    const lineToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyL") || (e.metaKey && e.code === "KeyL"))
        return;
      if (e.code === "KeyL") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.LINE));
      }
    };

    const selectorToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyV") || (e.metaKey && e.code === "KeyV"))
        return;
      if (e.code === "KeyV") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.SELECTOR));
      }
    };

    const textToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyT") || (e.metaKey && e.code === "KeyT"))
        return;
      if (e.code === "KeyT") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.TEXT));
      }
    };

    const canvasToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyC") || (e.metaKey && e.code === "KeyC"))
        return;
      if (e.code === "KeyC") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.CANVAS));
      }
    };

    window.addEventListener("keydown", deleteShapeShortCut);
    window.addEventListener("keydown", undoShortCut);
    window.addEventListener("keydown", redoShortCut);
    window.addEventListener("keydown", rectangleToolShortCut);
    window.addEventListener("keydown", ellipseToolShortCut);
    window.addEventListener("keydown", lineToolShortCut);
    window.addEventListener("keydown", selectorToolShortCut);
    window.addEventListener("keydown", textToolShortCut);
    window.addEventListener("keydown", canvasToolShortCut);

    return () => {
      window.removeEventListener("keydown", deleteShapeShortCut);
      window.removeEventListener("keydown", undoShortCut);
      window.removeEventListener("keydown", redoShortCut);
      window.removeEventListener("keydown", rectangleToolShortCut);
      window.removeEventListener("keydown", ellipseToolShortCut);
      window.removeEventListener("keydown", lineToolShortCut);
      window.removeEventListener("keydown", selectorToolShortCut);
      window.removeEventListener("keydown", textToolShortCut);
      window.removeEventListener("keydown", canvasToolShortCut);
    };
  }, [
    canvasCount,
    dispatch,
    isInputFieldFocused,
    selectedShapeIndexes,
    workingCanvasIndex,
  ]);
}

export default useGlobalKeyboardShortCut;
