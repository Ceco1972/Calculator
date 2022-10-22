let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let displayValue = '0';
let result = null; 

const buttons = document.querySelectorAll("button");

function clickButton() {
    for(let i = 0; i<buttons.length; i++)
    {
        buttons[i].addEventListener("click", function()
        {
          if(buttons[i].classList.contains("operand"))
          {
            inputOperand(buttons[i].value);
            updateDisplay();
          }  
          if(buttons[i].classList.contains("operator"))
          {
            inputOperator(buttons[i].value);
          }
          if(buttons[i].classList.contains("equals"))
          {
            inputEquals();
            updateDisplay();
          }
          if(buttons[i].classList.contains("clear"))
          {
            clearDisplay();
            updateDisplay();
          }
          if(buttons[i].classList.contains("decimal"))
          {
            inputDecimal(buttons[i].value);
          }
           if(buttons[i].classList.contains('percent')) {
            inputPercent(displayValue);
            updateDisplay();
           }
           else if(buttons[i].classList.contains('sign')) {
            inputSign(displayValue);
            updateDisplay();
        }
        });
           

    }
}
clickButton();

function updateDisplay() 
{
    const display = document.getElementById("result");
    display.innerText = displayValue;
    if(displayValue.length>9)
    {
        display.innerText = displayValue.substring(0, 8);
    }
}
updateDisplay();
function inputOperand(operand)
{
    if(firstOperator==null)
    {
        if(displayValue=='0'||displayValue==0)
        {
            displayValue=operand;
        }else if(displayValue==firstOperand)
        {
            displayValue=operand;
        }else
        {
            displayValue+=operand;
        }
    } else 
    {
        if(displayValue==firstOperand)
        {
            displayValue=operand;
        } else
        {
            displayValue+=operand;
        }
    }
}
function inputOperator(operator)
{
    if(firstOperator!=null&&secondOperator==null)
    {
        secondOperator=operator;
        secondOperand=displayValue;
        result=operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue=roundAccurately(result, 15).toString();
        firstOperand=displayValue;
        updateDisplay();

       result=null;
    } 
    else if(firstOperator != null && secondOperator != null) 
    {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        updateDisplay();
        result = null;

    }
     else
    {
        firstOperator = operator;
        firstOperand = displayValue;
    }
}
function inputEquals()
{
    if(firstOperator===null)
    {
        displayValue=displayValue;
    }else if(secondOperator!=null)
    {
        secondOperand=displayValue;
        result=operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result==='Imao')
        {
            displayValue='Imao';
        }else 
        {
            displayValue=roundAccurately(result, 15).toString();
            firstOperand=displayValue;
            secondOperand= null;
            firstOperator=null;
            secondOperator=null;
            result=null;
        }
    } else
    {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result==='Imao')
        {
            displayValue='Imao';
        }else
        {
            displayValue=roundAccurately(result, 15).toString();
            firstOperand=displayValue;
            secondOperand= null;
            firstOperator=null;
            secondOperator=null;
            result=null;
        } 
    }
}
function roundAccurately(num, places)
{
    return parseFloat(Math.round(num +'e' + places) + 'e-' + places)
}
function operate(x, y, op)
{
    if(op==='+')
    {
        return x+y;
    } else if(op==='-')
    {
        return x-y;
    } else if(op==='*')
    {
        return x*y;
    } else if(op==='/')
    {
        if(y===0)
        {
            return 'Imao';
        }else {return x/y;}
    }
}
function clearDisplay()
{
    displayValue = '0';
    firstOperand=null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}
function inputDecimal(dot)
{
    if(displayValue===firstOperand || displayValue === secondOperand)
    {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot))
    {
        displayValue += dot;
    }
}
function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}
function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}