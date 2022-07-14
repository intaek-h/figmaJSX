import { combineReducers, configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";

import canvasSlice, { changeShapeColor } from "../features/canvas/canvasSlice";
import globalStylesSlice from "../features/globalStyles/globalStylesSlice";
import utilitySlice from "../features/utility/utilitySlice";
import { batchGroupBy } from "../utilities/batchActions";

const MAXIMUM_UNDO_COUNT = 100;

const workbench = combineReducers({
  globalStyles: globalStylesSlice,
  canvas: canvasSlice,
});

export const undoableWorkBench = undoable(workbench, {
  groupBy: batchGroupBy.init(changeShapeColor.type),
  limit: MAXIMUM_UNDO_COUNT,
});

const store = configureStore({
  reducer: {
    workbench: undoableWorkBench,
    utility: utilitySlice,
  },
});

export default store;

export const WORKBENCH_REDUCER_NAME = "workbench";
