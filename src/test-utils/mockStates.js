export const INITIAL_STATE = {
  workbench: {
    past: [],
    present: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [],
        },
      ],
    },
    future: [],
    group: null,
    _latestUnfiltered: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [],
        },
      ],
    },
    index: 0,
    limit: 1,
  },
  utility: {
    projectTitle: "untitled_project",
    isSelectorActivated: true,
    isDragScrolling: false,
    isDraggingShape: false,
    isInputFieldFocused: false,
    workingCanvasIndex: 0,
    selectedShapeIndexes: [],
    hoveredShape: {
      canvasIndex: null,
      shapeIndex: null,
    },
    currentScale: 1,
    currentTool: "selector",
    tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  },
};

export const SHAPE_SELECTED_STATE = {
  workbench: {
    past: [
      {
        globalStyles: {
          color: "#e2e2e2",
          thickness: 1,
          fontSize: 12,
        },
        canvas: [
          {
            canvasName: "canvas_0",
            top: 1000,
            left: 1000,
            width: 390,
            height: 800,
            selectedShapes: [],
            children: [],
          },
        ],
      },
    ],
    present: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "rectangle",
              name: "rectangle 1",
              top: 116,
              left: 105,
              height: 70,
              width: 88,
              backgroundColor: "#e2e2e2",
            },
          ],
        },
      ],
    },
    future: [],
    group: null,
    _latestUnfiltered: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "rectangle",
              name: "rectangle 1",
              top: 116,
              left: 105,
              height: 70,
              width: 88,
              backgroundColor: "#e2e2e2",
            },
          ],
        },
      ],
    },
    index: 1,
    limit: 2,
  },
  utility: {
    projectTitle: "untitled_project",
    isSelectorActivated: true,
    isDragScrolling: false,
    isDraggingShape: false,
    isInputFieldFocused: false,
    workingCanvasIndex: 0,
    selectedShapeIndexes: [0],
    hoveredShape: {
      canvasIndex: null,
      shapeIndex: null,
    },
    currentScale: 1,
    currentTool: "selector",
    tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  },
};

export const TEXT_SELECTED_STATE = {
  workbench: {
    past: [
      {
        globalStyles: {
          color: "#e2e2e2",
          thickness: 1,
          fontSize: 12,
        },
        canvas: [
          {
            canvasName: "canvas_0",
            top: 1000,
            left: 1000,
            width: 390,
            height: 800,
            selectedShapes: [],
            children: [],
          },
        ],
      },
    ],
    present: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "text",
              name: "text 1",
              top: 126,
              left: 76,
              height: 14,
              width: 29,
              text: "hello",
              color: "#e2e2e2",
              fontSize: 12,
            },
          ],
        },
      ],
    },
    future: [],
    group: null,
    _latestUnfiltered: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "text",
              name: "text 1",
              top: 126,
              left: 76,
              height: 14,
              width: 29,
              text: "hello",
              color: "#e2e2e2",
              fontSize: 12,
            },
          ],
        },
      ],
    },
    index: 1,
    limit: 2,
  },
  utility: {
    projectTitle: "untitled_project",
    isSelectorActivated: true,
    isDragScrolling: false,
    isDraggingShape: false,
    isInputFieldFocused: false,
    workingCanvasIndex: 0,
    selectedShapeIndexes: [],
    hoveredShape: {
      canvasIndex: null,
      shapeIndex: null,
    },
    currentScale: 1,
    currentTool: "selector",
    tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  },
};

export const LINE_SELECTED_STATE = {
  workbench: {
    past: [
      {
        globalStyles: {
          color: "#e2e2e2",
          thickness: 1,
          fontSize: 12,
        },
        canvas: [
          {
            canvasName: "canvas_0",
            top: 1000,
            left: 1000,
            width: 390,
            height: 800,
            selectedShapes: [],
            children: [],
          },
        ],
      },
    ],
    present: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "line",
              name: "line 1",
              top: 212,
              left: 86,
              height: 1,
              width: 227,
              backgroundColor: "#e2e2e2",
            },
          ],
        },
      ],
    },
    future: [],
    group: null,
    _latestUnfiltered: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "line",
              name: "line 1",
              top: 212,
              left: 86,
              height: 1,
              width: 227,
              backgroundColor: "#e2e2e2",
            },
          ],
        },
      ],
    },
    index: 1,
    limit: 2,
  },
  utility: {
    projectTitle: "untitled_project",
    isSelectorActivated: true,
    isDragScrolling: false,
    isDraggingShape: false,
    isInputFieldFocused: false,
    workingCanvasIndex: 0,
    selectedShapeIndexes: [0],
    hoveredShape: {
      canvasIndex: null,
      shapeIndex: null,
    },
    currentScale: 1,
    currentTool: "selector",
    tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  },
};

