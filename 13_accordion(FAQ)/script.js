const headers = document.querySelectorAll(".accordion-header");
const accordionItems = document.querySelectorAll(".accordion-item");

headers.forEach(function(header){
  header.addEventListener("click", function(){
    //<div class="accordion-item accordion-item--closed">
        //<div class="accordion-header">O que é JavaScript?</div>

    //pego o elemento pai parentNode <div class="accordion-item accordion-item--closed">
    const item = this.parentNode;

    const isActive = item.classList.contains('accordion-item--active');
    accordionItems.forEach(function(item){
      item.classList.remove("accordion-item--active");
      item.classList.add("accordion-item--closed");
    })
    if(!isActive){
      item.classList.add("accordion-item--active");
      item.classList.remove("accordion-item--closed");
    }
  })
})