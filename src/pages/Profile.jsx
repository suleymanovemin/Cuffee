import React from "react";
import { connect } from "react-redux";
import { logOut } from "../fireBase/fireBase";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

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
      <Space wrap>
        <Button onClick={LogOut} type="primary">Çıxış Et</Button>
      </Space>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(Profile);
