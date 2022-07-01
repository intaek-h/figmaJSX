import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#000000",
  thickness: 1,
  fontSize: 12,
};

const globalStylesSlice = createSlice({
  name: "globalStyles",
  initialState,
  reducers: {
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

export const { setGlobalColor, setGlobalFontSize, setGlobalThickness } =
  globalStylesSlice.actions;

export default globalStylesSlice.reducer;
