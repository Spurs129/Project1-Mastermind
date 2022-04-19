# Project1-Mastermind

Overview and Brief

This was a solo project built in 9 days, during week 4 of my General Assembly course. Our brief was to build a game using a grid-system created using JavaScript. I choose to build Mastermind as it is a classic game I enjoyed playing growing up, and still enjoy today.


Deployment link

https://neilmcfayden.github.io/Project1-Mastermind/


Technologies used

HTML5
CSS
JavaScript
Visual Studio Code


The Game

Mastermind is a code breaking game whereby the player has to unlock a colour code consisting of 4 colours in order, chosen from a possible 8 colours. After each guess, the player receives feedback consisting of red and white pegs. A red peg indicates the correct colour in the correct column. A white peg indicates the correct colour, but in the wrong column.

The aim of the game is to guess the code in the fewest possible guesses. Below is an image of how my Mastermind board looks when the game begins. 


![alt text](/assets/project1-1.png)


As the game progresses the player moves up the board. If they run out of space after 10 guesses, they lose. Here is a board after 4 attempts. You can see the feedback pegs in the right hand column.


![alt text](/assets/project1-2.png)


If the game is won, the reveal function is called, and the computer choice row at the top is revealed (see below).


![alt text](/assets/project1-3.png)


Approach taken

For this project I performed limited planning because as a first project, I didn’t really know what to expect. I made a rough outline of the functions I thought I would need. However by the end of the project, I realised I needed far more than originally planned. 

The first stage was to build the grid for the game. I used a JavaScript function to create a 5 x 11 grid, 4 columns for the code and 1 column for the feedback pegs. I used a for-loop to achieve this.


![alt text](/assets/project1-4.png)


![alt text](/assets/project1-5.png)


I used an extra for-loop to create the special ‘feedback-cells for column 5 (these contain the feedback pegs). I used modulus 5 remainder 0 to identify these cells. 


![alt text](/assets/project1-6.png)


When the game is started, 4 functions are executed, including the getComputerChoice function - the computer randomly generates the 4 colours using Math.random to select the code from a colour array. The colours are assigned in the divs by changing the class of the div, when the cell is selected. 


![alt text](/assets/project1-7.png)


The hardest challenge building the Mastermind game was writing the feedback function, which allocated red and white pegs depending on the player's guess.

This involved comparing the randomly generated code with the players code, and then assigning the correct colours to the respective divs, in order to provide the feedback. 


![alt text](/assets/project1-8.png)


The problem here was getting everything in the correct order, so that colours were not double counted, and also randomised so that the pegs would not correspond to a given column. This is essential for the integrity/ difficulty of the game. 

I had an issue to fix with this function, because the function initially compared the randomly generated computer choice to the player choice, which caused white peg colours to be double counted. 

I had to instead switch the function to operate in reverse, by comparing the player choice to the computer choice. This solved the double counting issue. 

There are several steps that need to happen when the player submits their guess. Below is the function I wrote to perform these steps, involving calling other functions in order. I added some sound effects for when the player submitted the correct code, and also when the player lost by running out of guesses. The feedback function and update board functions are also called in the correct order. 


![alt text](/assets/project1-9.png)


I was able to add an advanced feature to the game, by allowing the code to feature duplicates mode. This allows the code to select the same colour multiple times (eg - blue, red, blue, yellow).


![alt text](/assets/project1-10.png)


I added a checkbox to the game that could be turned on and off. Inside of the random code generation function, I added some extra lines of code to test whether the checkbox was ticked, and to therefore change the code generation. 


![alt text](/assets/project1-11.png)


When duplicates were not selected, I spliced the colour array to remove the colour already selected, therefore not allowing the random generator to select this colour again. This makes the game slightly easier. 


Bugs

The one main bug I have with this project is occasionally, as the game progresses to a new row, the first cell on the new row is auto filled with the last colour used from the previous row. It only happens occasionally, and I cannot seem to fix it. 


Key learnings and wins

I was really happy with the outcome given this was my first project. The game has full functionality, and looks appealing and clean. 

It was my first experience of designing and building using JavaScript, and tackling unexpected problems as they emerged. It showed me what is possible in programming and gave me a lot of confidence going into module 2 of my course. 


Future Features.

It would be interesting to rebuild this game using some of the technologies I have learned since this project. For example I could rebuild this game in React, and make the game much more visually appealing, perhaps with a different theme. 

I could also have different modes, easy, medium and hard, with a different size board, or potentially more colours to choose from. 


