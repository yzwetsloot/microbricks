function ResultBar(props) {
  return (
    <div id="result-bar">
      <b>
        {props.count +
          (props.count === 1 ? " result" : " results")}
      </b>
    </div>
  );
}

export default ResultBar;
