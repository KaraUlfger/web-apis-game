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

// Click start button and timer starts for quiz
document.getElementById("start").addEventListener('click', function() {
    var seconds = 60;
    var timer = setInterval(function() {
      seconds--;
      document.getElementById("countDown").innerText = "Time: " + seconds;
      if (seconds === 0) {
        clearInterval(timer); 
      }
    }, 1000);
    showQuiz(0);
});

// After timer starts, various questions from ARRAY to answer from multiple choice ARRAY
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
                console.log('Correct!');
            } else {
                (seconds -10);
                console.log('Incorrect!');
            }
            if (index < quiz.length - 1) {
                showQuiz(index + 1);
            } else {
                console.log('Done');
            }
        });
    }
}
// if correct answer=move on to next question. Else if incorrect answers subtract from timer and move onto next question
// if all questions answered = game ends, add up score, else if time runs out = game ends, add up score
// game over, adds up score, and user inputs initals to be saved in "Score Section"

