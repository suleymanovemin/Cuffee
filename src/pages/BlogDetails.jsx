import { useParams } from "react-router-dom";
import { connect } from "react-redux";
function BlogDetails({ blogs }) {
  let { id } = useParams();
  const blog = blogs.find((a) => a.id === +id);
  console.log(blog);
  return (
    <section className="postDetailsPage container">
      <div className="postDetails">
        <div className="postImage">
          <img src={blog.image} alt="" />
          <div className="postTitle">
            <h2>{blog.title}</h2>
            <div className="postAuthor">
              <span>
                <i class="fa-solid fa-user"></i>
                {blog.name}
              </span>
              <span>
                <i class="fa-regular fa-clock"></i>
                {blog.date}
              </span>
              <span>
                <i class="fa-solid fa-comment"></i>
                {blog.comments.length} Şərh
              </span>
            </div>
          </div>
        </div>
        <div className="postContent">
          <p>{blog.content}</p>
        </div>
      </div>
    </section>
  );
}
const t = (a) => a;
export default connect(t)(BlogDetails);
