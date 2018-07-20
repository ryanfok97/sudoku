import React, { Component } from 'react';
import './SudokuBoard.css';
import SudokuBox from './SudokuBox';

class SudokuBoard extends Component {
   renderBox(boxRow, boxCol) {
      let box = boxRow * 3 + boxCol;
      return (
         <SudokuBox
            key={box}
            box={box}
            cells={this.props.cells}
            invalid={(row, col) => invalidate(this.props.cells, box, row, col)}
            isNote={this.props.isNote}
            numSelected={(row, col) => numSelected(this.props.cells, box, row, col, this.props.selected)}
            onClick={(row, col) => this.props.onClick(box, row, col)}
            unclickable={(row, col) => this.props.unclickable(box, row, col)}
         />
      );
   }

   render() {
      let board = [];

      for (let i = 0; i < 3; i++) {
         let boxRow = [];
         for (let j = 0; j < 3; j++) {
            boxRow.push(
               this.renderBox(i, j)
            );
         }
         board.push(<div key={i} className="board-row">{boxRow}</div>);
      }

      return (
         <div className="board">{board}</div>
      );
   }
}

function numSelected(cells, box, row, col, selected) {
   if (selected !== null && Array.isArray(cells[box * 9 + row * 3 + col])) {
      return cells[box * 9 + row * 3 + col].includes(selected) ? 'numSelected' : null;
   }
   if (selected !== null) {
      return cells[box * 9 + row * 3 + col] === selected ? 'numSelected' : null;
   }
   return null;
}

function invalidate(cells, box, row, col) {
   // validate boxes
   for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
         if (cells[box * 9 + i] !== null &&
               cells[box * 9 + j] !== null &&
               cells[box * 9 + i] === cells[box * 9 + j]) {
            return 'invalid';
         }
      }
   }

   let lbox = 3 * Math.floor(box / 3); // left box in row
   // validate row
   for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
         if (cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)] !== null &&
               cells[9 * (lbox + Math.floor(j / 3)) + 3 * (row % 3) + (j % 3)] !== null &&
               cells[9 * (lbox + Math.floor(i / 3)) + 3 * (row % 3) + (i % 3)] ===
               cells[9 * (lbox + Math.floor(j / 3)) + 3 * (row % 3) + (j % 3)]) {
            return 'invalid';
         }
      }
   }

   let tbox = box % 3; // top box in col
   // validate col
   for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
         if (cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3] !== null &&
               cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + col % 3] !== null &&
               cells[9 * (tbox + 3 * Math.floor(i / 3)) + 3 * (i % 3) + col % 3] ===
               cells[9 * (tbox + 3 * Math.floor(j / 3)) + 3 * (j % 3) + col % 3]) {
            return 'invalid';
         }
      }
   }
   return null;
}

export default SudokuBoard;
