//To Top button
//Tutorial by Filip: 6 JavaScript examples to make your websites more ENGAGING! (https://www.youtube.com/watch?v=MCRV9ajSfoc)
const toTop = () => window.scrollTo({top: 0, behavior: "smooth"});

//Animations
document.documentElement.style.setProperty('--animate-duration', '2s');

//Dropdown menu
const dropdownButton = document.querySelector(".dropdown-button");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownButton.addEventListener("click", dropDownClick());

function dropDownClick(){
    dropdownMenu.classList.toggle("hide");
}

//alert('Hey I work')



