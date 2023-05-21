import "./App.css";
import "./Responsive.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Loading from "./components/Loading";
const Details = lazy(() => import("./pages/Details"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Blog = lazy(() => import("./pages/Blog"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Contact = lazy(() => import("./pages/Contact"));
import ScrollToTop from "./components/ScrolltoTop";
const BasketPage = lazy(() => import("./pages/BasketPage"));
const AdminPanel = lazy(() => import("./pages/adminPanel/AdminPanel"));
const AdminLayOut = lazy(() => import("./pages/adminPanel/AdminLayOut"));
const AdminBlog = lazy(() => import("./pages/adminPanel/AdminBlog"));
const AdminHome = lazy(() => import("./pages/adminPanel/AdminHome"));
const AdminProfile = lazy(() => import("./pages/adminPanel/AdminProfile"));
const AdminProductDetails = lazy(() => import("./pages/adminPanel/AdminProductDetails"));

import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
function App({ dispatch, user }) {
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket"));
    if (storedBasket) {
      dispatch({
        type: "SET_BASKET",
        payload: storedBasket,
      });
    }
    const storedFavorite = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorite) {
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: storedFavorite,
      });
    }
  }, []);

  let { pathname } = useLocation();

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/blog",
      element: <Blog />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
    {
      path: "/not-found",
      element: <NotFound />,
    },
    {
      path: "/details/:id",
      element: <Details />,
    },
    {
      path: "/blog/:id",
      element: <BlogDetails />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/basket",
      element: <BasketPage />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ];

  const API = "http://localhost:3000";
  useEffect(() => {
    fetch(`${API}/products`)
      .then((a) => a.json())
      .then((b) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: b,
        });
      });
  }, []);
  useEffect(() => {
    fetch(`${API}/blogs`)
      .then((a) => a.json())
      .then((b) => {
        dispatch({
          type: "SET_BLOGS",
          payload: b,
        });
      });
  }, []);
  useEffect(() => {
    fetch(`${API}/category`)
      .then((a) => a.json())
      .then((b) => {
        dispatch({
          type: "SET_CATEGORY",
          payload: b,
        });
      });
  }, []);
  const isAdminRoute = /^\/admin\/.*/.test(pathname);
  return (
    <>
      {pathname !== "/not-found" && !isAdminRoute && pathname !== "/admin" && (
        <Header />
      )}
      <ScrollToTop />
      <Routes>
        {routes.map((a) => (
          <Route
            key={a.path}
            path={a.path}
            element={<Suspense fallback={<Loading />}>{a.element}</Suspense>}
          />
        ))}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loading />}>
              <AdminLayOut />
            </Suspense>
          }
        >
          <Route
            index={true}
            element={
              <Suspense fallback={<Loading />}>
                <AdminHome />
              </Suspense>
            }
          />
          <Route
            path="productList"
            element={
              <Suspense fallback={<Loading />}>
                <AdminPanel />
              </Suspense>
            }
          />
          <Route
            path="bloglist"
            element={
              <Suspense fallback={<Loading />}>
                <AdminBlog />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loading />}>
                <AdminProfile />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loading />}>
                <AdminProfile />
              </Suspense>
            }
          />
          <Route
            path="productList/:id"
            element={
              <Suspense fallback={<Loading />}>
                <AdminProductDetails />
              </Suspense>
            }
          />
        </Route>

        {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
      </Routes>
      {pathname !== "/not-found" && !isAdminRoute && pathname !== "/admin" && (
        <Footer />
      )}
    </>
  );
}

const t = (a) => a;
export default connect(t)(App);
