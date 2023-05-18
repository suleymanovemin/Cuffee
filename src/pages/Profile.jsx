import { React, useEffect } from "react";
import { connect } from "react-redux";
import { logOut } from "../fireBase/fireBase";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { update, auth, emailVerification } from "../fireBase/fireBase";

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

  return (
    <div className="container">
      İstifadəçi hesabına daxil oldunuz ({user.email})
      {!user.emailVerified && (
        <div>
          <h4>Hesabınız Təstiqlənməyib!</h4>
          <Button onClick={handleVerification} type="primary">
            Təsdiq Et
          </Button>
        </div>
      )}
      <Space wrap>
        <Button onClick={LogOut} type="primary">
          Çıxış Et
        </Button>
      </Space>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(Profile);
