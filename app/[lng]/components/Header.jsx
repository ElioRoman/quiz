"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Header = ({ currentQuestion, totalQuestions }) => {
  const router = useRouter();

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <HeaderContainer>
      {currentQuestion === "1" ? null : (
        <BackButton onClick={() => router.back()}>&lt;</BackButton>
      )}
      <QuestionInfo>
        {currentQuestion}/{totalQuestions}
      </QuestionInfo>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const QuestionInfo = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
  margin-bottom: 16px;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #d3d3d3;
  border-radius: 5px;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #ff0099;
  border-radius: 5px;
`;
