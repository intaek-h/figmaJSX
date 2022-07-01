import { createSlice } from "@reduxjs/toolkit";

const generateSampleCanvas = (
  top = 1000,
  left = 1000,
  width = 390,
  height = 800
) => ({
  canvasName: "canvas_0",
  top,
  left,
  width,
  height,
  xAxisSnap: [0, width / 2, width],
  yAxisSnap: [0, height / 2, height],
  selectedShapes: [],
  children: [],
});

const initialState = [generateSampleCanvas()];

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    createCanvas: (state, { payload: { top, left, width, height } }) => {
      const newCanvas = {
        ...generateSampleCanvas(top, left, width, height),
        canvasName: `canvas_${state.length}`,
      };

      state.push(newCanvas);
    },
    changeCanvasName: (state, { payload: { name, index } }) => {
      state[index].canvasName = name;
    },
    addShape: (state, { payload }) => {
      const index = payload.index;
      delete payload.index;
      state[index].children.push(payload);
    },
  },
});

export const selectAllCanvas = (state) => state.workbench.present.canvas;

export const { createCanvas, changeCanvasName, addShape } = canvasSlice.actions;

export default canvasSlice.reducer;
