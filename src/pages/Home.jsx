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
      <HotDeal notify={notify} />
      <ToastContainer />
    </>
  );
}
const t = (a) => a;
export default connect(t)(Home);
