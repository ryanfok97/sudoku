import React, { Component } from 'react';
import './PickNumber.css';

class PickNumber extends Component {
   render() {
      let numbers = [];

      for (let i = 0; i < 9; i++) {
         let classes = this.props.selected === i + 1 ? 'num highlight' : 'num';
         numbers.push(
            <button
               key={i + 1}
               className={classes}
               onClick={() => this.props.onClick(i + 1)}
            >
               {i + 1}
            </button>
         );
      }


      return (
         <div>{numbers}</div>
      );
   }
}

export default PickNumber;
