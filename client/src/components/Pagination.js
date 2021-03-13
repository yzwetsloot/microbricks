function Pagination(props) {
  const items = [];

  for (let i = 0; i < props.pageCount; i++) {
    items.push(
      <li
        className={
          "pagination-item" +
          (props.page === i ? " pagination-item-selected" : "")
        }
        key={i + 1}
        onClick={(e) => props.onPageChange(i, e)}
      >
        {i + 1}
      </li>
    );
  }

  return <ul>{items}</ul>;
}

export default Pagination;
