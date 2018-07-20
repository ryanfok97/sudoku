import React, { Component } from 'react';
import './Game.css';
import SudokuBoard from './SudokuBoard';
import PickNumber from './PickNumber';
import GameWon from './GameWon';
import Timer from './Timer';

class Game extends Component {
   constructor(props) {
      super(props);
      let board = this.generateBoard();
      this.state = {
         history: [{
            cells: board
         }],
         isNote: false,
         move: 0,
         playAgain: null,
         selected: null,
         startTime: null
      }
   }

   generateBoard() {
      const boards = [
         '200700001800010095014000800000006072000907000790500000003000610620040009100006003',
         '000243000807090000000000003650309002003020600200108034400000000000040702000356000',
         '000000060800003072760800054035007000000090000000600580790001086250900007010000000',
         '000000000030500040802001750030040590400070002085010030016900203090001080000000000',
         '000003420080000006000070500506000009193000572700000106002090000060300000045800000',
         '000079000070508302500300078300015700000000000002680009850004007106705030000860000',
         '000000000093000145150000627003507040000000000070806300394000056256000730000000000',
         '000060100190300008603005009300040008000080000400090006600900703700003029004020000',
         '000009000080400001090000058080001040210647098070300060310000050800003070000700000',
         '000031700100470000020000060000090406034000850106040000020000060000045002008670000'
         // '283679541974518362516324978396415728487293651152687439852934167146725839793861240'
      ];

      const cells = Array(81).fill(null);
      const board = boards[Math.floor(Math.random() * boards.length)];
      const boardNums = board.split("");

      for (let i = 0; i < 81; i++) {
         cells[i] = boardNums[i] === "0" ? null : parseInt(boardNums[i], 10);
      }

      return cells;
   }

   handleClickBoard(box, row, col, selected) {
      const history = this.state.history.slice(0, this.state.move + 1);
      const current = history[history.length - 1];
      const cells = current.cells.slice();
      let time = this.state.startTime;

      if (checkWin(cells) || history[0].cells[box * 9 + row * 3 + col] !== null) {
         return;
      }

      if (time === null) {
         time = new Date().getTime();
      }

      if (selected !== null) {
         cells[box * 9 + row * 3 + col] = cells[box * 9 + row * 3 + col] === selected ? null : selected;
      }

      this.setState({
         history: history.concat([{
            cells: cells,
            loc: [box, row, col]
         }]),
         move: history.length,
         startTime: time
      });
   }

   handleClickNumbers(num) {
      const history = this.state.history;
      const current = history[this.state.move];
      let time = this.state.startTime;
      if (checkWin(current.cells)) {
         return;
      }

      if (time === null) {
         time = new Date().getTime();
      }

      num = this.state.selected === null || this.state.selected !== num ? num : null; // for select/deselect
      this.setState({
         selected: num,
         startTime: time
      })
   }

   toggleNote() {
      this.setState({
         isNote: !this.state.isNote
      });
   }

   playAgain() {
      let board = this.generateBoard();
      this.setState({
         history: [{
            cells: board
         }],
         move: 0,
         playAgain: true,
         selected: null,
         startTime: null
      });
   }

   redo(move) {
      const history = this.state.history;
      const current = history[this.state.move];
      if (checkWin(current.cells)) {
         return;
      }

      if (move !== history.length - 1) {
         this.setState({
            move: move + 1
         });
      }
   }

   undo(move) {
      const history = this.state.history;
      const current = history[this.state.move];
      if (checkWin(current.cells)) {
         return;
      }

      if (move > 0) {
         this.setState({
            move: move - 1
         });
      }
   }

   reset() {
      const history = this.state.history.slice();
      const current = history[this.state.move];
      if (checkWin(current.cells)) {
         return;
      }

      const initial = history[0];
      const initialBoard = initial.cells.slice();
      this.setState({
         history: [{
            cells: initialBoard
         }],
         move: 0
      });
   }

   unclickable(initialBoard, box, row, col) {
      return initialBoard[box * 9 + row * 3 + col] !== null ? 'unclickable' : null;
   }

   render() {
      const history = this.state.history;
      const current = history[this.state.move];
      const gameOver = checkWin(current.cells);
      const gameWon = gameOver ? <GameWon onClick={() => this.playAgain()}/> : null;
      const toggleNote = this.state.isNote ? 'toggleNote highlight' : 'toggleNote';

      return (
         <div className="game">
            <div className="stacked">
               {gameWon}
               <SudokuBoard
                  cells={current.cells}
                  move={this.state.move}
                  onClick={(box, row, col) => this.handleClickBoard(box, row, col, this.state.selected)}
                  selected={this.state.selected}
                  unclickable={(box, row, col) => this.unclickable(history[0].cells, box, row, col)}
               />
               <div className="sideBySide">
                  <PickNumber
                     onClick={(num) => this.handleClickNumbers(num)}
                     selected={this.state.selected}
                  />
                  <button
                     className={toggleNote}
                     onClick={() => this.toggleNote()}
                  >
                     NOTE
                  </button>
               </div>
            </div>
            <div className="controls">
               <Timer
                  gameWon={gameOver}
                  playAgain={this.state.playAgain}
                  startTime={this.state.startTime}
               />
               <button
                  className="undoRedoButton"
                  onClick={() => this.undo(this.state.move)}
               >
                  UNDO
               </button>
               <button
                  className="undoRedoButton"
                  onClick={() => this.redo(this.state.move)}
               >
                  REDO
               </button>
               <button
                  className="resetButton"
                  onClick={() => this.reset()}
               >
                  RESET
               </button>
            </div>
         </div>
      );
   }
}

function checkWin(cells) {
   // validate boxes
   for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
         for (let k = j + 1; k < 9; k++) {
            if (cells[i * 9 + j] === null ||
                  cells[i * 9 + k] === null ||
                  cells[i * 9 + j] === cells[i * 9 + k]) {
               return null;
            }
         }
      }
   }

   // validate row
   for (let i = 0; i < 9; i++) {
      let lbox = 3 * Math.floor(i / 3); // left box in row
      for (let j = 0; j < 9; j++) {
         for (let k = j + 1; k < 9; k++) {
            if (cells[9 * (lbox + Math.floor(j / 3)) + 3 * (i % 3) + (j % 3)] === null ||
                  cells[9 * (lbox + Math.floor(k / 3)) + 3 * (i % 3) + (k % 3)] === null ||
                  cells[9 * (lbox + Math.floor(j / 3)) + 3 * (i % 3) + (j % 3)] ===
                  cells[9 * (lbox + Math.floor(k / 3)) + 3 * (i % 3) + (k % 3)]) {
               return null;
            }
         }
      }
   }

   // validate col
   for (let i = 0; i < 9; i++) {
      let tbox = i % 3; // top box in col
      for (let j = 0; j < 9; j++) {
         for (let k = j + 1; k < 9; k++) {
            if (cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + i % 3] === null ||
                  cells[9 * (tbox + 3 * Math.floor(k / 3)) + 3 * (k % 3) + i % 3] === null ||
                  cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + i % 3] ===
                  cells[9 * (tbox + 3 * Math.floor(k / 3)) + 3 * (k % 3) + i % 3]) {
               return null;
            }
         }
      }
   }
   return true;
}

export default Game;
