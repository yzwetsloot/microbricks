import logo from "../logo.svg";

function Header() {
  return (
    <>
      <header className="App-header">
        <a href="/" style={{ display: "inline-block" }}><img src={logo} className="App-logo" alt="logo" /></a>
      </header>
      <h1>MicroBricks</h1>
    </>
  );
}

export default Header;
