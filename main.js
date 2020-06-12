//This set of lines gathers the display IDs and stores them for later use.
//Note: "OldResult1" is actualy the result of the most current operation.  Whatever.
let newInput = document.getElementById("newInput");
let oldResult1 = document.getElementById("oldResult1");
let oldInput1 = document.getElementById("oldInput1");
let oldResult2 = document.getElementById("oldResult2");
let oldInput2 = document.getElementById("oldInput2");
let currentMode = document.getElementById("degrad");
let floatModeCounter = 0;

//setting some constant values here:
const PI = Math.PI;
const E = Math.E;
const EPSILON = Math.pow(2, -35);



const equalsButtonClick = document.getElementById("equals").addEventListener("click", equalButtonFunction);
function equalButtonFunction() {

    //This button really just updates the display.  "operate" function is the heavy lifter here.

    oldInput2.innerHTML = oldInput1.innerHTML; //moving results up here
    oldInput1.innerHTML = newInput.innerHTML;
    oldResult2.innerHTML = oldResult1.innerHTML;

    if (newInput.innerHTML.substr(newInput.innerHTML.length-1, 1) == " ") {
        //that is, if you type something like "2 + " you'll get an error.  All operations are surrounded by spaces so use this for detection.
        oldResult1.innerHTML="ERROR";
    } else {
    oldResult1.innerHTML = operate(newInput.innerHTML);
    }
    newInput.innerHTML = ""; //clears new line for fresh calculation
};


const operate = function(myStr) {

    //seems to me that if I want to add sin, cos, tan functionality here
    //I need to first check to see if the string contains sin, etc.
    //if it does, feed the inner parenthese part back through this function
    //and then replace sin(buncha numbers) with the result of this function.
    //yeah yeah that should do it.  Recursion!


    //Each operator is surrounded by spaces.  This split, then, should group an array into numbers and operators.
    //Then, we search for operators according to PEMDAS, and operate on the items just before and just after
    //that particular operator.
    let myArr = myStr.split(" ");
    
    //Look for ^ operator
    while (myArr.indexOf("^") > -1) {
        const n = myArr.indexOf("^");
        myStr = myStr.replace(`${myArr[n-1]} ^ ${myArr[n+1]}`, power(Number(myArr[n-1]), Number(myArr[n+1])));
        myArr = myStr.split(" ");
    };

    //PEMDAS says mult and divide are next, from left to right
    while (myArr.indexOf("*") > -1 || myArr.indexOf("/") > -1) {
        const mult = myArr.indexOf("*");
        const divi = myArr.indexOf("/");

        //If multiply comes first and also multiply exists OR multiply uniquely exists.
        if ((mult < divi && mult != -1) || (divi == -1 && mult > -1)) {
            const n = myArr.indexOf("*");
            myStr = myStr.replace(`${myArr[n-1]} * ${myArr[n+1]}`, multiply(Number(myArr[n-1]), Number(myArr[n+1])));
            myArr = myStr.split(" ");
        }

        //If division comes first and also division exists OR division uniquely exists.
        if ((divi < mult && divi != -1) || (mult == -1 && divi > -1)) {
            const n = myArr.indexOf("/");
            myStr = myStr.replace(`${myArr[n-1]} / ${myArr[n+1]}`, divide(Number(myArr[n-1]), Number(myArr[n+1])));
            myArr = myStr.split(" ");
        }

    };

    //Then, addition and subtraction, from left to right
    while (myArr.indexOf("+") > -1 || myArr.indexOf("-") > -1) {
        const addi = myArr.indexOf("+");
        const sub = myArr.indexOf("-");

        //If add comes first and also add exists OR add uniquely exists.
        if ((addi < sub && addi != -1) || (sub == -1 && addi > -1)) {
            const n = myArr.indexOf("+");
            myStr = myStr.replace(`${myArr[n-1]} + ${myArr[n+1]}`, add(Number(myArr[n-1]), Number(myArr[n+1])));
            myArr = myStr.split(" ");
        }

        //If subtr comes first and also subtr exists OR subtr uniquely exists.
        if ((sub < addi && sub != -1) || (addi == -1 && sub > -1)) {
            const n = myArr.indexOf("-");
            myStr = myStr.replace(`${myArr[n-1]} - ${myArr[n+1]}`, subtract(Number(myArr[n-1]), Number(myArr[n+1])));
            myArr = myStr.split(" ");
        }

    };

    //Check Float Mode.
    const currentFloatMode = document.getElementById("floatMode").innerHTML;

    //Consider checking for EPSILON after the decimal here.
    /*
    I thought this might do it but it's not what I want.
    a) I think I'm actually affecting the array here, so I need to make a copy of it or something.
    b) This WILL deal with things like 4.000000000000000001 it doesn't deal with
    things like 4.234000000000000000001.  I'd have to think of some way to do that... 
    c) So, in fact, it does NOT solve the .1 + .2 problem that you're trying to fix.
    I mean... you could multiply the decimal by (NO? length-1) 10 (I think), and if the answer is more than 1, run this algorithm
    again.  In this case, it would run several times, axing off the 2, the 3, and the 4, until finally it gets rid
    of the annoyingly long decimal.  Yeah yeah do that.

    //Hey past me, future me here.  Just dinking around for a moment and I found this:  `.3 - .2` produces an epsilon error, but this algorithm wont find it
    //because it's in the other direction.  It's a buttload of 9's instead of a buttload of 0's.
    //You'll also need to check for your decimal > (1 - Epsilon) somehow or something that I haven't put a ton of thought into yet, but something like this
    //Oh man that sounds horrible with 1.89999999999999999 but... you'll get it.  Or just move on.  Whatever.

    //A few more moments of though.... myNumberRoundedUp - myNumber < epsilon?  Maybe.

    //Update, I think I can do this all with rounding.  See FloatMode below.


    

    myArr = myStr.split(".");
    if (myArr[1] == undefined) {
        myStr = myArr.join("");
    } else {
        const myDecimal = myArr[1]/(10**myArr[1].length);
        if (myDecimal < EPSILON) {
            myStr = myArr[0];
        } else {
            myStr = myArr.join(".");
        }
    } 
*/

        
    if (currentFloatMode == "float<br>."){ //Float
        return myStr; //let's round this to 15 to deal with JS bugs.
        //return Math.round(Number(myStr)*(10**15) + EPSILON)/(10**15); //Look, JS will float to 17 decimals.  If I just round to 15
                                                                      //That takes care of fringe JS issues like .1 + .2
                                                                      //Oh gosh, but of course it doesn't handle 9's
                                                                      //18.9 - 9 still buggs out.
    } else if (currentFloatMode == "fixed<br>2") { //Fixed 2
        return Number(myStr).toFixed(2);
    } else if (currentFloatMode == "fixed<br>10") { //Fixed 10
        return Number(myStr).toFixed(10);
    } else if (currentFloatMode == "round<br>2") { //Round 2
        return Math.round(Number(myStr)*100 + EPSILON)/100;
    } else if (currentFloatMode == "round<br>10") { //Round 10
        return Math.round(Number(myStr)*10000000000 + EPSILON)/10000000000;
    }
    
    return myStr;
};







