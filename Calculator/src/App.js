import { useState, useEffect } from "react";
import "./index.css";
import { NumericFormat } from "react-number-format";

function App() {
  const [input, setInput] = useState("");
  const [total, setTotal] = useState(false);
  const [preState, setPreState] = useState("");
  const [currState, setCurrState] = useState("");
  const [operator, setOperator] = useState(null);

  const reset = (e) => {
    setInput("0");
  };
  const percent = (e) => {
    const inputValue = parseFloat(input);
    const percentValue = inputValue / 100;
    setInput(percentValue.toString());
  };
  const inputNum = (e) => {
    console.log("Button clicked:", e.target.innerText);
    if (e.target.innerText === "." && currState.includes(".")) return;

    if (total) {
      setPreState("");
    }

    currState
      ? setCurrState((pre) => pre + e.target.innerText)
      : setCurrState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currState);
  }, [currState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const minusplus = (e) => {
    if (input.charAt(0) === "-") {
      setInput(input.slice(1));
    } else {
      setInput("-" + input);
    }
  };
  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(currState));
        break;

      case "x":
        cal = String(parseFloat(preState) * parseFloat(currState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(currState));
        break;

      case "-":
        cal = String(parseFloat(preState) - parseFloat(currState));
        break;
      default:
        return;
    }
    setInput(cal);
    setPreState(cal);
    setCurrState("");
  };
  const operatorType = (e) => {
    setTotal(false);
    if (currState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(currState);
      setCurrState("");
    }
    setOperator(e.target.innerText);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          )}
        </div>
        <div className="btn gray" onClick={reset}>
          AC
        </div>
        <div className="btn gray" onClick={percent}>
          %
        </div>
        <div className="btn gray" onClick={minusplus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn orange" onClick={operatorType}>
          x
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn " onClick={inputNum}>
          0
        </div>
        <div className="btn " onClick={inputNum}>
          .
        </div>
        <div className="btn" id="equal" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
