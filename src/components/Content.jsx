import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<div>Admin</div>}></Route>
        <Route path="/dashboard" element={<div>Dashboard</div>}></Route>
        <Route path="/userList" element={<div>User List</div>}></Route>
        <Route path="/admin/profile" element={<div>Profile</div>}></Route>
      </Routes>
    </div>
  );
}

export default Content;
