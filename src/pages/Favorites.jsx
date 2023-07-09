import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AddToCartModal from "../modals/AddToCartModal";
import LoginModal from "../modals/LoginModal";
import Quickview from "../modals/Quickview";
function Favorites({ favorites, dispatch, basket }) {
  const showQuickModal = () => {
    dispatch({
      type: "SET_VIEW_MODAL",
      payload: true,
    });
  };

  const viewProduct = (id) => {
    dispatch({
      type: "SET_VIEW_ID",
      payload: id,
    });
  };

  const visibleAddModal = (id) => {
    const newBasket = [...basket];
    const index = newBasket.findIndex((item) => item.id === id);

    if (index >= 0) {
      newBasket[index].count += 1;
    } else {
      newBasket.push({ id: id, count: 1 });
    }

    localStorage.setItem("basket", JSON.stringify(newBasket));
    dispatch({ type: "SET_BASKET", payload: newBasket });
    dispatch({ type: "SET_VIEW_ADD_MODAL", payload: true });
  };

  const handleDelete = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    dispatch({
      type: "ADD_TO_FAVORITE",
      payload: newFavorites,
    });
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <>
      <AddToCartModal />
      <Quickview />
      <LoginModal />
      <div className="favorites">
        <div className="favoritesHeading">
          <h1>SEÇİLƏNLƏR</h1>
          <div className="breadCrumb">
            <Link to="/">
              Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
            </Link>
            <strong>Seçilənlər</strong>
          </div>
        </div>
        <div className="favoritesTable container">
          {favorites.length>0 ? (
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
                {favorites?.map((favorite) => {
                  let prod = basket.find((a) => +a.id === +favorite.id);

                  return (
                    <tr key={favorite?.id}>
                      <td>
                        <div className="favProdImage">
                          <Link to={`/details/${favorite?.id}`}>
                            <img src={favorite?.image[0]} alt={favorite.title} />
                          </Link>
                        </div>
                      </td>
                      <td>
                        <p className="favProdTitle">
                          <Link to={`/details/${favorite.id}`}>
                            {favorite.title}
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p className="favProdPrice">{favorite.price}₼</p>
                      </td>
                      <td>
                        <div className="tableAction">
                          {prod ? (
                            <Link
                              className="favProdDetail"
                              to={`/details/${favorite.id}`}
                            >
                              Məhsul Səbətdə Var
                            </Link>
                          ) : (
                            <Link
                              className="favProdDetail"
                              to={`/details/${favorite.id}`}
                            >
                              Ətaflı Bax
                            </Link>
                          )}

                        </div>
                      </td>
                      <td className="deleteFavProd">
                        <p onClick={() => handleDelete(favorite.id)}>
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
        </div>
      </div>
    </>
    // <>
    //   <AddToCartModal />
    //   <Quickview />
    //   <div className="favorites">
    //     <div className="favoritesHeading">
    //       <h1>SEÇİLƏNLƏR</h1>
    //       <div className="breadCrumb">
    //         <Link to="/">
    //           Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
    //         </Link>
    //         <strong>Seçilənlər</strong>
    //       </div>
    //     </div>
    //     <div className="favoritesTable container">
    //      {favorites.length? <table>
    //         <thead>
    //           <tr>
    //             <th >Məhsul Adı</th>
    //             <th>Qiymət</th>
    //             <th>Proses</th>
    //             <th></th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {favorites.map((a)=>(
    //             <tr key={a.id}>
    //             <td>
    //               <div className="favProdImage">
    //                 <Link to={`/details/${a.id}`}>
    //                 <img src={a.image[0]}/>
    //                 </Link>
    //               </div>
    //             </td>
    //             <td>
    //               <p className="favProdTitle">
    //                 <Link to={`/details/${a.id}`}>{a.title}</Link>
    //               </p>
    //             </td>
    //             <td>
    //               <p className="favProdPrice">
    //                 {a.price}₼
    //               </p>
    //             </td>
    //             <td>
    //               <div className="tableAction">
    //               <Link className="favProdDetail" to={`/details/${a.id}`}>Ətaflı Bax</Link>
    //               </div>
    //             </td>
    //             <td className="deleteFavProd">
    //             <i className="fa-solid fa-delete-left"></i>
    //             </td>
    //           </tr>
    //           ))}
    //         </tbody>
    //       </table>:<h1>Yoxdur</h1>}
    //     </div>
    //   </div>
    // </>
  );
}
const t = (a) => a;
export default connect(t)(Favorites);
