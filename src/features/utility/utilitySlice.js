import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectTitle: "untitled_project",
  isSelectorActivated: true,
  tools: ["rectangle", "ellipse", "line", "seletor", "text"],
  workingCanvas: {},
  selectedShapes: [],
  currentScale: 1,
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
  },
});

export const selectToolPresets = (state) => state.utility.tools;

export const selectCurrentScale = (state) => state.utility.currentScale;

export const selectProjectTitle = (state) => state.utility.projectTitle;

export const {
  activateSelector,
  deactivateSelector,
  setCurrentScale,
  setProjectTitle,
} = utilitySlice.actions;

export default utilitySlice.reducer;
