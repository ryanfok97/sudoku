import React, { Component } from 'react';
import './ConfirmAction.css'

class ConfirmAction extends Component {
   render() {
      if (this.props.action === 'reset') {
         return (
            <div className="popupConfirm">
               <p>Are you sure you want to reset?</p>
               <button
                  className="confirm"
                  onClick={() => this.props.reset()}
               >
                  Yes
               </button>
               <button
                  className="cancel"
                  onClick={() => this.props.cancel()}
               >
                  Cancel
               </button>
            </div>
         );
      } else {
         return (
            <div className="popupConfirm">
               <p>Are you sure you want<br/>to start a new game?</p>
               <button
                  className="confirm"
                  onClick={() => this.props.playAgain()}
               >
                  Yes
               </button>
               <button
                  className="cancel"
                  onClick={() => this.props.cancel()}
               >
                  Cancel
               </button>
            </div>
         );
      }
   }
}

export default ConfirmAction;
