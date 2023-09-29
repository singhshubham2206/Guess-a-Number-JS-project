let randomNumber = parseInt(Math.random() * 100 + 1);    //   gernerate random numbers (+1 will help to not come 0 value ever)

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;


// we add an eventlistener on submit btn when clicked and pass a number
// which is stored in variable guess with the help of anonymous function 
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();      // it prevent to pass any default value
        const guess = parseInt(userInput.value)   // it takes an user input 
        console.log(guess);
        validateGuess(guess);
    })
}


// validate no is btween 1 to 100 or not 
function validateGuess(guess) {
    if (isNaN(guess)) {    //isNaN function is used to check if a given value is "Not-a-Number" (NaN) or not
        alert('PLease enter a valid number');
    }
    else if (guess < 1) {
        alert('PLease enter a number more than 1');
    }
    else if (guess > 100) {
        alert('PLease enter a  number less than 100');
    }
    else {
        prevGuess.push(guess);    // push the number in array prevGuess
        if (numGuess === 11) {    // this will conut the no of total guesses 
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {     // it will tell youe guessed or not 
    if(guess === randomNumber){
        displayMessage(`You Guessed right`);
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`Number is big`);
    }    
    else if(guess > randomNumber){
        displayMessage(`Number is small`);
    }    
}

function displayGuess(guess) {    // update the vaue , array , remaining 
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;    // push the guess in array and will show it
    numGuess++;
    remaining.innerHTML = `${11 - numGuess} `;    //show the remaining guesses
}

function displayMessage(message) {    // just print the passed mess
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = ''
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = '<button id="newGame"> Start new game</button>';
    startOver.appendChild(p);
    playGame=false;
    newGame();
}


// it will reset all the values to start the game again from zero
function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);

        playGame = true;
    });    
}



