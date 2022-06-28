import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelectorActivated: true,
  tools: ["rectangle", "ellipse", "line", "seletor", "text"],
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
  },
});

export const selectToolPresets = (state) => state.utility.tools;

export const { activateSelector, deactivateSelector } = utilitySlice.actions;

export default utilitySlice.reducer;
