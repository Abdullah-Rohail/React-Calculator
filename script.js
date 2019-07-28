class JSCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: ""
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    const keys = document.querySelector(".calulator-keys");

    keys.addEventListener("click", e => {
      if (e.target.matches("button")) {
        this.handleKeyPress(e);
      }
    });
  }

  handleKeyPress(event) {
    console.log(event);
    let group = "";
    let first = "";
    let second = "";
    let operation = "";
    if (event.target.attributes["data-group"] !== undefined) {
      group = event.target.attributes["data-group"].value;
    }
    const operators = { add: "+", subtract: "-", divide: "/", multiply: "*" };
    const numbers = {
      zero: "0",
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9
    };

    if (document.getElementById("display").value == "0") {
      document.getElementById("display").value = "";
    }

    if (group === "op") {
      // console.log("operands");
      let operator = operators[event.target.id];
      document.getElementById("display").value += operator;
    } else if (numbers[event.target.id]) {
      // console.log("digits");
      let number = numbers[event.target.id];
      document.getElementById("display").value += number;
      // console.log(event.target.id.innerText);
    }
    if (event.target.id === "decimal") {
    }
    if (event.target.id === "clear") {
      document.getElementById("display").value = 0;
    }
    if (event.target.id === "equals") {
      let equation = document.getElementById("display").value.split("");
      if (equation.length === 0) {
        return;
      } else if (equation.length === 1) {
        return;
      } else if (equation.length > 1) {
        // let equation = equation.split("");
        let ii = 0;
        let i = equation.indexOf(Object.keys(operators)[ii]);
        while (i === -1) {
          i = equation.indexOf(operators[Object.keys(operators)[ii]]);
          console.log(i);
          ii++;
        }
        console.log(i);
        first = equation.slice(0, i);
        first = first.join("");
        operation = operators[Object.keys(operators)[ii - 1]];
        second = equation.slice(i + 1);
        second = second.join("");
        console.log(first, operation, second);
        if (operation == "+") {
          let res = parseFloat(first) + parseFloat(second);
          document.getElementById("display").value = res;
        }
        if (operation == "*") {
          let res = parseFloat(first) * parseFloat(second);
          document.getElementById("display").value = res;
        }
        if (operation == "-") {
          let res = parseFloat(first) - parseFloat(second);
          document.getElementById("display").value = res;
        }
        if (operation == "/") {
          let res = parseFloat(first) / parseFloat(second);
          document.getElementById("display").value = res;
        }
        if (operators[event.target.id] !== undefined) {
          let a = equation.slice(
            0,
            equation.indexOf(operators[event.target.id])
          );
          console.log(a);

          console.log(equation);
        }
      }
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div id="display-wrapper">
          <input id="display" type="text" placeholder="0" />
        </div>
        <div className="calulator-keys">
          <button
            /*onClick={this.handleKeyPress}*/

            className="keys"
            id="clear"
          >
            AC
          </button>
          <button className="keys" data-group="op" id="divide">
            &divide;
          </button>
          <button className="keys" data-group="op" id="multiply">
            &times;
          </button>

          <button className="keys" id="seven">
            7
          </button>
          <button className="keys" id="nine">
            9
          </button>
          <button className="keys" id="eight">
            8
          </button>
          <button className="keys" data-group="op" id="subtract">
            &minus;
          </button>

          <button className="keys" id="four">
            4
          </button>
          <button className="keys" id="five">
            5
          </button>
          <button className="keys" id="six">
            6
          </button>
          <button className="keys" data-group="op" id="add">
            &#43;
          </button>

          <button className="keys" id="one">
            1
          </button>
          <button className="keys" id="two">
            2
          </button>
          <button className="keys" id="three">
            3
          </button>

          <button className="keys" id="zero">
            0
          </button>
          <button className="keys" id="decimal">
            .
          </button>
          <button className="keys" id="equals">
            &#61;
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<JSCalculator />, document.getElementById("App"));
