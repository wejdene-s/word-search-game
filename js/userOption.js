import { GenerateRelatedWords } from "./dataFunctions.js";

const initApp = () =>{
    const start = document.getElementById("start");
    start.addEventListener("click", getFieldSelected);

}


document.addEventListener("DOMContentLoaded", initApp);

const getFieldSelected =  async() =>{
    const select = document.querySelector("select");
    const  selectedIndex = select.selectedIndex;
    const selectedOption = select.options[selectedIndex];
    console.log(selectedOption.text);
    await GenerateRelatedWords(selectedOption.text);

}
