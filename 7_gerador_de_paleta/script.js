const generateButton = document.querySelector('#generate-button');
const colorsDiv = document.querySelector('.colors');



function generateColors(){
    colorsDiv.innerHTML = "";
    for(let i = 0; i < 5; i++){
        const color = generateRandomColor(); 
        // console.log(color);
        //crio um elemento div
        const colorDiv = document.createElement("div");
        //dou o estilo background para a divi
        colorDiv.style.backgroundColor = color;
        //crio o elemento p
        const colorName = document.createElement("p");
        //dou os estilos para p e text
        colorName.textContent = color;
        colorName.style.color = color;
        //na div adiciona o elemento p criado 
        colorDiv.appendChild(colorName);
        // na div pai adiciono a div filha criada
        colorsDiv.appendChild(colorDiv);
    }
}
function generateRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#"
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    // console.log(color);
    return color;
}

generateButton.addEventListener("click", generateColors);