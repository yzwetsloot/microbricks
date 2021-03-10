function ProductInfo(props) {
  return (
    <div class="ProductInfo">
      <a href={props.info.url} target="_blank" rel="noreferrer">
        <h5>{props.info.title}</h5>
      </a>
      <ul>
        <li>EAN: {props.info.ean}</li>
        <li>
          Rating: {props.info.rating} ({props.info.score})
        </li>
        <li>Reference price: {props.info.price}</li>
        <li>Category: {props.info.category}</li>
        <li>Velocity: {Math.round(props.info.velocity)}</li>
      </ul>
    </div>
  );
}

export default ProductInfo;
