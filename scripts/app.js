function init() {


  // * define the variables 

  const grid = document.querySelector('.grid') // gets the grid element
  let cell = null
  let feedbackCellChild = null
  const width = 5 // define the wideth
  const length = 11 // define lenth
  const cellCount = width * length // counts cells
  const cellArray = [] // array created to hold cells
  const colorArray = ['red', 'green', 'blue', 'yellow', 'black', 'brown', 'white', 'orange']
  let computerChoice = []
  let playerChoice = ['x', 'x', 'x', 'x']
  let currentColor = 'x'
  let feedbackArray = []
  let gameRound = 1
  let gameRoundsLeft = 10
  
  
  // 1) make the grid

  function createGrid(){
    for (let i = 0; i < cellCount; i++) { // for loop to create cells
      cell = document.createElement('div')
      cell.value = i + 1 // setting text of the div to be its index.
      cell.className = ''
      grid.appendChild(cell) // make cell a child of the grid element we grabbed above
      cellArray.push(cell)
      if (parseInt(cell.value) % 5 === 0 && cell.value !== 5) {
        cell.className = 'feedback-cell'
        cell.id = 'feedback-cell'
        for (let x = 0; x < 4; x++) {
          //create div and put into cell.
          feedbackCellChild = document.createElement('div')
          feedbackCellChild.className = 'feedback-cell-child'
          feedbackCellChild.id = 'no-pegs'
          cell.appendChild(feedbackCellChild)
        }
      }
    }
  }
  createGrid()


  //2) create colour choice buttons

  function createColorButtons(){
    for (let i = 0; i < colorArray.length; i++){
      document.getElementById('color-buttons').innerHTML += '<button class=color-buttons id=' + colorArray[i] + '></button>'
    }
  }
  

  createColorButtons()

  // 3) function to randomly generate computer choice

  function getComputerChoice(){
    const colorArrayCopy = [...colorArray]
    for (let i = 0; i < 4; i++){
      const randomIndex = Math.floor(Math.random() * colorArrayCopy.length)
      computerChoice.push(colorArrayCopy[randomIndex])
      const checkBox = document.querySelector('#checkbox')
      if (checkBox.checked === false) {
        colorArrayCopy.splice(randomIndex,1)
      }
    }
    for (let i = 0; i < 4; i++){
      cellArray[i].value = computerChoice[i]
      //cellArray[i].className = computerChoice[i]
      cellArray[i].className = 'hidden'
      cellArray[i].innerHTML = '?'
    }
    cellArray[4].id = 'cell5'
    return computerChoice
  }  
  getComputerChoice()


  // 4) create start game function  => click listener (start game button), end game function and computer choice function
  const start = document.querySelector('#start')

  function startNewGame(){
    clearBoard()
    getComputerChoice()
    console.log(computerChoice)
  }

  start.addEventListener('click', startNewGame)



  // 5) selectColor funtion - listens for click on a color button and updates variable, currentchoice, to the color of the button selected

  const cButton = document.querySelectorAll('#color-buttons')
  

  function selectColor(event){
    currentColor = event.target.id
    return currentColor
  }

  cButton.forEach(btn => btn.addEventListener('click', selectColor))
  
  console.log(currentColor)
  console.log(cButton)

  // 6)reveal function - when game ends, reveal computer choice. 
  function reveal(){
    for (let i = 0; i < 4; i++){
      cellArray[i].className = computerChoice[i]
      cellArray[i].innerHTML = ''
    }
  }


  // 7) makeChoice funtion - listens for click on current game row and locks in the current color variable. 
  const choice = document.querySelectorAll('.playerChoiceButtons')

  function makeChoice(event){
    const index = parseInt(event.target.value) - 1
    playerChoice.splice(index, 1, currentColor)
    for (let i = 0; i < 4; i++){
      cellArray[width * gameRoundsLeft + i].value = playerChoice[i]
      cellArray[width * gameRoundsLeft + i].className = playerChoice[i]
    }
    return playerChoice
  }
  console.log(playerChoice)
  console.log(currentColor)

  choice.forEach(btn => btn.addEventListener('click', makeChoice))

  console.log(feedbackArray)

  // 8) submit answer function

  const sButton = document.querySelector('#submit')

  function submitAnswer(){
    
    const blank = playerChoice.some(blank => blank === 'x')
    if (blank === true) {
      alert('Please select 4 colours')
    } else if (JSON.stringify(playerChoice) === JSON.stringify(computerChoice)) {
      reveal()
      alert('Congrats. You have won in game round ' + gameRound + '. Press the start game button to play again')
    } else {
      feedBack()
      updateBoard()
      if (gameRoundsLeft === 0){
        reveal()
        alert('Sorry, you have lost! Press the start game button to start a new game!')
      }
    }
  }
  sButton.addEventListener('click', submitAnswer)

  // 9) function feedback
  //  for loop comparing playerChoice to computer choice. update variable counter, counting red pegs and white pegs. store both in new array feeback(i) that corresponds with player guess number. 


  function feedBack(){
    
    for (let i = 0; i < playerChoice.length; i++) {
      const whitePeg = computerChoice.includes(playerChoice[i])
      if (playerChoice[i] === computerChoice[i]) {
        feedbackArray.push('red-peg')
      } else if (whitePeg === true && playerChoice[i] !== computerChoice[i]) {
        feedbackArray.push('white-peg')
      } else { 
        feedbackArray.push('x-peg')
      }
    }
    feedbackArray.sort()
    for ( let i = 0; i < 4; i++) {
      cellArray[width * gameRoundsLeft + 4].childNodes[i].id = feedbackArray[i]
    }
  }



  // 10) updateboard fucntion 
  //resets the white peg, red peg counters, and the playChoice array while also saving thsese these values into the relevent cells

  function updateBoard(){
    gameRound ++
    gameRoundsLeft --
    playerChoice = ['x', 'x', 'x', 'x']
    feedbackArray = []
    currentColor = 'x'
    if (gameRound === 2) {
      alert('A red peg indicates the correct color, in the correct column. A white peg indicates a correct color, but in the wrong column. Peg order is randomised. Good luck in round 2!')
    }
  }


  // 11) clear board function. Returns board to origional pregame state.

  function clearBoard() {
    for (let i = 0; i < cellCount; i++) { // for loop to create cells
      cellArray[i].value = ''
      if (cellArray[i].className === 'feedback-cell'){
        for (let x = 0; x < 4; x++) {
          cellArray[i].childNodes[x].id = 'no-pegs'
        }
      } else {
        cellArray[i].className = ''
      }
    }
    computerChoice = []
    playerChoice = ['x', 'x', 'x', 'x']
    gameRound = 1
    gameRoundsLeft = 10
    currentColor = 'x'
  }

}


window.addEventListener('DOMContentLoaded', init)

