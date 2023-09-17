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

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScore);

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

function startGame() {
    guessWord = generateRandomWord(words);
    placeholder = "_".repeat(guessWord.length);
    //console.log(guessWord);
    //console.log(placeholder);

    wordBlank.textContent = placeholder.split("").join(" ");
    document.addEventListener("keydown", keydownAction);
    timer();
}

function generateRandomWord(words) {
    var randomElement = words[Math.floor(Math.random()*(words.length))]
    //console.log(randomElement);
    return randomElement;
}


function timer() {
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


function resetScore() {
    //TODO:
    winCount = 0;
    wins.textContent = winCount;
    localStorage.setItem("winCount", winCount);
    loseCount = 0;
    losses.textContent = loseCount;
    localStorage.setItem("loseCount", loseCount);
}


function keydownAction(event) {
    // TODO: Complete keydown function
    var keyPress = event.key;

    compareLetters(keyPress);

    return keyPress;
}

function compareLetters(keyPress){
    var regexKey = new RegExp(keyPress, "ig");
    //console.log(guessWord.search(regexKey));
    //console.log("regex key " + regexKey);
    var matches = [...guessWord.matchAll(regexKey)];
    var indexes = matches.map(match => match.index);
    //console.log("indexes " + indexes);

    if (Array.isArray(indexes) && indexes.length) {
        indexes.forEach(element => {
            //console.log("placeholder element " + placeholder[element]);
            //console.log("guessword element " + guessWord[element])
            var list = placeholder.split('');
            list.splice(element, 1, guessWord[element])
            placeholder = list.join('');
            //console.log(placeholder);
            wordBlank.textContent = placeholder.split("").join(" ");
            
        });
        if (checkWin()){     
        wordBlank.textContent = displayResult(checkWin());
        }
    }
}

function checkWin() {
    if (!placeholder.includes("_")) {
        clearInterval(timeInterval);
        return true;
    }
    else {

        return false;
    }
}
