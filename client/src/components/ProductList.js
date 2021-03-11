import Product from "./Product";

function ProductList(props) {
  return (
    <div className="ProductList">
      <div id="result-bar">
        <b>{props.products.length + (props.products.length === 1 ? " result" : " results")}</b>
      </div>
      <ul>
        {props.products.map((product) => (
          <Product key={product.id} info={product} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
