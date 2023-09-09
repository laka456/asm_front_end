import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import Main from "./routes/Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
