import React from "react";
import Loader from "react-loader-spinner";

import ProductInfo from "./ProductInfo";
import ChartContainer from "./ChartContainer";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceHistory: [],
      quantityHistory: [],
      loading: false,
      collapsible: false,
      cache: false,
    };

    this.getHistory = this.getHistory.bind(this);
  }

  getHistory(e) {
    e.preventDefault();

    if (this.state.collapsible) {
      this.setState({ collapsible: false });
      return;
    }

    if (this.state.cache) {
      this.setState({ collapsible: true });
      return;
    }

    this.setState({ loading: true });

    fetch(`http://localhost:9000/product/${this.props.info.id}`)
      .then((response) => response.json())
      .then((body) =>
        this.setState({
          priceHistory: body.price,
          quantityHistory: body.quantity,
          loading: false,
          collapsible: true,
          cache: true,
        })
      )
      .catch((err) => {
        console.error(err.stack);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <li className="Product">
        <ProductInfo info={this.props.info} setCollapsible={this.getHistory} />
        {this.state.loading && <Loader type="ThreeDots" color="#9c88ff" />}
        {this.state.collapsible && (
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