export const MULTIPLE_SHAPE_SELECTED_STATE = {
  workbench: {
    past: [
      {
        globalStyles: {
          color: "#e2e2e2",
          thickness: 1,
          fontSize: 12,
        },
        canvas: [
          {
            canvasName: "canvas_0",
            top: 1000,
            left: 1000,
            width: 390,
            height: 800,
            selectedShapes: [],
            children: [],
          },
        ],
      },
      {
        globalStyles: {
          color: "#e2e2e2",
          thickness: 1,
          fontSize: 12,
        },
        canvas: [
          {
            canvasName: "canvas_0",
            top: 1000,
            left: 1000,
            width: 390,
            height: 800,
            selectedShapes: [],
            children: [
              {
                type: "rectangle",
                name: "rectangle 1",
                top: 121,
                left: 111,
                height: 40,
                width: 83,
                backgroundColor: "#e2e2e2",
              },
            ],
          },
        ],
      },
      {
        globalStyles: {
          color: "#e2e2e2",
          thickness: 1,
          fontSize: 12,
        },
        canvas: [
          {
            canvasName: "canvas_0",
            top: 1000,
            left: 1000,
            width: 390,
            height: 800,
            selectedShapes: [],
            children: [
              {
                type: "rectangle",
                name: "rectangle 1",
                top: 121,
                left: 111,
                height: 40,
                width: 83,
                backgroundColor: "#e2e2e2",
              },
              {
                type: "rectangle",
                name: "rectangle 2",
                top: 205,
                left: 127,
                height: 36,
                width: 105,
                backgroundColor: "#e2e2e2",
              },
            ],
          },
        ],
      },
    ],
    present: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "rectangle",
              name: "rectangle 1",
              top: 121,
              left: 111,
              height: 40,
              width: 83,
              backgroundColor: "#e2e2e2",
            },
            {
              type: "rectangle",
              name: "rectangle 2",
              top: 205,
              left: 127,
              height: 36,
              width: 105,
              backgroundColor: "#e2e2e2",
            },
            {
              type: "rectangle",
              name: "rectangle 3",
              top: 298,
              left: 134,
              height: 41,
              width: 125,
              backgroundColor: "#e2e2e2",
            },
          ],
        },
      ],
    },
    future: [],
    group: null,
    _latestUnfiltered: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [
            {
              type: "rectangle",
              name: "rectangle 1",
              top: 121,
              left: 111,
              height: 40,
              width: 83,
              backgroundColor: "#e2e2e2",
            },
            {
              type: "rectangle",
              name: "rectangle 2",
              top: 205,
              left: 127,
              height: 36,
              width: 105,
              backgroundColor: "#e2e2e2",
            },
            {
              type: "rectangle",
              name: "rectangle 3",
              top: 298,
              left: 134,
              height: 41,
              width: 125,
              backgroundColor: "#e2e2e2",
            },
          ],
        },
      ],
    },
    index: 3,
    limit: 4,
  },
  utility: {
    projectTitle: "untitled_project",
    isSelectorActivated: true,
    isDragScrolling: false,
    isDraggingShape: false,
    isInputFieldFocused: false,
    workingCanvasIndex: 0,
    selectedShapeIndexes: [0, 1, 2],
    hoveredShape: {
      canvasIndex: null,
      shapeIndex: null,
    },
    currentScale: 1,
    currentTool: "selector",
    tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  },
};

export const CANVAS_TOOL_STATE = {
  workbench: {
    past: [],
    present: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [],
        },
      ],
    },
    future: [],
    group: null,
    _latestUnfiltered: {
      globalStyles: {
        color: "#e2e2e2",
        thickness: 1,
        fontSize: 12,
      },
      canvas: [
        {
          canvasName: "canvas_0",
          top: 1000,
          left: 1000,
          width: 390,
          height: 800,
          selectedShapes: [],
          children: [],
        },
      ],
    },
    index: 0,
    limit: 1,
  },
  utility: {
    projectTitle: "untitled_project",
    isSelectorActivated: true,
    isDragScrolling: false,
    isDraggingShape: false,
    isInputFieldFocused: false,
    workingCanvasIndex: 0,
    selectedShapeIndexes: [],
    hoveredShape: {
      canvasIndex: null,
      shapeIndex: null,
    },
    currentScale: 1,
    currentTool: "canvas",
    tools: ["rectangle", "ellipse", "line", "selector", "text", "canvas"],
  },
};
