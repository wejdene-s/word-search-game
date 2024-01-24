const initApp = () => {
    const arrayOfWords = localStorage.getItem("arrOfRandomWords");
    displayWords(arrayOfWords);
    displayLetters(arrayOfWords);
    const letters = document.querySelectorAll(".letter");
    letters.forEach(letter =>{
        letter.addEventListener("click", function() {
            letter.classList.toggle("highlight");
        })
    })



}

document.addEventListener("DOMContentLoaded", initApp );


const displayWords = (arrayOfWords) =>{
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("words");
    document.getElementById("words-section").appendChild(newDiv);
    JSON.parse(arrayOfWords).forEach( element =>{
        createElem("p", newDiv, element);
    })

}

const createElem = (type, parent, content) => {
    const newElem = document.createElement(type);
    newElem.textContent = content;
    newElem.tabIndex = "0";
    if ( type == "div") newElem.setAttribute("class", "letter"); parent.append(newElem);

}

const displayLetters = (arrayOfWords) => {
    const matrix = document.getElementById("matrix");
    let totalLength = 0;
    let arr = [];
    JSON.parse(arrayOfWords).forEach( element =>{
        totalLength += element.length;
        arr.push(element.split(""))
        for (let c of element){
            createDiv("div", matrix, c);
        }
        
    })
    console.log(arr);
    while (totalLength !== 100){
        const randomWord = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        if(arr.indexOf(randomWord) !== -1){
            createDiv("div", matrix, );
            totalLength++;
        }
    }
    console.log(totalLength);

    
}

const createDiv = (type, parent, content) => {
    createElem(type, parent, content);

}






