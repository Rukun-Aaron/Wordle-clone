import { WORDS } from "./words.js";

// import 'animate.css';
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < rightGuessString.length; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}



function insertLetter(pressedKey){
    if (nextLetter === 5){
        return
        
    }
    pressedKey = pressedKey.toLowerCase()
    let row = document.getElementsByClassName("letter-row")[6- guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey 
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter(){
    let row = document.getElementsByClassName("letter-row")[6- guessesRemaining]
    let box = row.children[nextLetter - 1]
    // console.log(nextLetter)
    animateCSS(box, "shakeX")
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.splice(currentGuess.indexOf(nextLetter), 1)
    box.textContent = ''
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
    console.log(currentGuess)

}

function checkGuess (){
    let row = document.getElementsByClassName("letter-row")[6- guessesRemaining]
    let guess = ''
    let rightGuess = Array.from(rightGuessString)
    // console.log(rightGuess)
    for (const val of currentGuess){
        guess += val
    }
    // if (guess.length < 5){
    //     alert("Please enter a 5 letter word")
    //     return
    // }
    if (!WORDS.includes(guess)){
        toastr.error("Word not in list!")
        for (let i = 0; i < guess.length; i++){
            deleteLetter()
        }
        return
    }
    
    for (let i = 0; i < rightGuess.length; i++){
        let letterColor =''
        let box = row.children[i]
        let letter = currentGuess[i]
        if (rightGuess.indexOf(currentGuess[i])==-1){
            letterColor = 'grey'
        }
        else{
            if (currentGuess[i]== rightGuessString[i]){
                letterColor = 'green'
            }
            else{
                letterColor = 'yellow'
            }
            
        }
        rightGuess[rightGuess.indexOf(currentGuess[i])] = '#'
        let delay = 250 * i 
        setTimeout(() => {
            animateCSS(box, 'flipInX')
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        },delay)
    }
    
    setTimeout(() => {
        
        if (guess === rightGuessString){
            toastr.success("You guessed right! Game over!")
            guessesRemaining =0
            return false
        }
        else{
            guessesRemaining -=1
            currentGuess = []
            nextLetter = 0
            if (guessesRemaining ==0){
                toastr.error("You've run out of guesses! Game over!")
                toastr.info(`The right word was "${rightGuessString}"`)
            }
        }
        
    }, 1000);
    // setInterval(() => {
    //     // console.log("gi")
    //     window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    // }, 1);
   
    
}

function shadeKeyBoard(letter, letterColor){
    for (const elem of document.getElementsByClassName("keyboard-button")){
        if (elem.textContent === letter){
            let oldColor = elem.style.backgroundColor
            if (oldColor == 'green'){
                return
            }
            
            if (oldColor === 'yellow' && letterColor !== 'green'){
                return
            }
            elem.style.backgroundColor = letterColor
            break;
        }
    }
}

initBoard();

document.addEventListener("keyup", (event) => {
    
    // if (event.key === "Enter") {
    //     // Cancel the default action, if needed
    //     event.preventDefault();
    //     // Trigger the button element with a click
    //     document.getElementsByClassName("keyboard-button").click();
    //     document.getElementsByClassName("keyboard-button").focus();
    //     console.log(event)
    //   }
    if (guessesRemaining==0){
        return 
    }
    
    let pressedKey = String(event.key)
    // console.log(pressedKey)

    if (pressedKey == "Backspace" && nextLetter!==0) {
        deleteLetter()
    }
    else if (pressedKey == "Enter") {
        //TODO:
        checkGuess()
    }

    else if (pressedKey == "Clue"){
        window.open('https://youtu.be/ZEkW9GNKeH4')
    }

    let found = pressedKey.match(/[a-z&]/gi)
    
    if (!found || found.length > 1) {
        return
    }
    else {
        insertLetter(pressedKey)
    }
    

})

document.getElementById("keyboard").addEventListener("click", (e)=>{
    const target = e.target

    if (!target.classList.contains("keyboard-button")){
        return
    }

    let key = target.textContent
    if (key === "Del"){
        key = "Backspace"
        
    }
    // console.log(target.textContent)
    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    if (animation === "shakeX"){
        node.style.setProperty('--animate-duration', '0.5s');
    }
    else{
        node.style.setProperty('--animate-duration', '0.3s');
    }
    
    // console.log(animation);
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});


// const googleDictionaryApi = require("google-dictionary-api")

// googleDictionaryApi.search('price', 'en')
//   .then(results=>{
//     console.log(results)
//   })
//   .catch(error=>{
//     console.log(error)
//   })
// const url = 'https://api.wheretheiss.at/v1/satellites/25544'
// async function getISS(){
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data["name"]);
    
// }
// getISS();


