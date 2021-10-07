import { Link } from "react-router-dom";

import logo from "../logo.svg";

function Header() {
  return (
    <>
      <header className="App-header">
        <Link to="/" style={{ display: "inline-block" }}>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <h1>MicroBricks</h1>
    </>
  );
}

export default Header;
