import React from "react";
import styled from "styled-components";
import NeuButton from "./NeuButton";

const FloatingTimer = styled(NeuButton)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #a34bde;
`;

function Timer() {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [start] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setCurrentTime(currentTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentTime]);

  return (
    <>{currentTime > 0 ? <FloatingTimer>{currentTime}</FloatingTimer> : null}</>
  );
}

export default Timer;
