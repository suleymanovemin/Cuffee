import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "antd";
import LoginModal from "../modals/LoginModal";

function Blog({ blogs }) {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;
  const totalProducts = blogs.length;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset the current page to 1 whenever blogs change
  }, [blogs]);

  const getCurrentPageBlogs = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return blogs.slice(startIndex, endIndex);
  };

  return (
    <>
      <Helmet>
        <title>Bloq</title>
      </Helmet>
      <LoginModal />
      <div className="blogsHeading">
        <h1>BLOQLAR</h1>
        <div className="breadCrumb">
          <Link to="/">
            Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
          </Link>
          <strong>Bloqlar</strong>
        </div>
      </div>
      <div className="blogsPage container">
        <div className="blogList">
          {blogs.length > 0
            ? getCurrentPageBlogs().map((blog) => (
                <div key={blog.id} className="blog">
                  <div className="blogImage">
                    <Link to={`/blog/${blog.id}`}>
                      <img src={blog.image} />
                    </Link>
                  </div>
                  <div className="blogInfo">
                    <div>
                      <h4>NEWS</h4>
                    </div>
                    <div className="blogTitle">
                      <h3>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                      </h3>
                    </div>
                    <div className="blogArticle">
                      <p>{blog.content.slice(0, 95)}</p>
                    </div>
                    <div className="blogDate">{blog.date}</div>
                    <div className="blogDetail">
                      <Link to={`/blog/${blog.id}`}>
                        <span>ƏTRAFLI BAX</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : ""}
          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalProducts}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </>
  );
}

const t = (a) => a;
export default connect(t)(Blog);
