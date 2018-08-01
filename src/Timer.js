import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currTime: new Date().getTime()
      }
   }

   tick() {
      if (!this.props.gameWon) {
         this.setState({
            currTime: new Date().getTime()
         });
      }
   }

   render() {
      if (this.props.gameWon) {
         clearInterval(this.timerID);
      } else if (this.props.startTime === null || this.state.currTime - this.props.startTime < 0) {
         if (!this.timerID || this.props.playAgain) {
            this.timerID = setInterval(
               () => this.tick(),
               1000
            );
         }

         return (
            <div className='timer'>
               {'00:00'}
            </div>
         );
      }

      const diff = this.state.currTime - this.props.startTime;
      let minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      if (minutes < 10) {
         minutes = '0' + minutes;
      }
      if (seconds < 10) {
         seconds = '0' + seconds;
      }

      return (
         <div className='timer'>
            {minutes + ':' + seconds}
         </div>
      );
   }
}

export default Timer;

// import React, { Component } from 'react';
// import './Timer.css';
//
// class Timer extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          currTime: new Date().getTime()
//       }
//    }
//
//    startTimer() {
//       this.timerId = setInterval(
//          () => this.tick(),
//          1000
//       );
//    }
//
//    stopTimer() {
//       clearInterval(this.timerId);
//    }
//
//    tick() {
//       this.setState({
//          currTime: new Date().getTime()
//       });
//    }
//
//    render() {
//       if (this.props.gameWon || this.props.playAgain) {
//          this.stopTimer();
//       }
//       if (!this.timerId || this.props.startTime !== null) {
//          this.startTimer();
//       }
//
//       if (this.props.startTime === null || this.state.currTime - this.props.startTime < 0) {
//          return (
//             <div className='timer'>
//                {'00:00'}
//             </div>
//          );
//       }
//
//       const diff = this.state.currTime - this.props.startTime;
//       let minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
//       let seconds = Math.floor((diff % (1000 * 60)) / 1000);
//       if (minutes < 10) {
//          minutes = '0' + minutes;
//       }
//       if (seconds < 10) {
//          seconds = '0' + seconds;
//       }
//
//       return (
//          <div className='timer'>
//             {minutes + ':' + seconds}
//          </div>
//       );
//    }
// }
//
// export default Timer;
