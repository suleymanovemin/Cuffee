import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { logOut } from "../fireBase/fireBase";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { update, auth, emailVerification } from "../fireBase/fireBase";
import { Toaster } from "react-hot-toast";

function Profile({ dispatch, user }) {
  const handleVerification = async () => {
    await emailVerification();
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  const LogOut = async () => {
    await logOut();

    dispatch({
      type: "LOGOUT",
      payload: false,
    });
    localStorage.removeItem("user");
    navigate("/");
  };

  if (user.email === "admin@gmail.com") {
    navigate("/admin");
  }

  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch({
      type: "LOGIN",
      payload: auth.currentUser,
    });
    localStorage.setItem("user", JSON.stringify(auth.currentUser));

    // setDisplayName("");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="container">
        <div className="userPanel">
          <Toaster position="top-right" />
          <div className="userProfile">
            <div className="userDetails">
              {user.photoURL && <img src={user.photoURL} />}
              <div>
                <h4>{user.displayName}</h4>
                <h5>{user.email}</h5>
              </div>
            </div>
            {!user.emailVerified && (
              <div>
                <h4>Hesabınız Təstiqlənməyib!</h4>

                <Button onClick={handleVerification} type="primary">
                  Təsdiq Et
                </Button>
              </div>
            )}
          </div>

          <div className="information">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ad Soyad"
              />
              <input type="submit" value="Yenilə" />
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Avatar"
              />
              <input type="submit" value="Yenilə" />
            </form>
          </div>
          <Button onClick={LogOut} type="primary">
            Çıxış Et
          </Button>
        </div>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(Profile);
