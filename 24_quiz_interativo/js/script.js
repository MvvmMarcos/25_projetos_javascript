//questões
const questions = [
    {
      "question": "Quem foi a primeira pessoa a viajar no Espaço?",
      "choices": [
        "a) Yuri Gagarin",
        "b) A cadela Laika",
        "c) Neil Armstrong",
        "d) Marcos Pontes"
      ],
      "answer": "a) Yuri Gagarin"
    },
    {
      "question": "Qual a montanha mais alta do mundo?",
      "choices": [
        "a) Mauna Kea",
        "b) Dhaulagiri",
        "c) Monte Chimborazo",
        "d) Monte Everest"
      ],
      "answer": "d) Monte Everest"
    },
    {
      "question": "Onde se localiza Machu Picchu?",
      "choices": [
        "a) Colômbia",
        "b) Peru",
        "c) China",
        "d) Bolívia"
      ],
      "answer": "b) Peru"
    },
    {
      "question": "Que país tem o formato de uma bota?",
      "choices": [
        "a) Butão",
        "b) Brasil",
        "c) Portugal",
        "d) Itália"
      ],
      "answer": "d) Itália"
    },
    {
      "question": "O que é mais pesado: 1 quilo de algodão ou 1 quilo de ferro?",
      "choices": [
        "a) Ambos pesam o mesmo",
        "b) 1 quilo de algodão",
        "c) 1 quilo de ferro",
        "d) Não sei"
      ],
      "answer": "a) Ambos pesam o mesmo"
    },
    {
      "question": "Quem inventou a lâmpada?",
      "choices": [
        "a) Graham Bell",
        "b) Steve Jobs",
        "c) Thomas Edison",
        "d) Henry Ford"
      ],
      "answer": "c) Thomas Edison"
    },
    {
      "question": "Quanto tempo a Terra demora para dar uma volta completa em torno dela mesma?",
      "choices": [
        "a) Aproximadamente 24 horas",
        "b) 365 dias",
        "c) 7 dias",
        "d) 365 ou 366 dias"
      ],
      "answer": "a) Aproximadamente 24 horas"
    },
    {
      "question": "A que temperatura a água ferve?",
      "choices": [
        "a) 200 ºC",
        "b) -10 ºC",
        "c) 180 ºC",
        "d) 100 ºC"
      ],
      "answer": "d) 100 ºC"
    },
    {
      "question": "Quais são as fases da Lua?",
      "choices": [
        "a) Nova, crescente, cheia e minguante",
        "b) Penumbral, lunar parcial, lunar total e cheia",
        "c) Nova, cheia, minguante e lua de sangue",
        "d) Nova, cheia e superlua"
      ],
      "answer": "a) Nova, crescente, cheia e minguante"
    },
    {
      "question": "Quantos ossos temos no nosso corpo?",
      "choices": [
        "a) 126",
        "b) 206",
        "c) 18",
        "d) 200"
      ],
      "answer": "b) 206"
    }
]

const questionElement = document.querySelector("#question");
const choiceElements = document.querySelectorAll(".choice");
const nextButton = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");
let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;
//funções

function loadQuestion(){
    const currentQuestionData = questions[currentQuestion]
    questionElement.innerText = currentQuestionData.question;

    const choices =  shuffleArray(currentQuestionData.choices)

    for(let i = 0; i < choices.length;i++){
        choiceElements[i].innerText = choices[i]
    }
    answerChosen = false;
}

function shuffleArray(array){
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function checkAnswer(e){
    if(answerChosen) return;
    answerChosen = true;
    if(e.target.innerText === questions[currentQuestion].answer){
        score ++;
        scoreElement.innerText = `Pontuação: ${score}`;
        alert("Correto!");
    }else{
        wrong++;
        wrongElement.innerText = `Erros: ${wrong}`;
        alert(`Errado! A resposta correta é: ${questions[currentQuestion].answer}` )
    }
}
choiceElements.forEach((btn)=> {
    btn.addEventListener("click", checkAnswer)
});

nextButton.addEventListener("click", ()=>{
    if(!answerChosen){
        alert("Por favor escolha a sua resposta antes de prosseguir!");
        return;
    }
    currentQuestion++;
    if(currentQuestion < questions.length){
        loadQuestion()
    }else{
        alert(`Fim de jogo! Você acertou ${score} de ${questions.length} perguntas.`)
        restartQuiz()
    }

})

function restartQuiz(){
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    scoreElement.innerText = `Pontuação: 0}`;
    wrongElement.innerText = `Erros: 0`;
    loadQuestion();
}
loadQuestion()