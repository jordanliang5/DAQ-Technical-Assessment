import React from 'react';
import './App.css';

interface TemperatureProps {
  temp: number;
}

const colours = {
  'default':'#ffffff',
  'safe': '#87fc6f',
  'moderate':'#fcf33f',
  'caution':'#ff8336',
  'unsafe':'#ff4040'
}

function tempColour(temp: number): string {
  var colour = colours.default;
  if (40 < temp && 60 > temp) {
    colour = colours.safe;
  } else if ((30 <= temp && 40 >= temp) ||
             (60 <= temp && 70 >= temp)) {
    colour = colours.moderate;
  } else if ((20 <= temp && 30 >= temp) ||
             (70 <= temp && 80 >= temp)) {
    colour = colours.caution;
  } else {
    colour = colours.unsafe;
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