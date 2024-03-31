import axios from "axios";
import { useEffect, useState } from "react";
import Endpoints from "../api/Endpoints";
import Product from "./Product";
import { RingLoader,BounceLoader } from "react-spinners";

function EachCategory(props) {
  const { categoryName } = props.data;
  const [catProducts, setCatProducts] = useState([]);

  const fetchData = () => {
    axios
      .get(Endpoints.CATEGORY_URL + categoryName)
      .then((res) => {
        setCatProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCatProducts([]);
    fetchData();
  }, [categoryName]);

  return (
    <>
      <div>
        {catProducts.length > 0 ? (
          <div>
            <div className="row row-cols-auto justify-content-around allProductsRow">
              {catProducts.map((product) => (
                <Product key={product.id} data={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="loadingPage">
            <div>
            <BounceLoader color="#36d7b7" />
            </div>
            <div className="loadingPageText">
              <p>Loading, Please wait...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default EachCategory;
