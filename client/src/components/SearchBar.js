function SearchBar(props) {
  return (
    <div class="SearchBar">
      <form action="/" method="get" onSubmit={props.search} spellCheck="false">
        <input type="text" placeholder="Search" name="q" />
        <button type="submit"><i class="fas fa-search"></i></button>
      </form>
    </div>
  );
}

export default SearchBar;
