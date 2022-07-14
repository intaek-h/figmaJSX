import { configureStore } from "@reduxjs/toolkit";
import { render as RTLRender } from "@testing-library/react";
import { Provider } from "react-redux";

import utilitySlice from "../features/utility/utilitySlice";
import { undoableWorkBench } from "../store/configureStore";

function render(
  component,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        workbench: undoableWorkBench,
        utility: utilitySlice,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return RTLRender(component, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export default render;
