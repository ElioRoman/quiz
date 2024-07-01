"use client";
import React from "react";
import Header from "../../components/Header.jsx";
import { useParams } from "next/navigation";
import { quiz } from "../../data.js";
import styled from "styled-components";
import SingleSelect from "@/app/components/SingleSelect";
import MultipleSelect from "@/app/components/MultipleSelect";

const QuizPage = () => {
  const pathname = useParams();

  const components = {
    1: <SingleSelect questions={quiz.questions[0]} />,
    2: <SingleSelect questions={quiz.questions[1]} />,
    3: <SingleSelect questions={quiz.questions[2]} />,
    4: <MultipleSelect questions={quiz.questions[3]} />,
    5: <MultipleSelect questions={quiz.questions[4]} />,
  };

  return (
    <Wraper>
      <Header
        currentQuestion={pathname.id}
        totalQuestions={quiz.totalQuestions}
      />
      {components[pathname.id]}
    </Wraper>
  );
};

const Wraper = styled.div`
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default QuizPage;
