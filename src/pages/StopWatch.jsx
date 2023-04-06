import React, { useEffect, useState } from "react";

function StopWatch() {
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  let min = Math.floor((time / 60000) % 60);
  let mins = "0" + min;
  let timeMin = mins.slice(-2);
  let sec = Math.floor((time / 1000) % 60);
  let secs = "0" + sec;
  let timeSec = secs.slice(-2);
  let msec = Math.floor((time / 10) % 100);
  let ms = "0" + msec;
  let timeMs = ms.slice(-2);

  const data = {
    minutes: timeMin,
    seconds: timeSec,
    mseconds: timeMs,
  };

  const onSet = () => {
    localStorage.setItem("data", JSON.stringify(data));
    console.log("Saved");
  };


  // useEffect(() => {
  //   const records = JSON.parse(localStorage.getItem('data'));
  //   if (records) {
  //     setRecords(records);
  //   }
  // }, [records])
  // console.log(records)

  let get = JSON.parse(localStorage.getItem('data'));
  const setUs = ([get]);
  let d = new Date();
  let day = d.getDay()
  let month = d.getMonth()
  let year = d.getFullYear()
  let date = `${day}-${month}-${year}`

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
        <button onClick={onSet}>Save</button>
        <button onClick={() => {setVisible(true)}}>Show</button>
        <button onClick={() => {setVisible(false)}}>Hide</button>
      </div>
      { visible ? <div>
      {setUs.map((data) => {
        return (
          <div className="data">
            <span>{data.minutes}:</span>
            <span>{data.seconds}:</span>
            <span>{data.mseconds}</span>
            <span> {date}</span>
          </div>
        );
      })}
      </div> : null}
    </div>
  );
}

export default StopWatch;
