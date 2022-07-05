import { createSlice, current } from "@reduxjs/toolkit";

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
    modifyCanvas: (state, { payload }) => {
      const canvasIndex = payload.canvasIndex;
      delete payload.canvasIndex;
      state[canvasIndex] = {
        ...state[canvasIndex],
        ...payload,
      };
    },
    addShape: (state, { payload }) => {
      const index = payload.canvasIndex;
      delete payload.canvasIndex;
      const xAxisSnaps = [
        payload.left,
        payload.left + payload.width / 2,
        payload.left + payload.width,
      ];
      const yAxisSnaps = [
        payload.top,
        payload.top + payload.height / 2,
        payload.top + payload.height,
      ];
      const xAxisSnapSet = new Set(
        current(state[index].xAxisSnap).concat(xAxisSnaps)
      );
      const yAxisSnapSet = new Set(
        current(state[index].yAxisSnap).concat(yAxisSnaps)
      );
      state[index].children.push(payload);
      state[index].xAxisSnap.push(...[...xAxisSnapSet]);
      state[index].yAxisSnap.push(...[...yAxisSnapSet]);
      payload.name = `${payload.type} ${state[index].children.length}`;
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
    changeShapePosition: (state, { payload }) => {
      const canvasIndex = payload.canvasIndex;
      const shapeIndex = payload.shapeIndex;
      const prevXAxisSnaps = [
        payload.prevLeft,
        payload.prevLeft + payload.prevWidth / 2,
        payload.prevLeft + payload.prevWidth,
      ];
      const prevYAxisSnaps = [
        payload.prevTop,
        payload.prevTop + payload.prevHeight / 2,
        payload.prevTop + payload.prevHeight,
      ];
      const xAxisSnaps = [
        payload.left,
        payload.left + payload.prevWidth / 2,
        payload.left + payload.prevWidth,
      ];
      const yAxisSnaps = [
        payload.top,
        payload.top + payload.prevHeight / 2,
        payload.top + payload.prevHeight,
      ];
      const filteredXAxisSnaps = [];
      current(state[canvasIndex].xAxisSnap).forEach((num) => {
        if (!prevXAxisSnaps.includes(num)) filteredXAxisSnaps.push(num);
      });
      const filteredYAxisSnaps = [];
      current(state[canvasIndex].yAxisSnap).forEach((num) => {
        if (!prevYAxisSnaps.includes(num)) filteredYAxisSnaps.push(num);
      });
      const newXAxisSnap = new Set(filteredXAxisSnaps.concat(xAxisSnaps));
      const newYAxisSnap = new Set(filteredYAxisSnaps.concat(yAxisSnaps));
      state[canvasIndex].xAxisSnap = [...newXAxisSnap];
      state[canvasIndex].yAxisSnap = [...newYAxisSnap];
      state[canvasIndex].children[shapeIndex] = {
        ...state[canvasIndex].children[shapeIndex],
        ...{
          top: payload.top,
          left: payload.left,
        },
      };
    },
    changeShapeIndex: (state, { payload: { canvasIdx, fromIdx, toIdx } }) => {
      const shape = state[canvasIdx].children[fromIdx];
      state[canvasIdx].children.splice(fromIdx, 1);
      state[canvasIdx].children.splice(toIdx, 0, shape);
    },
    deleteShape: (state, { payload: { canvasIndex, shapeIndexArr } }) => {
      state[canvasIndex].children = state[canvasIndex].children.filter(
        (_, i) => shapeIndexArr.indexOf(i) == -1
      );
    },
  },
});

export const selectAllCanvas = (state) => state.workbench.present.canvas;

export const selectXAxisSnapPoints = (canvasIdx) => (state) =>
  state.workbench.present.canvas[canvasIdx].xAxisSnap;

export const selectYAxisSnapPoints = (canvasIdx) => (state) =>
  state.workbench.present.canvas[canvasIdx].yAxisSnap;

export const {
  createCanvas,
  changeCanvasName,
  addShape,
  modifyShape,
  changeShapeIndex,
  modifyCanvas,
  deleteShape,
  changeShapePosition,
} = canvasSlice.actions;

export default canvasSlice.reducer;
