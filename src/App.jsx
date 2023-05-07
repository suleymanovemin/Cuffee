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
const BasketPage = lazy(() => import("./pages/BasketPage"));
import ScrollToTop from "./components/ScrolltoTop";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
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
      path: "/admin/*",
      element: <AdminPanel />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/basket",
      element: <BasketPage />,
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

  return (
    <>
      {pathname !== "/not-found" && <Header />}
      <ScrollToTop />
      <Routes>
        {routes.map((a) => (
          <Route
            key={a.path}
            path={a.path}
            element={<Suspense fallback={<Loading />}>{a.element}</Suspense>}
          />
        ))}

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      {pathname !== "/not-found" && <Footer />}
    </>
  );
}

const t = (a) => a;
export default connect(t)(App);
