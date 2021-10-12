import Loader from "react-loader-spinner";

function StatBox(props) {
  const formatter = new Intl.NumberFormat("en-US");

  if (props.loading) {
    return <Loader type="ThreeDots" color="#9c88ff" />;
  } else {
    return (
      <div className="StatBox">
        <span className="statTitle">{props.name}</span>
        <span className="statMain">{formatter.format(props.main)}</span>
        <span style={{ color: props.change > 0 ? "#24c010" : "#c01025" }}>
          {props.change > 0 ? "+" : ""}
          {formatter.format(props.change)}&nbsp;
          {props.change > 0 ? (
            <i class="fas fa-angle-up"></i>
          ) : (
            <i class="fas fa-angle-down"></i>
          )}
        </span>
      </div>
    );
  }
}

export default StatBox;
