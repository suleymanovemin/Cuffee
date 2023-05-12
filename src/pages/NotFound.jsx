import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      
      <div className="error-pg">
        <div className="error-number">
          <div className="number left-coffee">4</div>
          <div className="coffee-mug"></div>
          <div className="number right-coffee">4</div>
        </div>
        <div className="sm-screen">404</div>
        <div className="mean-msg">
          Səhifə tapılmadı, <Link to="/">Ana Səhifəyə Qayıt</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
