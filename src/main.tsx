import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./Translations/i18n";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
