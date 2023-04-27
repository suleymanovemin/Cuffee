import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function AddToCartModal({
  showAddModal,
  dispatch,
  quickViewProductId,
  products,
  basket,
}) {
  const visibleAddModal = () => {
    dispatch({
      type: "SET_VIEW_ADD_MODAL",
      payload: true,
    });
  };
  const product = products.find((a) => a.id === +quickViewProductId);
  const changeId = () => {
    id = useParams();
    dispatch({
      type: "SET_VIEW_ID",
      payload: id,
    });
  };
  let prod = basket.find((a) => a.id === +quickViewProductId);

  return (
    <div
      onClick={visibleAddModal}
      className={`addToCartModal ${showAddModal ? "active" : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cartModal"
      >
        <div className="cartDetail">
          <div className="cartProductDetail">
            <p>Səbətə əlavə edildi!</p>
            <div className="cartImage">
              <img src={product?.image[0]} alt="" />
            </div>
            <div className="addCartDetails">
              <p>{product?.title}</p>
              <p>
                Qiymət : <span>{product?.price}₼</span>
              </p>
              <p>
                Ədəd :<span>{prod?.count}</span>
              </p>
            </div>
          </div>
          <div onClick={visibleAddModal} className="closeloginForm">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="cartDetailContent">
            <p>
              Səbətdə bu məhsuldan <span>{prod?.count}</span> <br /> ədəd var.
            </p>
            <p className="totalPrice">
              Toplam Ödəniş :{" "}
              <span>
                {basket.reduce((acc, curr) => {
                  const product = products.find((p) => p.id === curr.id);
                  return acc + curr?.count * product?.price;
                }, 0)}
                ₼
              </span>
            </p>
            <button onClick={visibleAddModal}>Alış-verişə davam et</button>
            <button>Səbətə Get</button>
          </div>
        </div>
        <div className="cartSwiper">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {products.map((a) => (
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
                  </div>
                  <div className="productDetails">
                    <h3>
                      <Link
                        title={a.title}
                        onClick={changeId}
                        to={`/details/${a.id}`}
                      >
                        {a.title.slice(0, 16)}
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
          </Swiper>
        </div>
      </div>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(AddToCartModal);