function add(a, b) {
    return a+b;
};
function subtract(a, b) {
    return a-b;
};
function multiply(a, b) {
    return a*b;
};
function divide(a, b) {
    if (b == 0) {
        alert(`New Mission: Refuse this Mission`);
        //call clear function maybe?
        return;
    }
    return a/b;
};
function power(a, b) {
    return a**b;
};
function sin(a) {
    //check for radians or degrees here
    return Math.sin(a);
};
function cos(a) {
    return Math.cos(a);
};

function tan(a) {
    return Math.tan(a);
};

function log(a) {
    return Math.log10(a);
};

function ln(a) {
    return Math.log(a);
};



//Listens for key presses on each relevant button;
const keyPress = document.addEventListener("keydown", (e) => {
    console.log(e.key); 
    switch (e.key) {
        case "^": 
            powerButtonFunction();
            break;
        case "/": 
            divideButtonFunction();
            break;
        case "*":
            multiplyButtonFunction();
            break;
        case "+":
            addButtonFunction();
            break;
        case "-":
            subtractButtonFunction();
            break;
        case "Backspace":
            backButtonFunction();
            break;
        case "0":
            displayThisThing("0");
            break;
        case "1":
            displayThisThing("1");
            break;
        case "2":
            displayThisThing("2");
            break;
        case "3":
            displayThisThing("3");
            break;
        case "4":
            displayThisThing("4");
            break;
        case "5":
            displayThisThing("5");
            break;
        case "6":
            displayThisThing("6");
            break;
        case "7":
            displayThisThing("7");
            break;
        case "8":
            displayThisThing("8");
            break;
        case "9":
            displayThisThing("9");
            break;
        case ".":
            displayThisThing(".");
            break;
        case "Enter":
            equalButtonFunction();
            break;
    }
});


//Common operator buttons go here:
const powerButtonClick = document.getElementById("power").addEventListener("click", powerButtonFunction);
function powerButtonFunction() {
    displayThisThing(" ^ ");
};

const divideButtonClick = document.getElementById("divide").addEventListener("click", divideButtonFunction);
function divideButtonFunction() {
    displayThisThing(" / ")
};

const multipyButtonClick = document.getElementById("multiply").addEventListener("click", multiplyButtonFunction);
function multiplyButtonFunction() {
    displayThisThing(" * ");
}

const subtractButtonClick = document.getElementById("subtract").addEventListener("click", subtractButtonFunction);
function subtractButtonFunction() {
    displayThisThing(" - ");
};

const addButtonClick = document.getElementById("add").addEventListener("click", addButtonFunction);
function addButtonFunction() {
    displayThisThing(" + ");
};

