// Gathering HTML elements for manipulation.
var highscorelist = document.getElementById("highscorelist");
var timer = document.getElementById("timer");
var introbox = document.getElementById("introbox")
var introyes = document.getElementById("introbuttonyes");
var introno = document.getElementById("introbuttonno");
var results = document.getElementById("resultscontainer");
var resultsdisplay = document.getElementById("resultdisplay");
var divider = document.getElementById("divider");
var questionbox = document.getElementById("questionbox");
var quizquestion = document.getElementById("quizquestion");
var button0 = document.getElementById("btn0");
var button1 = document.getElementById("btn1");
var button2 = document.getElementById("btn2");
var button3 = document.getElementById("btn3");
var endquizbox = document.getElementById("endquizbox");
var endquiztext = document.getElementById("endquiztext");
var endquizyes = document.getElementById("endquizyes");
var endquizno = document.getElementById("endquizno");
var submitscorebox = document.getElementById("submitscorebox");
var submitbutton = document.getElementById("submit");
var highscorebox = document.getElementById("highscorebox");
var highscoreinputname = document.getElementById("name");
var highscorename = document.getElementById("highscorename");
var highscorescore = document.getElementById("highscorescore");
var footer = document.querySelector("footer");
var resetbutton = document.getElementById("reset");
var clearbutton = document.getElementById("clear");

//Quiz Question's Object Array - Contains the questions, choices, and correct answer. 
var Questionslist = [{
        question: "How many elements can you apply an 'ID' attribute to?",
        choiceA: "As many as you want",
        choiceB: "3",
        choiceC: "1",
        choiceD: "128",
        correctAnswer: "As many as you want"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choiceA: "< javascript>",
        choiceB: "<js>",
        choiceC: "<script>",
        choiceD: "<scripting>",
        correctAnswer: "<script>"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choiceA: "commas",
        choiceB: "curly brackets",
        choiceC: "quotes",
        choiceD: "parenthesis",
        correctAnswer: "quotes"
    },
    {
        question: "What does DOM stand for?",
        choiceA: "Document Object Model",
        choiceB: "Display Object Management",
        choiceC: "Digital Ordinance Model",
        choiceD: "Desktop Oriented Mode",
        correctAnswer: "Document Object Model"
    },
    {
        question: "What is used primarily to add styling to a web page?",
        choiceA: "HTML",
        choiceB: "CSS",
        choiceC: "Python",
        choiceD: "React.js",
        correctAnswer: "CSS"
    },
    {
        question: "How do you write 'Hello World' in an alert box ? ",
        choiceA: "alert('Hello World ')",
        choiceB: "msgBox('Hello World ')",
        choiceC: "alertBox='Hello World'",
        choiceD: "alertBox('Hello World ')",
        correctAnswer: "alert('Hello World ')"
    },

    {
        question: "What HTML tags are JavaScript code wrapped in?",
        choiceA: "&lt;div&gt;",
        choiceB: "&lt;link&gt;",
        choiceC: "&lt;head&gt;",
        choiceD: "&lt;script&gt;",
        correctAnswer: "&lt;script&gt;"
    },
    {
        question: "When is localStorage data cleared?",
        choiceA: "No expiration time",
        choiceB: "On page reload",
        choiceC: "On browser close",
        choiceD: "On computer restart",
        correctAnswer: "No expiration time"
    },
    {
        question: "What does WWW stand for?",
        choiceA: "Web World Workings",
        choiceB: "Weak Winter Wind",
        choiceC: "World Wide Web",
        choiceD: "Wendy Wants Waffles",
        correctAnswer: "World Wide Web"
    },
    {
        question: "What HTML attribute references an external JavaScript file?",
        choiceA: "href",
        choiceB: "src",
        choiceC: "class",
        choiceD: "index",
        correctAnswer: "src"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choiceA: "Javascript",
        choiceB: "terminal / bash",
        choiceC: "for loops",
        choiceD: "console log",
        correctAnswer: "console log"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choiceA: "numbers and strings",
        choiceB: "other arrays",
        choiceC: "booleans",
        choiceD: "all of the above",
        correctAnswer: "all of the above"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choiceA: "strings",
        choiceB: "booleans",
        choiceC: "alerts",
        choiceD: "numbers",
        correctAnswer: "alerts"
    },
];

var buttons_map = {
    "btn0": button0,
    "btn1": button1,
    "btn2": button2,
    "btn3": button3
};
// Other global variables
var finalQuestionIndex = Questionslist.length;
var currentQuestionIndex = 0;
var currentscore = 0;
var correct;
var timeLeft = 90;
var penalty = 15;
var timeractive = false;
var choice = "";

//Intro to quiz
intro();

//Starts the timer
function intro() {
    timeractive = false;
    introyes.addEventListener("click", startquiz);
    introno.addEventListener("click", studymore);
    resultsdisplay.textContent = "";
}

function startquiz() {
    footer.removeAttribute("style", "display:none");
    timeractive = true;
    quiz();
}

function studymore() {
    resultsdisplay.textContent = "Go study more Javascript...then come back!";
}

//Function that controls the timer
setInterval(function() {
    if (timeractive) {
        if (timeLeft > 1) {
            timer.textContent = '⏱ Time Left: ' + timeLeft + ' seconds remaining ';
            timeLeft -= 1;
            console.log(timeLeft)
        } else if (timeLeft === 1) {
            timer.textContent = '⏱ Time Left: ' + timeLeft + ' second remaining. FINISH UP!';
            timeLeft -= 1;
            console.log(timeLeft)
        } else {
            timer.textContent = '';
            Endquiz();
        }
    }
}, 1000);

