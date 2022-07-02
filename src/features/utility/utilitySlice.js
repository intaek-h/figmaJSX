import { createSlice } from "@reduxjs/toolkit";

import tools from "../../constants/tools";

const initialState = {
  projectTitle: "untitled_project",
  isSelectorActivated: true,
  isDragScrolling: false,
  isInputFieldFocused: false,
  tools: [
    tools.RECTANGLE,
    tools.ELLIPSE,
    tools.LINE,
    tools.SELECTOR,
    tools.TEXT,
    tools.CANVAS,
  ],
  workingCanvas: {},
  selectedShapes: [],
  currentScale: 1,
  currentTool: tools.SELECTOR,
};

const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    deactivateSelector: (state) => {
      state.isSelectorActivated = false;
    },
    activateSelector: (state) => {
      state.isSelectorActivated = true;
    },
    setCurrentScale: (state, { payload }) => {
      state.currentScale = payload;
    },
    setProjectTitle: (state, { payload }) => {
      state.projectTitle = payload;
    },
    setCurrentTool: (state, { payload }) => {
      state.currentTool = payload;
    },
    startDragScoll: (state) => {
      state.isDragScrolling = true;
    },
    finishDragScroll: (state) => {
      state.isDragScrolling = false;
    },
    setInputFieldFocused: (state) => {
      state.isInputFieldFocused = true;
    },
    setInputFieldBlurred: (state) => {
      state.isInputFieldFocused = false;
    },
  },
});

export const selectToolPresets = (state) => state.utility.tools;

export const selectCurrentScale = (state) => state.utility.currentScale;

export const selectProjectTitle = (state) => state.utility.projectTitle;

export const selectCurrentTool = (state) => state.utility.currentTool;

export const selectIsDragScrolling = (state) => state.utility.isDragScrolling;

export const selectIsSelectorActivated = (state) =>
  state.utility.isSelectorActivated;

export const selectIsInputFieldFocused = (state) =>
  state.utility.isInputFieldFocused;

export const {
  activateSelector,
  deactivateSelector,
  setCurrentScale,
  setProjectTitle,
  setCurrentTool,
  finishDragScroll,
  startDragScoll,
  setInputFieldBlurred,
  setInputFieldFocused,
} = utilitySlice.actions;

export default utilitySlice.reducer;