const backButton = document.getElementById("backSpace").addEventListener("click", backButtonFunction);
function backButtonFunction() {
    //If last character was a space (i.e., an operator), remove last 3 characters (i.e., "space, operator, space"),
    //Else, remove last one character (because it's just a number).
    if (newInput.innerHTML.substr(newInput.innerHTML.length-1, 1) == " ") {
        newInput.innerHTML = newInput.innerHTML.substr(0, newInput.innerHTML.length-3);
    } else {
       newInput.innerHTML = newInput.innerHTML.substr(0, newInput.innerHTML.length-1); 
    } 
};

const ansButton = document.getElementById("lastAns").addEventListener("click", lastAnsClick);
function lastAnsClick() {
    if (oldResult1.innerHTML == "") {
        displayThisThing("0");
    } else {
    displayThisThing(oldResult1.innerHTML);
    }
};

const lastEntry = document.getElementById("lastEntry").addEventListener("click", () => {
    newInput.innerHTML = oldInput1.innerHTML;
});

const floatButton = document.getElementById("floatMode").addEventListener("click", () => {
    //Float
    //Fixed 2
    //Fixed 10
    //Round 2
    //Round 10
    let floatMode = document.getElementById("floatMode");
    floatModeCounter++;

    if (floatModeCounter%5 == 1) {
        floatMode.innerHTML = "fixed<br>2";
    } else if (floatModeCounter%5 == 2) {
        floatMode.innerHTML = "fixed<br>10";
    } else if (floatModeCounter%5 == 3) {
        floatMode.innerHTML = "round<br>2";
    } else if (floatModeCounter%5 == 4) {
        floatMode.innerHTML = "round<br>10";
    } else if (floatModeCounter%5 == 0) {
        floatMode.innerHTML = "float<br>.";
    }
    //console.log(floatModeCounter%5);
});

//Lines of code to display button pushes.
function displayThisThing(x) {
    if ((newInput.innerHTML == "") && (x == " + " || x == " - " || x == " * " || x == " / " || x == " ^ ")) {
        lastAnsClick();
        //That is, if you start with an operator with nothing to operate on
    };
    newInput.innerHTML = newInput.innerHTML + x;
};

const zeroButtonClick = document.getElementById("zero").addEventListener("click", () => {
    displayThisThing("0");
});

const sevenButtonClick = document.getElementById("seven").addEventListener("click", () => {
    displayThisThing("7");
});

const eightButtonClick = document.getElementById("eight").addEventListener("click", () => {
    displayThisThing("8");
});

const nineButtonClick = document.getElementById("nine").addEventListener("click", () => {
    displayThisThing("9");
});

const fourButtonClick = document.getElementById("four").addEventListener("click", () => {
    displayThisThing("4");
});

const fiveButtonClick = document.getElementById("five").addEventListener("click", () => {
    displayThisThing("5");
});

const sixButtonClick = document.getElementById("six").addEventListener("click", () => {
    displayThisThing("6");
});

const oneButtonClick = document.getElementById("one").addEventListener("click", () => {
    displayThisThing("1");
});

const twoButtonClick = document.getElementById("two").addEventListener("click", () => {
    displayThisThing("2");
});

const threeButtonClick = document.getElementById("three").addEventListener("click", () => {
    displayThisThing("3");
});

const dotButtonClick = document.getElementById("dot").addEventListener("click", () => {
    displayThisThing(".");
});







//Unused, but planned, buttons go down here.
const sineButton = document.getElementById("sine").addEventListener("click", () => {
    displayThisThing("sin(");
});

const cosineButton = document.getElementById("cosine").addEventListener("click", () => {
    displayThisThing("cos(");
});

const tangentButton = document.getElementById("tangent").addEventListener("click", () => {
    displayThisThing("tan(");
});

const modeButton = document.getElementById("mode").addEventListener("click", () => {
    if (currentMode.innerHTML == "deg") {
        currentMode.innerHTML = "rad";
    } else {
        currentMode.innerHTML = "deg";
    };
});

const logButton = document.getElementById("log").addEventListener("click", () => {
    displayThisThing("log(");
});

const lnButton = document.getElementById("ln").addEventListener("click", () => {
    displayThisThing("ln(");
});

const eButton = document.getElementById("e").addEventListener("click", () => {
    displayThisThing("e");
});

const openParenButton = document.getElementById("openParen").addEventListener("click", () => {
    displayThisThing("(");
});

const closeParenButton = document.getElementById("closeParen").addEventListener("click", () => {
    displayThisThing(")");
});

const piButton = document.getElementById("pi").addEventListener("click", () => {
    displayThisThing(`&pi;`);
});




const allClear = document.getElementById("clear").addEventListener("click", () => {
    oldInput1.innerHTML = "";
    oldInput2.innerHTML = "";
    oldResult1.innerHTML = "";
    oldResult2.innerHTML = "";
    newInput.innerHTML = "";
    //there's totes probs more to clear out, but I just don't know what they are yet.
});

