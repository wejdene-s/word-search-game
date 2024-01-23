async function GenerateRelatedWords() {
    const response = await fetch('https://api.datamuse.com/words?ml=science');
    return response.json();
}

async function displayWords () {
    const words = await GenerateRelatedWords();
    let arr ;

    arr = words.filter(element => {
        return element.word.indexOf(" ") === -1 ;
    });

    return arr;
}

const randomWords = async() =>{
    let arrOfWords = await  displayWords();
    console.log(arrOfWords);
    let arrOfRandomWords = [];
    while (arrOfRandomWords.length <5){
        let i = Math.floor(Math.random() * arrOfWords.length) ;
        console.log(i);
        if(arrOfRandomWords.indexOf(arrOfWords[i].word) === -1){
            arrOfRandomWords.push(arrOfWords[i].word);
        }
        
    }
    console.log(arrOfRandomWords);

}


randomWords();
