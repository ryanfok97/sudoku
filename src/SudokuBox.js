import React, { Component } from 'react';
import './SudokuBox.css';
import SudokuCell from './SudokuCell';

class SudokuBox extends Component {
   renderCell(box, row, col) {
      return (
         <SudokuCell
            key={box * 9 + 3 * (3 * (Math.floor(box / 3)) + row) + (3 * box % 3 + col)}
            value={this.props.cells[box * 9 + row * 3 + col]}
            invalid={this.props.invalid(row, col)}
            isNote={this.props.isNote}
            numSelected={this.props.numSelected(row, col)}
            unclickable={this.props.unclickable(row, col)}
            check={this.props.check(row, col)}
            checkClicked={this.props.checkClicked}
            onClick={() => this.props.onClick(row, col)}
         />
      );
   }

   render() {
      let box = [];

      for (let i = 0; i < 3; i++) {
         let row = [];
         for (let j = 0; j < 3; j++) {
            row.push(
               this.renderCell(this.props.box, i, j)
            );
         }
         box.push(<div key={i} className="box-row">{row}</div>);
      }

      return (
         <div className="box">{box}</div>
      );
   }
}

export default SudokuBox;
