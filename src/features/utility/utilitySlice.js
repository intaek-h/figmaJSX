import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectTitle: "untitled_project",
  isSelectorActivated: true,
  tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  workingCanvas: {},
  selectedShapes: [],
  currentScale: 1,
  currentTool: "selector",
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
  },
});

export const selectToolPresets = (state) => state.utility.tools;

export const selectCurrentScale = (state) => state.utility.currentScale;

export const selectProjectTitle = (state) => state.utility.projectTitle;

export const selectCurrentTool = (state) => state.utility.currentTool;

export const {
  activateSelector,
  deactivateSelector,
  setCurrentScale,
  setProjectTitle,
  setCurrentTool,
} = utilitySlice.actions;

export default utilitySlice.reducer;
