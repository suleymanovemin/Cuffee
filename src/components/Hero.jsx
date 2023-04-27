import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "swiper/css";
function Hero() {
  return (
    <div className="hero">
      <>
      <Swiper
        speed={2000}
        effect={"cube"}
        autoplay={{
          delay: 2300,
          disableOnInteraction: true,
        }}
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        parallax={true}
        className="mySwiper"
      >
          <SwiperSlide>
            <div className="heroSwiper">
              <div className="swiperImage">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/s1.jpg?v=1659690901"
                  alt=""
                />
                <div className="swiperTitle">
                  <h3>Enough Best Tea</h3>
                  <h3>Pure Coffee</h3>
                  <h3>
                    Aliqua id fugiat irure ex duis ea quis id quis ad et.{" "}
                    <br></br>
                    Sunt qui esse pariatur duis deserunt
                  </h3>
                  <Link to="/products">SHOP NOW</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="heroSwiper heroSwiperSecond">
              <div className="swiperImage">
                <img
                  src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/s2.jpg?v=1659690856"
                  alt=""
                />
                <div className="swiperTitle">
                  <h3>Enough Best Tea</h3>
                  <h3>Coffee Moka</h3>
                  <h3>
                    Aliqua id fugiat irure ex duis ea quis id quis ad et.{" "}
                    <br></br>
                    Sunt qui esse pariatur duis deserunt
                  </h3>
                  <Link to="products">SHOP NOW</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
}

export default Hero;
