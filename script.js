`use strict`;
// Game Contants and variables
let level = 0;
let index = 0;
let currentScore = 0;
let highScore = 0;
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let button_audio;
let randomChosenColour;
let randomNumber;
let button;
let isGameOver = false;

//Detecting the keystroke form the user.
document.addEventListener('keydown', function () {
  if (level === 0) {
    isGameOver = false;
    currentScore = 0;
    nextSequence();
  }
});

// Generating Random Number between 0 and 3
// Generating new sequence once user has completed the current sequence
function nextSequence() {
  if (isGameOver === false) {
    randomNumber = Math.trunc(Math.random() * 4); //Generating the random number between 0 and 3 including 0 and 3
    console.log(randomNumber);
    userClickedPattern = [];
    index = 0;
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); //Pushing the random color to our array of Game Pattern
    level++;
    document.querySelector('#level-title').textContent = 'Level ' + level;

    $('#' + randomChosenColour) //Fade Out-In animation to the selected button by our computer
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour); //Calling play sound function
  }
}

// Playing Sound according to correct selected color or wrong selection.
function playSound(randomChosenColour) {
  button_audio = new Audio(randomChosenColour + '.mp3');
  button_audio.play();
}

//Adding Event Listener to all the 4 buttons and giving them animation effect using timeout function
for (let i = 0; i < 4; i++) {
  document.querySelectorAll('.btn')[i].addEventListener('click', function () {
    let user_choice = document.querySelectorAll('.btn')[i].id;
    playSound(user_choice);
    userClickedPattern.push(user_choice);
    $('#' + user_choice)
      .addClass('pressed')
      .delay(100);

    setTimeout(function () {
      // It is used to animate the button pressed by the user time delay is 100ms.
      $('#' + user_choice).removeClass('pressed');
    }, 100);
    checkAnswer();
  });
}

// Game Logic Checking if the pressed key is correct
function checkAnswer() {
  if (
    userClickedPattern[index] === gamePattern[index] &&
    isGameOver === false
  ) {
    index++;
    scoreIncrement();
  } else {
    gameOver();
  }
  if (index === gamePattern.length && isGameOver === false) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

// Game Over -> When wrong key is pressed

function gameOver() {
  isGameOver = true;
  playSound('wrong');

  document.querySelector('body').classList.add('game-over');
  setTimeout(function () {
    document.querySelector('body').classList.remove('game-over');
  }, 300);
  document.querySelector('#level-title').textContent =
    'Game Over, Press Any Key to Restart';
  startAgain();
}

// Score Incrementing Function
function scoreIncrement() {
  currentScore++;
  document.querySelector('.current-score').textContent =
    'Score:' + currentScore;
}

// Start Again -> Start the game once again
function startAgain() {
  level = 0;
  index = 0;
  gamePattern = [];
  if (currentScore > highScore) {
    highScore = currentScore;
    currentScore = 0;
    document.querySelector('.current-score').textContent =
      'Score:' + currentScore;
    document.querySelector('.high-score').textContent =
      'Highscore:' + highScore;
  }
}
