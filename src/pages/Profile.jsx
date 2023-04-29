import React from "react";
import { connect } from "react-redux";
import { logOut } from "../fireBase/fireBase";
import { useNavigate } from "react-router-dom";
function Profile({ dispatch,user }) {
  const navigate = useNavigate();
  const LogOut = async () => {
    await logOut();

    dispatch({
      type: "LOGOUT",
      payload: false,
    });
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div>
      İstifadəçi hesabına daxil oldunuz ({user.email})
      <button className="logOut" onClick={LogOut}>Çıxış Et</button>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(Profile);
