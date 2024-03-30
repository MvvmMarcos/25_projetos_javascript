const popup = document.querySelector("#popup");
const buttonCancel = document.querySelector("#cancel");
localStorage.removeItem("popupDisplayed")
document.addEventListener("mouseout", (event)=>{

    const popupDisplayed = localStorage.getItem("popupDisplayed");
    // console.log(popupDisplayed)
    if((!popupDisplayed) && (event.relatedTarget === null)){
        popup.style.display = "block"
    }
})
buttonCancel.addEventListener("click",()=>{
    popup.style.display = "none";
    localStorage.setItem("popupDisplayed", true)
})