import React, { useRef, useEffect, useState  } from 'react';
import './style.css';

const Line = ({from, to}) => {
    //const lineRef = useRef(null);
    const [lineStyle, setLineStyle] = useState({});

    useEffect(() => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      console.log("fromEl", fromEl)
      console.log("toEl", toEl)

      if(!fromEl || !toEl)return;

      const fromCoords = fromEl.getBoundingClientRect();
      const toCoords = toEl.getBoundingClientRect();
      console.log("fromCoords", fromCoords)
      console.log("toCoords", toCoords)

      const newLineStyle  = {
        top:  fromCoords.y + 20,
        left: fromCoords.x + 20,
        width: Math.sqrt(
          Math.pow(toCoords.left - fromCoords.left, 2) + Math.pow(toCoords.top - fromCoords.top, 2)
        ),
        transform: `rotate(${Math.atan2(toCoords.y - fromCoords.y, toCoords.x - fromCoords.x)}rad)`,
      };
      console.log("lineStyle", lineStyle)
      //console.log("lineRefBefore", lineRef)

      setLineStyle( newLineStyle);
      //console.log("lineRefAfter", lineRef)
    }, [from, to]);

    if(from > to)
      return <div className='line' id='snake' style={lineStyle}></div>
    else
      return <div className="line" id="ladder" style={lineStyle}></div>;
  };

  export default Line;
	