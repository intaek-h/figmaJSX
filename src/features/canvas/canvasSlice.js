import { createSlice, current } from "@reduxjs/toolkit";
import tools from "../../constants/tools";

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
    changeShapeColor: (state, { payload }) => {
      const canvasIndex = payload.canvasIndex;
      const shapeIndex = payload.shapeIndex;
      delete payload.canvasIndex;
      delete payload.shapeIndex;
      if (
        current(state[canvasIndex].children[shapeIndex]).type === tools.TEXT
      ) {
        state[canvasIndex].children[shapeIndex] = {
          ...state[canvasIndex].children[shapeIndex],
          color: payload.color,
        };
      } else {
        state[canvasIndex].children[shapeIndex] = {
          ...state[canvasIndex].children[shapeIndex],
          backgroundColor: payload.color,
        };
      }
    },
    changeTextProperty: (state, { payload }) => {
      const canvasIndex = payload.canvasIndex;
      const shapeIndex = payload.shapeIndex;
      delete payload.canvasIndex;
      delete payload.shapeIndex;
      if (
        current(state[canvasIndex].children[shapeIndex]).type === tools.TEXT
      ) {
        state[canvasIndex].children[shapeIndex] = {
          ...state[canvasIndex].children[shapeIndex],
          ...payload,
        };
      }
    },
    changeLineThickness: (state, { payload }) => {
      const canvasIndex = payload.canvasIndex;
      const shapeIndex = payload.shapeIndex;
      delete payload.canvasIndex;
      delete payload.shapeIndex;
      const targetLine = current(state[canvasIndex].children[shapeIndex]);
      if (targetLine.type === tools.LINE) {
        if (targetLine.width > targetLine.height) {
          state[canvasIndex].children[shapeIndex] = {
            ...state[canvasIndex].children[shapeIndex],
            height: payload.thickness,
          };
        } else {
          state[canvasIndex].children[shapeIndex] = {
            ...state[canvasIndex].children[shapeIndex],
            width: payload.thickness,
          };
        }
      }
    },
    addShape: (state, { payload }) => {
      const index = payload.canvasIndex;
      delete payload.canvasIndex;
      state[index].children.push(payload);
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

export const {
  createCanvas,
  changeCanvasName,
  addShape,
  modifyShape,
  changeShapeIndex,
  modifyCanvas,
  deleteShape,
  changeShapeColor,
  changeTextProperty,
  changeLineThickness,
} = canvasSlice.actions;

export default canvasSlice.reducer;
