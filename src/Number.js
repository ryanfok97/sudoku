import React from 'react';
import './Number.css';

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
