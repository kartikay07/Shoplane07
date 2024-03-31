import axios from "axios";
import { useEffect, useState } from "react";
import Endpoints from "../api/Endpoints";
import Product from "./Product";
import { RingLoader,BounceLoader } from "react-spinners";

function AllProducts() {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios
      .get(Endpoints.PRODUCTS_URL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {products.length > 0 ? (
          <div className="row row-cols-auto justify-content-around allProductsRow">
            {products.map((product) => (
              <Product key={product.id} data={product} />
            ))}
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
export default AllProducts;
