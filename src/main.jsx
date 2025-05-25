// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PointsProvider } from "./PointsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PointsProvider>
      <App />
    </PointsProvider>
  </React.StrictMode>
);
