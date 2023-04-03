var quiz = [
  {
    question: "What planet are you on?",
    options: ["Earth", "Venus", "Mars", "Pluto"],
    answer: "Earth"
  },
  {
    question: "When is lunch?",
    options: ["Midnight", "Morning", "Noon", "Evening"],
    answer: "Noon"
  }
];

var questionSelect = document.getElementById("question");
var answerSelect = document.getElementById("answerList");
var scoreCard = document.getElementById("score");
var buttonStart = document.getElementById("start");
var submitButton = document.createElement("button");
var nameInsert = document.getElementById("nameInput");
var input = document.getElementById("input");
var countDown = document.getElementById('countDown');
var names = document.getElementById('names');
var nameList = JSON.parse(localStorage.getItem("Name")) || [];

var seconds;
var timer;
var score = 0;

// Hide start button and show quiz when clicked
function hideButton() {
  buttonStart.style.display = "none";
  showQuiz(0);
}

buttonStart.addEventListener("click", hideButton, false);

// After timer starts, various questions from ARRAY to answer from multiple choice ARRAY
// if correct answer=move on to next question. Else if incorrect answers subtract from timer and move onto next question
function showQuiz(index) {
  answerSelect.innerHTML = "";
  questionSelect.textContent = quiz[index].question;
  for (var i = 0; i < quiz[index].options.length; i++) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", i);
    button.textContent = quiz[index].options[i];
    li.appendChild(button);
    answerSelect.appendChild(li);
    button.addEventListener("click", function () {
      if (this.textContent === quiz[index].answer) {
        score += 10;
        console.log("Correct!");
      } else {
        seconds -= 10;
        console.log("Incorrect!");
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

// Click start button and timer starts for quiz
buttonStart.addEventListener("click", function () {
  seconds = 60;
  timer = setInterval(function () {
    seconds--;
    document.getElementById("countDown").innerText = "Time: " + seconds;
    if (seconds === 0) {
      clearInterval(timer);
      scorePage();
    }
  }, 1000);
});

// Show the score page when the quiz is done
function scorePage() {
  answerSelect.innerHTML = "";
  questionSelect.textContent = "Quiz Complete!";
  const p = document.createElement("p");
  p.textContent = `Score: ${score}`;
  answerSelect.appendChild(p);
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  nameInsert.appendChild(input);
  submitButton.setAttribute("type", "button");
  submitButton.textContent = "Submit";
  nameInsert.appendChild(submitButton);
  submitButton.addEventListener("click", function () {
    var name = input.value;
    if (name) {
      nameList.push({ name: name, score: score });
      localStorage.setItem("Name", JSON.stringify(nameList));
      console.log(`${name} scored ${score} points`);
      highScore();
    } else {
      alert("Please enter your name.");
    }
  });
}
  
function highScore() {
  questionSelect.style.display='none';
  countDown.style.display='none';
  var displayScore =document.getElementById('high')
  displayScore.style.display='block';
  nameInsert.innerHTML = "";
  answerSelect.innerHTML = "";
  names.innerHTML = ""; 
  
  var sortedList = nameList.sort((a, b) => b.score - a.score);
  
  sortedList.forEach((item) => {
    var li = document.createElement("li");
    li.textContent = `${item.name} - ${item.score}`;
    names.appendChild(li); 
    restart();
  });
}

var restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function() {
  location.reload();
});

function restart() {
  var replayButton = document.createElement('button');
  replayButton.setAttribute('type', 'button');
  replayButton.textContent = 'Replay';
  
  var restartButton = document.getElementById('restart');
  restartButton.innerHTML = '';
  restartButton.appendChild(replayButton);
  restartButton.style.display = "block";
}
