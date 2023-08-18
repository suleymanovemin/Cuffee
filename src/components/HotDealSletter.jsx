import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HotDealSletter() {
  const notify = () =>
    toast.success("Abunə olundu!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const subInput = useRef();
  const subscribe = (e) => {
    if (subInput.current.value.length > 3) {
      notify();
      subInput.current.value = "";
    }
  };
  return (
    <div className="subscribe container">
      <div className="subImage">
        <img
          src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba29.jng.png?v=1660124510"
          alt=""
        />
      </div>

      <div className="subContent">
        <div className="subIcon">
          <i className="fa-solid fa-envelope-open"></i>
        </div>
        <h3>Yeniliklərdən Xəbərdar Ol !</h3>
        <p>İlk alışınıza 15% endirim qazanın!</p>
        <div className="subInput">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input ref={subInput} type="text" placeholder="Email Address..." />
            <button onClick={subscribe}>Abunə Ol</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HotDealSletter;
