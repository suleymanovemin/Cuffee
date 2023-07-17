import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";

function BasketPage({ basket, products, dispatch }) {
  const deleteProduct = (id) => {
    let newBasket = [...basket.filter((a) => a.id !== id)];
    localStorage.setItem("basket", JSON.stringify(newBasket));

    dispatch({
      type: "SET_BASKET",
      payload: newBasket,
    });
  };



  const handleClick = (id) => {
    const newBasket = [...basket];
    newBasket.push({ id: id, count: prodCount });
    dispatch({ type: "SET_BASKET", payload: newBasket });
  };

  return (
    <div>
      <Helmet>
        <title>Səbət</title>
      </Helmet>
      <div className="contactHeading">
        <div className="contactTitle">
          <h1>Səbət</h1>
          <div className="breadCrumb">
            <Link to="/">
              Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
            </Link>
            <strong>Səbət</strong>
          </div>
        </div>
      </div>
      <div className="favoritesTable container">
        {basket.length ? (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Məhsul Adı</th>
                  <th>Qiymət</th>
                  <th>Proses</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {basket.map((a) => {
                  const [prodCount, setProdCount] = useState(a.count);
                  const addToProd = (c) => {
                    setProdCount((a) => (a + c < 1 ? 1 : a + c));
                  };
                  let prod = products.find((b) => b.id === a.id);

                  return (
                    <tr key={a.id}>
                      <td>
                        <div className="favProdImage">
                          <Link to={`/details/${prod?.id}`}>
                            <img src={prod?.image} alt={prod?.title} />
                          </Link>
                        </div>
                      </td>
                      <td>
                        <p className="favProdTitle">
                          <Link to={`/details/${prod?.id}`}>{prod?.title}</Link>
                        </p>
                      </td>
                      <td>
                        <p className="favProdPrice">
                          {basket.reduce((acc, curr) => {
                            const product = products.find(
                              (p) => p.id === curr.id
                            );
                            const totalPrice = +product?.price * +a?.count;
                            return totalPrice;
                          }, 0)}
                          ₼
                        </p>
                      </td>
                      <td>
                        <div className="tableAction">
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
                        </div>
                      </td>
                      <td className="deleteFavProd">
                        <p onClick={() => deleteProduct(prod?.id)}>
                          <i className="fa-solid fa-delete-left"></i>
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="cartButtons">
              {basket.length > 0 ? (
                <>
                  <button onClick={() => handleClick(prod?.id)}>
                    SƏBƏTİ YENİLƏ
                  </button>
                  <Link to="/products">ALIŞ-VERİŞƏ DAVAM ET</Link>
                </>
              ) : (
                <Link to="/checkout">ALIŞ-VERİŞƏ BAŞLA</Link>
              )}
            </div>
          </>
        ) : (
          <h2 className="eptyBasket">Səbətdə məhsul yoxdur!!!</h2>
        )}
        <table className="cartCheck">
          <tbody>
            <tr>
              <th>
                <h2 className="cartHeading">Ümumi Məbləğ :</h2>
              </th>
              <td>
                <h2>
                  {basket.reduce((acc, curr) => {
                    const product = products.find((p) => p.id === curr.id);
                    return acc + curr?.count * product?.price;
                  }, 0)}
                  ₼
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <div className="checkOut">
            <Link to="/checkout">ALIŞ-VERİŞİ TAMAMLA</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const t = (a) => a;
export default connect(t)(BasketPage);
