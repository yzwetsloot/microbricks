import Loader from "react-loader-spinner";

import Product from "./Product";

function ProductList(props) {
  if (props.loading) {
    return <Loader type="ThreeDots" color="#9c88ff" />;
  } else {
    return (
      <div className="ProductList">
        <ul>
          {props.products.map((product) => (
            <Product key={product.id} info={product} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
