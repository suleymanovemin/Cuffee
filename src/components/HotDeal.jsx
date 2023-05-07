import { Link } from "react-router-dom";

function HotDeal() {
  return (
    <>
      <div className="packagedCofee">
        <div className="container packaged">
          <div className="packagetImage">
            <img
              src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba.png?v=1659687828"
              alt=""
            />
          </div>
          <div className="packagetContent">
            <h1>PURE PACKAGED COFFEE</h1>
            <div className="packagetInner">
              <ul>
                <li>Enerji verir və düşünmə qabiliyyətinizi artırır</li>
                <li>Daxilində çoxlu faydalı qidaları ehtiva edir</li>
                <li>II tip diabet riskini azaldır</li>
                <li>Alzheimer xəstəliyi və demansın qarşısını alır</li>
                <li>Ürək xəstəliyi və ürək tutması riskini azaldır</li>
              </ul>
            </div>
            <div className="shopNow">
              <Link to="/products">SHOP NOW</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotDeal;
