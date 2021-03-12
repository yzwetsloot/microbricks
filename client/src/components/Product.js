import React from "react";
import ProductInfo from "./ProductInfo";
import ChartContainer from "./ChartContainer";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = { priceHistory: [], quantityHistory: [], loading: false, toggle: false };

    this.getHistory = this.getHistory.bind(this);
  }

  getHistory(e) {
    e.preventDefault();

    this.setState({ loading: true });

    fetch(`http://localhost:9000/product/${this.props.info.id}`)
      .then((response) => response.json())
      .then((body) =>
        this.setState({
          priceHistory: body.price,
          quantityHistory: body.quantity,
          loading: false,
          toggle: !this.state.toggle,
        })
      )
      .catch((err) => {
        console.error(err.stack);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <li className="Product" onClick={this.getHistory}>
        <ProductInfo info={this.props.info} />
        {this.state.toggle && (
          <ChartContainer
            priceHistory={this.state.priceHistory}
            quantityHistory={this.state.quantityHistory}
            id={this.props.info.id}
          />
        )}
      </li>
    );
  }
}

export default Product;
