import React from 'react';
import './App.css';

interface TemperatureProps {
  temp: number;
}

function tempColour(temp: number): string {
  var colour = 'white';
  if (40 < temp && 60 > temp) {
    colour = '#87fc6f';
  } else if ((30 <= temp && 40 >= temp) ||
             (60 <= temp && 70 >= temp)) {
    colour = '#fcf33f';
  } else if ((20 <= temp && 30 >= temp) ||
             (70 <= temp && 80 >= temp)) {
    colour = '#ff8336';
  } else {
    colour = '#ff4040';
  }

  return colour;
}

function tempDiff(temp: number): string {
  var diff = "";
  if (temp < 20) {
    diff = 'Too low!';
  } else if (temp > 80) {
    diff = 'Too high!';
  }
  return diff;
}

function LiveValue({ temp } : TemperatureProps) {

  let valueColour = tempColour(temp);

  return (
      <div className='temperature-wrapper'>
        <div className='temperature-border' style={{ color : valueColour }}>
          <div className='live-value-wrapper'>
            <header className="live-value" style={{ color : valueColour }}>
              {`${temp.toString()}°C`}
            </header>
            <div className='temperature-warning'>{tempDiff(temp)}</div>
          </div>
        </div>
      </div>
  );
}

export default LiveValue;