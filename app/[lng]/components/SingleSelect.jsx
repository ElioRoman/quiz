"use client";
import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";
import { useTranslation } from "../../../i18n/client";

const SingleSelect = ({ lng }) => {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation(lng);

  const handleClick = (e) => {
    const data = {
      order: Number(params.id),
      title: t(`quiz${params.id}.question`),
      type: "single-select",
      answer: e.target.innerText,
    };
    const localStorageData = getFromLocalStorage("quizData");
    saveToLocalStorage(`quizData`, { ...localStorageData, [params.id]: data });

    router.push(`/quiz/${Number(params.id) + 1}`, { scroll: false });
  };
  const question = t(`quiz${params.id}.question`);
  const subQuestion = t(`quiz${params.id}.subQuestion`);
  const questionsList = t(`quiz${params.id}.questionsList`, {
    returnObjects: true,
  });

  return (
    <div>
      <QuestionTitle>{question}</QuestionTitle>
      <QuestionSubTitle>{subQuestion}</QuestionSubTitle>
      {questionsList.map((question, index) => (
        <QuestionList onClick={(e) => handleClick(e)} key={index}>
          <option>{question}</option>
        </QuestionList>
      ))}
    </div>
  );
};

const QuestionList = styled.li`
  list-style-type: none;
  cursor: pointer;
  margin: 16px 0;
  padding: 16px 8px;
  color: #fff;
  border: 1px solid lightgrey;
  background-color: #2c003e;
  border-radius: 12px;
`;

const QuestionTitle = styled.h3`
  color: white;
  font-size: 24px;
  margin-top: 16px;
`;

const QuestionSubTitle = styled.h5`
  color: #c4c8cc;
  font-size: 18px;
  margin-top: 16px;
`;

export default SingleSelect;
