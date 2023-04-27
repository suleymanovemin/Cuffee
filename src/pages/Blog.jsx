import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Blog({ blogs }) {
  return (
    <>
      <Helmet>
        <title>Bloq</title>
      </Helmet>
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
            ? blogs.map((blog) => (
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
        </div>
      </div>
    </>
  );
}

const t = (a) => a;
export default connect(t)(Blog);
