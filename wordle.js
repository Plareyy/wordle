// Variables that is worked with
let height = 6; // Number of Guess
let width = 4; // length of word

let row = 0; // initial amount of guesses
let col = 0; // the current letter of the column the user is on

let gameOver = false;
let word = null // Later on the word will be added into here later
let listofwords = []; // the array is kept blank for now because words will be stored in here later

/**
 * let word = null     <--- because the fetch is a synchronous callback, meaning it will take a few
 *                          seconds to fetch the file, before it can update the word variable
 *                          res is a promise that the fetch promises to return, once available, it
 *                          accesses .text() to get the file content, once *that* is available, it can
 *                          then finally set the word variable.
 */


fetch("fourletter.txt").then(res => res.text()).then((data) => {
     listofwords = data.split('\n')
     console.log(listofwords)

     word = randomise(listofwords).replace("\r", "");

     console.log(word);

     // called after the word has been randomised 
     initial();
})

function randomise(listofwords) {
     const randomIndex = Math.floor(Math.random() * listofwords.length);

     const item = listofwords[randomIndex];

     return item;


}


function initial() {

     for (let r = 0; r < height; r++) {
          for (let c = 0; c < width; c++) {
               // Below creates span elements and creates the cells / tiles individually instead of doing it in HTML
               let cell = document.createElement("span");
               // Below, the rows and column cells are defined as 0-0 and 0-1 and so on.
               cell.id = r.toString() + "-" + c.toString();
               // 
               cell.classList.add("tile");
               cell.innerText = "";
               document.getElementById("board").appendChild(cell);
          }
     }
     // Know for key press on keyboard (alphabet, enter and backspace only)
     document.addEventListener("keyup", (n) => {
          if (gameOver) return;
          if ("KeyA" <= n.code && n.code <= "KeyZ") {

               // Max letters in Column that can be written, when it is equal to 4, user cannot type anymore letters.
               if (col < width) {
                    let currentCell = document.getElementById(row.toString() + '-' + col.toString());
                    if (currentCell.innerText == "") {
                         // When typing the letters, we just want the letter A or Z, not the key word.
                         currentCell.innerText = n.code[3];
                         // everytime user types letter, column + 1 until width = 4
                         col += 1;
                    }
               }
          }
          else if (n.code == "Backspace") {
               if (0 < col && col <= width) {
                    col -= 1;
               }
               // When user presses backspace,
               let currentCell = document.getElementById(row.toString() + '-' + col.toString());
               currentCell.innerText = "";
          }

          // DO THIS LATER FOR UPDATE FUNCTION 
          else if (col == 4 && n.code == "Enter") {
               update();
               row += 1;
               col = 0;
          }

          if (!gameOver && row == height) {
               gameOver = true;
               alert(

                    `NO! the correct answer was: \n\n ${word}`
               )
               location.reload()

          }

     })
}

function update() {
     let correct = 0;
     // Creating a map so finding out how many times a letter is in a word
     let letterCount = {};
     for (let i = 0; i < word.length; i++) {
          letter = word[i];

          if (letterCount[letter]) {
               letterCount[letter] += 1;
          }

          else {
               letterCount[letter] = 1;
          }
          console.log(letterCount);
     }

     // iterating through the guessed word, checking all correct letters
     for (let c = 0; c < width; c++) {
          let currentCell = document.getElementById(row.toString() + '-' + c.toString());
          let letter = currentCell.innerText;

          // Is the letter in the correct position
          if (word[c].toUpperCase() == letter) {
               currentCell.classList.add("correct");
               correct += 1;
               letterCount[letter] -= 1; // deducts the amount of letters said in word
          }

          if (correct == width) {
               gameOver = true;

               setTimeout(() => location.reload(), 1000)
          }

     }

    

     // marking which letters are present but not in the correct position
     for (let c = 0; c < width; c++) {
          let currentCell = document.getElementById(row.toString() + '-' + c.toString());
          let letter = currentCell.innerText;

          // This if statement checks if the letter is not correct but is in the word the style will be overrided by present
          if (!currentCell.classList.contains("correct")) {

               // Is the letter in the word, also making sure it does not count twice
               if (word.toUpperCase().includes(letter) && letterCount[letter] > 0) {
                    currentCell.classList.add("present");
                    letterCount[letter] -= 1;
               }
               // Is the letter not in the word
               else {
                         currentCell.classList.add("absent");
               }
          }
     }
     console.log(correct)
}