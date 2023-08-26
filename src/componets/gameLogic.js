const gameLogic = () => {
    let playerText = document.getElementById('playerText');
    let restartBtn = document.getElementById('restartBtn'); 
    let boxes = Array.from(document.getElementsByClassName('box'));

    let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--clr-winBlocks')

    const O_Text = 'O';
    const X_Text = 'X';
    let currentPlayer = X_Text;
    let spaces = Array(9).fill(null);

    const startGame = () => {
        boxes.forEach(box => box.addEventListener('click', boxClicked));
    };

    // Define a flag to track whether the game is resetting
let isResetting = false;

function boxClicked(e) {
    if (isResetting) {
        return; // Don't take any action if resetting
    }

    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winningBlocks = playerHasWon();

            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);

            isResetting = true; // Set the flag to indicate resetting
            setTimeout(() => {
                restart();
                isResetting = false; // Reset the flag after resetting
            }, 2000);
        } else if (spaces.every(space => space !== null)) {
            // Check for a draw
            playerText.innerHTML = "It's a draw!";

            isResetting = true; // Set the flag to indicate resetting
            setTimeout(() => {
                restart();
                isResetting = false; // Reset the flag after resetting
            }, 2000);
        } else {
            currentPlayer = currentPlayer === X_Text ? O_Text : X_Text;
        }
    }
}


    const winCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function playerHasWon(){
        for (const condition of winCombo) {
            let [a,b,c] = condition

            if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
                return[a,b,c]
            }
            
        }
        return false
    }

    restartBtn.addEventListener('click', restart)

    function restart() {
        spaces.fill(null)

        boxes.forEach( box => {
            box.innerText = ''
            box.style.backgroundColor=''
        })
        
        playerText.innerHTML = "Tic Tac Toe"

        currentPlayer = X_Text
    }

    startGame();
};

export default gameLogic
