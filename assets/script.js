var quiz = [
    {
        question: "what planet are you on?",
        options: ["Earth", "Venus", "Mars", "Pluto"],
        answer: "Earth"
    },
    {
        question: "when is lunch?",
        options: ["Midnight", "Morning", "Noon", "Evening"],
        answer: "Noon"
    }
];

var questionSelect = document.getElementById("question");
var answerSelect = document.getElementById("answerList");
var scoreCard = document.getElementById('score')
var seconds;
var timer;
var score = 0;

// Click start button and timer starts for quiz
document.getElementById("start").addEventListener('click', function() {
    seconds = 60;
    timer = setInterval(function() {
        seconds--;
        document.getElementById("countDown").innerText = "Time: " + seconds;
        if (seconds === 0) {
            clearInterval(timer);
            scorePage();
        }
    }, 1000);
    showQuiz(0);


    var buttonHide = document.getElementById('show_button')
    buttonHide.addEventListener('click',hideshow,false);

    function hideshow() {
        document.getElementById('hidden-div').style.display = 'block'; 
        this.style.display = 'none'
    };

// After timer starts, various questions from ARRAY to answer from multiple choice ARRAY
// if correct answer=move on to next question. Else if incorrect answers subtract from timer and move onto next question
function showQuiz(index) {
    answerSelect.innerHTML = '';
    questionSelect.textContent = quiz[index].question;
    for (var i = 0; i < quiz[index].options.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("id", i);
        button.textContent = quiz[index].options[i];
        li.appendChild(button);
        answerSelect.appendChild(li);
        button.addEventListener('click', function() {
            if (this.textContent === quiz[index].answer) {
                score += 10;
                console.log('Correct!');
            } else {
                seconds -= 10;
                console.log('Incorrect!');
            }
            if (index < quiz.length - 1) {
                showQuiz(index + 1);
            } else {
                clearInterval(timer);
                scorePage();
            }
        });
    }
}

// Show the score page when the quiz is done
function scorePage() {
    answerSelect.innerHTML = '';
    questionSelect.textContent = "Quiz Complete!";
    var p = document.createElement("p");
    p.textContent = "Score: " + score;
    answerSelect.appendChild(p);
}



// if all questions answered = game ends, add up score, else if time runs out = game ends, add up score
    

    

// game over, adds up score, and user inputs initals to be saved in "Score Section"
})
