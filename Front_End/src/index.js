import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {AuthContextProvider} from "../src/utilities/context/authContext"
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </AuthContextProvider>,
  document.getElementById("root")
);
