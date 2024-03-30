const form = document.querySelector('form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const assunto = document.querySelector('#assunto');
const mensagem = document.querySelector('#mensagem');
const errorMessages = document.querySelectorAll('.error-message');
// console.log(nome);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log(nome.value);
    resetErrors();
    validateInputs();
})
function setError(input, errorMessage){
    const errorMessageElement = input.nextElementSibling;
    // console.log(input.nextElementSibling);
    errorMessageElement.textContent = errorMessage;
    // console.log(input.parentElement);
    input.parentElement.classList.add("error");
}
function resetErrors(){
    errorMessages.forEach((msg)=>{
        console.log(msg);
        msg.textContent = "";
    })
}
function validateInputs(){
    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const assuntoValue = assunto.value.trim();
    const mensagemValue = mensagem.value.trim();
    if(nomeValue === ""){
        setError(nome, "Preencha o campo nome!");
    }
    if(emailValue === ""){
        setError(email, "Preencha o campo e-mail!");
    }else if(!isValidEmail(emailValue)){
        setError(email, "Preencha o campo e-mail com um válido!")
    }
    if(assuntoValue === ""){
        setError(assunto, "Preencha o campo assunto!")
    }
    if(mensagemValue === ""){
        setError(mensagem, "Preencha o campo mensagem!")
    }
}
function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
