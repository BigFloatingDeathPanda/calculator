console.log("hello");

//This set of lines gathers the display IDs and stores them for later use.
let display_value = "0";
let newInput = document.getElementById("newInput");
let oldResult1 = document.getElementById("oldResult1");
let oldInput1 = document.getElementById("oldInput1");
let oldResult2 = document.getElementById("oldResult2");
let oldInput2 = document.getElementById("oldInput2");
let currentMode = document.getElementById("degrad");

//setting some constant values here:
const piNum = 3.1415926;
const eNum = 2.7182818;



const equalsButton = document.getElementById("equals").addEventListener("click", () => {
    oldInput2.innerHTML = oldInput1.innerHTML; //moving results up here
    oldInput1.innerHTML = newInput.innerHTML;
    oldResult2.innerHTML = oldResult1.innerHTML + "B";
    oldResult1.innerHTML = "the answer ";
    //oldResult1 actually displays the current results.  Sort of a misnomer really.
    //Not a big deal.  Just deal with it.
    //I have a feeling that this button in particular is going to be a PITA
    //so it's separated from the rest so I can work on it up here.  Well, really, you got it... you just need to figure out how to calculat things.  Start basic, my man.



    newInput.innerHTML = ""; //clear new line for fresh calculatiions.
    

});


const operate = function(operator, a, b) {



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

const powerButton = document.getElementById("power").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "^";
});

const openParenButton = document.getElementById("openParen").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "(";
});

const closeParenButton = document.getElementById("closeParen").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + ")";
});

const divideButton = document.getElementById("divide").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "/";
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

const multipyButton = document.getElementById("multiply").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "*";
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

const subtractButton = document.getElementById("subtract").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "-";
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

const addButton = document.getElementById("add").addEventListener("click", () => {
    newInput.innerHTML = newInput.innerHTML + "+";
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

