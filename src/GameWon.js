import React, { Component } from 'react';
import './GameWon.css'

class GameWon extends Component {
   render() {
      return (
         <div className="popup">
            <p>Congratulations!</p>
            <button
               className="playAgain"
               onClick={() => this.props.onClick()}
            >
               Play Again
            </button>
         </div>
      );
   }
}

export default GameWon;
