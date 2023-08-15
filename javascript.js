const XClass = "x";

const circleClass = "circle";

/**Checking the Cell indexes to figure out the winner if someone marks or
 * occupy or scores in this positions with same marks like X or O
 * these are all possible winning combinations for a tic tac toe game*/
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/**Selecting All the cells in tic tac toe board */
const cellElements = document.querySelectorAll("[data-cell]");

const board = document.getElementById("board");

const restartButton = document.getElementById("restartButton") ;

const winningMessageElement = document.getElementById("winningMessage");

const winningMessageTextElement = document.querySelector("[data-winning-message-text]") ;

let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {

    circleTurn = false;

    /**Looping through the individual cell elements */
cellElements.forEach(cell => {
    cell.classList.remove(XClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, {once: true})
});
setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}

function handleClick(e) {

    console.log("A Cell has been clicked.");

    /**Targetting the cells whichever is being clicked */
    const cell = e.target;

    /**Checking if it is circles turn or not. If yes then return circleClass
     *or if it is no then return XClass*/
    const currentClass = circleTurn ? circleClass : XClass;
    /**Place marks like X or O */
    placeMark(cell, currentClass);    

    /**Check for winner */
    if (checkWin(currentClass)) {

        console.log("Sombeody has won");
        endGame(false);

    } else if (isDraw()) {  /**Check for draw */

        endGame(true);

    } else {

         /**Switch for next Truns if there is no winner or draw */
    swapTurns();

    /**Creating the mouse hover over effect */
    setBoardHoverClass();

    }
   
}

function endGame(draw) {

    if (draw) {

        winningMessageTextElement.innerText = "It is a Draw";
   
    } else{

        /**Chekcing Who is the winner and printing out the relevant message */
        winningMessageTextElement.innerText = `${circleTurn ? '0 is the winner!' : 'X is the winner!'}`;
    
    }

    winningMessageElement.classList.add("show");
    
}

function isDraw() {
    /**Checking whether every cell has been selected or not.
     * [...cellElements] this is the process of destructuring the cellElements
     * into an array because without that we cannot access .every method for cellElement
     */
    return [...cellElements].every(cell =>{
    /**Checking whether every cell has been selected or not by either X or 0 */  
return cell.classList.contains(XClass) || cell.classList.contains(circleClass);
    })
}

function placeMark(cell, currentClass) {

    cell.classList.add(currentClass);
    
}

function swapTurns() {

    circleTurn = !circleTurn;

}

/**Creating the mouse hover effect */
function setBoardHoverClass() {

    board.classList.remove(XClass);
    board.classList.remove(circleClass);
    if (circleTurn) {
        board.classList.add(circleClass);
    } else {
        board.classList.add(XClass);
    }

}

function checkWin(currentClass) {

    /**We are checking out of all the winningCombinations if some of 
     * the conditions are met or not by the current combinations.
     * This will return true if any of the conditions have been met and come 
     * out as true.*/
    return winningCombinations.some(combination =>{
        /**Checking to make sure that every element has the same class */
        return combination.every(index =>{
            /**We are checking the cell indexes and checkeing the cell elements
             * are containing same class or not. such as all cell contains
             * either X or O*/
            return cellElements[index].classList.contains(currentClass);
        });
    });
    
}