// This function cycles through the object array containing the quiz questions to generate the current question.Also sets event listeners on each answer selection.
function quiz() {
    introbox.setAttribute("style", "display:none");
    questionbox.removeAttribute("style", "display:none");
    footer.removeAttribute("style", "display:none");
    results.removeAttribute("style", "display:none");
    if (currentQuestionIndex === finalQuestionIndex) {
        return Endquiz();
    }
    var currentQuestion = Questionslist[currentQuestionIndex];
    quizquestion.textContent = currentQuestion.question;
    button0.textContent = currentQuestion.choiceA;
    button1.textContent = currentQuestion.choiceB;
    button2.textContent = currentQuestion.choiceC;
    button3.textContent = currentQuestion.choiceD;

    button0.addEventListener("click", checkAnswer);
    button1.addEventListener("click", checkAnswer);
    button2.addEventListener("click", checkAnswer);
    button3.addEventListener("click", checkAnswer);
}


function checkAnswer(event) {
    choice = buttons_map[event.target.id];

    currentQuestion = Questionslist[currentQuestionIndex];
    console.log(currentQuestion);

    if (choice.textContent == currentQuestion.correctAnswer) {
        currentscore += 1;
        resultsdisplay.textContent = "That Was Correct!";

    } else {
        resultsdisplay.textContent = "That Was Incorrect! You lost 15 seconds of time!";
        timeLeft -= penalty;
    }
    currentQuestionIndex += 1;
    quiz();
}

// This function is the end page screen that displays your score after either completing the quiz or upon timer run out
function Endquiz() {
    timeractive = false;
    introbox.setAttribute("style", "display:none");
    questionbox.setAttribute("style", "display:none");
    submitscorebox.setAttribute("style", "display:none");
    footer.removeAttribute("style", "display:none");
    endquizbox.removeAttribute("style", "display:none");
    resultsdisplay.textContent = "";
    endquiztext.textContent = "You got a score of " + currentscore + "." +
        " Would you like to save your score ?";
    endquizyes.addEventListener("click", submitscore);
    endquizno.addEventListener("click", function() {
        resultsdisplay.textContent = "Thanks for playing! Have a great day!"
    });
}

// This function allows the user to submit their score along with their name
function submitscore() {
    timeractive = false;
    timer.setAttribute("style", "display:none");
    introbox.setAttribute("style", "display:none");
    questionbox.setAttribute("style", "display:none");
    endquizbox.setAttribute("style", "display:none");
    footer.removeAttribute("style", "display:none");
    submitscorebox.removeAttribute("style", "display:none");
    resultsdisplay.textContent = "";
    submit.addEventListener("click", submitfunction)
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local storage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
function submitfunction(event) {
    timeractive = false;
    event.preventDefault();
    timer.setAttribute("style", "display:none");
    introbox.setAttribute("style", "display:none");
    questionbox.setAttribute("style", "display:none");
    endquizbox.setAttribute("style", "display:none");
    footer.removeAttribute("style", "display:none");
    submitscorebox.removeAttribute("style", "display:none");
    resultsdisplay.textContent = "";
    if (highscoreinputname.value === "") {
        resultsdisplay.textContent = "Name cannot be blank";
    } else {
        resultsdisplay.textContent = "Name and score saved successfully! Click 🏆 View Top Scores 🏆 to go to a list of current top score holders and their individual top scores!";
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreinputname.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: currentscore
        };
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        gethighscores();

    }
}


// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local storage. 
// It's then pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
function gethighscores() {
    highscorename.innerHTML = "";
    highscorescore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        newNameSpan.textContent = " Name: " + highscores[i].name + ". Highscore: " + highscores[i].score
        highscorename.appendChild(newNameSpan);
    }
}


//Click event that resets the quiz
resetbutton.addEventListener("click", () => {
    timer_active = false;
    timeLeft = 90;
    currentQuestionIndex = 0;
    resetfunction();
});


//Click event that clears the highscore list
function clear() {
    window.localStorage.clear();
    highscorename.textContent = "";
    highscorescore.textContent = "";
}


//Function that returns users to quiz home page, resets the timer, and resets the current question
function resetfunction() {
    timer_active = false;
    highscorelist.removeAttribute("style", "display:none");
    timer.removeAttribute("style", "display:none");
    introbox.removeAttribute("style", "display:none");
    results.removeAttribute("style", "display:none");
    questionbox.setAttribute("style", "display:none");
    endquizbox.setAttribute("style", "display:none");
    submitscorebox.setAttribute("style", "display:none");
    highscorebox.setAttribute("style", "display:none");
    footer.setAttribute("style", "display:none");
    timer.textContent = "⏱ Time Left: 90 seconds";
    resultsdisplay.textContent = "";
    intro();
}

//Click event that takes users to highscore page 
highscorelist.addEventListener("click", () => {
    timer_active = false;
    timeLeft = 90;
    currentQuestionIndex = 0;
    highscorepage();
});

// This function displays the high scores page while hiding all of the other pages from view. 
function highscorepage() {
    highscorelist.setAttribute("style", "display:none");
    timer.setAttribute("style", "display:none");
    introbox.setAttribute("style", "display:none");
    questionbox.setAttribute("style", "display:none");
    endquizbox.setAttribute("style", "display:none");
    results.setAttribute("style", "display:none")
    submitscorebox.setAttribute("style", "display:none");
    highscorebox.removeAttribute("style", "display:none");
    footer.removeAttribute("style", "display:none")
    gethighscores()
    clearbutton.addEventListener("click", clear)
}