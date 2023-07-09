import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Quickview({
  products,
  dispatch,
  quickViewProductId,
  showQuickViewModal,
  basket,
}) {
  if (products.length === 0) {
    return null;
  }
  const [delay, setDelay] = useState(false);
  const product = products.find((a) => a.id === +quickViewProductId);
  const [activeClass, setActiveClass] = useState(
    product.image.indexOf(product.image[0])
  );
  const [selectedImage, setSelectedImage] = useState(product.image[0]);

  useEffect(() => {
    setSelectedImage(product.image[0]);
    setActiveClass(product.image.indexOf(product.image[0]));
  }, [quickViewProductId]);

  const showQuickModal = () => {
    dispatch({
      type: "SET_VIEW_MODAL",
      payload: showQuickViewModal,
    });
    setSelectedImage(product.image[0]);
    setActiveClass(product.image.indexOf(product.image[0]));
  };

  const changeActive = (a, index) => {
    setSelectedImage(a);
    setActiveClass(index);
  };
  const notify = () =>
    toast.success("Məhsul Səbətə Əlavə edildi!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [prodCount, setProdCount] = useState(1);
  const addToProd = (c) => {
    setProdCount((a) => (a + c < 1 ? 1 : a + c));
  };

  const [activeSize, setActiveSize] = useState("S");

  const handleSizeClick = (size) => {
    setActiveSize(size);
    console.log(activeSize);
  };

  const addToBasket = (id) => {
    if (delay) {
      return;
    }
    setDelay(true);
    const newBasket = [...basket];
    console.log(newBasket);
    const index = newBasket.findIndex(
      (item) => item.id === id && item.size == activeSize
    );
    if (index >= 0) {
      newBasket[index].count += prodCount;
    } else {
      newBasket.push({ id: id, count: prodCount, size: activeSize });
    }
    setProdCount(1);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    dispatch({ type: "SET_BASKET", payload: newBasket });
    notify();
    setTimeout(() => {
      setDelay(false);
    }, 1500);
  };
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket"));
    if (storedBasket) {
      dispatch({
        type: "SET_BASKET",
        payload: storedBasket,
      });
    }
  }, []);
  return (
    <div
      onClick={showQuickModal}
      className={!showQuickViewModal ? "quickView" : "quickView active"}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="quickViewProduct"
      >
        <div onClick={showQuickModal} className="closeloginForm">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="detailImage">
          <div>
            <img src={selectedImage} />
          </div>
          <div className="otherImages">
            {product.image.map((a, index) => (
              <div
                key={index}
                className={
                  activeClass == index ? "otherImg active" : "otherImg"
                }
                onClick={() => changeActive(a, index)}
              >
                <img src={a} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="detailContent">
          <div className="detailTitle">
            <h2>{product.title}</h2>
            <div className="detailsPrice">
              {product.oldPrice ? (
                <del className="oldPrice">{product.oldPrice}₼</del>
              ) : (
                ""
              )}
              <p>{product.price}₼</p>
            </div>
            
            <hr />
            <p className="detailsContent">{product.content}</p>
            {product.size && (
              <div className="prodSize">
                <h1>Ölçülər</h1>
                <div className="sizes">
                  {product.size?.map((size, index) => (
                    <p
                      key={index}
                      className={activeSize == size ? "active" : ""}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div className="addToCart">
              <div className="count">
                <h1>{prodCount}</h1>
                <div className="countInput">
                  <button onClick={() => addToProd(1)}>
                    <i className="fa-solid fa-sort-up"></i>
                  </button>
                  <button onClick={() => addToProd(-1)}>
                    <i className="fa-solid fa-sort-down"></i>
                  </button>
                </div>
              </div>
              <div className="toCart">
                <button onClick={() => addToBasket(product.id)}>
                  Səbətə at
                </button>
              </div>
            </div>
          </div>
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
  );
}
const t = (a) => a;
export default connect(t)(Quickview);
