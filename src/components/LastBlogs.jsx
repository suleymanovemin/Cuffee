import { connect } from "react-redux";
import { Link } from "react-router-dom";

function LastBlogs({ blogs }) {
  const lastBlog = blogs.slice(-3).reverse();
  function getMonthName(monthNumber) {
    const monthNames = [
      "YAN", 
      "FEV", 
      "MAR", 
      "APR",
      "MAY",
      "İYUN", 
      "İYUL", 
      "AVQ", 
      "SENT", 
      "OKT", 
      "NOY", 
      "DEK", 
    ];
  
    const index = parseInt(monthNumber, 10) - 1;
    return monthNames[index] || '';
  }
  return (
    <>
      <div className="blogHeading">
        <h2>Son Bloqlar</h2>
      </div>
      <div className="container lastBlogs">
        {lastBlog.map((a) => (
          <div key={a.id} className="lastBlog">
            <div className="lastBlogPicture">
              <Link to={`/blog/${a.id}`}>
                <img src={a.image} alt="" />
              </Link>
              <div className="dateOverlay">
                <span>{a.date.slice(0,2)}</span>
                <span>{getMonthName(a.date.slice(3, 5))}</span>
              </div>
            </div>
            <div className="lastBlogContent">
              <Link to={`/blog/${a.id}`}>NEWS</Link>
              <h4>
                <Link to={`/blog/${a.id}`}>{a.title}</Link>
              </h4>
              <p>{a.content.slice(0, 60)}...</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(LastBlogs);
