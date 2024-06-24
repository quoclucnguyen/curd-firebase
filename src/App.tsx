import React, { Suspense, useLayoutEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

const MainLayout = React.lazy(() => import("./layouts/main/MainLayout"));
const DashboardPage = React.lazy(
  () => import("./routes/dashboard/DashboardPage")
);
const ItemPage = React.lazy(() => import("./routes/item/ItemPage"));
const LoginPage = React.lazy(() => import("./routes/login/LoginPage"));

const App = () => {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-prefers-color-scheme", "dark");
  }, []);

  const router = createBrowserRouter([
    {
      path: "login",
      element: <LoginPage />,
    },
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

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
