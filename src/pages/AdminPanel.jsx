import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logOut } from "../fireBase/fireBase";
function AdminPanel({ user, dispatch }) {
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
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div>
      <h1>Admin daxil oldunuz ({user?.email})</h1>
      <button className="logOut" onClick={LogOut}>
        Çıxış Et
      </button>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(AdminPanel);
