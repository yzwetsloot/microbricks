import Loader from "react-loader-spinner";

import Product from "./Product";
import Pagination from "./Pagination";

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
        <Pagination
          page={props.page}
          pageCount={props.pageCount}
          onPageChange={props.onPageChange}
        />
      </div>
    );
  }
}

export default ProductList;
