import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper";
import Quickview from "../modals/Quickview";

const HotProducts = ({ products, dispatch, basket, favorites }) => {
  const changeId = () => {
    const { id } = useParams();
    dispatch({
      type: "SET_VIEW_ID",
      payload: id,
    });
  };

  //   Quick Modal

  const showQuickModal = () => {
    dispatch({
      type: "SET_VIEW_MODAL",
      payload: true,
    });
  };

  //   Add to Basket
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
  };

  // Favorite

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

  //   Filter Discounted Products

  const discountedProd = products.filter((a) => a.oldPrice);

  return (
    <>
      <Quickview />
      <div className="prodTitle">
      <h3>ENDIRIMLI MƏHSULLAR</h3>
      <p>Bu həftənin endirimli məhsulları!</p>
      </div>
      <div className="container hotProducts">
        <Swiper
          loop={true}
          autoplay={{
            delay: 1500,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            428: {
              slidesPerView: 2,
            },
            425: {
              slidesPerView: 2,
            },
            375: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 2,
            },
          }}
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={20}
          className="mySwiper"
        >
          <div className="products">
            {discountedProd?.map((a) => (
              <SwiperSlide key={a.id}>
                <div key={a.id} className="product">
                  <div className="productImage">
                    <div className="demo">
                      <Link className="hd" to={`/details/${a.id}`}>
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
                        <li onClick={showQuickModal} className="toolTip">
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
                      <Link to={`/details/${a.id}`}>{a.title}</Link>
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
                  {a.oldPrice ? (
              <div className="discound">
                <p>
                  -{(((a.oldPrice - a.price) / a.oldPrice) * 100).toFixed(0)}%
                </p>
              </div>
            ) : (
              ""
            )}
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};

const t = (a) => a;
export default connect(t)(HotProducts);
