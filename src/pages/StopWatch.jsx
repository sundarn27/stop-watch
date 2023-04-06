import React, { useEffect, useState } from "react";

function StopWatch() {

  const [ time, setTime ] = useState(0);
  const [ running, setRunning ] = useState(false);

  useEffect(() => {
    let interval;
    if(running){
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10)
    }else if(!running){
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running]);

  let min = Math.floor((time / 60000) % 60)
  let mins = "0" + min
  let timeMin = mins.slice(-2)
  let sec = Math.floor((time / 1000) % 60)
  let secs = "0" + sec
  let timeSec = secs.slice(-2)
  let msec = Math.floor((time / 10) % 100)
  let ms = "0" + msec
  let timeMs = ms.slice(-2)

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{timeMin}:</span>
        <span>{timeSec}:</span>
        <span>{timeMs}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
}

export default StopWatch;
