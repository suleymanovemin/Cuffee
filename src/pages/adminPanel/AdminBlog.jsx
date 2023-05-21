import { connect } from "react-redux";
import { useState } from "react";

function AdminBlog({ blogs }) {
 
  const [name, setName] = useState("");
  const [blogName, setBlogName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const showBlogModal = () => {
    setShowModal(!showModal);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  const notify = () =>
    toast.success("Bloq Əlavə edildi!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const month =
      now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minutes =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const seconds =
      now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    const currentDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        title: blogName,
        content: blogContent,
        date: currentDate,
        image: selectedFile,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowModal(false);
        notify();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="adminBlog">
            <div
        onClick={showBlogModal}
        className={`${!showModal ? "addBlogModal" : "addBlogModal active"}`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="blogModal"
        >
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <p className="form-title">Bloq Əlavə Et</p>
            <div className="input-container">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Ad Soyad"
              />
            </div>
            <div className="input-container">
              <input
                onChange={(e) => setBlogName(e.target.value)}
                type="text"
                placeholder="Bloq Başlığı"
              />
            </div>
            <div className="input-container">
              <textarea
                onChange={(e) => setBlogContent(e.target.value)}
                placeholder="Bloq Məzmunu"
              />
            </div>
            <span className="form-title">Bloq Şəkili Yüklə</span>
            <p className="form-paragraph">Fayl Şəkil Olmalıdır.</p>
            <label htmlFor="file-input" className="drop-container">
              <span className="drop-title">Faylı sürüşdürüb atın</span>
              və ya
              <input
                onChange={handleFileUpload}
                type="file"
                accept="image/*"
                required=""
                id="file-input"
              />
            </label>
            <button type="submit" className="submit">
              Əlavə Et
            </button>
          </form>
        </div>
      </div>
      <div className="addNewBlog">
          <button onClick={showBlogModal} type="button" className="button">
            <span className="button__text">Əlavə Et</span>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      <p>Bloqların ümumi sayı : {blogs.length}</p>
        <div className="allBlogs">
          {
            blogs.map((blog)=>(
              <div key={blog
              .id} className="blogOne">
                <div className="blogOneImage">
                  <img src={blog.image} alt="" />
                </div>
                <p>{blog.title}</p>
              </div>
            ))
          }
        </div>
    </div>
  );
}

const t = (a) => a;
export default connect(t)(AdminBlog);
