
const quizData = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
      answer: 1 
    },
    
  {
    question: "What is the correct way to write a comment in JavaScript?",
    choices: ["//This is a comment", "<!--This is a comment-->", "'This is a comment'"],
    answer: 0
  },
  {
    question: "Which symbol is used for single-line comments in CSS?",
    choices: ["#", "//", "//", "/* */", "// or /* */"],
    answer: 2
  },
  {
    question: "What is the purpose of 'git push' in Git?",
    choices: ["To upload changes to a remote repository", "To download changes from a remote repository", "To create a new branch", "To merge branches"],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
    answer: 0
  }
  ];
  
  const startButton = document.getElementById('start-btn');
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const timerElement = document.getElementById('time');
  const scoreForm = document.getElementById('score-form');
  const submitScoreBtn = document.getElementById('submit-score');
  const scoreDisplay = document.getElementById('final-score');
  
  let currentQuestionIndex = 0;
  let userScore = 0;
  let timeLeft = 60; 
  let timerInterval;

  function startQuiz() {
    startButton.style.display = 'none';
    displayQuestion();
    startTimer();
  }
  

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  choicesElement.classList.add('choices-container'); 

  currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.textContent = `${index + 1}. ${choice}`; 
      button.setAttribute('data-index', index);
      button.addEventListener('click', selectAnswer);

     
      button.style.display = 'block';
      button.style.width = 'auto';
      button.style.marginBottom = '10px';
      button.style.textAlign = 'left';
      button.style.padding = '8px 12px';
      button.style.backgroundColor = 'purple';
      button.style.color = 'white';
      button.style.border = 'none';

      choicesElement.appendChild(button);
  });
}



function selectAnswer(event) {
  const selectedChoice = event.target;
  const selectedIndex = parseInt(selectedChoice.getAttribute('data-index'));

  if (selectedIndex === quizData[currentQuestionIndex].answer) {
     
      const label = document.createElement('span');
      label.textContent = 'Right'; 
      label.style.color = 'black'; 
      label.style.marginLeft = '20px'; 
      choicesElement.appendChild(label);
      userScore++;
  } else {

      const label = document.createElement('span');
      label.textContent = 'Wrong'; 
      label.style.color = 'black'; 
      label.style.marginLeft = '20px'; 
      choicesElement.appendChild(label);
      timeLeft -= 10; 
  }


  const buttons = choicesElement.querySelectorAll('button');
  buttons.forEach(button => {
      button.removeEventListener('click', selectAnswer);
  });

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
      setTimeout(displayQuestion, 1000); 
  } else {
      setTimeout(endQuiz, 1000); 
  }
}

  
  

  
  
  
  
    function startTimer() {
    timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  

function styleButton(button) {
  button.style.display = 'block';
  button.style.width = 'auto';
  button.style.marginBottom = '10px';
  button.style.textAlign = 'left';
  button.style.padding = '8px 12px';
  button.style.backgroundColor = 'purple';
  button.style.color = 'white';
  button.style.border = 'none';
}



function endQuiz() {

    clearInterval(timerInterval);
  
    showFinalScore();
    document.getElementById('score-form').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
 
    const scoreDisplay = document.createElement('div');
  
    scoreDisplay.textContent = `All Done! Your final score is ${userScore}`; 
  
    document.getElementById('score-form').before(scoreDisplay);
  
  }
  

  function showFinalScore() {
    questionElement.textContent = `Your final score is: ${userScore}/${quizData.length}`;
    choicesElement.innerHTML = ""; 
  
    const timeRemaining = document.createElement('div');
    timeRemaining.textContent = `Time Remaining: ${timeLeft} seconds`;
    choicesElement.appendChild(timeRemaining);
  }

  

function showHighScores() {
 
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('timer').style.display = 'none';
  document.getElementById('score-form').style.display = 'none';


  const highScoresContainer = document.getElementById('high-scores-container');
  highScoresContainer.style.display = 'block';

  const highScoresList = document.getElementById('high-scores-list');
  highScoresList.innerHTML = ''; 
  const highScoresData = JSON.parse(localStorage.getItem('highScores')) || [];
  highScoresData.forEach((score, index) => {
    const scoreItem = document.createElement('button'); 
    scoreItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
    scoreItem.style.backgroundColor = 'purple'; 
    scoreItem.style.color = 'white'; 
    scoreItem.style.border = 'none'; 
    scoreItem.style.padding = '8px 12px'; 
    scoreItem.style.margin = '5px 0'; 
    scoreItem.style.cursor = 'pointer'; 
    scoreItem.style.display = 'block';
    scoreItem.addEventListener('click', () => {
     
      console.log(`Clicked on score ${index + 1}`);
    });
    highScoresList.appendChild(scoreItem);
  });


  const clearScoresBtn = document.getElementById('clear-scores');
  const goBackBtn = document.getElementById('go-back');
  clearScoresBtn.style.display = 'inline-block';
  goBackBtn.style.display = 'inline-block';
}

startButton.addEventListener('click', startQuiz);
styleButton(startButton)
submitScoreBtn.addEventListener('click', saveHighScore);
styleButton(submitScoreBtn)


function clearScores() {
    localStorage.removeItem('highScores');
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = '';
  

    document.getElementById('clear-scores').style.display = 'none';
    document.getElementById('go-back').style.display = 'none';
  }
  

function goBack() {
  
  currentQuestionIndex = 0;
  userScore = 0;
  timeLeft = 60;
  clearInterval(timerInterval);


  document.getElementById('timer').style.display = 'block';
  document.getElementById('question-container').style.display = 'none'; 
  document.getElementById('score-form').style.display = 'none'; 
  document.getElementById('high-scores-container').style.display = 'none'; 


  document.getElementById('start-btn').style.display = 'block';
  document.getElementById('time').textContent = timeLeft;
  document.getElementById('question').textContent = 'Coding Quiz';
}

document.getElementById('clear-scores').addEventListener('click', clearScores);


document.getElementById('go-back').addEventListener('click', goBack);



const goBackBtn = document.getElementById('go-back');
styleButton(goBackBtn);

const clearScoresBtn = document.getElementById('clear-scores');
styleButton(clearScoresBtn);
function saveHighScore(event) {
  event.preventDefault();
  const initials = document.getElementById('initials').value.trim();

  if (initials !== '') {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = {
      initials: initials,
      score: userScore
    };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    document.getElementById('score-form').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    showHighScores();


    document.scoreDisplay.textContent.style.display = 'none';
  } else {
    alert('Please enter your initials to submit the score.');
  }
}
