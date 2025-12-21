import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import { HomePage } from "./components";
import { i18nInitPromise } from "./locales";

import "./styles/index.scss";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/en-US" replace /> },
    { path: "/:lang", element: <HomePage /> },
]);

(async () => {
    await i18nInitPromise;
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    );
})();
