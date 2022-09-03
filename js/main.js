document.addEventListener("DOMContentLoaded", () =>{
    createSquares();
    function createSquares(){
         const gameBoard = document.getElementById("board")
         for(let index = 0; index <30; index++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
         }
    }
})
console.log("bruh");

// const j =[
//     {id:1, isActive: true},
//     {id: 2, isActive: true},
//     {id: 3, isActive: false}
// ]
// const activej = j.filter(j => j.isActive);
// console.log(activej);
// var fs = require("fs");  
    
