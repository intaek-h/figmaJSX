import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#e2e2e2",
  thickness: 1,
  fontSize: 12,
};

const globalStylesSlice = createSlice({
  name: "globalStyles",
  initialState,
  reducers: {
    loadGlobalStyles: (_, { payload }) => {
      return payload;
    },
    resetGlobalStyles: () => initialState,
    setGlobalColor: (state, { payload }) => {
      state.color = payload;
    },
    setGlobalThickness: (state, { payload }) => {
      state.thickness = payload;
    },
    setGlobalFontSize: (state, { payload }) => {
      state.fontSize = payload;
    },
  },
});

export const selectGlobalColor = (state) =>
  state.workbench.present.globalStyles.color;

export const selectGlobalThickness = (state) =>
  state.workbench.present.globalStyles.thickness;

export const selectGlobalFontSize = (state) =>
  state.workbench.present.globalStyles.fontSize;

export const {
  setGlobalColor,
  setGlobalFontSize,
  setGlobalThickness,
  loadGlobalStyles,
  resetGlobalStyles,
} = globalStylesSlice.actions;

export default globalStylesSlice.reducer;
