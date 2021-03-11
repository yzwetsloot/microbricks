function ProductInfo(props) {
  return (
    <div className="ProductInfo">
      <a href={props.info.url} target="_blank" rel="noreferrer">
        <h4>{props.info.title} <i className="fas fa-external-link-alt"></i></h4>
      </a>
      <table className="info-table">
            <tr>
                <th>EAN</th>
                <td>{props.info.ean}</td>
            </tr>
            <tr>
                <th>Rating</th>
                <td>{props.info.rating} ({props.info.score})</td>
            </tr>
            <tr>
                <th>Reference price</th>
                <td>{props.info.price} &euro;</td>
            </tr>
            <tr>
                <th>Category</th>
                <td>{props.info.category}</td>
            </tr>
            <tr>
                <th>Velocity</th>
                <td className={props.info.velocity > 0.7 ? "high-velocity" : "low-velocity"}>{props.info.velocity}</td>
            </tr>
        </table>
    </div>
  );
}

export default ProductInfo;
