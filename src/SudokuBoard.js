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
            invalid={(row, col) => this.props.invalidate(box, row, col)}
            isNote={this.props.isNote}
            numSelected={(row, col) => numSelected(this.props.cells, box, row, col, this.props.selected)}
            unclickable={(row, col) => this.props.unclickable(box, row, col)}
            check={(row, col) => this.props.check(box, row, col)}
            checkClicked={this.props.checkClicked}
            onClick={(row, col) => this.props.onClick(box, row, col)}
         />
      );
   }

   // check(cells, solution) {
   //    for (let i = 0; i < 81; i++) {
   //       return cells[i] !== solution[i] ? 'invalid' : null;
   //    }
   // }

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

export default SudokuBoard;
