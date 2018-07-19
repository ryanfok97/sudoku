import React, { Component } from 'react';

class Timer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currTime: new Date().getTime()
      }
   }

   componentDidMount() {
      this.timerID = setInterval(
         () => this.tick(),
         1000
      );
   }

   tick() {
      this.setState({
         currTime: new Date().getTime()
      });
   }

   render() {
      if (this.props.gameWon) {
         clearInterval(this.timerID);
      }

      if (this.props.startTime === null || this.state.currTime - this.props.startTime < 0) {
         return (
            <div>
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
         <div>
            {minutes + ':' + seconds}
         </div>
      );
   }
}

export default Timer;
