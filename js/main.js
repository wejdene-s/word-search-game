
const initApp = () => {
    displayWords();

    

}

document.addEventListener("DOMContentLoaded", initApp );


const displayWords = () =>{
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("words");
    document.getElementById("words-section").appendChild(newDiv);
    const arrayOfWords = localStorage.getItem("arrOfRandomWords");
    JSON.parse(arrayOfWords).forEach( element =>{
        console.log(element);
        createP(newDiv, element);
    })

}

const createP = (parent, content) => {
    const newP = document.createElement("p");
    newP.textContent = content;
    newP.tabIndex = "0";
    parent.append(newP);

}






