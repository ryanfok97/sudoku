import React, { Component } from 'react';
import './Game.css';
import SudokuBoard from './SudokuBoard';
import PickNumber from './PickNumber';
import GameWon from './GameWon';
import Timer from './Timer';

class Game extends Component {
   constructor(props) {
      super(props);
      let board = generateBoard(Array(81).fill(null), Array(81).fill(null));
      this.state = {
         history: [{
            cells: board[0]
         }],
         isNote: false,
         move: 0,
         playAgain: null,
         selected: null,
         solution: board[1],
         startTime: null,
         verifyClicked: null
      }
   }

   handleClickBoard(box, row, col, selected) {
      const history = this.state.history.slice(0, this.state.move + 1);
      const current = history[history.length - 1];
      let cells = current.cells.slice();
      const cell = box * 9 + row * 3 + col
      let time = this.state.startTime;

      if (checkWin(cells) || history[0].cells[cell] !== null) {
         return;
      }

      if (time === null) {
         time = new Date().getTime();
      }

      if (selected !== null) {
         if (this.state.isNote && (Array.isArray(cells[cell]) || cells[cell] === null)) {
            let res = cells[cell] === null ? Array(9).fill(null) : cells[cell].slice();
            for (let i = 0; i < 9; i++) {
               if (cells[cell] !== null) {
                  if (i + 1 === selected) {
                     res[i] = cells[cell].includes(selected) ? null : i + 1;
                  } else {
                     res[i] = cells[cell].includes(i + 1) ? i + 1 : null;
                  }
               } else {
                  res[selected - 1] = selected;
               }
            }
            cells[cell] = res;
         } else if (this.state.isNote) {
            return;
         // click on cell with selected number, should undo all notes but not working yet
         // } else if (cells[cell] === selected) {
         //    const prev = history[history.length - 2];
         //    cells = prev.cells.slice();
         //    cells[cell] = null;
         //
         //    this.setState({
         //       history: history.concat([{
         //          cells: cells.slice()
         //       }]),
         //       move: history.length,
         //       startTime: time,
         //       verifyClicked: null
         //    });
         } else {
            // cells = cells[cell] === selected ? cells : clearNotes(cells, box, row, col, selected);
            cells[cell] = cells[cell] === selected ? null : selected;
         }
      }

      this.setState({
         history: history.concat([{
            cells: cells,
         }]),
         move: history.length,
         startTime: time,
         verifyClicked: null
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
         startTime: time,
         verifyClicked: null
      })
   }

   toggleNote() {
      this.setState({
         isNote: !this.state.isNote
      });
   }

   playAgain() {
      let board = generateBoard(Array(81).fill(null), Array(81).fill(null));
      this.setState({
         history: [{
            cells: board[0]
         }],
         move: 0,
         playAgain: true,
         selected: null,
         solution: board[1],
         startTime: null,
         verifyClicked: null
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
            move: move + 1,
            verifyClicked: null
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
            move: move - 1,
            verifyClicked: null
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
         move: 0,
         verifyClicked: null
      });
   }

   unclickable(initialBoard, box, row, col) {
      return initialBoard[box * 9 + row * 3 + col] !== null ? 'unclickable' : null;
   }

   verify(box, row, col) {
      const history = this.state.history;
      const current = history[this.state.move];

      if (current.cells[box * 9 + row * 3 + col] === null ||
            Array.isArray(current.cells[box * 9 + row * 3 + col])) {
         return;
      }

      return current.cells[box * 9 + row * 3 + col] !== this.state.solution[box * 9 + row * 3 + col] ?
         'invalid' : null;
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
                  invalidate={(box, row, col) => invalidate(current.cells, box, row, col)}
                  isNote={this.state.isNote}
                  move={this.state.move}
                  selected={this.state.selected}
                  unclickable={(box, row, col) => this.unclickable(history[0].cells, box, row, col)}
                  verify={(box, row, col) => this.verify(box, row, col)}
                  verifyClicked={this.state.verifyClicked}
                  onClick={(box, row, col) => this.handleClickBoard(box, row, col, this.state.selected)}
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
               <button
                  className="newPuzButton"
                  onClick={() => this.playAgain()}
               >
                  NEW GAME
               </button>
               <button
                  className="verifyButton"
                  onClick={() => this.setState({ verifyClicked: true })}
               >
                  VERIFY
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
                  Array.isArray(cells[i * 9 + j]) ||
                  Array.isArray(cells[i * 9 + k]) ||
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
                  Array.isArray(cells[9 * (lbox + Math.floor(j / 3)) + 3 * (i % 3) + (j % 3)]) ||
                  Array.isArray(cells[9 * (lbox + Math.floor(k / 3)) + 3 * (i % 3) + (k % 3)]) ||
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
                  Array.isArray(cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + i % 3]) ||
                  Array.isArray(cells[9 * (tbox + 3 * Math.floor(k / 3)) + 3 * (k % 3) + i % 3]) ||
                  cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + i % 3] ===
                  cells[9 * (tbox + 3 * Math.floor(k / 3)) + 3 * (k % 3) + i % 3]) {
               return null;
            }
         }
      }
   }
   return true;
}

