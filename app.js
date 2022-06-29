const add = function(val1,val2) {
	return val1+val2;
};

const subtract = function(val1,val2) {
	return val1-val2
};

const sum = function(values,total=0) {
	values.forEach((value) => {
    total+= value;
  });
return total;
};

const divide = function(value1,value2) {
  return value1/value2;
}

const multiply = function(value1,value2) {
  return value1*value2;
}

const power = function(operand,exponent) {
  total=1;
	for (let i = 0; i < exponent; i++)
  {
    total *= operand;
  }
  return total;
};

const factorial = function(value) {
  total=1;
  if (value==0) {
    return 1;
  }
  total = 1;
  for (let i = value; i > 0; i--) {
    total*= i;
  }
  return total;
};


const calculate = function(value1,value2,operator) {
  value1 = parseInt(calculator.value1);
  value2 = parseInt(calculator.value2);
  let result;
  calculator.operatorSet = false;
  switch(operator) {
    case "+":
      result =  add(value1,value2);
      break;
    case "-":
      result = subtract(value1,value2);
      break;
    case "*":
      result = multiply(value1,value2);
      break;
    case "÷":
      if (value2 ==0) {
        result = "lets not get philosophical right now"
        break;
      }
      result =  divide(value1,value2);
      break;
  }
  calculator.value1 = result;
  calculator.result = result;
  return result;
}

const round = function() {
  let text = displayElem.innerText;
  if (text.length > 10) {
    text = text.substring(0,text.length-1);
  }
  displayElem.innerText = text;
  return;
}

const ac = function() {
  let tempCalc = {
    value1: undefined,
    value2: undefined,
    currentOperator: undefined,
    previousOperator: undefined,
    displayValue: "0",
    result: undefined,
    operatorSet: false,
  } 
  displayElem.innerText="0";
  return tempCalc;
}

const backspace = function() {
}

let calculator = {
  value1: undefined,
  value2: undefined,
  currentOperator: undefined,
  previousOperator: undefined,
  displayValue: "0",
  result: undefined,
  operatorSet: false,
} 




const displayElem = document.querySelector(".display");
displayElem.innerText=("0");
numberControls = Array.from(document.getElementsByClassName("control number"));
numberControls.forEach(control => {
  console.log(control.innerText)
  control.addEventListener("click", event => {
    round();
    if (calculator.value1 == undefined && calculator.value2 == undefined) {
      displayElem.innerText = "0";
    }
    while (calculator.currentOperator == undefined)
    {
      if (displayElem.innerText == "0" || displayElem.innerText == calculator.result) {
        displayElem.innerText = control.innerText
        calculator.value1 = displayElem.innerText
        return;
      }
     displayElem.innerText+=control.innerText
     calculator.value1 = displayElem.innerText
     return;
    }
    while (calculator.currentOperator != undefined) {
      if (displayElem.innerText == "0" || displayElem.innerText == calculator.result) {
        displayElem.innerText = control.innerText
        calculator.value2 = displayElem.innerText
        return;
      }
     displayElem.innerText+=control.innerText
     calculator.value2 = displayElem.innerText
     return;
    }
    
  });
});
operatorControls = Array.from(document.getElementsByClassName("control operator"));
operatorControls.forEach(control => {
  round();
  control.addEventListener("click", event => {
    console.log(calculator)
    if (calculator.value1 != undefined && calculator.value1!=NaN
       && calculator.value2 != undefined && calculator.previousOperator !=undefined) {
        console.log("first triggered");
        console.log(calculator);
        result = calculate(calculator.value1,calculator.value2,calculator.previousOperator);
        displayElem.innerText=result;
        calculator.value1 = result;
        calculator.value2 = undefined;
        calculator.previousOperator = control.innerText;
        calculator.currentOperator = control.innerText;
        displayElem.innerText=result;
        return;  
    }
    if (calculator.value1 != undefined && calculator.value2 == undefined) {
      calculator.currentOperator=control.innerText;
      calculator.previousOperator = control.innerText;
      displayElem.innerText=""
      return;
    }
    else {
      return;
    }
    // if (calculator.currentOperator != undefined && calculator.value2 != undefined) {
    //   //calculator.value2=displayElem.innerText;
    //   calculator.previousOperator = calculator.currentOperator;
    //   let result = calculate(calculator.value1,calculator.value2,calculator.previousOperator);
    //   displayElem.innerText = "";
    //   calculator.currentOperator = control.innerText;
    //   calculator.operatorSet = true;
    //   displayElem.innerText=result;
    //   calculator.result=result;
    //   console.log(calculator)
    // }
    // else {
    //   calculator.value1 = displayElem.innerText;
    //   calculator.currentOperator = control.innerText;
    //   displayElem.innerText="";
    //   calculator.operatorSet = true;
    //   console.log(calculator)
    // }

  });
})

equalsControl = document.querySelector(".equals")
equalsControl.addEventListener("click", event => {
  if (calculator.value1 == undefined || calculator.value2 == undefined || calculator.currentOperator == undefined) {
    displayElem.innerText=calculator.value1;
    return;
  }
  result = calculate(calculator.value1,calculator.value2,calculator.currentOperator);
  displayElem.innerText=result;  
  calculator.operatorSet=false;
  calculator.value2=undefined;
  let tempResult= result;
  round();
  calculator = ac();
  displayElem.innerText = tempResult;
  console.log(calculator);
  
})

acControl = document.querySelector(".AC");
acControl.addEventListener("click", event => ac());
