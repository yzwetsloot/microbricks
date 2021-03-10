import ProductInfo from "./ProductInfo";

function Product(props) {
  return (
    <div class="Product">
      <div class="product-container">
        <div class="img-box">
          <img src={props.info.image} alt={props.info.title} />
        </div>
        <ProductInfo info={props.info} />
      </div>
      <p class="date-box">{new Date(props.info.last_modified).toString()}</p>
    </div>
  );
}

export default Product;
