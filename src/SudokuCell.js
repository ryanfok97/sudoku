import React, { Component } from 'react';
import './SudokuCell.css';

class SudokuCell extends Component {
   render() {
      let classes = 'cell ' + this.props.invalid + ' ' +
         this.props.numSelected + ' ' + this.props.unclickable;

      return (
         <button
            className={classes}
            onClick={() => this.props.onClick()}
         >
            {this.props.value}
         </button>
      );
   }
}

export default SudokuCell;
