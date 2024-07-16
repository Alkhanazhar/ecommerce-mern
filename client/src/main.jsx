import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import AdminPanel from "./pages/AdminPanel.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Search from "./pages/Search.jsx";
// axios.defaults.baseURL = "https://ecom-mern-blackhouse.onrender.com";
axios.defaults.baseURL = "http://localhost:8082";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "/products/:productId",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "admin-panel/all-users",
            element: <AllUsers />,
          },
          {
            path: "admin-panel/all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


