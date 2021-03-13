function SearchBar(props) {
  return (
    <div className="SearchBar">
      <form action="/" method="get" onSubmit={props.search} spellCheck="false">
        <input type="text" placeholder="Search" name="q" />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
