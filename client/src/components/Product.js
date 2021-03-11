import ProductInfo from "./ProductInfo";

function Product(props) {
  const lastModified = new Date(props.info.last_modified);

  return (
    <div class="Product">
      <div class="product-container">
        <div class="img-box">
          <img src={props.info.image} alt={props.info.title} />
        </div>
        <ProductInfo info={props.info} />
      </div>
      <p class="date-box"><i class="fas fa-clock"></i> {lastModified.toLocaleString('nl-NL')} </p>
    </div>
  );
}

export default Product;
