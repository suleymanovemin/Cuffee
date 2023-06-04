import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AdminProductDetails({ products, dispatch }) {
  const { id } = useParams();
  const [prod, setProd] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length) {
      setProd(products.find((a) => +a.id === +id));
    }
  }, [products, id]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  useEffect(() => {
    setName(prod.title || "");
    setPrice(prod.price || "");
    setOldPrice(prod.oldPrice || "");
    setDescription(prod.content || "");
    setImage(prod.image || []);
  }, [prod]);

  const handleUpdate = () => {
    const updatedProduct = {
      ...prod,
      title: name,
      price,
      content: description,
      image,
    };

    if (oldPrice !== "") {
      updatedProduct.oldPrice = oldPrice;
    } else if (prod.oldPrice) {
      delete updatedProduct.oldPrice;
    }

    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: updatedProduct,
        });
        toast.success("Məlumatlar Yeniləndi!");
        const API = "http://localhost:3000";
        fetch(`${API}/products`)
          .then((response) => response.json())
          .then((data) => {
            dispatch({
              type: "SET_PRODUCTS",
              payload: data,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Bir hata oluştu. Məlumatlar yenilənmədi.");
          });
      });
  };

  return (
    <div className="adminProdDetils">
      <div className="prodDetail">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="prodPrices">
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="oldPrice">Old Price</label>
            <input
              id="oldPrice"
              type="number"
              placeholder="Old Price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select name="stockStatus">
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
        {image.map((img, index) => (
          <div key={index}>
            <label htmlFor={`image${index + 1}`}>Image {index + 1}</label>
            <input
              id={`image${index + 1}`}
              type="text"
              placeholder="Image URL"
              value={img}
              onChange={(e) => {
                const updatedImages = [...image];
                updatedImages[index] = e.target.value;
                setImage(updatedImages);
              }}
            />
          </div>
        ))}
        <label htmlFor="content">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="content"
        ></textarea>
        <button onClick={handleUpdate}>Gönder</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps)(AdminProductDetails);
