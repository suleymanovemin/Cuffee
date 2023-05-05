import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
function About() {
  return (
    <>
      <Helmet>
        <title>Haqqımızda</title>
      </Helmet>

      <div>
        <div className="blogsHeading">
          <h1>Haqqında</h1>
          <div className="breadCrumb">
            <Link to="/">
              Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
            </Link>
            <strong>Haqqımızda</strong>
          </div>
        </div>
        <div className="container about">
          <div className="aboutLeft">
            <div className="aboutInfo">
              <h3>Bizim Hekayəmiz</h3>
              <p>THE HIGH STRESS FAVOUTIRE</p>
            </div>
            <div className="aboutIntro">
              <p>
                Biz kofe sevgililəriyik və bu sevgimizi sizinlə bölüşmək üçün
                burdayıq! Bizim kofemiz, keyfiyyətli kofe, dadlı qəlyanaltılar
                və isti bir atmosfer təklif edərək müştərilərimizin gününü daha
                maraqlı edər. Bizim kofemizin əsas məhsulu, xüsusi seçilmiş və
                yerli olaraq yandırılmış ən yaxşı kofe dənələridir. Qızğın və
                soyuq kofe seçimlərimiz arasında espresso, latte, cappuccino,
                americano, macchiato, flat white və daha bir çox növ yer alır.
                Həmçinin, xüsusi tələbləri olan bitki əsaslı süd və
                dadlandırıcılar kimi müştərilərimizə xidmət edirik.
              </p>
            </div>
          </div>
          <div className="aboutRight">
            <img src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/about1.jpg?v=1659671796" />
          </div>
          <div className="aboutLeft">
            <img src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/about1.jpg?v=1659671796" />
          </div>
          <div className="aboutRight">
            <div className="aboutInfo">
              <h3>Biz kimik ?</h3>
              <p>THE HIGH STRESS FAVOUTIRE</p>
            </div>
            <div className="aboutIntro">
              <p>
                Biz Cuffee, kofe sevgililəri üçün özəl olaraq tərtib edilmiş bir
                kofe mağazasıyıq. Kofe mədəniyyətinə sevgimizi qoymaqdan
                məmnunluq duyuruq və bu sevgimizi müştərilərimizlə bölüşmək
                istəyirik. Müştəri məmnuniyyəti bizim üçün həmişə öncəlikdir. Bu
                səbəbdən, işimizi görmək üçün müştərilərimizin ehtiyaclarını və
                arzularını dinləyirik. Müştəri ehtiyaclarını ödəmək üçün özümüzü
                inkişaf etdiririk və yenilikləri izləyirik. İşçilərimiz bizim
                üçün ayrı bir önəmə malikdir. Hər bir işçimiz, komanda işinin
                vacib olduğunu qəbul edən, işini sevgi ilə edən və müştərilərə
                yaxınlaşmağı bacaran işçilərdir. Bizim kofe mağazamız sadəcə bir
                kofe dükkanı deyil, həmçinin bir cəmiyyət mərkəzidir. Bizim
                kofemizdə, sizə xüsusi olaraq hazırlanmış kofe növləri, dadlı
                təamlar və rahat məkan təklif edirik. Bizim əsas məhsulumuz,
                keyfiyyətli kofe dənələri və fərqli dadlı qəlyanaltılarımızdır.
                Siz də keyfiyyətli kofe və dadlı qəlyanaltıların tadını çıxarmaq
                istəyirsinizsə, sizi kofe mağazamıza gözləyirik!
              </p>
            </div>
          </div>
        </div>
        <div className="aboutServies">
          <div className="container">
            <div className="aboutServiesOne">
              <div className="abSerIcon">
                <i className="fa-solid fa-compass-drafting"></i>
              </div>
              <h4>Desing</h4>
              <p>
                Praesent metus tellus, elementum eu, semper Vestibulum volutpat
                pretium libero
              </p>
            </div>
            <div className="aboutServiesOne">
              <div className="abSerIcon">
                <i className="fa-regular fa-lightbulb"></i>
              </div>
              <h4>Inovation</h4>
              <p>
                Praesent metus tellus, elementum eu, semper Vestibulum volutpat
                pretium libero
              </p>
            </div>
            <div className="aboutServiesOne">
              <div className="abSerIcon">
                <i className="fa-solid fa-road"></i>
              </div>
              <h4>Journey</h4>
              <p>
                Praesent metus tellus, elementum eu, semper Vestibulum volutpat
                pretium libero
              </p>
            </div>
          </div>
        </div>
        <div className="newSteller">
          <ul className="container">
            <li>
              <div>
                <i class="fa-solid fa-envelope-open-text"></i>
              </div>
              <div>
                <h3>
                  SIGN UP <br /> FOR NEWSLETTER
                </h3>
              </div>
            </li>
            <li>
              <p>
                Subscribe to the weekly newsletter for all the latest updates
              </p>
            </li>
            <li className="subIn">
              <input placeholder="E-mail adress..." type="text" />
              <button>Subscribe</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
