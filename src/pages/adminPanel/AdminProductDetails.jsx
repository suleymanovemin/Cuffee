import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function AdminProductDetails({ products }) {
  let { id } = useParams();
let prod = products.find((a)=>+a.id === +id);
console.log(prod);
  return <div>AdminProductDetails</div>;
}
const t = (a) => a;
export default connect(t)(AdminProductDetails);
