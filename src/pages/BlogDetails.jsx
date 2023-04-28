import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
function BlogDetails({ blogs }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  let { id } = useParams();
  const blog = blogs.find((a) => a.id === +id);
  const comm = comments.filter((a) => a.blog_id === +id);

  useEffect(() => {
    fetch("http://192.168.0.108:3000/blogComments")
      .then((a) => a.json())
      .then((a) => setComments(a));
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && comment !== "") {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

      const newComment = {
        name: name,
        email: email,
        comment: comment,
        date: currentDate,
      };

      fetch(`http://192.168.0.108:3000/blogComments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...comment,
          newComment,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

      setName("");
      setEmail("");
      setComment("");
    }
  };

  return (
    <section className="postDetailsPage container">
      <div className="postDetails">
        <div className="postImage">
          <img src={blog?.image} alt="" />
          <div className="postTitle">
            <h2>{blog?.title}</h2>
            <div className="postAuthor">
              <span>
                <i className="fa-solid fa-user"></i>
                {blog?.name}
              </span>
              <span>
                <i className="fa-regular fa-clock"></i>
                {blog?.date}
              </span>
              <span>
                <i className="fa-solid fa-comment"></i>
                {blog?.comments?.length} Şərh
              </span>
            </div>
          </div>
        </div>
        <div className="postContent">
          <p>{blog?.content}</p>
        </div>
        <div className="comments">
          <h3>Şərhlər</h3>
          {comm.length > 0
            ? comm.map((com) => (
                <div key={com.id} className="commentDetail">
                  <div className="userProfile">
                    <div className="userPhoto">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" />
                    </div>
                    <div className="userName">
                      <h5>{com?.name}</h5>
                      <span>{com?.date}</span>
                    </div>
                  </div>
                  <div className="comment">
                    <p>{com?.comment}</p>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <h2>Şərh Yaz</h2>
        <div className="addToComments">
          <form onSubmit={(e) => handleCommentSubmit(e)}>
            <label htmlFor="name">Ad Soyad</label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              id="name"
              type="text"
            />
            <label htmlFor="email">E-mail </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
              type="email"
            />
            <label htmlFor="comment">Şərhiniz</label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              required
              id="comment"
            />
            <input onClick={(e) => handleCommentSubmit(e)} type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
}
const t = (a) => a;
export default connect(t)(BlogDetails);
