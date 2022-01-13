function init() {

  // * define the variables 
  const grid = document.querySelector('.grid') // gets the grid element
  let cell = null // cell variable
  let feedbackCellChild = null // child cell variable for the feedback column.
  const width = 5 // define the wideth
  const length = 11 // define lenth
  const cellCount = width * length // counts cells
  const cellArray = [] // array created to hold cells
  const colorArray = ['red', 'green', 'blue', 'yellow', 'black', 'brown', 'white', 'orange'] // color options array
  let computerChoice = [] // array that will hold randomly generated 4 color code. 
  let playerChoice = ['x', 'x', 'x', 'x'] // array that will hold players code guess on each game round. 
  let currentColor = 'x' // color variable that will hold which ever color button is selected. 'x' is just placeholder.
  let feedbackArray = [] // array holding the feedback pegs for each gameround. will get cleared after each round. 
  let gameRound = 1 // variable tracking which game round player is on. gets updated +1 after each guess. 
  let gameRoundsLeft = 10 // same as above but moving -1 each gameround. 
  
  
  // 1) make the grid
  function createGrid(){
    for (let i = 0; i < cellCount; i++) { // for loop to create cells
      cell = document.createElement('div') // create a div for each cell. 
      cell.value = i + 1 // setting text of the div to be its index (not using 0. start at 1)
      cell.className = '' // assigning an empty class for the cells
      grid.appendChild(cell) // makeing the cell a child of the grid.
      cellArray.push(cell) // pushing each cell into cell array
      if (parseInt(cell.value) % 5 === 0 && cell.value !== 5) { // if statement selecting the feedback cells. We dont want to use comumn 5 on first row.
        cell.className = 'feedback-cell' // setting the classname and id of the feedback cells
        cell.id = 'feedback-cell' 
        for (let x = 0; x < 4; x++) { // for loop to create 4 child divs for the feeback cells which will represent the feedback pegs. 
          feedbackCellChild = document.createElement('div') //create div and put into cell.
          feedbackCellChild.className = 'feedback-cell-child' // assigning classname and id.
          feedbackCellChild.id = 'no-pegs'
          cell.appendChild(feedbackCellChild) // making cell a child of the main cell. 
        }
      }
    }
  }
  createGrid()


  //2) create colour choice buttons
  function createColorButtons(){
    for (let i = 0; i < colorArray.length; i++){ // for loop looping through the 8 colors in color array, and making them buttons. 
      document.getElementById('color-buttons').innerHTML += '<button class=color-buttons id=' + colorArray[i] + '></button>' // assigning innerhtml the appropriate color.
    }
  }
  createColorButtons()


  // 3) function to randomly generate computer choice array for each game. Can be with or without duplicates dependijng on checkbox.
  function getComputerChoice(){
    const colorArrayCopy = [...colorArray] // creating a copy array so that we can cchnage the array in the function, without changing the main array (which will be used later). ... prevents mutation. 
    for (let i = 0; i < 4; i++){ 
      const randomIndex = Math.floor(Math.random() * colorArrayCopy.length) // generates a random number for 0 to 7, and assings it to variable
      computerChoice.push(colorArrayCopy[randomIndex]) // pushes a random color into the copy array. 
      const checkBox = document.querySelector('#checkbox') // defining a const and linking to the checkbox. 
      if (checkBox.checked === false) { // is the duplicates chechbox selected? If it is not selected we remove the selected color from the copy array so it cannot be selected again in this loop.
        colorArrayCopy.splice(randomIndex,1)
      }
    }
    for (let i = 0; i < 4; i++){ // foorloop to selected cells 1-4. These hold the computer generated code.
      cellArray[i].value = computerChoice[i] // assigns the value (color) of the cell to corresponding index in the computer array.
      //cellArray[i].className = computerChoice[i]
      cellArray[i].className = 'hidden' // creates a hidden class, that we use to hide the computer choice during the game (using CSS). Reveal function will reveal code at the end of the game. 
      cellArray[i].innerHTML = '?' // assings the question mark which will be displayed when hidden.
    }
    cellArray[4].id = 'cell5' // we create a special cell for cell 5 becuase we want to remove this cell from the visable board using css. 
    return computerChoice
  }  
  getComputerChoice()
  console.log(computerChoice)


  // 4) create start game function. When start game button  clicked, this resets the board and generates new computer code. 
  const start = document.querySelector('#start')  // query selector selecting the startid (start button)
  function startNewGame(){
    clearBoard() // function resets the board.
    getComputerChoice() // generates random color combination for the computer code. 
    console.log(computerChoice)
    alert(' The aim of this game is to guess the my randonmly generated 4 color code. Choose 4 colors then click submit. You will then receive feedback pegs. A red peg indicates that you guessed the correct color, in the correct column. A white peg indicates a correct color, but in a wrong column. Peg order is randomised. You have 10 attempts. Good luck!') // explain feedback system.
  }
  start.addEventListener('click', startNewGame) // listens for click on start game button. 


  // 5) selectColor funtion - listens for click on a color button and updates variable, currentchoice, to the color of the button selected
  const cButton = document.querySelectorAll('#color-buttons')
  function selectColor(event){
    currentColor = event.target.id // reassigns variable current color to the color of the button selected
    return currentColor
  }
  cButton.forEach(btn => btn.addEventListener('click', selectColor))
  

  // 6)reveal function - when game ends, this function runs to reveal computer choice. This is done by chnaging the class of the cells from hiden, to computer choice. 
  function reveal(){
    for (let i = 0; i < 4; i++){
      cellArray[i].className = computerChoice[i] // reassigning class 
      cellArray[i].innerHTML = '' // removes the question mark. 
    }
  }


  // 7) makeChoice funtion - listens for click on column buttons and locks in the current color variable to the appropriatre cell. 
  const choice = document.querySelectorAll('.playerChoiceButtons') // selects player choice buttons that assigns current color to column. 
  function makeChoice(event){
    const index = parseInt(event.target.value) - 1 // creates the index number for that cell
    playerChoice.splice(index, 1, currentColor) // adds the current color variable to the player choice array, at the correct index (depending on which column is selected)
    for (let i = 0; i < 4; i++){ // for loop to assign the player choice array to the appropriate cells, depending on which gameround the player is playing. Done by updating cell class and id. 
      cellArray[width * gameRoundsLeft + i].value = playerChoice[i]
      cellArray[width * gameRoundsLeft + i].className = playerChoice[i]
    }
    return playerChoice
  }
  choice.forEach(btn => btn.addEventListener('click', makeChoice))


  // 8) submit answer function // Listens for click on submit button. This function then submits the players code guess for that gameround, and proccesses appropriate feedback. 
  const sButton = document.querySelector('#submit')
  function submitAnswer(){
    const blank = playerChoice.some(blank => blank === 'x') //assign variable blank to check if the player has chosen 4 colors. 
    if (blank === true) { // if player has not chosen 4 colors, we alert them to chose 4 colors, and exit function. 
      alert('Please select 4 colours')
    } else if (JSON.stringify(playerChoice) === JSON.stringify(computerChoice)) { // checks to see if player has won the game by converting player choice and computer choice into a string and seeing if they are exact match. 
      reveal() // function to reveal answer when game is won
      alert('Congrats. You have won in game round ' + gameRound + '. Press the start game button to play again') // alerts player they have won in 'x' gameround. 
    } else {
      feedBack() // function to calculate the number of pegs for the feedback. 
      updateBoard() // function to sent the game up the grid to the next round. 
      if (gameRoundsLeft === 0){ // checks to see if player has used all their permitted guesses. If they have lost, we reveal code, and tell them they are a LOSER!
        alert('Sorry, you have lost! Press the start game button to start a new game!')
        reveal()
      }
    }
  }
  sButton.addEventListener('click', submitAnswer) // listens for 'submit' button click. 


  // 9) feedback function comparing playerChoice array to computer choice array . . stores white and red pegs in new array feedback(i), that tells the player there feedback. 
  function feedBack(){
    
    for (let i = 0; i < playerChoice.length; i++) { // looping through playerchoice array 
      const whitePeg = computerChoice.includes(playerChoice[i]) // constant created to test wether each guess qualifys for a white peg. We use includes function as this tests if each color exists in computer choice array. 
      if (playerChoice[i] === computerChoice[i]) { // test for red peg. 
        feedbackArray.push('red-peg') // push red peg into feedback array 
      } else if (whitePeg === true && playerChoice[i] !== computerChoice[i]) { // test for white peg. second part tests to make sure its not a red peg so we are not double counting. 
        feedbackArray.push('white-peg') // pushes white peg to array
      } else { 
        feedbackArray.push('x-peg') // pushes to no peg array, so that feedback array is always a length of 4. x-peg used to make sure x-peg is last aphabetically (see below)
      }
    }
    feedbackArray.sort() // sorts the array into alphabetical order, so that pegs connot be linked to a certain column. This is critical otherwise the game is too easy. red - white -(x)no (pegs order). 
    for ( let i = 0; i < 4; i++) {
      cellArray[width * gameRoundsLeft + 4].childNodes[i].id = feedbackArray[i] // assigns the feedback array into the relevent divs in the feedback cell, through updating thier id. 
    }
  }


  // 10) updateboard fucntion. updates the board and takes the game to the next game round by updating counters to move up the grid. 
  function updateBoard(){
    gameRound ++ // update counter to proceed to next gameround. 
    gameRoundsLeft --
    playerChoice = ['x', 'x', 'x', 'x'] // clears player choice array with placeholders. 
    feedbackArray = [] // clears feedback array
    currentColor = 'x' // clears current color variable to placeholder. 
  }


  // 11) clear board function. what it says on the tin. Returns board to origional pregame state.
  function clearBoard() {
    for (let i = 0; i < cellCount; i++) { // for loop to loop through cells
      cellArray[i].value = '' // clears cell.value
      if (cellArray[i].className === 'feedback-cell'){ // clears feedback cells and children. 
        for (let x = 0; x < 4; x++) {
          cellArray[i].childNodes[x].id = 'no-pegs' // clears children.
        }
      } else {
        cellArray[i].className = '' // clears classname. 
      }
    }
    computerChoice = [] // clears computer choice array
    playerChoice = ['x', 'x', 'x', 'x'] // clears player choice array to placeholders. 
    gameRound = 1 // chnages counters to pregame state. 
    gameRoundsLeft = 10
    currentColor = 'x' // clears current color to placeholder. 
  }


  //12 ) Info on dupicates mode (mouse hover)

  const duplicates = document.querySelector('#checkbox')
  function handleMouseEnter(event){
    event.target = alert('Selecting duplicates mode allows the code setter to use any color more than once in their code. This makes the game harder')
  }
  duplicates.addEventListener('mouseenter', handleMouseEnter)


}

window.addEventListener('DOMContentLoaded', init)
