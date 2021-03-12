import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultBar from "./components/ResultBar";
import ProductList from "./components/ProductList";
import mockData from "./mock";

import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { products: mockData, loading: false };

    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const target = e.target[0];
    const query = target.value;

    fetch(`http://localhost:9000/search?q=${query}`)
      .then(response => response.json())
      .then(body => this.setState({ products: body, loading: false }))
      .catch(err => {
        console.error(err.stack);
        this.setState({ loading: false }); 
        // TODO: provide error feedback to user
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar search={ this.search } />
        <ResultBar count={this.state.products.length} />
        <ProductList products={ this.state.products } loading={ this.state.loading } />
      </div>
    );
  }
}

export default App;
