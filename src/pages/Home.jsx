import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Servies from "../components/Servies";
import Quickview from "../modals/Quickview";
import LoginModal from "../modals/LoginModal";
import AddToCartModal from "../modals/AddToCartModal";
import HotDeal from "../components/HotDeal";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import LastBlogs from "../components/LastBlogs";
import HotDealSwiper from "../components/HotDealSwiper";
import HotDealSletter from "../components/HotDealSletter";

import ScrollToTop from "react-scroll-to-top";
function Home({ user }) {
  const notify = () =>
    toast.success("Abunə Olundu!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <>
      <ScrollToTop smooth />
      <Toaster position="top-right" />
      <Helmet>
        <title>Ana Səhifə</title>
      </Helmet>
      <Quickview />
      <LoginModal />
      <AddToCartModal />
      <Hero />
      <Servies />
      <Products />
      <HotDeal />
      <LastBlogs />
      <HotDealSwiper />
      <HotDealSletter />

      <ToastContainer />
    </>
  );
}
const t = (a) => a;
export default connect(t)(Home);
