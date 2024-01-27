
export async function GenerateRelatedWords(selectedField) {
    const response = await fetch(`https://api.datamuse.com/words?ml=${selectedField}`);
    const words = await response.json();
    getWords(words);
} 

export function getWords (words) {
    let arr = words.filter(element => {
        return element.word.indexOf(" ") === -1 ;
    });
    randomWords(arr);
}

export const randomWords = async(arrOfWords) =>{
    let arrOfRandomWords = [];
    while (arrOfRandomWords.length <5){
        let i = Math.floor(Math.random() * arrOfWords.length) ;
        if(arrOfRandomWords.indexOf(arrOfWords[i].word) === -1 && arrOfWords[i].word.length <= 8){
            arrOfRandomWords.push(arrOfWords[i].word);
        }  
    }
    localStorage.setItem("arrOfRandomWords", JSON.stringify(arrOfRandomWords));
}


