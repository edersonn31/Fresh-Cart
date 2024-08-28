import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import UpdateUserPassword from "./Components/UpdateUserPassword/UpdateUserPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import WishList from "./Components/WishList/WishList";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import UserContextProvider from "./Context/UserContext";
import Footer from "./Components/Footer/Footer";
let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { index: true, element: <Register /> },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "verifyResetCode",
        element: <VerifyResetCode />,
      },
      {
        path: "updateUserPassword",
        element: <UpdateUserPassword />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);
let query = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              style: {
              },
              success: {
                duration: 3000,
                theme: {
                },
              },
            }}
          />
          <ReactQueryDevtools />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
