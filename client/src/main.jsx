import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContexProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContexProvider>
                <App />
            </AuthContexProvider>
        </BrowserRouter>
    </React.StrictMode>
);
