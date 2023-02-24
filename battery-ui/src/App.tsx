import React, { useState, useRef, useEffect } from 'react';
import LiveValue from './live_value'
import RedbackLogo from './redback-logo-transparent.png';
import './App.css';

function App() {

  const [temperature, setTemperature] = useState<number>(0);

  const ws: any = useRef(null);

  useEffect(() => {
    // using the native browser WebSocket object
    const socket: WebSocket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      console.log("got message", event.data);
      let message_obj = JSON.parse(event.data);
      setTemperature(message_obj["battery_temperature"].toPrecision(3));
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">      
        <div className='header-bar'>
          <div className='logo-wrapper'>
            <img src={RedbackLogo} className="redback-logo" alt="Redback Racing Logo"/>
          </div>
          <span className='app-title'>Telemetry Display</span>
        </div>
        <div className='temperature-widget'>
          <span className='value-title'>Live Battery Temperature</span>
          <hr className='line-rule'/>
          <LiveValue temp={temperature}/>
          <hr className='line-rule'/>
        </div>
      </header>
    </div>
  );
}

export default App;
