import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteShape } from "../features/canvas/canvasSlice";
import {
  emptySelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
} from "../features/utility/utilitySlice";

function useGlobalKeyboardShortCut() {
  const dispatch = useDispatch();

  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

  useEffect(() => {
    const deleteShapeShortCut = (e) => {
      if (e.key === "Backspace" && selectedShapeIndexes.length) {
        dispatch(emptySelectedShapeIndexes());
        dispatch(
          deleteShape({
            canvasIndex: workingCanvasIndex,
            shapeIndexArr: selectedShapeIndexes,
          })
        );
      }
    };

    window.addEventListener("keydown", deleteShapeShortCut);

    return () => window.removeEventListener("keydown", deleteShapeShortCut);
  }, [dispatch, selectedShapeIndexes, workingCanvasIndex]);
}

export default useGlobalKeyboardShortCut;
