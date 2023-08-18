import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";

import "swiper/css";

import "swiper/css/navigation";

function HotDealSwiper() {
  return (
    <div className="coffeeSwiper container">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        breakpoints={{
          1024: {
            // width: 768,
            slidesPerView: 3,
          },
          768: {
            // width: 768,
            slidesPerView: 2,
          },
          428: {
            // width: 428,
            slidesPerView: 1,
          },
          425: {
            // width: 425,
            slidesPerView: 1,
          },
          375: {
            // width: 375,
            slidesPerView: 1,
          },
          320: {
            // width: 320,
            slidesPerView: 1,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="coffeeSwiperRow">
            <div className="coffeeSwiperImage">
              <Link to="/products">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba14.png?v=1659768549"
                  alt=""
                />
              </Link>
            </div>
            <div className="coffeeSwiperContent">
              <Link to="/products">Yeni Kolleksiya</Link>
              <p>Yeni gələn kofelərimizi kəşf edin</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coffeeSwiperRow">
            <div className="coffeeSwiperImage">
              <Link to="/products">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba134.png?v=1659768488"
                  alt=""
                />
              </Link>
            </div>
            <div className="coffeeSwiperContent">
              <Link to="/products">Yeni Kolleksiya</Link>
              <p>Yeni gələn kofelərimizi kəşf edin</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coffeeSwiperRow">
            <div className="coffeeSwiperImage">
              <Link to="/products">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba12.png?v=1659768488"
                  alt=""
                />
              </Link>
            </div>
            <div className="coffeeSwiperContent">
              <Link to="/products">Yeni Kolleksiya</Link>
              <p>Yeni gələn kofelərimizi kəşf edin</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coffeeSwiperRow">
            <div className="coffeeSwiperImage">
              <Link to="/products">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba11.png?v=1659768488"
                  alt=""
                />
              </Link>
            </div>
            <div className="coffeeSwiperContent">
              <Link to="/products">Yeni Kolleksiya</Link>
              <p>Yeni gələn kofelərimizi kəşf edin</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coffeeSwiperRow">
            <div className="coffeeSwiperImage">
              <Link to="/products">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba10.png?v=1659768488"
                  alt=""
                />
              </Link>
            </div>
            <div className="coffeeSwiperContent">
              <Link to="/products">Yeni Kolleksiya</Link>
              <p>Yeni gələn kofelərimizi kəşf edin</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coffeeSwiperRow">
            <div className="coffeeSwiperImage">
              <Link to="/products">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba10.png?v=1659768488"
                  alt=""
                />
              </Link>
            </div>
            <div className="coffeeSwiperContent">
              <Link to="/products">Yeni Kolleksiya</Link>
              <p>Yeni gələn kofelərimizi kəşf edin</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HotDealSwiper;
