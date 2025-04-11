import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import { StatusProvider } from "./utils/StatusContext";
import StatusToast from "./components/StatusToast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <StatusProvider>
          <App />
          <StatusToast />
        </StatusProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
