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
    if ( type == "div"){
        newElem.setAttribute("class", "letter"); 
       /*  return newElem; */
    }else parent.append(newElem);

}

const displayLetters = (arrayOfWords) => {
    /* const matrix = document.getElementById("matrix"); */
    let totalLength = 0;
    let arr = [];
    JSON.parse(arrayOfWords).forEach( element =>{
        let subArray = [];
        totalLength += element.length;
        for (let c of element){
            subArray.push(c);
            /* createElem("div", matrix, c); */
        }
        arr.push(subArray);
    })

    const finalArray = generatePaddingLetters(totalLength, arr);
    placeLetters(finalArray);
    
    //i need to randomly put words in a correct place and then fill the rest with padding ramdom letters
}

const placeLetters = (finalArray) => {
    console.log(finalArray);

}

const generatePaddingLetters = (length, arr) => {
    while (length !== 100){
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        /* createElem("div", matrix, randomLetter); */
        arr.push(randomLetter);
        length++;
    }
    return arr;
}


 





