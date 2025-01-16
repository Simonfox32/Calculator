const keys = document.querySelectorAll(".keys .key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
const currentOp = document.querySelector(".current");
let input = "";

for (let key of keys) {
  key.addEventListener("click", () => {
    const value = key.dataset.key;
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "delete") {
      input = input.slice(0, -1);
      display_input.innerHTML = cleanInput(input);
    } else if (value == "equals") {
      let result = eval((prepareInput(input)))
      display_output.innerHTML = cleanOutput(result);
    } else if(value == 'brackets') {
      if (input.indexOf("(")==-1|| input.indexOf("(")!= -1 && input.indexOf(")")!= -1 && input.lastIndexOf("(") < input.lastIndexOf(")")) {
        input += "(";
      } else if (input.indexOf("(") != -1 && input.indexOf(")")==-1 || input.indexOf("(")!= -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")")) {
        input += ")";
      }
    } else {
      if (validateInput(value)) {
      input += value;
      display_input.innerHTML = cleanInput(input);
      }
    }
  });
}

function cleanInput(input) {
  let input_array = input.split("");
  let input_arrayLength = input_array.length;

  for (let i = 0; i < input_arrayLength; i++) {
    if (input_array[i] == '*') {
      input_array[i] = `<span class="operator">x</span>`;
    } else if (input_array[i] == '/') {
      input_array[i] = `<span class="operator">÷</span>`;
    } else if (input_array[i] == '+') {
      input_array[i] = `<span class="operator">+</span>`;
    } else if (input_array[i] == '-') {
      input_array[i] = `<span class="operator">-</span>`;
    }  else if (input_array[i] == '(') {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ')') {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == '%') {
      input_array[i] = `<span class="percent">%</span>`;
    } 
  }
  return input_array.join("");
}

function cleanOutput (output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];

  let outputArray = outputString.split("");
  if (outputArray.length > 3) {
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }
  if (decimal) {
    outputArray.push('.')
    outputArray.push(decimal);
  }
  return outputArray.join("");
}

function validateInput(value) {
  let lastInput = input.slice(-1);
  let operators = ["+", "-", "/", "*"]
  if (value == '.' ** lastInput == '.') {
    return false;
  }
  if (operators.includes(value)) {
    if (operators.includes(lastInput)){
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function prepareInput(input) {
  let input_array = input.split("");
  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == '%') {
      input_array[i] = "/100";
    }
  }
  return input_array.join("");
}