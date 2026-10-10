import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
import { BackgroundProvider } from "./components/BackgroundContext";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BackgroundProvider>
        <App />
      </BackgroundProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
