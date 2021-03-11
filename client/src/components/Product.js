import ProductInfo from "./ProductInfo";

function Product(props) {
  const lastModified = new Date(props.info.last_modified);

  return (
    <div className="Product">
      <div className="product-container">
        <div className="img-box">
          <img src={props.info.image} alt={props.info.title} />
        </div>
        <ProductInfo info={props.info} />
      </div>
      <p className="date-box"><i className="fas fa-clock"></i> {lastModified.toLocaleString('nl-NL')} </p>
    </div>
  );
}

export default Product;
