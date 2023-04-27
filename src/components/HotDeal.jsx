import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

function HotDeal({ notify }) {
  const subInput = useRef();
  const subscribe = (e) => {
    if (subInput.current.value.length > 3) {
      notify();
    }
  };

  return (
    <>
      <div className="packagedCofee">
        <div className="container packaged">
          <div className="packagetImage">
            <img
              src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba.png?v=1659687828"
              alt=""
            />
          </div>
          <div className="packagetContent">
            <h1>PURE PACKAGED COFFEE</h1>
            <div className="packagetInner">
              <ul>
                <li>Enerji verir və düşünmə qabiliyyətinizi artırır</li>
                <li>Daxilində çoxlu faydalı qidaları ehtiva edir</li>
                <li>II tip diabet riskini azaldır</li>
                <li>Alzheimer xəstəliyi və demansın qarşısını alır</li>
                <li>Ürək xəstəliyi və ürək tutması riskini azaldır</li>
              </ul>
            </div>
            <div className="shopNow">
              <Link to="/products">SHOP NOW</Link>
            </div>
          </div>
        </div>
      </div>

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
                <Link to="/products">New Collection</Link>
                <p>It is a long established fact that a reader</p>
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
                <Link to="/products">New Collection</Link>
                <p>It is a long established fact that a reader</p>
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
                <Link to="/products">New Collection</Link>
                <p>It is a long established fact that a reader</p>
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
                <Link to="/products">New Collection</Link>
                <p>It is a long established fact that a reader</p>
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
                <Link to="/products">New Collection</Link>
                <p>It is a long established fact that a reader</p>
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
                <Link to="/products">New Collection</Link>
                <p>It is a long established fact that a reader</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="subscribe container">
        <div className="subImage">
          <img
            src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba29.jng.png?v=1660124510"
            alt=""
          />
        </div>
        <div className="subContent">
          <div className="subIcon">
            <i className="fa-solid fa-envelope-open"></i>
          </div>
          <h3>Newsletter Signup</h3>
          <p>Join our list and get 15% off your first purchase!</p>
          <div className="subInput">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                ref={subInput}
                type="text"
                placeholder="Email Address..."
              />
              <button onClick={subscribe}>Abunə Ol</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotDeal;
