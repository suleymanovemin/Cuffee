import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import plane from "../icons/air-freight.png";
import cargo from "../icons/transfer.png";
import asserted from "../icons/asserted.png";
import verify from "../icons/verified.png";
import Quickview from "../modals/Quickview";
import LoginModal from "../modals/LoginModal";
import AddToCartModal from "../modals/AddToCartModal";
function Details({
  products,
  dispatch,
  showQuickViewModal,
  quickViewProductId,
  basket,
  favorites,
}) {
  if (!products?.length) {
    return null;
  }
  let { pathname } = useLocation();
  let { id } = useParams();
  let product = products.find((a) => a.id === +id);
  const [simillarProduct, setSimillarProduct] = useState(
    products.filter(
      (a) =>
        a.category_id === product.category_id &&
        a.id !== product.id 
    )
  );
  useEffect(() => {
    setSimillarProduct(
      products.filter(
        (a) =>
          a.category_id === product.category_id &&
          a.id !== product.id 
      )
    );
  }, [quickViewProductId]);
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const [activeClass, setActiveClass] = useState(0);
  const changeActive = (a, index) => {
    setSelectedImage(a);
    setActiveClass(index ?? 0);
  };
  useEffect(() => {
    setSelectedImage(product.image[0]);
  }, [pathname]);

  const changeId = () => {
    id = useParams();
    dispatch({
      type: "SET_VIEW_ID",
      payload: id,
    });
  };
  const showQuickModal = (id) => {
    dispatch({
      type: "SET_VIEW_MODAL",
      payload: showQuickViewModal,
    });
    dispatch({
      type: "SET_VIEW_ID",
      payload: id,
    });
  };
  const [delay, setDelay] = useState(false);

  const [prodCount, setProdCount] = useState(1);
  const addToProd = (c) => {
    setProdCount((a) => (a + c < 1 ? 1 : a + c));
  };
  const addToBasket = (id) => {
    if (delay) {
      return;
    }
    setDelay(true);
    const newBasket = [...basket];
    const index = newBasket.findIndex((item) => item.id === id);
    if (index >= 0) {
      newBasket[index].count += prodCount;
    } else {
      newBasket.push({ id: id, count: prodCount });
    }
    setProdCount(1);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    dispatch({ type: "SET_BASKET", payload: newBasket });
    notify();
    setTimeout(() => {
      setDelay(false);
    }, 1500);
  };
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket"));
    if (storedBasket) {
      dispatch({
        type: "SET_BASKET",
        payload: storedBasket,
      });
    }
  }, []);
  const notAddToBasket = () => {
    if (delay) {
      return;
    }
    setDelay(true);
    warning();
    setTimeout(() => {
      setDelay(false);
    }, 1500);
  };
  const notify = () =>
    toast.success("Məhsul Səbətə Əlavə edildi!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const warning = () =>
    toast.error("Mehsul Stokda Yoxdur", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const visibleAddModal = (id) => {
    const newBasket = [...basket];
    const index = newBasket.findIndex((item) => item.id === id);

    if (index >= 0) {
      newBasket[index].count += 1;
    } else {
      newBasket.push({ id: id, count: 1 });
    }

    localStorage.setItem("basket", JSON.stringify(newBasket));
    dispatch({ type: "SET_BASKET", payload: newBasket });
    dispatch({ type: "SET_VIEW_ADD_MODAL", payload: true });
    dispatch({
      type: "SET_VIEW_ID",
      payload: id,
    });
  };

  // Add To Favorites

  const addToFavorite = (id) => {
    const favoriteProducts = [...favorites];
    const productIndex = favoriteProducts.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      favoriteProducts.splice(productIndex, 1);
    } else {
      const productToAdd = products.find((product) => product.id === id);
      favoriteProducts.push(productToAdd);
    }

    dispatch({
      type: "ADD_TO_FAVORITE",
      payload: favoriteProducts,
    });
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  };
  useEffect(() => {
    const storedFavorite = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorite) {
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: storedFavorite,
      });
    }
  }, []);
  return (
    <>
      <Quickview />
      <LoginModal />
      <AddToCartModal />
      <Helmet>
        <title>{product.title}</title>
      </Helmet>
      <div className="container ProductDetail">
        <div className="detailImage">
          <div>
            <img src={selectedImage} alt="" />
          </div>
          <div className="otherImages">
            {product.image.map((a, index) => (
              <div
                key={index}
                className={
                  activeClass == index ? "otherImg active" : "otherImg"
                }
                onClick={() => changeActive(a, index)}
              >
                <img src={a} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="detailContent">
          <div className="detailTitle">
            <h2>{product.title}</h2>
            <div className="detailsPrice">
              {product.oldPrice ? (
                <del className="oldPrice">{product.oldPrice}₼</del>
              ) : (
                ""
              )}
              <p>{product.price}₼</p>
            </div>
            <p className={`inStock ${!product.inStock ? "active" : ""}`}>
              {product.inStock ? "Stokda Var" : "Stokda Yoxdur"}
            </p>
            <hr />
            <p>{product.content}</p>
            <div className="addToCart">
              <div className="count">
                <h1>{prodCount}</h1>
                <div className="countInput">
                  <button onClick={() => addToProd(1)}>
                    <i className="fa-solid fa-sort-up"></i>
                  </button>
                  <button onClick={() => addToProd(-1)}>
                    <i className="fa-solid fa-sort-down"></i>
                  </button>
                </div>
              </div>
              <div className={`toCart ${!product.inStock ? "deactive" : ""}`}>
                {product.inStock ? (
                  <button onClick={() => addToBasket(product.id)}>
                    Səbətə at
                  </button>
                ) : (
                  <button onClick={notAddToBasket}>Səbətə at</button>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
      <div className="container featuredServices">
        <div className="featured">
          <img src={plane} alt="" />
          <h3>BEYNƏLXALQ GÖNDƏRİLMƏ</h3>
        </div>
        <div className="featured">
          <img src={cargo} alt="" />
          <h3>60 GÜNDƏ PULSUZ GERİ İADƏ</h3>
        </div>
        <div className="featured">
          <img src={asserted} alt="" />
          <h3>24 AY ZƏMANƏT</h3>
        </div>
        <div className="featured">
          <img src={verify} alt="" />
          <h3>100% TƏHLÜKƏSİZ ÖDƏMƏ</h3>
        </div>
      </div>
      <div className="container simillarProduct">
        <h3>OXŞAR MƏHSULLAR</h3>
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          loop={true}
          breakpoints={{
            1024: {
              // width: 768,
              slidesPerView: 4,
            },
            768: {
              // width: 768,
              slidesPerView: 3,
            },
            428: {
              // width: 428,
              slidesPerView: 2,
            },
            425: {
              // width: 425,
              slidesPerView: 2,
            },
            375: {
              // width: 375,
              slidesPerView: 2,
            },
            320: {
              // width: 320,
              slidesPerView: 2,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={20}
          className="mySwiper"
        >
          <div className="products">
            {simillarProduct.map((a) => (
              <SwiperSlide key={a.id}>
                <div key={a.id} className="product">
                  <div className="productImage">
                    <div className="demo">
                      <Link
                        onClick={changeId}
                        className="hd"
                        to={`/details/${a.id}`}
                      >
                        <img src={a.image[1]} alt="" />
                      </Link>
                      <img src={a.image[0]} alt="" />
                    </div>
                    <div className="productIcon">
                      <ul>
                        <li
                          onClick={() => visibleAddModal(a.id)}
                          className="toolTip"
                        >
                          <div className="toolTipText">Səbətə At</div>
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="48"
                              viewBox="0 96 960 960"
                              width="48"
                            >
                              <path d="M220 976q-24 0-42-18t-18-42V396q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480 176q63 0 106.5 43.5T630 326v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520V396H630v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T570 486v-90H390v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T330 486v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220 916V396v520Z" />
                            </svg>
                          </button>
                        </li>
                        <li
                          onClick={() => showQuickModal(a.id)}
                          className="toolTip"
                        >
                          <div className="toolTipText">Ön İzləmə</div>
                          <p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="48"
                              viewBox="0 96 960 960"
                              width="48"
                            >
                              <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
                            </svg>
                          </p>
                        </li>
                        <li
                          onClick={() => addToFavorite(a.id)}
                          className="toolTip"
                        >
                          <div className="toolTipText">Seçilmişlər</div>
                          <p>
                            {favorites.find(
                              (product) => product.id === a.id
                            ) ? (
                              <i className="fa-solid fa-heart"></i>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="48"
                                viewBox="0 96 960 960"
                                width="48"
                              >
                                <path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z" />
                              </svg>
                            )}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="productDetails">
                    <h3>
                      <Link onClick={changeId} to={`/details/${a.id}`}>
                        {a.title}
                      </Link>
                    </h3>
                    <p className="price">
                      {a.oldPrice ? (
                        <del className="oldPrice">{a.oldPrice}₼</del>
                      ) : (
                        ""
                      )}
                      <b>{a.price}₼</b>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(Details);
