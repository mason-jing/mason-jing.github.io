import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import "./styles/index.scss";
import "./locales"; // Initialize i18n
import App from "./components/App";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/en-US" replace /> },
    { path: "/:lang", element: <App /> },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
