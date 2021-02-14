let settingsObject = {};

let numbers;
let operations = [];
let problemHistory = [];
let currentProblem = null;
let play = false;
let problemCounter;

//Sets up the mental math game to be usable
function initialize()
{
    play = true;
    operations = [];
    problemCounter = 0;

    numbers = new Numbers(settingsObject["num-range-low"], settingsObject["num-range-high"]);

    if (settingsObject["addition"])
    {
        operations.push("+");
    }
    if (settingsObject["subtraction"])
    {
        operations.push("-");
    }
    if (settingsObject["multiplication"])
    {
        operations.push("*");
    }
    if (settingsObject["division"])
    {
        operations.push("/");
    }
    if(settingsObject["square"])
    {
        operations.push("s");
    }
    if(settingsObject["square-root"])
    {
        operations.push("r");
    }

    createNewProblem();
}

function endGame()
{
    play = false;
    $("#game").hide();
    $("#report").show();

    let averageTime = 0;
    let totalCorrect = 0;
    for (const problem of problemHistory)
    {
        let correct;
        if (problem.solution == problem.answer) 
        {
            correct = "correct";
            totalCorrect++;
        }else{
            correct = "incorrect";
        }
        averageTime += parseFloat(problem.time);

        let reportString = "<div class='report " + correct + "'>"
        + "<p>Problem: " + problem.problem + "</p>"
        + "<p>Solution: " + problem.solution + "</p>"
        + "<p>Your Answer: " + problem.answer + "</p>"
        + "<div>Time Elapsed: " + problem.time + "s</div>"
        + "</div>";
        let $report = $(reportString).appendTo("#reports-container");
    }


    averageTime = (averageTime / problemHistory.length).toFixed(1);
    let percentCorrect = ((totalCorrect / problemHistory.length) * 100).toFixed(1);
    $("#report-time").text("Average time: " + averageTime + "s");
    $("#report-correct").text(percentCorrect + "% Correct")
}

function reset()
{
    $("#settings").show();
    $("#report").hide();
    $(".report").remove();
    problemHistory = [];
}

//Creates a new random math problem to solve
function createNewProblem()
{
    let leftOperand = randint(numbers.low, numbers.high);
    let rightOperand = randint(numbers.low, numbers.high);
    let operation = operations[randint(0, operations.length)];

    problemCounter++;
    if (problemCounter <= settingsObject["num-problems"])
    {
        currentProblem = new Problem(leftOperand, rightOperand, operation);
        $("#expression").html(currentProblem.problem);
    }else{
        endGame();
    }
}

//Fires when the user presses enter
//Submits their solution
function submitSolution()
{
    const mathIn = $("#math-in");
    currentProblem.time = (currentProblem.time / 1000.0).toFixed(1);
    currentProblem.answer = mathIn.val();
    problemHistory.push(currentProblem);
    mathIn.val("");
    createNewProblem();
}

function randint(low, high)
{
    return Math.floor(Math.random() * (high - low)) + low;
}

function Problem (lOperand, rOperand, operation)
{
    //These 3 operations work differently
    if (operation != "/" && operation != "s" && operation != "r")
    {
        this.problem = lOperand + " " + operation + " " + rOperand;
    }else
    {
        if (operation == "s")
        {
            this.problem = lOperand + "^2";
        }else if (operation == "r"){
            this.problem = "\&#x221a;" + (lOperand * lOperand);
        }else
        {
            this.problem = (lOperand * rOperand) + " " + operation + " " + rOperand; 
        }
    }
    this.solution = evaluate(lOperand, rOperand, operation);
    this.answer = null;
    this.time = 0;
    this.startTime = Date.now();
}

//Evaluates a mathematical expression
function evaluate(lOperand, rOperand, operation)
{
    if (operation == "+")
    {
        return lOperand + rOperand;
    }else if (operation == "-")
    {
        return lOperand - rOperand;
    }else if (operation == "*")
    {
        return lOperand * rOperand;
    }else if (operation == "/"){
        return lOperand;
    }else if (operation == "s")
    {
        return lOperand * lOperand;
    }else
    {
        //Square roots have to be positive
        //I'm not going to get imaginary numbers involved
        return Math.abs(lOperand);
    }
}

function Numbers(low, high)
{
    this.low = low;
    this.high = high;
}

$("html").keydown(function (key)
{
    if (play) {
        if (key.which == 13) {
            submitSolution();
        }else {
            /*
            Logging the time after each keystroke that isn't the enter key gives
            a more accurate picture of how long the problem took you to solve,
            since the milliseconds it takes to hit the enter key are shaved off.
            */
            currentProblem.time = Date.now() - currentProblem.startTime;
        }
    }
});

$("#reset-button").click(reset);