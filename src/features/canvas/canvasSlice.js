import { createSlice } from "@reduxjs/toolkit";

const generateSampleCanvas = (width = 390, height = 800) => ({
  canvasName: "canvas_0",
  top: 500,
  left: 600,
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
    createCanvas: (state, { payload: { width, height } }) => {
      const lastCanvas = state[state.length - 1];
      const newCanvas = {
        ...generateSampleCanvas(width, height),
        top: lastCanvas.top,
        left: lastCanvas.left + 30,
        canvasName: `canvas_${state.length}`,
      };

      state.push(newCanvas);
    },
  },
});

export const selectAllCanvas = (state) => state.workbench.present.canvas;

export const { createCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;
