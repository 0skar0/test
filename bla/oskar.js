
/* jshint esversion: 6 */
/*
let canvas = document.getElementById("canvas");
let parent = document.getElementById("container");
let ctx = canvas.getContext("2d");
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
*/



//Användaren måste klicka på start the game då läggs eventlyssnarna på.
document.querySelector(".startButton").addEventListener("click", addListeners);

var card = document.getElementsByClassName("card");
var cards = [...card];

function addListeners() {
  startGame();
  for (var i = 0; i < cards.length; i++){
      card = cards[i];
      card.addEventListener("click", revealCard);
      card.addEventListener("click", cardOpen);
      card.addEventListener("click", winner);
  }
}


// Kolla vilket item användaren valt. Fördel om hen valt "kniv (0)".

if (userChoice === 0) {
  var advantage = document.querySelector(".deathCard");
  advantage.classList.add("disabled", "open", "match");
}

//Ser vilka dom öppnade korten är
var openedCards = [];

//Råkar man klicka på detta kort får man en nackdel...
var deathCard = document.querySelector(".deathCard");

//antal försök
var moves = [];
var moveCounter = document.querySelector(".moves");

//poängräknare
var score = [];
var scoreCounter = document.querySelector(".score");

var total = [];

//Ett objekt till någonting
var myObject = {
  tries: 7,
  win: 4,
};

document.querySelector(".numberOfMoves").innerHTML = Object.values(myObject)[0];
document.querySelector(".winningPoints").innerHTML = Object.values(myObject)[1];


//vilka kort matchar
var matchedCard = document.getElementsByClassName("match");

const deck = document.getElementById("container");

for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", revealCard);
}


//blanda om korten
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


function startGame(){
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
}

var revealCard = function () {
this.classList.add("open");
this.classList.add("show");
this.classList.add("disabled");
};


// Kolla om korten matchar och om "deathCard" öppnats.
function cardOpen() {
  openedCards.push(this);
  if (openedCards[0] == deathCard || openedCards[1] == deathCard) {
    var badCard = document.querySelector(".deathCard");
    badCard.classList.add("open", "disabled", "match");
    moves.push(1);
  }
  openedCards[0].classList.add("disabled");
  var length = openedCards.length;
  if (length === 2) {
    moveFunction();
    if (openedCards[0].dataset.name === openedCards[1].dataset.name) {
      scoreFunction();
      matched();
    } else {
      unmatched();
    }
  }
}


//Om korten matchar
function matched() {
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}

//Om korten inte matchar
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "unmatched");
    openedCards[1].classList.remove("show", "open", "unmatched");
    enable();
    openedCards = [];
  },1000);
}

//avvaktiverar korten tillfälligt
function disable() {
  Array.prototype.filter.call(cards, function(card){
    card.classList.add("disabled");
  });
}

//aktiverar kort som inte matchar och avvaktiverar kort som matchar.
function enable() {
  Array.prototype.filter.call(cards, function(card){
       card.classList.remove("disabled");
       for(var i = 0; i < matchedCard.length; i++){
         matchedCard[i].classList.add("disabled");
       }
   });
}

function moveFunction() {
  moves.push([1]);
  console.log(moves);
  moveCounter.innerHTML = "Antal försök: " + moves.length;
  if (moves.length >= 7) {
    removeListeners();
    tryAgain();
  }
}


function scoreFunction() {
  score.unshift(1);
  scoreCounter.innerHTML = "Poäng: " + score.length;
  if (score.length == 4) {
    var test = moves.length;
    switch (test) {
      case 4:
      case 5:
      case 6:
      case 7:
        console.log("Awesome!");
        break;
      case 8:
      case 9:
      case 10:
        console.log("Okej!");
        break;
      case 11:
      case 12:
      case 13:
        console.log("Njaaa..");
        break;
      default:
        console.log("kass");
    }
  }
}

function winner() {
  if (matchedCard.length >= 8) {
    removeListeners();
    var button = document.createElement("BUTTON");
    button.setAttribute("class", "finalButton");
    var buttonText = document.createTextNode("Move on!");
    button.appendChild(buttonText);
    document.body.appendChild(button);
    document.querySelector(".finalButton").addEventListener("click", function(){
      location.href="http://www.facebook.com";
    });

  }
}

function tryAgain() {
  var button = document.createElement("BUTTON");
  button.setAttribute("class", "finalButton");
  var buttonText = document.createTextNode("Try Again!");
  button.appendChild(buttonText);
  document.body.appendChild(button);
  document.querySelector(".finalButton").addEventListener("click", function(){
    location.href="/Users/oskarolsson/Documents/EC_Utbildning/javascript/grupparbete/memory/memory.html";
  });
}

function removeListeners() {

  for (var i = 0; i < cards.length; i++){
      card = cards[i];
      card.removeEventListener("click", revealCard);
      card.removeEventListener("click", cardOpen);
      card.removeEventListener("click", winner);
      card.classList.add("open", "disabled", "match");
  }
}








// END