function clearNotes(cells, box, row, col, selected) {
   let lbox = 3 * Math.floor(box / 3);
   let tbox = box % 3;

   for (let i = 0; i < 9; i++) {
      if (Array.isArray(cells[box * 9 + i]) &&
            cells[box * 9 + i].includes(selected)) {
         let res = cells[box * 9 + i].slice();
         res[selected - 1] = null;
         cells[box * 9 + i] = res;
      }

      if (Array.isArray(cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)]) &&
            cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)].includes(selected)) {
         let res = cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)];
         res[selected - 1] = null;
         cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)] = res;
      }

      if (Array.isArray(cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3]) &&
            cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3].includes(selected)) {
         let res = cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3];
         res[selected - 1] = null;
         cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3] = res;
      }
   }

   return cells;
}

function generateBoard(cells, solution) {
   const boards = [
      '2--7----18---1--95-14---8-------6-72---9-7---79-5-------3---61-62--4---91----6--3259784361876312495314659827835146972264987531791532468493527618628143759175986243',
      '---243---8-7-9------------365-3-9--2--3-2-6--2--1-8-344------------4-7-2---356---961243785837596214425817693654379812183425679279168534496127538351948762782356941',
      '-------6-8----3-7276-8---54-35--7-------9-------6--58-79---1-8625-9----7-1-------152974368849563172763821954635817249728495631149632587793521486256984317418376295',
      '----------3-5---4-8-2--175--3--4-59-4---7---2-85-1--3--169--2-3-9---1-8----------165374829937528146842961753732648591419375862685219437416987253293651784578324196',
      '-----342--8------6----7-5--5-6-----9193---5727-----1-6--2-9-----6-3------458-----157963428984251736632478591586271349193648572724953186712694835869325417345817269',
      '----79----7-5-83-25--3---783---157-------------268---985---4--71-67-5-3----86----283679541974518362516324978396415728487293651152687439852934167146725839793861245',
      '----------93---14515----627--35-7-4-----------7-8-63--394----56256---73----------762415938893627145154938627183527649962314578475896312394271856256489731781563249',
      '----6-1--19-3----86-3--5--93---4---8----8----4---9---66--9--7-37----3-29--4-2----827469135195372648643815279396541278517286934482397156682954713751863429934721568',
      '-----9----8-4----1-9-----58-8---1-4-21-647-98-7-3---6-31-----5-8----3-7----7-----125839476786452931493617258683591742215647398974382165317968254864523179529741836',
      '----317--1--47-----2-----6-----9-4-6-34---85-1-6-4-----2-----6-----45--2--867----658231749193476528724589361875392416234617859196845237927183564361945782458672913',
      '----65--13------7-----7-629--9--36--6--958--7--14--8--918-3-----4------35--21----',
      '-1632--4---2--91-34----------5--963-----5-----693--8----------43-64--9---1--7268-',
      '-17-------3------659-4-3-7-12-----6---94-27---5-----21-3-9-1-546------2-------31-817296345234175986596483172128579463369412758754638921732981654691543827845267319',
      '-18--2-46-9371------5---------1--25----9-4----79--2---------6------3285-92-5--14-',
      // '28367954197451836251632497839641572848729365115268743985293416714672583979386124-'
   ];

   const board = boards[Math.floor(Math.random() * boards.length)];
   const boardNums = board.split("");

   for (let i = 0; i < 162; i++) {
      if (i < 81) {
         cells[i] = boardNums[i] === "-" ? null : parseInt(boardNums[i], 10);
      } else {
         solution[i - 81] = parseInt(boardNums[i], 10);
      }
   }

   // // base case
   // if (!cells.includes(null)) {
   //    return cells;
   // }
   //
   // // recursive case
   // let randCell = Math.floor(Math.random() * cells.length);
   // while (cells[randCell]) {
   //    randCell = Math.floor(Math.random() * cells.length); // find empty cell
   // }
   //
   // const col = randCell % 3;
   // const box = Math.floor(randCell / 9);
   // const row = Math.floor()
   //
   // while (cells.includes(null)) {
   //    if (!cells[randCell]) { // cell is empty
   //
   //    }
   // }

   return [cells, solution];
}

function invalidate(cells, box, row, col) {
   // validate boxes
   for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
         if (cells[box * 9 + i] !== null &&
               cells[box * 9 + j] !== null &&
               cells[box * 9 + row * 3 + col] === cells[box * 9 + i] &&
               cells[box * 9 + row * 3 + col] === cells[box * 9 + j]) {
            return cells[box * 9 + i] === cells[box * 9 + j] ? 'invalid' : null;
         }
      }
   }

   let lbox = 3 * Math.floor(box / 3); // left box in row
   // validate row
   for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
         if (cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)] !== null &&
               cells[9 * (lbox + Math.floor(j / 3)) + 3 * (row % 3) + (j % 3)] !== null &&
               cells[box * 9 + row * 3 + col] === cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)] &&
               cells[box * 9 + row * 3 + col] === cells[9 * (lbox + Math.floor(j / 3)) + 3 * (row % 3) + (j % 3)]) {
            return cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)] ===
               cells[9 * (lbox + Math.floor(j / 3)) + 3 * (row % 3) + (j % 3)] ? 'invalid' : null;
         }
      }
   }

   let tbox = box % 3; // top box in col
   // validate col
   for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
         if (cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3] !== null &&
               cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + col % 3] !== null &&
               cells[box * 9 + row * 3 + col] === cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3] &&
               cells[box * 9 + row * 3 + col] === cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + col % 3]) {
            return cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3] ===
               cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + col % 3] ? 'invalid' : null;
         }
      }
   }
   return null;
}

export default Game;
