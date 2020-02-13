/* If two 6's are rolled in a row, player loses entire score

*/

//Variables currentScore, roundScore, activePlayer
var scores, roundScore, activePlayer, diceImage, gamePlaying;
diceImage = document.getElementById('dice');

init();

var lastScore;

// Function for toggling the active player
function toggleActivePlayer() {
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
}

// Function for setting Current Score to 0 
function zeroCurrentScore() {
  document.querySelector('.current-0').textContent = '0';
  document.querySelector('.current-1').textContent = '0';
}

//******* ON NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);

//******* ON BUTTON ROLL
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    diceImage.style.display = 'block';
    diceImage.src = 'dice-' + dice + '.png'; 
  
    if (dice === 6 && lastScore === 6) {
      scores[activePlayer] = 0;
      document.querySelector('.score-' + activePlayer).textContent = '0';
      document.querySelector('.current-' + activePlayer).textContent = '0';
      toggleActivePlayer();
    } else if (dice !== 1) {
      roundScore += dice;
      document.querySelector('.current-' + activePlayer).textContent = roundScore;
    } else {
      toggleActivePlayer();
      zeroCurrentScore();
    }
  }
  lastScore = dice;
});

//******* ON BUTTON HOLD
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
  // Add current score to global score
  scores[activePlayer] += roundScore;

  // Update the UI to show global score
  document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];
  zeroCurrentScore();

  // Check if player won the game
  var input = document.getElementById('input').value;
  var winningScore;

  input === '' ? winningScore = 100 : winningScore = input;
  console.log('Winning score: ' + winningScore);

  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    diceImage.style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    
    document.querySelector('.btn-new').style.backgroundColor = 'lightgreen';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    toggleActivePlayer();
    }
  }
});

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.score-0').textContent = '0';
  document.querySelector('.score-1').textContent = '0';
  zeroCurrentScore();
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.btn-new').style.backgroundColor = 'white';
  diceImage.style.display = 'none';
}