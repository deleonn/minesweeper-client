import React from "react";

function Timer() {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [start, setStart] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setCurrentTime(currentTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentTime]);

  function handleStart() {
    setStart(true);
  }

  function getCurrentTime() {
    return currentTime;
  }

  return <>{currentTime > 0 ? currentTime : null}</>;
}

export default Timer;
