function ErrorMessage(props) {
  return (
    <div class="ErrorMessage">
      <b>
        <i className="fas fa-exclamation-triangle"></i>&nbsp;{props.message}
      </b>
    </div>
  );
}

export default ErrorMessage;
