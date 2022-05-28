let userClickedPattern = [];
const gamePattern = [];
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let level = 0;
let started = false;

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
}

const clickedBtn = $('.btn').click(clickHandler);

function clickHandler() {
  const userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
  const audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 1000);
    $('#level-title').text('GAME OVER, Rress Any Key to Restart');
  }
}
