import React, { useState, useEffect } from "react";

const Counter = () => {
  const timeAfterfiveMinutes = new Date().getTime() + 300000;
  const newTime = new Date(timeAfterfiveMinutes).getTime();
  const [timer, setTimer] = useState(newTime - new Date().getTime());
  const [startTimer, setStartTimer] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    let interval = null;
    if (startTimer) {
      interval = setInterval(() => {
        setTimer(newTime - new Date().getTime());
      }, 1000);
    } else {
      setTimer(0);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [startTimer]);

  useEffect(() => {
    if (timer === 0) {
      setData({
        ...data,
        min: 0,
        sec: 0,
      });
    }
    if (timer) {
      const [min, sec] = getShowTime(timer);
      setData({
        ...data,
        min,
        sec,
      });
    }
  }, [timer]);

  const getShowTime = (timer) => {
    const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timer % (1000 * 60)) / 1000);
    return [minutes, seconds];
  };

  return (
    <>
      <div>Counter Application</div>
      <div>
        {data && (
          <div>
            {data.min}:{data.sec}
          </div>
        )}
      </div>
      <div>
        <button onClick={() => setStartTimer(true)}>Start</button>
        <button onClick={() => setStartTimer(false)}>Reset</button>
      </div>
    </>
  );
};

export default Counter;
