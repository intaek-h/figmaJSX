import { createSlice } from "@reduxjs/toolkit";

import tools from "../../constants/tools";

const initialState = {
  projectTitle: "untitled_project",
  isSelectorActivated: true,
  isDragScrolling: false,
  isInputFieldFocused: false,
  workingCanvasIndex: 0,
  selectedShapeIndexes: [],
  hoveredShape: {
    canvasIndex: null,
    shapeIndex: null,
  },
  currentScale: 1,
  currentTool: tools.SELECTOR,
  tools: [
    tools.RECTANGLE,
    tools.ELLIPSE,
    tools.LINE,
    tools.SELECTOR,
    tools.TEXT,
    tools.CANVAS,
  ],
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
    setWorkingCanvasIndex: (state, { payload }) => {
      state.workingCanvasIndex = payload;
    },
    setHoveredShape: (state, { payload: { canvasIndex, shapeIndex } }) => {
      state.hoveredShape = { canvasIndex, shapeIndex };
    },
    replaceSelectedShapeIndexes: (state, { payload }) => {
      state.selectedShapeIndexes = [payload];
    },
    addSelectedShapeIndexes: (state, { payload }) => {
      state.selectedShapeIndexes.push(payload);
    },
    emptySelectedShapeIndexes: (state) => {
      state.selectedShapeIndexes = [];
    },
  },
});

export const selectToolPresets = (state) => state.utility.tools;

export const selectCurrentScale = (state) => state.utility.currentScale;

export const selectProjectTitle = (state) => state.utility.projectTitle;

export const selectCurrentTool = (state) => state.utility.currentTool;

export const selectIsDragScrolling = (state) => state.utility.isDragScrolling;

export const selectHoveredShape = (state) => state.utility.hoveredShape;

export const selectCurrentWorkingCanvasIndex = (state) =>
  state.utility.workingCanvasIndex;

export const selectIsSelectorActivated = (state) =>
  state.utility.isSelectorActivated;

export const selectIsInputFieldFocused = (state) =>
  state.utility.isInputFieldFocused;

export const selectSelectedShapeIndexes = (state) =>
  state.utility.selectedShapeIndexes;

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
  setWorkingCanvasIndex,
  setHoveredShape,
  addSelectedShapeIndexes,
  emptySelectedShapeIndexes,
  replaceSelectedShapeIndexes,
} = utilitySlice.actions;

export default utilitySlice.reducer;
