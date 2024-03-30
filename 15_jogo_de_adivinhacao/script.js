//selecionar os elementos da dom
const guessSection = document.querySelector("#guess-section");
const guessInput = document.querySelector("#guess");
const guessButton = document.querySelector("#guess-btn");
const resultParagraph = document.querySelector("#result");
const difficultySelect = document.querySelector("#difficulty");
const difficultySection = document.querySelector("#difficulty-section");
const gameSection = document.querySelector("#game-section");
const triesLeftSpan = document.querySelector("#tries-left");
const resetButton = document.querySelector("#reset-btn");
//variaveis globais para o jogo
let maxTries;
let randomNumber;
let triesLeft;
//definir a dificuldade antes de iniciar o jogo
difficultySelect.addEventListener("change", () => {
    //converto o value do option de string para number
    const difficulty = parseInt(difficultySelect.value);
    // console.log(difficulty)
    switch (difficulty) {
        case 1:
            maxTries = 10;
            break;
        case 2:
            maxTries = 7;
            break;
        case 3:
            maxTries = 5;
            break;
        default:
            maxTries = 10;
            break;
    }
    // console.log(maxTries)
    triesLeft = maxTries;
    triesLeftSpan.textContent = maxTries;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    // console.log(randomNumber);

    difficultySection.style.display = 'none';
    gameSection.style.display = 'block';
    guessSection.style.display = 'flex';
})
guessButton.addEventListener("click", () => {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultParagraph.textContent = "Por favor, insira um número de 1 a 100";
    } else {
        if (guess === randomNumber) {
            resultParagraph.textContent = `Parabéns! Você acertou em ${maxTries - triesLeft + 1} tentativa(s)`;
            resetButton.style.display = "block";
            guessSection.style.display = "none";
        } else if (guess > randomNumber) {
            resultParagraph.textContent = "Muito alto. Tente novamente!";
            triesLeft--;
        } else {
            resultParagraph.textContent = "Muito baixo. Tente novamente!";
            triesLeft--;
        }
        if(triesLeft === 0){
            resultParagraph.textContent = `Sua tentativas acabaram. O número correto era ${randomNumber}.`;
            resetButton.style.display = "block";
            guessSection.style.display = "none";
        }

        triesLeftSpan.textContent = triesLeft;
        guessInput.value = "";
        guessInput.focus();
    }
})
function resetGame(){
    difficultySelect.value = "";
    difficultySection.style.display = 'flex';
    gameSection.style.display = 'none';
    guessSection.style.display = 'none';
    resetButton.style.display = 'none';
    resultParagraph.textContent = ""
}
resetButton.addEventListener("click", resetGame);


