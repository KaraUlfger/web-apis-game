var quiz = [
    {
        question: "what planet are you on?",
        options: ["Earth", "Venus", "Mars", "Pluto"],
        answer: "1"
    }
]
var questionSelect = document.getElementById("question")
var answerSelect = document.getElementById("answerList")

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
});



// After timer starts, various questions from ARRAY to answer from multiple choice ARRAY
function showQuiz(index) {
    answerList.innerHTML ='';
    questionSelect.textcontent = quiz[index].fill;
    for (var i = 0; i < quiz[index].options.length; i++) {
        var fill =document.createElement("li");
        var button =document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("id", i);
        button.textContent =quiz[index].options[i];
        fill.appendChild(button);
        answerSelect.appendChild(fill);
    }
}
// if correct answer=move on to next question. Else if incorrect answers subtract from timer and move onto next question
// if all questions answered = game ends, add up score, else if time runs out = game ends, add up score
// game over, adds up score, and user inputs initals to be saved in "Score Section"

