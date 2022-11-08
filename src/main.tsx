import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Panel } from "./components/Panel";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="survey">
      <Panel>
        <App />
      </Panel>
    </div>
  </React.StrictMode>
);
