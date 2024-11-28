import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LanguageProvider } from "./providers/LanguageProvider.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}> */}
    <ThemeProvider>
      <LanguageProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </LanguageProvider>
    </ThemeProvider>
    {/* </GoogleOAuthProvider> */}
  </BrowserRouter>
);
