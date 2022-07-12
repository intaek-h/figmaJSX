import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ActionCreators } from "redux-undo";

import "./styles.scss";
import App from "./App";
import store, { WORKBENCH_REDUCER_NAME } from "./store/configureStore";
import "./utilities/defaultEventListeners";
import LOCAL_STORAGE_KEY from "./constants/localStorage";
import { loadUtility, utilitySliceName } from "./features/utility/utilitySlice";
import { INVALID_FILE } from "./constants/errors";
import { loadCanvas } from "./features/canvas/canvasSlice";
import { loadGlobalStyles } from "./features/globalStyles/globalStylesSlice";

const root = document.querySelector("#root");

const lastSavedWork = localStorage.getItem(LOCAL_STORAGE_KEY);

if (lastSavedWork) {
  try {
    const data = JSON.parse(lastSavedWork);

    if (
      !Object.prototype.hasOwnProperty.call(data, WORKBENCH_REDUCER_NAME) ||
      !Object.prototype.hasOwnProperty.call(data, utilitySliceName)
    )
      throw INVALID_FILE;

    store.dispatch(loadCanvas(data.workbench.present.canvas));
    store.dispatch(loadGlobalStyles(data.workbench.present.globalStyles));
    store.dispatch(loadUtility(data.utility));
    store.dispatch(ActionCreators.clearHistory());
  } catch {} // eslint-disable-line no-empty
}

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
