import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import "./index.scss";
import App from "./App.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/en-US" replace />,
    },
    {
        path: "/:lang",
        element: <App />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
