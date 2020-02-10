//Variables currentScore, roundScore, activePlayer
var scores, roundScore, activePlayer, diceImage, gamePlaying;
diceImage = document.getElementById('dice');
init();




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


//Click New Game button --> All scores go to 0

document.querySelector('.btn-new').addEventListener('click', init);

//Connect dice image to random dice variable

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;

    diceImage.src = 'dice-' + dice + '.png'; 
  
  
    //If dice amount equals 1, toggle active on other player and set currentScore back to 0
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('.current-' + activePlayer).textContent = roundScore;
    } else {
      //Connect dice amount to roundScore for each player
      toggleActivePlayer();
      zeroCurrentScore();
    }
  }
});

//Enable Hold function to make roundScore = currentScore

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
      // Add current score to global score***********
  scores[activePlayer] += roundScore;

  // Update the UI
  document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];

  zeroCurrentScore();
  

  // Check if player won the game
  if (scores[activePlayer] >= 100) {
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
  document.querySelector('.current-0').textContent = '0';
  document.querySelector('.current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.btn-new').style.backgroundColor = 'white';
  diceImage.style.display = 'block';

}