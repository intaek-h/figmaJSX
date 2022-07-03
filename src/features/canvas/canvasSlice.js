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
    changeCanvasName: (state, { payload: { name, canvasIndex } }) => {
      state[canvasIndex].canvasName = name;
    },
    addShape: (state, { payload }) => {
      const index = payload.canvasIndex;
      delete payload.canvasIndex;
      payload.name = `${payload.type} ${state[index].children.length}`;
      state[index].children.push(payload);
    },
    modifyShape: (state, { payload }) => {
      const canvasIndex = payload.canvasIndex;
      const shapeIndex = payload.shapeIndex;
      delete payload.canvasIndex;
      delete payload.shapeIndex;
      state[canvasIndex].children[shapeIndex] = {
        ...state[canvasIndex].children[shapeIndex],
        ...payload,
      };
    },
    changeShapeIndex: (state, { payload: { canvasIdx, fromIdx, toIdx } }) => {
      const shape = state[canvasIdx].children[fromIdx];
      state[canvasIdx].children.splice(fromIdx, 1);
      state[canvasIdx].children.splice(toIdx, 0, shape);
    },
  },
});

export const selectAllCanvas = (state) => state.workbench.present.canvas;

export const {
  createCanvas,
  changeCanvasName,
  addShape,
  modifyShape,
  changeShapeIndex,
} = canvasSlice.actions;

export default canvasSlice.reducer;
