import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ActionCreators } from "redux-undo";

import "./styles.scss";
import App from "./App";
import store, { workbenchReducerName } from "./store/configureStore";
import "./utilities/defaultEventListeners";
import LOCAL_STORAGE_KEY from "./constants/localStorage";
import {
  resetUtility,
  utilitySliceName,
} from "./features/utility/utilitySlice";
import { INVALID_FILE } from "./constants/errors";
import { resetCanvas } from "./features/canvas/canvasSlice";
import { resetGlobalStyles } from "./features/globalStyles/globalStylesSlice";

const root = document.querySelector("#root");

const lastSavedWork = localStorage.getItem(LOCAL_STORAGE_KEY);

if (lastSavedWork) {
  try {
    const data = JSON.parse(lastSavedWork);

    if (
      !Object.prototype.hasOwnProperty.call(data, workbenchReducerName) ||
      !Object.prototype.hasOwnProperty.call(data, utilitySliceName)
    )
      throw INVALID_FILE;

    store.dispatch(resetCanvas(data.workbench.present.canvas));
    store.dispatch(resetGlobalStyles(data.workbench.present.globalStyles));
    store.dispatch(resetUtility(data.utility));
    store.dispatch(ActionCreators.clearHistory());
  } catch {} // eslint-disable-line no-empty
}

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
