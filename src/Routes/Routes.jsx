import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <h1>Login</h1>,
      },
      {
        path: "/register",
        element: <h2>Register</h2>,
      },
    ],
  },
]);

export default router;
