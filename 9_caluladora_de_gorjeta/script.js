const calculateBtn = document.querySelector("#calculateBtn");

function calculateTip(){
    const billAmount = parseFloat(document.querySelector("#billAmount").value);
    const serviceQuality = parseFloat(document.querySelector("#serviceQuality").value);
    // console.log(billAmount);
    // console.log(serviceQuality);
    if(billAmount === ""){
        alert("Por favor, preencha os dados!");
        return;
    }
    const tipAmount = billAmount * serviceQuality;
    const totalAmount = billAmount + tipAmount;

    const tipAmountinput = document.querySelector("#tipAmount");
    const totalAmountInput = document.querySelector("#totalAmount");

    tipAmountinput.value = tipAmount.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
    totalAmountInput.value = totalAmount.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

}

calculateBtn.addEventListener("click", calculateTip);