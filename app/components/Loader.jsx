import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : 100
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  progress === 100 ? router.push("/email", { scroll: false }) : null;

  return (
    <LoaderContainer>
      <ProgressCircle>
        <Circle
          cx="75"
          cy="75"
          r="70"
          strokeDasharray="440"
          strokeDashoffset={(1 - progress / 100) * 440}
        />
        <Percentage>{progress}%</Percentage>
      </ProgressCircle>
      <LoadingText>Finding collections for you...</LoadingText>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a001f;
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const Circle = styled.circle`
  fill: none;
  stroke: #ff0099;
  stroke-width: 8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.05s linear;
`;

const Percentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 18px;
`;
