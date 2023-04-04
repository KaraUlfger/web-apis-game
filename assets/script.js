var quiz = [
  {
    question: "What type of galaxy is the most common in the universe?",
    options: ["Elliptical", "Pinwheel", "Spiral", "Peculiar"],
    answer: "Elliptical"
  },
  {
    question: "Himilia moons can be found orbiting which planet?",
    options: ["Mars", "Saturn", "Neptune", "Jupiter"],
    answer: "Jupiter"
  },
  {
    question: "Which NASA space flight was the last manned mission to the moon?",
    options: ["Apollo 11", "Apollo 17", "Apollo 16", "Apollo 19"],
    answer: "Apollo 17"
  },
  {
    question: "What percent of the universe is dark matter?",
    options: ["27", "18", "56", "2"],
    answer: "27"
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Pluto", "Mercury", "Mars", "Venus"],
    answer: "Mercury"
  },
  {
    question: "What is the longest continuous time a human has spent in space?",
    options: ["207 days", "678 days", "437 days", "187 days"],
    answer: "437 days"
  },
  {
    question: "What is the most common type of star found in the Milky Way?",
    options: ["Red Dwarf", "Yellow", "Red Giant", "Neutron"],
    answer: "Red Dwarf"
  },
  {
    question: "How many moons are in our Solar System? ",
    options: ["127", "181", "216", "268"],
    answer: "181"
  },
  {
    question: "What is the closest star to the Sun?",
    options: ["Kepler 1489", "Gliese", "Proxima Centauri", "Sirius"],
    answer: "Proxima Centauri"
  },
  {
    question: "What is the diameter of the Earth’s moon?",
    options: ["2798 miles", "1814 miles", "5654 miles", "2159 miles"],
    answer: "2759 miles"
  },
  {
    question: "Which metal is found in high concentrations in asteroids?",
    options: ["Iridium", "Indium", "Ezzo", "Iron"],
    answer: "Iridium"
  },
  {
    question: "Who was the last person to walk on the moon?",
    options: ["John Young", "Gene Cernan", "Buzz Aldrin", "Yuri Gagarin"],
    answer: "Gene Cernan"
  },
  {
    question: "Which astronomer was noted for his formulating of the three laws of planetary motion?",
    options: ["Galileo", "Brahe", "Kepler", "Copernicus"],
    answer: "Kepler"
  },
  {
    question: "What is the name of the black hole thought to exist at the center of the Milky Way?",
    options: ["Taurus A", "Cancer A", "Leo A", "Sagittarius A"],
    answer: "Sagittarius A"
  },
  {
    question: "Mariner 4 was the first ship to flyby which planet?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "A spherical group of stars bound together by gravity is known as a what kind of cluster?",
    options: ["Structural", "Hormonal", "Globular", "Molecular"],
    answer: "Globular"
  },
  {
    question: "The Crab Nebula, first seen in 1952, is located in which constellation?",
    options: ["Cassiopeia", "Capricorn", "Orion", "Taurus"],
    answer: "Taurus"
  },
  {
    question: "In terms of composition, what is the second most prominent element on Mercury?",
    options: ["Sodium", "Hydrogen", "Nitrogen", "Carbon"],
    answer: "Sodium"
  },
  {
    question: "What does the Russian word Sputnik mean?",
    options: ["Post box", "Travelling companion", "ravel guide,", "Time friend"],
    answer: "Travelling companion"
  },
  {
    question: "Which of these moons of Jupiter is the largest?",
    options: ["Io", "Europa", "Ganymede", "Callisto"],
    answer: "Ganymede"
  },
  {
    question: "What shop is not found on the Citidal?",
    options: ["Rodam Expeditions", "Sirta Foundation", "5Saronis Applications", "Serrice Technology"],
    answer: "Serrice Technology"
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
var usedQuestions = [];

function showQuiz() {
  answerSelect.innerHTML = "";
  
  // Find an unused question
  var index;
  do {
    index = Math.floor(Math.random() * quiz.length);
  } while (usedQuestions.includes(index));
  
  // Store the index of the question that is about to be displayed
  usedQuestions.push(index);
  
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
          seconds += 10; 
        } else {
          seconds -= 10;
          console.log("Incorrect!");
        }
        if (seconds <= 0) {
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
    countDown.innerText = "Time: " + seconds;
    if (seconds <= 0) {
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
      console.log(name + " scored " + score + " points");
      highScore();
    } else {
      alert("Please enter your name.");
    }
  });
}
  
function highScore() {
    questionSelect.style.display = 'none';
    countDown.style.display = 'none';
    var displayScore = document.getElementById('high');
    displayScore.style.display = 'block';
    nameInsert.innerHTML = '';
    answerSelect.innerHTML = '';
    names.innerHTML = '';
    
    var sortedList = nameList.sort(function(a, b) {
      return b.score - a.score;
    });
    var slicedList = sortedList.slice(0, 10);
    
    slicedList.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = item.name + ' | ' + item.score;
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

