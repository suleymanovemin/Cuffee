// import {
//   MenuFoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   MenuUnfoldOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { connect } from "react-redux";
// import { useNavigate, Route, Routes } from "react-router-dom";
// import { useEffect } from "react";
// import { logOut } from "../fireBase/fireBase";
// import { Button, Space, Layout, Menu, theme } from "antd";
// import { useState } from "react";
// const { Header, Sider, Content } = Layout;
// import { BrowserRouter } from "react-router-dom";

// function AdminPanel({ user, dispatch }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   // Valid


//   const navigate = useNavigate();
//   const LogOut = async () => {
//     await logOut();

//     dispatch({
//       type: "LOGOUT",
//       payload: false,
//     });
//     localStorage.removeItem("user");
//     navigate("/");
//   };
//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);
//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["/admin/settings"]}
//           onClick={({ key }) => {
//             if (key) {
//               navigate(key);
//             }
//           }}
//         >
//           <Menu.Item
//             key="/admin/settings"
//             icon={<UserOutlined />}
//             label="Tənzimləmələr"
//           />
//           <Menu.Item
//             key="/admin/userList"
//             icon={<VideoCameraOutlined />}
//             label="nav 2"
//           />
//           <Menu.Item
//             key="/admin/dataBase"
//             icon={<UploadOutlined />}
//             label="nav 3"
//           />
//           <Menu.Item
//             key="4"
//             icon={<LogoutOutlined />}
//             onClick={LogOut}
//             label="Çıxış Et"
//             danger
//           />
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//           }}
//         >
//           <BrowserRouter>
//             <Pages />
//           </BrowserRouter>
//         </Content>
//       </Layout>
//     </Layout>
//     <div>admin olaraq giriş etdiz ({user.email})</div>
//   );
// }

// function Pages() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/admin/settings" element={<div>Settings</div>}></Route>
//         <Route path="/admin/userList" element={<div>User List</div>}></Route>
//         <Route path="/admin/dataBase" element={<div>Data Base</div>}></Route>
//       </Routes>
//     </div>
//   );
// }

// const t = (a) => a;
// export default connect(t)(AdminPanel);

import { Menu } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import {
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

function AdminPanel({user}) {
  const navigate = useNavigate();
    useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Menu
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
            key: "/dashboard",
            icon: <DashboardOutlined />,
          },
          {
            label: "Users List",
            key: "/userList",
            icon: <UnorderedListOutlined />,
          },
          { label: "Profile", key: "/admin/profile", icon: <UserOutlined /> },
          {
            label: "Sign Out",
            key: "signout",
            icon: <PoweroffOutlined />,
            danger: true,
          },
        ]}
      ></Menu>

      <Content />
    </div>
  );
}

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<div>Admin</div>}></Route>
        <Route path="/dashboard" element={<div>Dashboard</div>}></Route>
        <Route path="/userList" element={<div>User List</div>}></Route>
        <Route path="/admin/profile" element={<div>Profile</div>}></Route>
      </Routes>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(AdminPanel);
