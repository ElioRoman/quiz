"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../components/Button";
import { downloadCSVFile, getFromLocalStorage } from "../utils";

const ThankYou = () => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("quizData");
    router.push("/", { scroll: false });
  };

  const userData = getFromLocalStorage("quizData");

  return (
    <Wraper>
      <Title>Thank you</Title>
      <SubTitle>for supporting us and passing quiz</SubTitle>
      <Image src="/done.png" width={118} height={118} alt="done" />
      <DownLoadBtn
        onClick={() =>
          downloadCSVFile(Object.values(userData), "questions_and_answers.csv")
        }
      >
        <Image src="/download.png" width={42} height={42} alt="done" />
        <span>Download my answers</span>
      </DownLoadBtn>
      <Button onClick={handleClick}>Retake quiz</Button>
    </Wraper>
  );
};

export default ThankYou;

const Wraper = styled.div`
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
`;

const SubTitle = styled.h2`
  color: white;
  font-size: 17px;
  margin-bottom: 50px;
`;

const DownLoadBtn = styled.div`
  background-color: #1f002b;
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  align-items: center;
  display: flex;
  gap: 16px;
  margin: 16px 0;
`;
