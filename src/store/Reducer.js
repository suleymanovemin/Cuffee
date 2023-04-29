const initialstate = {
  products: [],
  basket: [],
  favorites: [],
  blogs: [],
  isLoginModalOpen: false,
  quickViewProductId: 1,
  showQuickViewModal: false,
  showAddModal: false,
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) ?? false,
};
export default function Reducer(state = initialstate, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_BLOGS":
      return { ...state, blogs: action.payload };
    case "SET_BASKET":
      return { ...state, basket: action.payload };
    case "UPGRADE_BASKET":
      return { ...state, favorites: action.payload };
    case "SET_VIEW_ID":
      return { ...state, quickViewProductId: action.payload };
    case "SET_VIEW_MODAL":
      return { ...state, showQuickViewModal: !state.showQuickViewModal };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_VIEW_ADD_MODAL":
      return { ...state, showAddModal: !state.showAddModal };
    case "TOGGLE_MENU":
      return {
        ...state,
        isLoginModalOpen: !state.isLoginModalOpen,
      };
    case "ADD_TO_FAVORITE":
      return { ...state, favorites: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
