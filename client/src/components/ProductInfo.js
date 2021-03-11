function ProductInfo(props) {
  return (
    <div class="ProductInfo">
      <a href={props.info.url} target="_blank" rel="noreferrer">
        <h4>{props.info.title} <i class="fas fa-external-link-alt"></i></h4>
      </a>
      <ul>
        <li>EAN: {props.info.ean}</li>
        <li>
          Rating: {props.info.rating} ({props.info.score})
        </li>
        <li>Reference price: {props.info.price}</li>
        <li>Category: {props.info.category}</li>
        <li>Velocity: {props.info.velocity}</li>
      </ul>
    </div>
  );
}

export default ProductInfo;
