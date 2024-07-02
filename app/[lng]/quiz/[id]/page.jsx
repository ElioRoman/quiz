"use client";
import React from "react";
import Header from "../../components/Header.jsx";
import { useParams } from "next/navigation";
import styled from "styled-components";
import SingleSelect from "@/app/[lng]/components/SingleSelect.jsx";
import MultipleSelect from "@/app/[lng]/components/MultipleSelect.jsx";
import LanguageSelector from "../../components/LanguageSelector.jsx";

const QuizPage = ({ params: { lng } }) => {
  const pathname = useParams();
  const totalQuestions = 5;

  const components = {
    1: <LanguageSelector lng={lng} />,
    2: <SingleSelect lng={lng} />,
    3: <SingleSelect lng={lng} />,
    4: <MultipleSelect lng={lng} />,
    5: <MultipleSelect lng={lng} />,
  };

  return (
    <Wraper>
      <Header currentQuestion={pathname.id} totalQuestions={totalQuestions} />
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
