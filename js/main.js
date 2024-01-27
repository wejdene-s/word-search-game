const initApp = () => {

    const arrayOfWords = localStorage.getItem("arrOfRandomWords");
    displayWords(arrayOfWords);
    displayLetters(arrayOfWords);


    const letters = document.querySelectorAll(".letter");

    letters.forEach(letter =>{
        letter.addEventListener("click", function() {
            letter.classList.toggle("highlight");
            console.log(letter.textContent);

        })
    })

    

}

document.addEventListener("DOMContentLoaded", initApp );


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
    newElem.tabIndex = "0";
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
    let placeLength = (place + element.length) - 1;
    let currentPosition = place;

    if (placeLength <= mostRight(place) && areDivsEmpty(place, placeLength)) {
        element.forEach(elem => {
            addTextContent(currentPosition, elem)
            currentPosition++;
            /* console.log(correspondantDiv); */
        });
        
        return true;
    }else if ((place + (10 * (element.length - 1)) <= 100) && areDivsEmpty(place,(place + (10 * (element.length - 1) ) ))) {
        element.forEach(elem => {
            addTextContent(currentPosition, elem);
            currentPosition+= 10;
            /* console.log(correspondantDiv); */
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



