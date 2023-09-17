//initialization
var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector(".timer-count");
var wordBlank = document.querySelector(".word-blanks");

var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];


var wins = document.querySelector(".win");
var losses = document.querySelector(".lose");

var guessWord;
var placeholder;
var timeLeft;
var timeInterval;

var winCount = 0;
var loseCount = 0;
var resetButton = document.querySelector(".reset-button");


//add listeners to buttons
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScore);

//Initialize scores if the game was played previously
init();
function init() {
    if (localStorage.hasOwnProperty("winCount")) {
        winCount = localStorage.getItem("winCount");
        wins.textContent = winCount;
    }
    if (localStorage.hasOwnProperty("loseCount")) {
        loseCount = localStorage.getItem("loseCount");
        losses.textContent = loseCount;
    }
}

//handles start game click
function startGame() {
    guessWord = generateRandomWord(words); //get a random word from word list
    placeholder = "_".repeat(guessWord.length); //generate placeholder with "_"s
    //console.log(guessWord);
    //console.log(placeholder);

    wordBlank.textContent = placeholder.split("").join(" ");
    document.addEventListener("keydown", keydownAction);
    startTimer();
}

//Helper function to generate random word
function generateRandomWord(words) {
    var randomElement = words[Math.floor(Math.random()*(words.length))]
    //console.log(randomElement);
    return randomElement;
}

//Count down time function
function startTimer() {
    timeLeft = 10;
    timeInterval = setInterval(function () {

        timerDisplay.textContent = timeLeft;

        if (timeLeft > 0) {
            timeLeft--;
        }
        else {
            // Stops execution of action at set interval
            clearInterval(timeInterval);
            // Calls function 
            wordBlank.textContent = displayResult(checkWin());
        }

    }, 1000);

}

//Update and display score records
function displayResult(wonORLost) {
    if (wonORLost) {
        winCount++;
        wins.textContent = winCount;
        localStorage.setItem("winCount", winCount);
        return "YOU WON!🏆"
    }
    else {
        loseCount++;
        losses.textContent = loseCount;
        localStorage.setItem("loseCount", loseCount);
        return "GAME OVER";
    }
}

//handles reset score button click event
function resetScore() {
    winCount = 0;
    wins.textContent = winCount;
    localStorage.setItem("winCount", winCount);
    loseCount = 0;
    losses.textContent = loseCount;
    localStorage.setItem("loseCount", loseCount);
}

//handles user key entry during game
function keydownAction(event) {
    var keyPress = event.key;

    compareLetters(keyPress);

    return keyPress;
}

//A function for checking whether the letter key pressed by the user is in the answer
function compareLetters(keyPress){
    //create a regex for the key character pressed eg. /s/ig
    var regexKey = new RegExp(keyPress, "ig");
    //console.log(guessWord.search(regexKey));
    //console.log("regex key " + regexKey);

    //get a list of the character (pressed key) found in the guessword
    var matches = [...guessWord.matchAll(regexKey)];
    //convert the list of char matches into a list their respective index position in the guess word
    //eg. if the guess word "variable" contains 2 a's, then var indices is a list of the position 
    //of the char 'a' in the guess word [1,4]
    var indices = matches.map(match => match.index);
    //console.log("indexes " + indexes);

    //check if the indices list has values in it
    if (Array.isArray(indices) && indices.length) {
        indices.forEach(element => {
            //console.log("placeholder element " + placeholder[element]);
            //console.log("guessword element " + guessWord[element])

            //Break the placeholder into a list of "_" and then use
            //splice() method to replace "_" with the correctly guessed char at the position give in the indices list
            //rejoin the list of characters and _ into the placeholder variable
            var charList = placeholder.split('');
            charList.splice(element, 1, guessWord[element])
            placeholder = charList.join('');
            //console.log(placeholder);

            //update the wordBlank field on screen
            wordBlank.textContent = placeholder.split("").join(" ");
            
        });
        if (checkWin()){     
        wordBlank.textContent = displayResult(checkWin());
        }
    }
}


//Check if the user has won
function checkWin() {
    if (!placeholder.includes("_")) {
        clearInterval(timeInterval);
        return true;
    }
    else {

        return false;
    }
}
