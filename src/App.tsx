import { useLayoutEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/main/MainLayout";
import DashboardPage from "./routes/dashboard/DashboardPage";
import ItemPage from "./routes/item/ItemPage";

const App = () => {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-prefers-color-scheme", "dark");
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "items",
          element: <ItemPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
