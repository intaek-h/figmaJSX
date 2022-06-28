import { combineReducers, configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import canvasSlice from "../features/canvas/canvasSlice";

import globalStylesSlice from "../features/globalStyles/globalStylesSlice";
import utilitySlice from "../features/utility/utilitySlice";

const workbench = combineReducers({
  globalStyles: globalStylesSlice,
  canvas: canvasSlice,
});

const undoableWorkBench = undoable(workbench);

const store = configureStore({
  reducer: {
    workbench: undoableWorkBench,
    utility: utilitySlice,
  },
});

export default store;
