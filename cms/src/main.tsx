import React from "react";
import ReactDOM from "react-dom/client";
import App from "./container/App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MenuContextProvider from "./hoc/context/MenuContextProvider.tsx";
import UserContextProvider from "./hoc/context/UserContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </MenuContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
