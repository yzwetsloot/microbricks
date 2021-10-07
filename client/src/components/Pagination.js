import { Link } from "react-router-dom";

function Pagination(props) {
  const items = [];

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  for (let i = 0; i < props.pageCount; i++) {
    items.push(
      <Link
        to={`/search?q=${query}&page=${i + 1}`}
        className={
          "pagination-item" +
          (props.page === i ? " pagination-item-selected" : "")
        }
        key={i + 1}
        onClick={(e) => props.onPageChange(i, e)}
      >
        {i + 1}
      </Link>
    );
  }

  return <ul>{items}</ul>;
}

export default Pagination;
