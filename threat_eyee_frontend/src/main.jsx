import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Make sure this points to your Tailwind styles
import App from "./App"; // Import the renamed App.jsx

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
