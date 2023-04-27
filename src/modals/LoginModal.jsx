import { useState } from "react";
import { connect } from "react-redux";
function LoginModal({ isLoginModalOpen,dispatch}) {
  const [showRegister, setShowRegister] = useState(false);
  const handleRegister = (e) => {
    e.stopPropagation();
    setShowRegister(!showRegister);
  };
  
  const showLoginModal = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    dispatch({
      type:"TOGGLE_MENU",
      payload:isLoginModalOpen
    })
  };
  
  
  return (
    <>
      <div
        onClick={showLoginModal}
        className={`loginModal ${isLoginModalOpen?"active":""}`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="loginForm"
          style={{top:`${scrollY===0?50:150}px`}}
        >
          <div
            style={{ display: showRegister ? "none" : "block" }}
            className="loginPage"
          >
            <div className="logo">
              <img
                src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/logo.png?v=1659671833"
                alt=""
              />
            </div>
            <div className="loginTitle">
              <h2>Great to have you back!</h2>
            </div>
            <form>
              <input type="text" placeholder="Email adress" />
              <input type="text" placeholder="Password" />
              <div className="forgotPassword">
                <a href="">Forgot your password?</a>
                <button type="submit">Log in</button>
              </div>
            </form>
            <div className="loginBox">
              <span>Don’t have an account?</span>
              <span className="btnSpan" onClick={handleRegister}>
                Register now{" "}
              </span>
            </div>
            <div onClick={showLoginModal} className="closeloginForm">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <>
            <form
              style={{ display: showRegister ? "block" : "none" }}
              className="registerPage"
            >
              <div onClick={showLoginModal} className="closeloginForm">
              <i className="fa-solid fa-xmark"></i>
            </div>
              <span>Register</span>
              <input type="text" placeholder="Email adress" />
              <input type="text" placeholder="Password" />
              <div className="forgotPassword">
                <button type="submit">Register</button>
              </div>
              <div className="loginBox">
                <span onClick={handleRegister} className="btnSpan">
                  Back to login{" "}
                </span>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(LoginModal);
