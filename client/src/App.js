import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import config from "./config";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Statistics from "./components/Statistics";
import ResultBar from "./components/ResultBar";
import ErrorMessage from "./components/ErrorMessage";
import ProductList from "./components/ProductList";

import "./App.css";

function App(props) {
  let history = useHistory();
  let location = useLocation();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryProducts = (value, page = 0) => {
    setError("");

    fetch(`/p/search?q=${value}`)
      .then((response) => response.json())
      .then((body) => {
        console.info(`Retrieved ${body.length} products from database`);

        const pageCount = Math.ceil(body.length / config.productPerPageCount);

        setProducts(body);
        setLoading(false);
        setPage(page || 0);
        setPageCount(pageCount);
      })
      .catch((err) => {
        console.error(err.stack);

        setLoading(false);
        setError("Failed to retrieve products from database");
      });
  };

  const fromURL = () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("q")) {
      setLoading(true);

      const value = queryParams.get("q");
      queryProducts(value, parseInt(queryParams.get("page")) - 1);
    } else {
      setProducts([]);
      setPage(0);
      setPageCount(0);
      setLoading(false);
    }
  };

  // location change
  useEffect(fromURL, [location]);

  // componentDidMount
  useEffect(fromURL, []);

  const searchHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    const target = e.target[0];
    const value = target.value;

    history.push(`/search?q=${value}`);
    queryProducts(value);
  };

  const onPageChangeHandler = (page) => {
    setPage(page);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <Header />
      <SearchBar search={searchHandler} />
      <Switch>
        <Route exact path="/">
          <Statistics />
        </Route>
        <Route path="/search">
          <ResultBar count={products.length} />
          {error && <ErrorMessage message={error} />}
          <ProductList
            products={products.slice(
              page * config.productPerPageCount,
              (page + 1) * config.productPerPageCount
            )}
            loading={loading}
            page={page}
            pageCount={pageCount}
            onPageChange={onPageChangeHandler}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
