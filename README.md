- # 1. Project Description
	- This is an Evil version of Tic Tac Toe where the computer doesn't let the player win.
	- The core essence of this project is Implementation of MinMax Algorithm and Alpha-Beta Pruning.
	- There is no way to Win against this AI by playing normally. To win Look into Section 13
- # 2. Technologies Used
	- HTML
	- CSS
	- Vanilla JavaScript
- # 3. Folder Structure
	- ```HTML
	  Project/
	      │
	      ├── index.html
	      ├── styles.css
	      └── script.js
	  ```
	- Each file has a specific responsibility:
	- **index.html** → User interface
	- **styles.css** → Styling and layout
	- **script.js** → Game logic and AI
- # 4. HTML Structure
	- The HTML creates the user interface using:
		- `<div>` – Groups related elements
		- `<button>` – Represents each Tic Tac Toe cell
		- `<h1>, <h2>, <h3>` – Display title, turn, score, and winner
		- `<input type="checkbox">` – Dark Mode and Anxiety Mode toggles
	- Important attributes:`
		- id` → Access elements from JavaScript
		- `class` → Apply CSS styles
		- `data-index` → Stores each cell's board position
	- Using `data-index` allows JavaScript to determine which board position the user clicked without creating separate variables for every button.
- # 5. CSS Design
	- The interface is styled using:
	- **Flexbox** for alignment
	- **CSS Grid** for the 3×3 board
	- `.hidden` class to hide the Replay button
	- `.dark` class for Dark Mode
	- CSS Grid was chosen because Tic Tac Toe naturally consists of rows and columns, making it easier to maintain than Flexbox.
- # 6. JavaScript Workflow
	- The overall execution flow is:
	- ```
	  Page Loads
	  ↓
	  Initialize Variables
	  ↓
	  Create Empty Board
	  ↓
	  Player Click
	  ↓
	  Update Board
	  ↓
	  Check Winner
	  ↓
	  Computer Move
	  ↓
	  Minimax Algorithm
	  ↓
	  Update Score
	  ↓
	  Replay
	  
	  ```
- # 7. Important JavaScript Concepts
	- The project makes use of:
	- Variables (`let`, `const`)
	- Arrays (game board)
	- Functions
	- Loops
	- Conditionals
	- Event Listeners
	- Recursion (Minimax)
	- DOM Manipulation
- # 8. Major Functions
	- The JavaScript is divided into logical functions such as:
		- Initialize game
		- Render board
		- Handle player move
		- Handle computer move
		- Check winner
		- Update score
		- Replay game
		- Toggle Dark Mode
		- Execute Minimax algorithm
	- Each function performs one specific task, making the code easier to read and maintain.
- # 9. AI Logic
	- Instead of choosing random moves, the AI uses the **Minimax Algorithm**.
	- The algorithm:
		- 1. Simulates every possible move.
		- 2. Predicts future game states.
		- 3. Assigns scores to each outcome.
		- 4. Chooses the move with the highest score.
	- This ensures the AI never intentionally loses.
- # 10. Alpha-Beta Pruning
	- To improve performance, Alpha-Beta Pruning removes branches that cannot produce a better result.
	- Benefits:
		- Reduces unnecessary calculations
		- Makes AI respond faster
		- Produces the same optimal move as Minimax
- # 11. Event Handling
	- The project uses event listeners for:
		- Cell clicks
		- Replay button
		- Dark Mode toggle
		- Anxiety Mode toggle
	- This makes the application interactive without reloading the page.
- # 12. DOM Manipulation
	- JavaScript updates the page using:
		- `getElementById()`
		- `querySelectorAll()`
		- `textContent`
		- `classList.add()`
		- `classList.remove()`
		- `classList.toggle()`
		- `disabled`
	- These functions allow the UI to reflect the current game state dynamically.
- # 13. How to Win against this AI
	- The script isn't wrapped in a module or closure, many variables and functions are available globally.
	- Modify variables from the browser console
		- ```HTML
		  computerSymbol = playerSymbol;
		  
		  or
		  
		  getBestMove = () => 8
		  ```
	- Edit the board directly
		- ```HTML
		  board[2] = playerSymbol;
		  renderBoard();
		  
		  or 
		  
		  board.fill(playerSymbol);
		  endGame(playerSymbol);
		  ```
	- Force the AI to play a bad move
		- ```HTML
		  getBestMove = () => Math.floor(Math.random()*9);
		  
		  or 
		  
		  getBestMove = () => 0;
		  ```
	- Make yourself win everytime
		- ```HTML
		  checkResult = () => playerSymbol;
		  ```
- # 14. Design Decisions (Thought Process)
	- The project was designed with the following reasoning:
		- Separate HTML, CSS, and JavaScript for better maintainability.
		- Represent the board as an array so the UI and game logic remain synchronized.
		- Use `data-index` to map button clicks directly to board positions.
		- Use CSS Grid because the game board is a fixed 3×3 layout.
		- Implement Minimax to create an unbeatable AI instead of relying on random moves.
		- Add Alpha-Beta Pruning to improve AI performance.
		- Include score tracking so players can play multiple rounds without losing results.
		- Add Dark Mode for improved usability in different lighting conditions.
		- Add Anxiety Mode (delayed AI move) to make gameplay feel more natural instead of instantaneous.
- # 15. Features Implemented
	- Human vs AI gameplay
	- Unbeatable AI using Minimax
	- Alpha-Beta Pruning optimization
	- Score tracking
	- Winner detection
	- Draw detection
	- Replay button
	- Dark Mode
	- Anxiety Mode (AI move delay)
- # 16. Conclusion
	- This README.md is Generated by ChatGPT and Proofread by Nissi Jacobson
