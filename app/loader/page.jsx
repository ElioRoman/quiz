"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Loader = () => {
  const router = useRouter();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : 100
      );
    }, 50); // 5000ms / 100 steps = 50ms per step
    return () => {
      return clearInterval(interval);
    };
  }, []);

  if (progress === 100) router.push("/email", { scroll: false });

  return (
    <LoaderContainer>
      <ProgressCircle>
        <svg width="150" height="150">
          <Circle
            cx="75"
            cy="75"
            r="70"
            strokeDasharray="440"
            strokeDashoffset={(1 - progress / 100) * 440}
          />
        </svg>
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
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
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
