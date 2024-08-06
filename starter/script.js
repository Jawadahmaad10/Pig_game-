'use strict';

//Both works same for ids but queryElementById is suitable

//Selecting elements
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Starting condition 



//variable for storing data 
let scores, currentScore, activePlayer, playing;

const init = function(){
  
 
   scores = [0,0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0 ;
  current1El.textContent = 0 ;

  diceEl.classList.add('hidden');
  player0E1.classList.remove('player--winner');
  player1E1.classList.remove('player--winner');
  player0E1.classList.add('player--active');
  player1E1.classList.remove('player--winner');
   
};

init();


const switchPlayer = function(){
   //switch to next player
   document.getElementById(`current--${activePlayer}`).textContent = 0 ;
   activePlayer = activePlayer === 0 ? 1 : 0 ;
   player0E1.classList.toggle('player--active');
   player1E1.classList.toggle('player--active');
}

// 1.Rolling dice functionality
btnRoll.addEventListener('click' , function(){

  if(playing){
  //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 ) + 1;

  //2. Display dice
   diceEl.classList.remove('hidden');
   diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1: If true , switch to next player
    
  if(dice !== 1){
    //Add dice to current score
  //   currentScore = currentScore + dice;
   currentScore += dice;
   document.getElementById(`current--${activePlayer}`).textContent = currentScore;

  //  current0El.textContent = currentScore; // Change later
}  
  else{
   switchPlayer();
  }
}
}
);


//2.Holding button functionality

btnHold.addEventListener('click',function(){
   if(playing){
  //1.Add current score to active player's score
   scores[activePlayer] += currentScore;
   //score[1] = scores[1] + currentScore;
   document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer] ;
   

  //2. Check if player's score is >= 100
  if(scores[activePlayer] >= 20){
   //Finish the game
   playing = false;

   diceEl.classList.remove('hidden');

   document.querySelector(`p.layer--${activePlayer}`).classList.add('player--winner');
   
   document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  }
  

  else{
  //switch to the next player 
   switchPlayer();
  }
   }
}
);


btnNew.addEventListener('click',init);