function SearchBar(props) {
  return (
    <div class="SearchBar">
      <form action="/" method="get" onSubmit={props.search} spellCheck="false">
        <input class="input" type="text" name="q" />
        <button class="button is-primary" type="submit"><i class="fas fa-search"></i></button>
      </form>
    </div>
  );
}

export default SearchBar;
