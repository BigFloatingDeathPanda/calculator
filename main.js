console.log("hello");

//This set of lines gathers the display IDs and stores them for later use.
let display_value = "0";
let newInput = document.getElementById("newInput");
let oldResult1 = document.getElementById("oldResult1");
let oldInput1 = document.getElementById("oldInput1");
let oldResult2 = document.getElementById("oldResult2");
let oldInput2 = document.getElementById("oldInput2");
let currentMode = document.getElementById("degrad");
let floatModeCounter = 0;

//setting some constant values here:
const piNum = 3.1415926;
const eNum = 2.7182818;
const EPSILON = Math.pow(2, -30);



const equalsButton = document.getElementById("equals").addEventListener("click", () => {
    if (newInput.innerHTML.substr(newInput.innerHTML.length-1, 1) == " ") {
        oldInput2.innerHTML = oldInput1.innerHTML; //moving results up here
        oldInput1.innerHTML = newInput.innerHTML;
        oldResult2.innerHTML = oldResult1.innerHTML;
        oldResult1.innerHTML="ERROR";
        newInput.innerHTML = "";
    } else {
    oldInput2.innerHTML = oldInput1.innerHTML; //moving results up here
    oldInput1.innerHTML = newInput.innerHTML;
    oldResult2.innerHTML = oldResult1.innerHTML;
    oldResult1.innerHTML = operate(newInput.innerHTML);
    //oldResult1 actually displays the current results.  Sort of a misnomer really.
    //Not a big deal.  Just deal with it.
    //I have a feeling that this button in particular is going to be a PITA
    //so it's separated from the rest so I can work on it up here.  Well, really, you got it... you just need to figure out how to calculat things.  Start basic, my man.

    //do while loop with the "while" being looking for any particular operator!
    newInput.innerHTML = ""; //clear new line for fresh calculatiions.
    }

});


const operate = function(myStr) {

    //seems to me that if I want to add sin, cos, tan functionality here
    //I need to first check to see if the string contains sin, etc.
    //if it does, feed the inner parenthese part back through this function
    //and then replace sin(buncha numbers) with the result of this function.
    //yeah yeah that should do it.



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

        //If multiply comes first and also multiply exists OR multiply uniquely exists.
        if ((addi < sub && addi != -1) || (sub == -1 && addi > -1)) {
            const n = myArr.indexOf("+");
            myStr = myStr.replace(`${myArr[n-1]} + ${myArr[n+1]}`, add(Number(myArr[n-1]), Number(myArr[n+1])));
            myArr = myStr.split(" ");
        }

        //If division comes first and also division exists OR division uniquely exists.
        if ((sub < addi && sub != -1) || (addi == -1 && sub > -1)) {
            const n = myArr.indexOf("-");
            myStr = myStr.replace(`${myArr[n-1]} - ${myArr[n+1]}`, subtract(Number(myArr[n-1]), Number(myArr[n+1])));
            myArr = myStr.split(" ");
        }

    };

    //Check Float Mode.
    const currentFloatMode = document.getElementById("floatMode").innerHTML;
        
    if (currentFloatMode == "float<br>."){ //Float
        return myStr;
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


//Common operator buttons go here:


const powerButtonClick = document.getElementById("power").addEventListener("click", powerButtonFunction);

function powerButtonFunction() {
    if (newInput.innerHTML == "") {
        lastAnsClick();
    };
    newInput.innerHTML = newInput.innerHTML + " ^ ";
}

//const divideButtonKey = document.getElementById("divide").addEventListener("keydown", divideButtonFunction(e));
const divideButtonClick = document.getElementById("divide").addEventListener("click", divideButtonFunction);

function divideButtonFunction() {
    console.log(e);
    if (newInput.innerHTML == "") {
        lastAnsClick();
    };
    newInput.innerHTML = newInput.innerHTML + " / ";
};



const multipyButton = document.getElementById("multiply").addEventListener("click", () => {
    if (newInput.innerHTML == "") {
        lastAnsClick();
    };
    newInput.innerHTML = newInput.innerHTML + " * ";
});

const subtractButton = document.getElementById("subtract").addEventListener("click", () => {
    if (newInput.innerHTML == "") {
        lastAnsClick();
    };
    newInput.innerHTML = newInput.innerHTML + " - ";
});

const addButton = document.getElementById("add").addEventListener("click", () => {
    if (newInput.innerHTML == "") {
        lastAnsClick();
    };
    newInput.innerHTML = newInput.innerHTML + " + ";
});

const backButton = document.getElementById("backSpace").addEventListener("click", () => {
    //If last character was a space (i.e., an operator), remove last 3 characters,
    //Else, remove last one character.
    if (newInput.innerHTML.substr(newInput.innerHTML.length-1, 1) == " ") {
        newInput.innerHTML = newInput.innerHTML.substr(0, newInput.innerHTML.length-3);
    } else {
       newInput.innerHTML = newInput.innerHTML.substr(0, newInput.innerHTML.length-1); 
    }  
});

const ansButton = document.getElementById("lastAns").addEventListener("click", lastAnsClick);

function lastAnsClick() {
    if (oldResult1.innerHTML == "") {
        newInput.innerHTML = "0";
    } else {
    newInput.innerHTML = newInput.innerHTML + oldResult1.innerHTML;
    }
}

const lastEntry = document.getElementById("lastEntry").addEventListener("click", () => {
    newInput.innerHTML = oldInput1.innerHTML;
})

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
    console.log(floatModeCounter%5);
});





//Lines of code to display button pushes.
const zeroButton = document.getElementById("zero").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "0";
});

const sineButton = document.getElementById("sine").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "sin(";
});

const cosineButton = document.getElementById("cosine").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "cos(";
});

const tangentButton = document.getElementById("tangent").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "tan(";
});

const modeButton = document.getElementById("mode").addEventListener("click", () => {
    if (currentMode.innerHTML == "deg") {
        currentMode.innerHTML = "rad";
    } else {
        currentMode.innerHTML = "deg";
    };
});

const logButton = document.getElementById("log").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "log(";
});

const lnButton = document.getElementById("ln").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "ln(";
});

const eButton = document.getElementById("e").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "e";
});

const openParenButton = document.getElementById("openParen").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "(";
});

const closeParenButton = document.getElementById("closeParen").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + ")";
});

const sevenButton = document.getElementById("seven").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "7";
});

const eightButton = document.getElementById("eight").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "8";
});

const nineButton = document.getElementById("nine").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "9";
});

const fourButton = document.getElementById("four").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "4";
});

const fiveButton = document.getElementById("five").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "5";
});

const sixButton = document.getElementById("six").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "6";
});

const oneButton = document.getElementById("one").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "1";
});

const twoButton = document.getElementById("two").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "2";
});

const threeButton = document.getElementById("three").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "3";
});

const dotButton = document.getElementById("dot").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + ".";
});

const piButton = document.getElementById("pi").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + `&pi;`;
});




const allClear = document.getElementById("clear").addEventListener("click", () => {
    oldInput1.innerHTML = "";
    oldInput2.innerHTML = "";
    oldResult1.innerHTML = "";
    oldResult2.innerHTML = "";
    newInput.innerHTML = "";
    display_value = "0";
    //there's totes probs more to clear out, but I just don't know what they are yet.
});

