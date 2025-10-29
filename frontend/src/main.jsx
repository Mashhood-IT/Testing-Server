import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import ACSServices from "./components/ACSServices";
import FirstProductPage from "./pages/FirstProductPage";
import SecondProductPage from "./pages/SecondProductPage";
import ThirdProductPage from "./pages/ThirdProductPage";

const Private = ({ children }) => {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

const Shell = ({ children, privateRoute = false }) => (
  <div className="min-h-screen">
    <Navbar />
    <div>{privateRoute ? <Private>{children}</Private> : children}</div>
    {/* <Footer /> */}
  </div>
);

const router = createBrowserRouter([
  { path: "/", element: <Shell><Home /></Shell> },
  { path: "/login", element: <Shell><Login /></Shell> },
  
  { path: "/first-product-page", element: <Shell><FirstProductPage /></Shell> },
  { path: "/second-product-page", element: <Shell><SecondProductPage /></Shell> },
  { path: "/third-product-page", element: <Shell><ThirdProductPage /></Shell> },
  { path: "/dashboard", element: <Shell privateRoute><Dashboard /></Shell> },
  { path: "/dashboard/categories", element: <Shell privateRoute><Categories /></Shell> },
  { path: "/category/:id", element: <Shell><CategoryPage /></Shell> },
  { path: "/dashboard/products", element: <Shell privateRoute><Products /></Shell> },
  { path: "/product/:id", element: <Shell><ProductDetail /></Shell> },
  { path: "/dashboard/profile", element: <Shell privateRoute><Profile /></Shell> },

  // Added routes for About, Contact, and Projects pages
  { path: "/about", element: <Shell><About /></Shell> },
  { path: "/contact", element: <Shell><Contact /></Shell> },
  { path: "/services", element: <Shell><ACSServices /></Shell> },
  { path: "/projects", element: <Shell><Projects /></Shell> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
