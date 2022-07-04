import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";

import tools from "../constants/tools";
import { deleteShape } from "../features/canvas/canvasSlice";
import {
  emptySelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
  setCurrentTool,
} from "../features/utility/utilitySlice";

function useGlobalKeyboardShortCut() {
  const dispatch = useDispatch();

  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

  useEffect(() => {
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
      }
    };

    const undoShortCut = (e) => {
      if ((e.ctrlKey && e.key === "z") || (e.metaKey && e.key === "z")) {
        e.preventDefault();
        dispatch(ActionCreators.undo());
        dispatch(emptySelectedShapeIndexes());
      }
    };

    const redoShortCut = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key === "x") ||
        (e.metaKey && e.shiftKey && e.key === "x")
      ) {
        e.preventDefault();
        dispatch(ActionCreators.redo());
        dispatch(emptySelectedShapeIndexes());
      }
    };

    const rectangleToolShortCut = (e) => {
      if ((e.ctrlKey && e.key === "r") || (e.metaKey && e.key === "r")) return;
      if (e.key === "r") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.RECTANGLE));
      }
    };

    const ellipseToolShortCut = (e) => {
      if ((e.ctrlKey && e.key === "e") || (e.metaKey && e.key === "e")) return;
      if (e.key === "e") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.ELLIPSE));
      }
    };

    const lineToolShortCut = (e) => {
      if ((e.ctrlKey && e.key === "l") || (e.metaKey && e.key === "l")) return;
      if (e.key === "l") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.LINE));
      }
    };

    const selectorToolShortCut = (e) => {
      if ((e.ctrlKey && e.key === "v") || (e.metaKey && e.key === "v")) return;
      if (e.key === "v") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.SELECTOR));
      }
    };

    const textToolShortCut = (e) => {
      if ((e.ctrlKey && e.key === "t") || (e.metaKey && e.key === "t")) return;
      if (e.key === "t") {
        e.preventDefault();
        dispatch(setCurrentTool(tools.TEXT));
      }
    };

    const canvasToolShortCut = (e) => {
      if ((e.ctrlKey && e.key === "c") || (e.metaKey && e.key === "c")) return;
      if (e.key === "c") {
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
  }, [dispatch, selectedShapeIndexes, workingCanvasIndex]);
}

export default useGlobalKeyboardShortCut;
