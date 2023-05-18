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

  return (
    <div className="container adminLayOut">
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
              label: "Dashboard",
              key: "dashboard",
              icon: <DashboardOutlined />,
            },
            {
              label: "Users List",
              key: "userList",
              icon: <UnorderedListOutlined />,
            },
            { label: "Profile", key: "/admin/profile", icon: <UserOutlined /> },
            {
              label: "Sign Out",
              key: "signout",
              icon: <PoweroffOutlined />,
              danger: true,
              onClick: LogOut,
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
