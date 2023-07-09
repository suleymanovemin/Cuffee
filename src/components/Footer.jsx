import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container footerInner">
        <div className="footerRow">
          <div className="footerInfo">
            <img src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/logo.png?v=1659671833" />
            <p>
              Sophisticated simplicity for the <br />
              independent mind.
            </p>
            <div className="socialMedia">
              <ul>
                <li>
                  <i className="fa-brands fa-facebook"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li>
                  <i className="fa-brands fa-whatsapp"></i>
                </li>
                <li>
                  <i className="fa-brands fa-behance"></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="footerAbout">
            <h4>Help & Information</h4>
            <ul>
              <li>
                <Link>About Us</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="footerAbout">
            <h4>Help & Information</h4>
            <ul>
              <li>
                <Link>About Us</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="productBy">© 2023 CUFEE. Made with <i className="fa-solid fa-heart"></i> by<a target="_blank" href="https://github.com/suleymanovemin" className="github">Emin</a></div>
      </div>
    </footer>
  );
}

export default Footer;
