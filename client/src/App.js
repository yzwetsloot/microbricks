import React from "react";

import config from "./config";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultBar from "./components/ResultBar";
import ProductList from "./components/ProductList";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { products: [], page: 0, pageCount: 0, loading: false };

    this.search = this.search.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  search(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const target = e.target[0];
    const query = target.value;

    fetch(`/search?q=${query}`)
      .then((response) => response.json())
      .then((body) => {
        const pageCount = Math.ceil(body.length / config.productPerPageCount);
        this.setState({ products: body, loading: false, page: 0, pageCount });
      })
      .catch((err) => {
        console.error(err.stack);
        this.setState({ loading: false });
        // TODO: provide error feedback to user
      });
  }

  onPageChange(page) {
    this.setState({ page });
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar search={this.search} />
        <ResultBar count={this.state.products.length} />
        <ProductList
          products={this.state.products.slice(
            this.state.page * config.productPerPageCount,
            (this.state.page + 1) * config.productPerPageCount
          )}
          loading={this.state.loading}
          page={this.state.page}
          pageCount={this.state.pageCount}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

export default App;
