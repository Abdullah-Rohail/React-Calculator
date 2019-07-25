class JSCalculator extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div id="display">
          <input type="number" placeholder="0" />
        </div>
        <div id="calc-keys">
          <button className="keys is-clear">AC</button>
          <button className="keys">&divide;</button>
          <button className="keys">&times;</button>

          <button className="keys">7</button>
          <button className="keys">9</button>
          <button className="keys">8</button>
          <button className="keys">&minus;</button>

          <button className="keys">4</button>
          <button className="keys">5</button>
          <button className="keys">6</button>
          <button className="keys">&#43;</button>

          <button className="keys">1</button>
          <button className="keys">2</button>
          <button className="keys">3</button>

          <button className="keys is-zeros">0</button>
          <button className="keys">.</button>
          <button className="keys is-equal">&#61;</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<JSCalculator />, document.getElementById("App"));
