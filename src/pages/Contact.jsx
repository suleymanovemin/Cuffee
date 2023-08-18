import { Link } from "react-router-dom";
import { Slider } from "antd";
import LoginModal from "../modals/LoginModal";
function Contact() {
  return (
    <div>
      <LoginModal />
      <div className="contactHeading">
        <div className="contactTitle">
          <h1>Əlaqə</h1>
          <div className="breadCrumb">
            <Link to="/">
              Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
            </Link>
            <strong>Əlaqə</strong>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="allContact">
          <div className="contactUs">
            <h5>Əlaqə</h5>
            <p>
              Salam! "Cuffee"ə xoş gəlmisiniz. Sizə necə kömək edə bilərik?
              Fikirləriniz bizim üçün dəyərlidir və sizə təqdim etdiyimiz
              "Cuffee" təcrübəsini təkmilləşdirməkdə bizə yardımçı olur.
              Markamızla bağlı bütün sual, şərh və fikirləriniz üçün bizimlə
              Cuffee-az@cuffee.com elektron ünvanı vasitəsilə əlaqə saxlaya
              bilər.
            </p>
            <div className="contactInfo">
              <div>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3>Adresss</h3>
                  <p>
                    İş saatları ərzində agentlərimizlə danışmaq üçün səhifənin
                    sağ altındakı işarəyə klikləyin. Digər vaxtlarda mümkün
                    qədər tez cavab verəcəyik.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h3>Telefon</h3>
                  <p>+994 51 333 99 33</p>
                </div>
              </div>
              <div>
                <div>
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <h3>İş Vaxtı</h3>
                  <p>
                    Bazar ertəsindən cüməyə 09:30 - 17:30 <br />
                    Şənbə və Bazar 10:00-15:00
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div>
                  <h3>Emial</h3>
                  <p>help@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contactMap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.23875134172!2d49.832470056838986!3d40.35923016268979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d52a78b2df3%3A0xf61d35420125500c!2sStarbucks!5e0!3m2!1saz!2saz!4v1683106548089!5m2!1saz!2saz"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="sendMessage">
          <h1>Bizə Mesaj Göndərin</h1>
          <form>
            <div>
              <input placeholder="Adınız..." type="text" />
              <input placeholder="Email adresiniz..." type="text" />
            </div>
            <textarea placeholder="Mesajınız..."></textarea>
            <input type="submit" value="Göndər" />
          </form>
        </div>
      </div>
      <div className="newSteller">
        <ul className="container">
          <li>
            <div>
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
            <div>
              <h3>
                {" "}
                XƏBƏRLƏR ÜÇÜN <br />
                ABUNƏ OLUN
              </h3>
            </div>
          </li>
          <li>
            <p>Bütün ən son yeniləmələr üçün həftəlik bülletenə abunə olun</p>
          </li>
          <li className="subIn">
            <input placeholder="E-mail adress..." type="text" />
            <button>Abunə Ol</button>
          </li>
        </ul>
      </div>

      <div></div>
    </div>
  );
}

export default Contact;
