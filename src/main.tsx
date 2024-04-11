import React from "react";

import ReactDOM from "react-dom/client";

import { onStartWorker } from "@/mocks/index.tsx";

import App from "./App.tsx";
import "./index.css";

(async () => {
  if (process.env.NODE_ENV === "development") {
    onStartWorker();
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
})();
