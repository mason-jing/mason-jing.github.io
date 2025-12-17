import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import { HomePage } from "./components";
import "./locales"; // Initialize i18n

import "./styles/index.scss";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/en-US" replace /> },
    { path: "/:lang", element: <HomePage /> },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
