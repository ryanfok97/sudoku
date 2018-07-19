import React, { Component } from 'react';
import Number from './Number';

class PickNumber extends Component {
   render() {
      let numbers = [];

      for (let i = 0; i < 9; i++) {
         numbers.push(
            <Number
               key={i + 1}
               highlight={this.props.selected === i + 1 ? 'highlight' : ''}
               num={i + 1}
               onClick={() => this.props.onClick(i + 1)}
            />
         );
      }

      return (
         <div>{numbers}</div>
      );
   }
}

export default PickNumber;
