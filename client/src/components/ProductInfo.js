function ProductInfo(props) {
  const lastModified = new Date(props.info.last_modified);

  return (
    <>
      <div className="container">
        <a href={props.info.url} target="_blank" rel="noreferrer">
          <h4>
            {props.info.title} <i className="fas fa-external-link-alt"></i>
          </h4>
        </a>
        <p className="date">
          <i className="fas fa-clock"></i>{" "}
          {lastModified.toLocaleString("nl-NL")}{" "}
        </p>
      </div>
      <div className="container">
        <table className="info-table">
          <tbody>
            <tr>
              <th>EAN</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Velocity</th>
            </tr>
            <tr>
              <td>{props.info.ean}</td>
              <td>
                {props.info.rating} ({props.info.score})
              </td>
              <td>{props.info.category}</td>
              <td
                className={
                  props.info.velocity > 0.7 ? "high-velocity" : "low-velocity"
                }
              >
                {props.info.velocity}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="price">
          <h2>&euro; {props.info.price}</h2>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
