import React, { useEffect, useState } from "react";

function StopWatch() {
  const [time, setTime] = useState(0);
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
    setVisible(true)
  };

  // useEffect(() => {
  //   const records = JSON.parse(localStorage.getItem('data'));
  //   if (records) {
  //     setRecords(records);
  //   }
  // }, [records])
  // console.log(records)

  let get = JSON.parse(localStorage.getItem("data"));
  const setUs = [get];
  let d = new Date();
  let day = d.getDay();
  let month = d.getMonth();
  let year = d.getFullYear();
  let date = `${day}-${month}-${year}`;

  const onReset = () => {
    setTime(0)
    setVisible(false)
  }

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span className="num">{timeMin}</span>
        <span>:</span>
        <span className="num">{timeSec}</span>
        <span>:</span>
        <span className="num">{timeMs}</span>
      </div>
      <div className="buttons">
        <button style={{background:'green'}} onClick={() => setRunning(true)}>Start</button>
        <button style={{background:'red'}} onClick={() => {setRunning(false)}}>Stop</button>
        <button style={{background:'yellow'}} onClick={onReset}>Reset</button>
        <button style={{background:'lightblue'}} onClick={onSet}>Save</button>
      </div>
      {visible ? (
        <div>
          {setUs.map((data) => {
            return (
              <div className="data">
                <span> {date}</span>
                <span>{data.minutes}:{data.seconds}:{data.mseconds}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default StopWatch;
