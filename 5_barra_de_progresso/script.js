const progressBar = document.querySelector('.progress');
const previousBtn = document.querySelector('#previous-btn');
const nextBtn = document.querySelector('#next-btn');
console.log(progressBar, previousBtn, nextBtn);

let progress = 0;
function updateProgressBar(){
    progressBar.style.width = progress + '%';
}
function nextStep(){
    progress +=25;
    if(progress > 100) progress = 100;
    updateProgressBar();
}
//meu jeito que funcionou 
// function previousStep(){
//     if(progress > 0) progress -= 25
//     updateProgressBar();
// }
function previousStep(){
    progress -=25;
    if(progress < 0) progress = 0;
    updateProgressBar();
}
nextBtn.addEventListener('click', nextStep);
previousBtn.addEventListener('click', previousStep);