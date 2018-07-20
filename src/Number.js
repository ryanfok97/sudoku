import React from 'react';
import './PickNumber.css';

function Number(props) {
   let classes = 'num ' + props.highlight;

   return (
      <button
         className={classes}
         onClick={() => props.onClick()}
      >
         {props.num}
      </button>
   );
}

export default Number;
