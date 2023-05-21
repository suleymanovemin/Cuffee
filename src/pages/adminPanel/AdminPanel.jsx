import { connect } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
function AdminPanel({ products, category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / pageSize);

  const goToPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="adminProductList">
      <div className="adminProdFilter">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Catagory</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((a) => {
              let ctg = category.find((b) => +b.id === a.category_id);
              return (
                <tr key={a.id}>
                  <td>
                    <div className="adminProdImage">
                      <img src={a.image[0]} alt={a.title} />
                    </div>
                    <div>
                      <Link to={`/admin/productList/${a.id}`}>
                        {a.title.slice(0, 24)}
                      </Link>
                      <span>ID:{a.id}</span>
                    </div>
                  </td>
                  <td>{ctg.name}</td>
                  <td>
                    {a.inStock == true ? (
                      <p className="inStock">In Stock</p>
                    ) : (
                      <p className="outOfStock">Out of Stock</p>
                    )}
                  </td>
                  <td>{a.price}₼</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="adminProdPagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            )
          )}
          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const t = (a) => a;

export default connect(t)(AdminPanel);
