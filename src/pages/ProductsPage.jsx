import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback } from "react";
import Quickview from "../modals/Quickview";
import AddToCartModal from "../modals/AddToCartModal";
import { Select } from "antd";
import { Pagination } from "antd";
import LoginModal from "../modals/LoginModal";
import { Slider } from "antd";
import { motion } from "framer-motion";

function ProductsPage({
  products,
  dispatch,
  showQuickViewModal,
  favorites,
  basket,
  category,
}) {
  const [tempProducts, setTempProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(tempProducts);
  const [filters, setFilters] = useState([]);

  const handleLiClick = (id, e) => {
    const lis = e.target.parentElement.children;
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove("active");
    }
    e.target.classList.add("active");

    if (id === 0) {
      setTempProducts([...products]);
    } else {
      const filteredProducts = products.filter((a) => a.category_id === +id);
      setTempProducts(filteredProducts);
    }
  };

  //

  const [activeIndex, setActiveIndex] = useState(4);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  // Price range

  const [minPrice,setMinPrice] = useState(10);
  const [maxPrice,setMaxPrice] = useState(250);

  const handleChange = (price) => {
    const filteredProducts = [...products];

    // filteredProducts.sort((a, b) => a.price - b.price);
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
    const minPrice = price[0];
    const maxPrice = price[1];

    const filteredByPrice = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setTempProducts(filteredByPrice);
  };

  const [previousFilter, setPreviousFilter] = useState(null);

  const handleBrandsFilter = (brands) => {
    const filteredProducts = products.filter((product) =>
      brands.includes(product.brand)
    );
    setTempProducts(filteredProducts);
  };

  const showQuickModal = () => {
    dispatch({
      type: "SET_VIEW_MODAL",
      payload: true,
    });
  };

  const [showFilterCatagory, setShowFilterCatagory] = useState(true);
  const showFilter = () => {
    setShowFilterCatagory(!showFilterCatagory);
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
    const size = products.find((item) => item.id === id);
    if (index >= 0) {
      newBasket[index].count += 1;
    } else {
      if (size.size) {
        newBasket.push({ id: id, count: 1, size: "S" });
      } else {
        newBasket.push({ id: id, count: 1 });
      }
    }

    localStorage.setItem("basket", JSON.stringify(newBasket));
    dispatch({ type: "SET_BASKET", payload: newBasket });
    dispatch({ type: "SET_VIEW_ADD_MODAL", payload: true });
  };

  const addToFavorite = useCallback(
    (id) => {
      const favoriteProducts = [...favorites];
      const productIndex = favoriteProducts.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        favoriteProducts.splice(productIndex, 1);
      } else {
        const productToAdd = products.find((product) => product.id === id);
        favoriteProducts.push(productToAdd);
      }

      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: favoriteProducts,
      });
      localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    },
    [favorites, products, dispatch]
  );

  // Sort

  const sortProducts = (e) => {
    switch (+e) {
      case 1:
        setTempProducts([...products]);
        break;
      case 2:
        tempProducts.sort(
          (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0)
        );
        setTempProducts([...tempProducts]);
        break;
      case 3:
        tempProducts.sort(
          (a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0)
        );
        setTempProducts([...tempProducts]);
        break;
      case 4:
        tempProducts.sort((a, b) => +a.price - +b.price);
        setTempProducts([...tempProducts]);
        break;
      case 5:
        tempProducts.sort((a, b) => +b.price - +a.price);
        setTempProducts([...tempProducts]);
        break;

      default:
        break;
    }
  };

  // Multi Filter

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        filters.every((filter) => product.tags.includes(filter))
      );
      setFilteredProducts(filtered);
    }
  }, [filters, products]);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  useEffect(() => {
    setTotalProducts(tempProducts.length);
    setPaginatedProducts(getPaginatedProducts(currentPage, pageSize));
  }, [tempProducts, currentPage, pageSize]);

  const getPaginatedProducts = (page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return tempProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

    // Framer Motion
    const container = {
      visible: {
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.4,
        },
      },
    };
  
  
    const item = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    };
  return (
    <>
      <Helmet>
        <title>Məhsullar</title>
      </Helmet>
      <Quickview />
      <LoginModal />
      <AddToCartModal />
      <div className="productsPageHeading">
        <h1>Məhsullar</h1>
        <div className="breadCrumb">
          <Link to="/">
            Ana Səhifə <i className="fa-solid fa-angle-right"></i>{" "}
          </Link>
          <strong>Məhsullar</strong>
        </div>
      </div>

      <div className="container">
        <div className="filters">
          <div className="filterIcon" onClick={showFilter}>
            <i className="fa-solid fa-filter"></i>
            <p>Filter</p>
          </div>
          <div className="gridSettings">
            <div className="gridDiv">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path d="M120-510v-330h330v330H120Zm0 390v-330h330v330H120Zm390-390v-330h330v330H510Zm0 390v-330h330v330H510ZM180-570h210v-210H180v210Zm390 0h210v-210H570v210Zm0 390h210v-210H570v210Zm-390 0h210v-210H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z" />
              </svg>
              <ul className="gridChange">
                <li
                  className={activeIndex === 2 ? "active" : ""}
                  onClick={() => handleClick(2)}
                >
                  2
                </li>
                <li
                  className={activeIndex === 3 ? "active" : ""}
                  onClick={() => handleClick(3)}
                >
                  3
                </li>
                <li
                  className={activeIndex === 4 ? "active" : ""}
                  onClick={() => handleClick(4)}
                >
                  4
                </li>

              </ul>
            </div>
            <div className="sortProducts">
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                onChange={(e) => {
                  sortProducts(e);
                }}
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? "")
                //     .toLowerCase()
                //     .localeCompare((optionB?.label ?? "").toLowerCase())
                // }
                options={[
                  {
                    value: "1",
                    label: "Normal",
                  },
                  {
                    value: "2",
                    label: "A-dan Z-yə",
                  },
                  {
                    value: "3",
                    label: "Z-dən A-ya",
                  },
                  {
                    value: "4",
                    label: "Ucuzdan Bahaya",
                  },
                  {
                    value: "5",
                    label: "Bahadan Ucuza",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="productsPage">
          <div
            className={`productsFilters ${showFilterCatagory ? "active" : ""}`}
          >
            <div className="filterSlideBar">
              <div className="filtersSilideHeading">
                <h2>Kateqoriya</h2>
              </div>
              <div className="filtersCategories">
                <ul>
                  <li className="active" onClick={(e) => handleLiClick(0, e)}>
                    Hamısı
                  </li>
                  {category?.map((c) => (
                    <li onClick={(e) => handleLiClick(c.id, e)} key={c.id}>
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="filtersSilideHeading">
                <h2>Brendlər</h2>
              </div>
              <div className="filtersCategories">
                <ul className="priceFiltered">
                  <li>
                    <input id="inp1" type="radio" name="chec" />
                    <label htmlFor="inp1">
                      <p onClick={() => handleBrandsFilter("A")}>A Brendi</p>
                    </label>
                  </li>
                  <li>
                    <input id="inp2" type="radio" name="chec" />
                    <label htmlFor="inp2">
                      <p onClick={() => handleBrandsFilter("B")}>B Brendi</p>
                    </label>
                  </li>
                  <li>
                    <input id="inp3" type="radio" name="chec" />
                    <label htmlFor="inp3">
                      <p onClick={() => handleBrandsFilter("C")}>C Brendi</p>
                    </label>
                  </li>
                  <li>
                    <input id="inp4" type="radio" name="chec" />
                    <label htmlFor="inp4">
                      <p onClick={() => handleBrandsFilter("D")}>D Brendi</p>
                    </label>
                  </li>
                </ul>
             <div>
             <div className="filtersSilideHeading"><h2> {minPrice}₼ Qiymət {maxPrice}₼</h2></div>
             <Slider
                  onChange={(e) => handleChange(e)}
                  range={{ draggableTrack: true }}
                  max={1000}
                  defaultValue={[10, 250]}
                />
             </div>
              </div>
            </div>
          </div>
          <div
           className="defoo">
            <motion.div
            initial="hidden"
            animate="visible"
              variants={container}
              style={{ gridTemplateColumns: `repeat(${activeIndex},1fr)` }}
              className="products "
            >
              {paginatedProducts.map((a) => (
                <motion.div
                variants={item}
                  onClick={() => viewProduct(a.id)}
                  key={a.id}
                  className="product"
                >
                  <div className="productImage">
                    <div className="demo">
                      <Link className="hd" to={`/details/${a.id}`}>
                        <img src={a.image[1]} alt="" />
                      </Link>
                      <img src={a.image[0]} alt="" />
                    </div>
                    <div className="productIcon">
                      <ul>
                        <li
                          onClick={() => visibleAddModal(a.id)}
                          className="toolTip"
                        >
                          <div className="toolTipText">Səbətə At</div>
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="48"
                              viewBox="0 96 960 960"
                              width="48"
                            >
                              <path d="M220 976q-24 0-42-18t-18-42V396q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480 176q63 0 106.5 43.5T630 326v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520V396H630v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T570 486v-90H390v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T330 486v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220 916V396v520Z" />
                            </svg>
                          </button>
                        </li>
                        <li onClick={showQuickModal} className="toolTip">
                          <div className="toolTipText">Ön İzləmə</div>
                          <p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="48"
                              viewBox="0 96 960 960"
                              width="48"
                            >
                              <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
                            </svg>
                          </p>
                        </li>
                        <li
                          onClick={() => addToFavorite(a.id)}
                          className="toolTip"
                        >
                          <div className="toolTipText">Seçilmişlər</div>
                          <p>
                            {favorites.find(
                              (product) => product.id === a.id
                            ) ? (
                              <i
                                style={{ transform: "translate(-40%, -25%)" }}
                                className="fa-solid fa-heart"
                              ></i>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="48"
                                viewBox="0 96 960 960"
                                width="48"
                              >
                                <path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z" />
                              </svg>
                            )}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="productDetails">
                    <h3>
                      <Link to={`/details/${a.id}`}>
                        {a.title.slice(0, 23)}
                      </Link>
                    </h3>
                    <p className="price">
                      {a.oldPrice ? (
                        <del className="oldPrice">{a.oldPrice}₼</del>
                      ) : (
                        ""
                      )}
                      <b>{a.price}₼</b>
                    </p>
                  </div>
                  {a.oldPrice ? (
                    <div
                    style={{
                      right: showFilterCatagory ? "-80px" : activeIndex === 2 ? "-130px" : "-105px",
                      top: activeIndex === 3 ? "50px" : activeIndex === 2 ? "80px" : ""
                    }}
                      className="discound"
                    >
                      <p>
                        -
                        {(((a.oldPrice - a.price) / a.oldPrice) * 100).toFixed(
                          0
                        )}
                        %
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </motion.div>
              ))}
            </motion.div>
            <div className="pagination">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalProducts}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(ProductsPage);
