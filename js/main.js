
const initApp = () => {

    const arrayOfWords = localStorage.getItem("arrOfRandomWords");
    displayWords(arrayOfWords);
    displayLetters(arrayOfWords);


    const letters = document.querySelectorAll(".letter");
    letters.forEach(letter =>{
        letter.addEventListener("click", checkMarkedWords) 
    })


}
document.addEventListener("DOMContentLoaded", initApp );


let selectedWord = "";
let selectedWordsIndex = [];
const checkMarkedWords = (event) => {
    const arrayOfWords = localStorage.getItem("arrOfRandomWords");
    
    if (!(event.target.classList.contains("highlight"))){
        event.target.classList.add("highlight");
        selectedWord += event.target.textContent ;
        const matrix = document.getElementById("matrix");
        selectedWordsIndex.push(Array.from(matrix.children).indexOf(event.target))
        
    }
    JSON.parse(arrayOfWords).forEach(str => {
        //check if the selected exists and is in a valid way (horizontally from right to left or vertically from top to bottom )
        if(areAnagrams(selectedWord, str) && isValid(selectedWordsIndex)){
            verifyWord(str);
            selectedWord = "";
            selectedWordsIndex = [];
            
        }

    })

}
const isValid = (arr) => {
    let i = 2;
    let difference = arr[1] - arr[0];
    let result = true;
    while (result && i<arr.length ){
        if ( arr[i] - arr[i -1] !== difference){
            result = false;
        } 
        i++;
    }
    return result;

}

let nb = 0;
const verifyWord = (str) => {
    const word = document.getElementById(str);
    word.style.textDecoration = 'line-through';

    nb ++;
    if (nb === 5){
        setTimeout(displayMessage, 3000);
    }
}

const displayMessage = () => {
    const matrix = document.getElementById("matrix");
    const wordsSection = document.getElementById("words-section");
    const header = document.querySelector("h1");

    matrix.style.display = 'none';
    wordsSection.style.display = 'none';
    header.style.display = 'none';

    const message = document.createElement('h1');

    message.textContent = ' WELL DONE! 🏆'
    const content = document.querySelector('.content');
    content.append(message);

    //playAgain button 
    const button = document.createElement("button");
    button.setAttribute("id", "play-again");
    const link = document.createElement("a");
    link.setAttribute("href", "index.html");
    link.textContent = "Play Again";
    button.append(link);
    content.append(button);

}

const areAnagrams = (word,str) => {

    if (str.length !== word.length) return false;
    const frequencyMap1 = {};
    const frequencyMap2 = {};

    for (const char of str){
        frequencyMap1[char] = (frequencyMap1[char] || 0) + 1;
    }

    for (const char of word){
        frequencyMap2[char] = (frequencyMap2[char] || 0) + 1;
    }

    for (const char in frequencyMap1) {
        if (frequencyMap1[char] !== frequencyMap2[char]) {
            return false;
        }
    }
    return true;
    
}



const displayWords = (arrayOfWords) =>{
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("words");
    document.getElementById("words-section").appendChild(newDiv);
    JSON.parse(arrayOfWords).forEach( element =>{
        createElement(newDiv,"p",element);
    })

}

const createElement =  (parent,type, content) => {
    const newElem = document.createElement(type);
    newElem.textContent = content;
    if (type === "p") newElem.setAttribute('id', content);
    if (type === "div") newElem.classList.add("letter"); 
    parent.append(newElem);

}

const displayLetters = (arrayOfWords) => {
    
    let totalLength = 0;
    let arrayOfSlicedWords = [];
    JSON.parse(arrayOfWords).forEach( element =>{
        let subArray = [];
        totalLength += element.length;
        for (let c of element){
            subArray.push(c);
        }
        arrayOfSlicedWords.push(subArray);
    })

    const arrayOfRandomLetters = generatePaddingLetters(100 - totalLength);
    placeLetters(arrayOfSlicedWords,arrayOfRandomLetters);
    
}

const placeLetters = (arrayOfSlicedWords, arrayOfRandomLetters) => {
    
    const matrix = document.getElementById("matrix");
    for (let i =0 ; i<100 ; i++){
        createElement(matrix, "div");
    }

    arrayOfSlicedWords.forEach(element =>{
        let result = false;
        let attempts = 0;
        while(!result && attempts < 100000){
            let randomPlace = Math.floor(Math.random() * 100 ) ;
            result = (placeTheWord(element, randomPlace + 1));
            attempts ++;

        }
    })

    let i =1 ; 
    let  j =0;
    for (i ; i<=100 ; i++){
        if (isDivEmpty(i)){
            addTextContent(i,arrayOfRandomLetters[j]);
            j++;
        }
    }
    
                
}
const addTextContent = (index, content) => {
    const correspondantDiv = document.querySelector(`#matrix :nth-child(${index})`);
    correspondantDiv.textContent = content;

}

        
const isDivEmpty = (randomPlace) => {
    const correspondantDiv = document.querySelector(`#matrix :nth-child(${randomPlace})`);
    return correspondantDiv.innerHTML === '' ; 
}

const placeTheWord = (element, place) => {

    let lastPosition = (place + element.length) - 1;
    let currentPosition = place;

    if (lastPosition <= mostRight(currentPosition) && areDivsEmpty(currentPosition, lastPosition)) {
        element.forEach(elem => {
            addTextContent(currentPosition, elem)
            currentPosition++;
            
        });
        
        return true;
    }else if ((currentPosition + (10 * (lastPosition - 1)) <= 100) && areDivsEmpty(currentPosition,(currentPosition + (10 * (lastPosition - 1) ) ))) {
        element.forEach(elem => {
            addTextContent(currentPosition, elem);
            currentPosition+= 10;

        });
        return true;


    }else return false ;
}



const areDivsEmpty = (firstDiv, lastDiv) => {
    let i = firstDiv ; 
    while( i<= lastDiv && isDivEmpty(i)){
        if (lastDiv - firstDiv >= 10){//vertically 
            i+=10;
        }else i++; //horizontally
        
    }
    return i > lastDiv ; 
}


const mostRight = (number) =>{
    if (String(number).length > 1 ){
        const tens = String(number).charAt(0) ;
        const ones = String(number).charAt(1) ;
        if(ones === '0'){
            return number;
        }if(tens === '9'){
            return 100;
        }
            return (Number(tens) + 1) * 10 ;
    }else
        return 10;
}

const generatePaddingLetters = (length) => {
    let arrayOfRandomLetters = [];
    while (length > 0){
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        arrayOfRandomLetters.push(randomLetter);
        length--;
    }
    return arrayOfRandomLetters;
}



