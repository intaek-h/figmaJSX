import "./styles.scss";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/configureStore";
import "./utilities/defaultEventListeners";

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
