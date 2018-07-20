import React, { Component } from 'react';
import './SudokuCell.css';

class SudokuCell extends Component {
   getClasses() {
      if (Array.isArray(this.props.value)) {
         return 'note ' + this.props.numSelected;
      }
      return 'cell ' + this.props.invalid + ' ' +
         this.props.numSelected + ' ' + this.props.unclickable;
   }

   renderNotes() {
      const arr = this.props.value;
      let res = '';
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            if (arr[3 * i + j] !== null) {
               res += arr[3 * i + j] + '  ';
            }
         }
         res += '\n';
      }
      return res;
   }

   render() {
      let classes = this.getClasses();

      return (
         <button
            className={classes}
            onClick={() => this.props.onClick()}
         >
            {Array.isArray(this.props.value) ? this.renderNotes() : this.props.value}
         </button>
      );
   }
}

export default SudokuCell;
