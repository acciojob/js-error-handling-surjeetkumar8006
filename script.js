// Custom Error Classes
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not '${arg}'`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

// Main evaluation function
function evalString(str) {
  str = str.trim();

  // Check for invalid characters
  if (/[^0-9+\-*/\s]/.test(str)) {
    const invalidChar = str.match(/[^0-9+\-*/\s]/)[0];
    throw new OutOfRangeError(invalidChar);
  }

  // Check invalid operator combinations
  if (/[+\-*/]{2,}/.test(str)) {
    throw new InvalidExprError();
  }

  // Check if starts with invalid operator
  if (/^[+/*]/.test(str)) {
    throw new SyntaxError("Expression should not start with invalid operator");
  }

  // Check if ends with invalid operator
  if (/[+\-/*]$/.test(str)) {
    throw new SyntaxError("Expression should not end with invalid operator");
  }

  // Evaluate expression safely
  return eval(str);
}

// Button click handler
function evaluateExpression() {
  const input = document.getElementById("input1").value;
  try {
    const result = evalString(input);
    alert("passed");
  } catch (err) {
    alert("failed");
    throw err;
  }
}
