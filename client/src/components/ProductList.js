import Product from "./Product";

function ProductList(props) {
  return (
      <div class="ProductList">
    <ul>
      {props.products.map((product) => (
        <Product key={product.id} info={product} />
      ))}
    </ul>
    </div>
  );
}

export default ProductList;
