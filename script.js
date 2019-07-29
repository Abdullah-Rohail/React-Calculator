class Calculation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			equalBtn_clicked: 0,
			deci: false
		};
		this.calculate = this.calculate.bind(this);
	}

	calculate(event) {
		let group = "";
		let targetID = event.target.id;
		let operator = "";
		if (event.target.attributes["data-group"] !== undefined) {
			group = event.target.attributes["data-group"].value;
		}
		const operators = { divide: "/", multiply: "*", subtract: "-", add: "+" };
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
		if (this.state.equalBtn_clicked === 1) {
			// document.getElementById("display").value = "";
			this.setState({
				equalBtn_clicked: 0
			});
		}

		if (group === "op") {
			// if minus
			this.setState({
				deci: true
			});
			operator = operators[targetID];
			if (
				!isNaN(
					parseFloat(document.getElementById("display").value.slice(-1)) ||
						operator == "-"
				)
			) {
				if (document.getElementById("display").value.slice(-1) == "-") {
					let temp = document
						.getElementById("display")
						.value.replace(/.$/, operator);
					document.getElementById("display").value = temp;
					if (
						isNaN(
							parseFloat(document.getElementById("display").value.slice(-2))
						)
					) {
						let str =
							document
								.getElementById("display")
								.value.substring(
									0,
									document.getElementById("display").value.length - 2
								) + operator;
						document.getElementById("display").value = str;
					}
				} else {
					document.getElementById("display").value += operator;
				}
			} else {
				let temp = document
					.getElementById("display")
					.value.replace(/.$/, operator);
				document.getElementById("display").value = temp;
			}
		} else if (numbers[targetID]) {
			let number = numbers[targetID];
			document.getElementById("display").value += number;
		}
		if (targetID === "decimal") {
			if (
				document.getElementById("display").value.includes(".") &&
				this.state.deci === false
			) {
			} else {
				document.getElementById("display").value += ".";
				this.setState({
					deci: false
				});
			}
			// if (document.getElementById("display").value.slice(-1) !== ".") {
			// 	document.getElementById("display").value += ".";
			// }
		}
		if (targetID === "clear") {
			document.getElementById("display").value = 0;
		}
		if (targetID === "equals") {
			this.setState({
				equalBtn_clicked: 1
			});
			let equation = document.getElementById("display").value.split("");
			if (equation.length === 0) {
				return;
			} else if (equation.length === 1) {
				return;
			} else if (equation.length > 1) {
				let ii = 0;
				let i = equation.indexOf(Object.keys(operators)[ii]);
				while (i === -1) {
					i = equation.indexOf(operators[Object.keys(operators)[ii]]);
					ii++;
				}
				// let first = equation.slice(i - 1, i).join("");
				this.handleEqual(equation, operators, numbers);
			}
		}
	}

	handleEqual(equation, operators, numbers) {
		let first = "";
		let second = "";
		let operation = "";
		let res = "";

		let ii = 0;
		let i = equation.indexOf(Object.keys(operators)[ii]);
		while (i === -1) {
			i = equation.indexOf(operators[Object.keys(operators)[ii]]);
			ii++;
		}
		console.log("Equation is: " + equation);

		let ccc = 1;
		while (!isNaN(parseFloat(equation[i - ccc])) || equation[i - ccc] == ".") {
			ccc++;
		}

		first = equation.slice(i - (ccc - 1), i).join("");
		operation = operators[Object.keys(operators)[ii - 1]];
		if (operation === equation[equation.length - 1]) {
			return;
		}

		let cc = 1;
		while (
			!isNaN(parseFloat(equation[i + (cc - 1)])) ||
			equation[i - cc] == "."
		) {
			cc++;
		}
		console.log("c" + ccc + "   " + cc);
		second = equation.slice(i + cc).join("");

		console.log(
			"First = " + first + ", Operation = " + operation + ", Second = " + second
		);

		if (operation == "+") {
			res = parseFloat(first) + parseFloat(second);
		}
		if (operation == "*") {
			res = parseFloat(first) * parseFloat(second);
		}
		if (operation == "-") {
			res = parseFloat(first) - parseFloat(second);
		}
		if (operation == "/") {
			res = parseFloat(first) / parseFloat(second);
		}
		if (operators[event.target.id] !== undefined) {
			let a = equation.slice(0, equation.indexOf(operators[event.target.id]));
		}
		document.getElementById("display").value = res;

		console.log(second.length);
		console.log(res);

		equation.splice(i - 1, 3);
		equation.splice(i - 1, 0, res.toString());

		console.log(equation);
		console.log(i + " " + ii);

		if (equation.length === 1) {
			return;
		} else {
			equation.forEach(k => {
				if (isNaN(k) && k !== ".") {
					console.log(k);
					this.handleEqual(equation, operators, numbers);
				}
			});
		}
	}

	render() {
		return (
			<JSCalculator calculate={this.calculate} handleEqual={this.handleEqual} />
		);
	}
}

class JSCalculator extends React.Component {
	constructor(props) {
		super(props);

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
		this.props.calculate(event);
	}

	render() {
		return (
			<div className="wrapper">
				<div id="display-wrapper">
					<input id="display" type="text" placeholder="0" />
				</div>
				<div className="calulator-keys">
					<button className="keys" id="clear">
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
						+
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
						=
					</button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Calculation />, document.getElementById("App"));
