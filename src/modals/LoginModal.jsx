import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../fireBase/fireBase";
import { login } from "../fireBase/fireBase";
import { useNavigate } from "react-router-dom";

function LoginModal({ isLoginModalOpen, dispatch, user }) {
  const [showRegister, setShowRegister] = useState(false);
  const handleRegister = (e) => {
    e.stopPropagation();
    setShowRegister(!showRegister);
  };

  const showLoginModal = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    dispatch({
      type: "TOGGLE_MENU",
      payload: isLoginModalOpen,
    });
  };

  // firebase

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // register

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    setEmail("");
    setPassword("");
  };

  // sign In

  const signIn = async (e) => {
    e.preventDefault();
    const user = await login(email, password);

    setEmail("");
    setPassword("");

    dispatch({
      type: "LOGIN",
      payload: user,
    });

    // Close login Modal

    dispatch({
      type: "TOGGLE_MENU",
      payload: isLoginModalOpen,
    });

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else if (!user) {
      console.log("Error");
    }
    if (user?.email !== "admin@gmail.com") {
      navigate("/profile", {
        replace: true,
      });
    } else {
      navigate("/admin", {
        replace: true,
      });
    }
  };

  return (
    <>
      <div
        onClick={showLoginModal}
        className={`loginModal ${isLoginModalOpen ? "active" : ""}`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="loginForm"
          // style={{ top: `${scrollY === 0 ? 50 : 150}px` }}
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
            <form onSubmit={signIn}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email adress"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <div className="forgotPassword">
                <a href="">Forgot your password?</a>
                <button disabled={!email || !password} type="submit">
                  Log in
                </button>
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
              onSubmit={handleSubmit}
              style={{ display: showRegister ? "block" : "none" }}
              className="registerPage"
            >
              <div onClick={showLoginModal} className="closeloginForm">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <span>Register</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email adress"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <div className="forgotPassword">
                <button disabled={!email || !password} type="submit">
                  Register
                </button>
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
