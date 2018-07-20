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

export default SudokuBoard;
