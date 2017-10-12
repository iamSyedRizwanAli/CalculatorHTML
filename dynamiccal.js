function createCalculator()
{
	document.getElementById("createCalButton").style.display = "none";	

	var arr = ['C','*', '-', '/', '+', '='];
	var divEl = document.getElementById("calculatorDiv");
	divEl.appendChild(document.createElement("br"));
	var panel = document.createElement("INPUT");
	panel.id = "panel";
	panel.placeholder = "0";
	panel.disabled = true;
	panel.style.textAlign = "right";
	panel.style.width = "210px";
	panel.style.height = "25px";
	divEl.appendChild(panel);
	divEl.appendChild(document.createElement("br"));

	var arC = 0;
	for(var i = 9 ; i >= 0 ; i--)
	{	
		var val = i;
		if(val % 3 == 0)
		{
			if(arC > 0)
				createAButton(arr[arC-1], divEl);
			arC++;
			divEl.appendChild(document.createElement("br"));
		}
		createAButton(i, divEl);
	}

	createAButton(arr[arC-1], divEl);
	createAButton(arr[arC++], divEl);
	createAButton(arr[arC++], divEl);
}

function createAButton(value, divEl)
{
	var btn = document.createElement("button");
	var textt = document.createTextNode(value);
	btn.appendChild(textt);
	btn.id = "'" + value + "'";
	btn.style.margin = "10px";
	btn.style.width = "35px";
	btn.style.height = "35px";
	
	if(value == 'C')
		btn.addEventListener("click", function(){
			document.getElementById("panel").value = "";
		});
	else if(value == '=')
		btn.addEventListener("click", function(){
			var x = document.getElementById("panel");
//			var y = eval(x.value);
//			x.value = y;
			x.value = myEvalFunction(x.value);
		});	
	else
		btn.addEventListener("click", function(){
			var x = document.getElementById("panel");
			var y = x.value + value;
			x.value = y;
		});	
	
	divEl.appendChild(btn);
}

function myEvalFunction(expression)
{
	var idxDivide = expression.indexOf("/");
	
	while(idxDivide != -1)
	{
		var exp1 = expression.substr(0, idxDivide);
		var exp2 = expression.substr(idxDivide+1, expression.length-1);
		var var1 = getNumberBeforeSign(exp1);
		var var2 = getNumberAfterSign(exp2);
		
		var res = divide(var1, var2);
		var rExpss = var1 + "/" + var2;
		expression = expression.replace(rExpss, res);

		idxDivide = expression.indexOf("/");
	}
	
	var idxMultiply = expression.indexOf("*");

	while(idxMultiply != -1)
	{
		var exp1 = expression.substr(0, idxMultiply);
		var exp2 = expression.substr(idxMultiply+1, expression.length-1);
		var var1 = getNumberBeforeSign(exp1);
		var var2 = getNumberAfterSign(exp2);
		
		var res = multiply(var1, var2);
		var rExpss = var1 + "*" + var2;
		expression = expression.replace(rExpss, res);

		idxMultiply = expression.indexOf("*");
	}

	var idxSubtract = expression.indexOf("-");

	while(idxSubtract != -1)
	{

		var exp1 = expression.substr(0, idxSubtract);
		var exp2 = expression.substr(idxSubtract+1, expression.length-1);
		var var1 = getNumberBeforeSign(exp1);
		var var2 = getNumberAfterSign(exp2);
		
		var res = subtract(var1, var2);
		var rExpss = var1 + "-" + var2;
		expression = expression.replace(rExpss, res);

		idxSubtract = expression.indexOf("-");
	}

	var idxAddition = expression.indexOf("+");

	while(idxAddition != -1)
	{

		var exp1 = expression.substr(0, idxAddition);
		var exp2 = expression.substr(idxAddition+1, expression.length-1);
		var var1 = getNumberBeforeSign(exp1);
		var var2 = getNumberAfterSign(exp2);
		
		var res = add(var1, var2);
		var rExpss = var1 + "+" + var2;
		expression = expression.replace(rExpss, res);

		idxAddition = expression.indexOf("+");
	}

	return expression;
}

function getNumberAfterSign(expression)
{
	var flag = true;
	var var1 = "";

	for(var i = 0 ; i < expression.length && flag == true ; i++)
	{
		var xx = expression.charAt(i);
		if(xx != "+" && xx != "-" && xx != "/" && xx != "*")
		{
			var1 = var1 + xx;
		}else
			flag = false;
	}
	return var1;
}

function getNumberBeforeSign(expression)
{

	var flag = true;
	var var1 = "";

	for(var i = expression.length-1 ; i >= 0 && flag == true ; i--)
	{
		var xx = expression.charAt(i);
		if(xx != "+" && xx != "-" && xx != "/" && xx != "*")
		{
			var1 = var1 + xx;
		}else
			flag = false;
	}

	return reverseNumber(var1);
}

function reverseNumber(number)
{
	if(number.length == 1)
		return number;
	
	var res = number.split("");
	res = res.reverse();
	
	var res2 = res.join("");
	return res2;
	
}

function add(var1, var2)
{
	var temp = var1 * 1;
	var temp2 = var2 * 2;
	temp2 = temp2/2;

	return temp + temp2;
}

function subtract(var1, var2)
{
	return var1 - var2;
}

function multiply(var1, var2)
{
	return var1 * var2;
}

function divide(var1, var2)
{
	return var1 / var2;
}