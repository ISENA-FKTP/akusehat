import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://isena-fktp.vercel.app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
