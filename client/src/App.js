import React from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import mockData from "./mock";

import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { products: mockData };

    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();
    const query = e.target[0].value;
    console.log(query);

    fetch(`/?q=${query}`)
      .then(response => response.json())
      .then(body => this.setState({ products: body }))
      .catch(console.log);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar search={ this.search } />
        <ProductList products={ this.state.products } />
      </div>
    );
  }
}

export default App;
