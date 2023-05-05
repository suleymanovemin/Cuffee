import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
function BasketPage({ basket, products }) {
  const [prodCount, setProdCount] = useState(null);
  const addToProd = (c) => {
    setProdCount((a) => (a + c < 1 ? 1 : a + c));
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
                let prod = products.find((b) => b.id === a.id);

                return (
                  <tr key={prod.id}>
                    <td>
                      <div className="favProdImage">
                        <Link to={`/details/${prod.id}`}>
                          <img src={prod.image} alt={prod.title} />
                        </Link>
                      </div>
                    </td>
                    <td>
                      <p className="favProdTitle">
                        <Link to={`/details/${prod.id}`}>{prod.title}</Link>
                      </p>
                    </td>
                    <td>
                      <p className="favProdPrice">{prod.price}₼</p>
                    </td>
                    <td>
                      <div className="tableAction">
                        <div className="count">
                          <h1>{a.count}</h1>
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
                      <p onClick={() => handleDelete(prod.id)}>
                        <i className="fa-solid fa-delete-left"></i>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2>Seçilən məhsul yoxdur!!!</h2>
        )}
        <div className="cartButtons">
          <button>SƏBƏTİ YENİLƏ</button>
          <Link>ALIŞ-VERİŞƏ DAVAM ET</Link>
        </div>
        <div className="cartCheck">
          <h2 className="cartHeading">Ümumi Məbləğ</h2>
        </div>
      </div>
    </div>
  );
}

const t = (a) => a;
export default connect(t)(BasketPage);
