import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#ffffff",
  thickness: 1,
  fontSize: 12,
};

const globalStylesSlice = createSlice({
  name: "globalStyles",
  initialState,
  reducers: {
    setColor: (state, { payload }) => {
      state.color = payload;
    },
    setThickness: (state, { payload }) => {
      state.thickness = payload;
    },
    setFontSize: (state, { payload }) => {
      state.fontSize = payload;
    },
  },
});

export const selectColor = (state) =>
  state.workbench.present.globalStyles.color;

export const selectThickness = (state) =>
  state.workbench.present.globalStyles.thickness;

export const selectFontSize = (state) =>
  state.workbench.present.globalStyles.fontSize;

export const { setColor, setFontSize, setThickness } =
  globalStylesSlice.actions;

export default globalStylesSlice.reducer;
