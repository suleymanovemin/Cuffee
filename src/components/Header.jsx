import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

function Header({
  isLoginModalOpen,
  dispatch,
  basket,
  products,
  user,
  favorites,
}) {
  const [searchModal, setSearchModal] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [totalItems, setTotalItems] = useState("");
  const searchInput = useRef();

  const clearInput = () => {
    searchInput.current.value = "";
    setSearchText("");
    setFiltered([]);
  };
  const openSearchModal = () => {
    setSearchModal(!searchModal);
    clearInput();
    if (isLoginModalOpen) {
      dispatch({
        type: "TOGGLE_MENU",
        payload: isLoginModalOpen,
      });
    }
  };
  const showBurgerMenu = (e) => {
    setShowBurger(!showBurger);
    if (openSearchModal) {
      setSearchModal(false);
    }
  };

  // Show Login Page

  const navigate = useNavigate();

  const showLoginModal = () => {
    if (searchModal) {
      setSearchModal(!searchModal);
    }
    if (!user) {
      if (showBurger) {
        setShowBurger(false);
      }
      dispatch({
        type: "TOGGLE_MENU",
        payload: isLoginModalOpen,
      });
    } else if (user?.email == "admin@gmail.com") {
      navigate("/admin", {
        replace: true,
      });
    } else if (user?.email !== "admin@gmail.com") {
      navigate("/profile", {
        replace: true,
      });
    }
  };

  const showCartModal = () => {
    if (showBurger || openSearchModal) {
      setShowBurger(false);
      setSearchModal(false);
    }
    setShowCart(!showCart);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setNavbarVisible(true);
      } else {
        setNavbarVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  });

  const deleteProduct = (id) => {
    let newBasket = [...basket.filter((a) => a.id !== id)];
    localStorage.setItem("basket", JSON.stringify(newBasket));

    dispatch({
      type: "SET_BASKET",
      payload: newBasket,
    });
  };
  useEffect(() => {
    setTotalItems(basket?.reduce((total, current) => total + current.count, 0));
  }, [basket]);

  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = products.filter((product) => {
      return product.title.toLowerCase().includes(value?.toLowerCase());
    });
    setFiltered(filtered);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    if (isLoginModalOpen) {
      dispatch({
        type: "TOGGLE_MENU",
        payload: isLoginModalOpen,
      });
    }
    if (openSearchModal) {
      setSearchModal(false);
    }
    if (showCart) {
      setShowCart(false);
    }
  }, [pathname]);
  return (
    <>
      <div
        onClick={showCartModal}
        className={`cart ${showCart ? "active" : ""}`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="miniCart"
        >
          <div className="miniCartHead">
            <div onClick={showCartModal} className="closeMiniCart">
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="miniCartTitle">
              <h3>Səbət</h3>
            </div>
            <div className="miniCartCounter">{totalItems}</div>
          </div>
          <div className="miniCartBody">
            {basket.length ? (
              <>
                <div className="basketList">
                  <ul className="basketUl">
                    {basket?.map((a) => {
                      let basketList = products.find((t) => t.id === a.id);
                      return (
                        <li key={a.id}>
                          <span className="cartCounter"></span>
                          <div className="basketImage">
                            <img src={basketList?.image} alt="" />
                          </div>
                          <div className="basketDetails">
                            <h3>{basketList?.title.slice(0, 15)}</h3>
                            <p>{basketList?.price} ₼</p>
                            <p>Ədəd : {a.count}</p>
                          </div>
                          <div
                            onClick={() => deleteProduct(a.id)}
                            className="deleteProduct"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="total">
                  <p>Toplam : </p>
                  <p>
                    {" "}
                    {basket.reduce((acc, curr) => {
                      const product = products.find((p) => p.id === curr.id);
                      return acc + curr?.count * product?.price;
                    }, 0)}
                    ₼
                  </p>
                </div>
                <div className="bottomViewCart">
                  <Link to="/basket">Səbətə Get</Link>
                  <Link>Alış-verişi Tamamla</Link>
                </div>
              </>
            ) : (
              <div className="goToShop">
                <p>Səbət boşdur</p>
                <Link onClick={showCartModal} to="/products">
                  MAĞAZAYA GET
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Burger Menu */}

      <div className={`header ${navbarVisible ? "fixed" : ""}`}>
        <div
          onClick={showBurgerMenu}
          className={showBurger ? "showModal active" : "showModal"}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="burgerMenu"
          >
            <aside className="aside">
              <div className="topMenu">
                <div className="asideMenu">
                  <i className="fa-solid fa-bars"></i>
                  Menu
                </div>
                <div onClick={showLoginModal} className="asideLogin">
                  <i className="fa-regular fa-user"></i>
                  LOGIN
                </div>
              </div>
              <div className="asideNavbar">
                <ul>
                  <li>
                    <NavLink onClick={showBurgerMenu} to="/">
                      Ana Səhifə
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={showBurgerMenu} to="/about">
                      Haqqımızda
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={showBurgerMenu} to="/blog">
                      Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={showBurgerMenu} to="/products">
                      Mağaza
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={showBurgerMenu} to="/favorites">
                      Seçilənlər
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={showBurgerMenu} to="/contact">
                      Əlaqə
                    </NavLink>
                  </li>
                </ul>
              </div>
            </aside>
            <div onClick={showBurgerMenu} className="closeBurgerMenu">
              <a>BAĞLA</a>
            </div>
          </div>
        </div>
        <div onClick={showBurgerMenu} className="burgerMenuIcon">
          <svg
            onClick={showBurgerMenu}
            className={`ham hamRotate ham1 ${showBurger ? "active" : ""}`}
            viewBox="0 0 100 100"
            width="80"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
            />
          </svg>
        </div>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img
                src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/logo.png?v=1659671833"
                alt=""
              />
            </Link>
          </div>
          <nav className="navbar">
            <ul>
              <li>
                <NavLink to="/">Ana Səhifə</NavLink>
              </li>
              <li>
                <NavLink to="/about">Haqqımızda</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/products">Mağaza</NavLink>
              </li>
              <li>
                <NavLink to="/favorites">Seçilənlər</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Əlaqə</NavLink>
              </li>
            </ul>
          </nav>
          <div className="search_login_favorite_cart">
            <div onClick={openSearchModal} className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div onClick={showLoginModal} className="profile">
              <i className="fa-regular fa-user"></i>
            </div>
            <Link className="favorite" to="/favorites">
              <i className="fa-regular fa-heart"></i>
              {favorites.length > 0 && <span className="favoriteActive"></span>}
            </Link>

            <div onClick={showCartModal} className="cartIcon">
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 ? (
                <>
                  <span className="basketActive"></span>
                  <span className="totalItems">{totalItems}</span>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          onClick={openSearchModal}
          className={searchModal ? "searchModal active" : "searchModal"}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="searchArea"
          >
            <h3>Axtarmaq istədiyiniz məhsulu adını yazın...</h3>
            <div className="searchBar container">
              <input
                ref={searchInput}
                onChange={handleInputChange}
                type="text"
                placeholder="Seach..."
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="seachResults container">
              <ul>
                {searchText &&
                  filtered?.map((a) => (
                    <li key={a.id}>
                      <Link onClick={openSearchModal} to={`/details/${a.id}`}>
                        <div className="resultImage">
                          <img src={a.image[0]} />
                        </div>
                      </Link>
                      <div className="resultTitle">
                        <Link to={`/details/${a.id}`}>
                          <h5>{a.title}</h5>
                        </Link>
                        <p>{a.price}₼</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(Header);
