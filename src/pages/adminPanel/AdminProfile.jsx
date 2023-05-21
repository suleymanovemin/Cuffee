import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { Button, Space } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { update, auth, emailVerification } from "../../fireBase/fireBase";
function AdminProfile({ user, dispatch }) {
  
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

  const handleVerification = async () => {
    await emailVerification();
  };
  return (
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
        {/* {!user.emailVerified && (
          <div>
            <h4>Hesabınız Təstiqlənməyib!</h4>

            <Button onClick={handleVerification} type="primary">
              Təsdiq Et
            </Button>
          </div>
        )} */}
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
    </div>
  );
}

const t = (a) => a;
export default connect(t)(AdminProfile);
