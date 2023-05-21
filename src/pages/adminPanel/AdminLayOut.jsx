import { Outlet } from "react-router-dom";
import { Menu } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { logOut } from "../../fireBase/fireBase";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

function AdminLayOut({ user, dispatch }) {
  const LogOut = async () => {
    await logOut();

    dispatch({
      type: "LOGOUT",
      payload: false,
    });
    localStorage.removeItem("user");
    navigate("/");
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.email !== "admin@gmail.com") {
      if (user) {
        navigate("/profile");
      }
    }
  }, [user, navigate]);


  const HandleHome =()=>{
    navigate("/")
  }
   const location = useLocation();
  return (
    <div className="adminLayOut">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Menu
          defaultSelectedKeys={["/admin"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            { label: "Home", key: "/admin", icon: <HomeOutlined /> },
            {
              label: "Bloqlar",
              key: "bloglist",
              icon: <DashboardOutlined />,
            },
            {
              label: "Users List",
              key: "productList",
              icon: <UnorderedListOutlined />,
            },
            { label: "Profil", key: "/admin/profile", icon: <UserOutlined /> },
            {
              label: "Çıxış Et",
              key: "signout",
              icon: <PoweroffOutlined />,
              danger: true,
              onClick: LogOut,
            },
            {
              label: "Ana Səhifə",
              key: "getHome",
              icon: <HomeOutlined />,
              
              onClick:HandleHome
            },
          ]}
        ></Menu>

        <Outlet />
      </div>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(AdminLayOut);
