class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expr) {
  try {
    let expression = expr.trim();

    // Check for invalid characters
    if (/[^0-9+\-*/\s]/.test(expression)) {
      let invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
      throw new OutOfRangeError(invalidChar);
    }

    // Invalid operator combinations like ++, +*, /+, etc.
    if (/(\+\+|--|\*\*|\/\/|\+\*|\*\/|\/\*|-\+|\+-|\/\+|\+\-|--|\*\+|\+\/)/.test(expression)) {
      throw new InvalidExprError();
    }

    // Starts with +, /, *
    if (/^[+\/*]/.test(expression)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Ends with +, /, *, -
    if (/[+\/*-]$/.test(expression)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    let result = eval(expression);
    return result;

  } catch (err) {
    // Print error name + message
    console.error(`${err.name}: ${err.message}`);
    throw err; // rethrow for displaying in UI
  }
}

// DOM handling for user interaction
document.getElementById("evaluate").addEventListener("click", () => {
  const input = document.getElementById("expression").value;
  const output = document.getElementById("result");

  try {
    const result = evalString(input);
    output.style.color = "green";
    output.textContent = `Result: ${result}`;
  } catch (err) {
    output.style.color = "red";
    output.textContent = `${err.name}: ${err.message}`;
  }
});
