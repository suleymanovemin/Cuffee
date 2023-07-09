import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";


function Servies() {
  // Framer Motion
  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4,
      },
    },
  };


  const item = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  
  const servies = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/0606/8191/2503/files/Vector3.png?v=1659686592",
      title: "24/7 DƏSTƏK",
      content: "Dəstək komandamız həftənin 7 günü sizin üçün ",
      content2: " hər zaman hazırdır",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0606/8191/2503/files/Vector2.png?v=1659686592",
      title: "PULSUZ ÇATDIRILMA",
      content: "100 dollardan yuxarı bütün alış-verişlərdə ",
      content2: "bölgələrə pulsuz çatdırılma",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0606/8191/2503/files/Vector.png?v=1659686591",
      title: "7 GÜNDƏ ASAN İADƏ",
      content: "Məhsulada hər hansı bir nasazlıq olduqda ",
      content2: "7 gün ərzində dərhal dəyişin",
    },
  ];
  const coffeesRow = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba1.jpg?v=1659689020",
      title: "Cherry Coffee",
      content:
        "Biz məhsul və xidmətlərin marketinqini ən son texnologiyalardan istifadə etməklə həyata keçiririk. Biz bir çoxlarını uğurla həyata keçirmişik",
      button: "İNDİ ALIŞ-VERİŞ EDİN",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba2.jpg?v=1659689020",
      title: "Black Coffee",
      content:
        "Biz məhsul və xidmətlərin marketinqini ən son texnologiyalardan istifadə etməklə həyata keçiririk. Biz bir çoxlarını uğurla həyata keçirmişik",
      button: "İNDİ ALIŞ-VERİŞ EDİN",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba3.jpg?v=1659689491",
      title: "ROBUTA COFFEE",
      content:
        "Biz məhsul və xidmətlərin marketinqini ən son texnologiyalardan istifadə etməklə həyata keçiririk. Biz bir çoxlarını uğurla həyata keçirmişik",
      button: "İNDİ ALIŞ-VERİŞ EDİN",
    },
  ];


  return (
    <div className="container">
      <div className="allServies">
        {servies.map((a, b) => (
          <div key={b} className="servies">
            <div className="serviesImage">
              <img src={a.image} alt="" />
            </div>
            <div className="serviesTitle">
              <h4>{a.title}</h4>
              <p>
                {a.content}
                <br />
                {a.content2}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Swiper className="mySwiper allServiesSwiper ">
        {servies.map((a, b) => (
          <SwiperSlide key={b}>
            <div className="servies">
              <div className="serviesImage">
                <img src={a.image} alt="" />
              </div>
              <div className="serviesTitle">
                <h4>{a.title}</h4>
                <p>
                  {a.content}
                  <br />
                  {a.content2}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <motion.div
      variants={container}
      className="coffeesRow">
        {coffeesRow.map((b, c) => (
          <motion.div
          variants={item}
            key={c}
            style={{ backgroundImage: `url(${b.image})` }}
            className="coffeeItem"
          >
            <h3>{b.title}</h3>
            <div className="coffeItemOverlay">
              <h3>{b.title}</h3>
              <p>{b.content}</p>
              <Link to="/products">{b.button}</Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Servies;
