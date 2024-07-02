"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";
import { saveToLocalStorage, getFromLocalStorage } from "../utils";
import { useTranslation } from "../../../i18n/client";
import Button from "./Button";

const MultipleSelect = ({ lng }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const params = useParams();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const question = t(`quiz${params.id}.question`);
  const subQuestion = t(`quiz${params.id}.subQuestion`);
  const questionsList = t(`quiz${params.id}.questionsList`, {
    returnObjects: true,
  });

  const handleClick = () => {
    const data = {
      order: Number(params.id),
      title: question,
      type: "multiple-select",
      answer: selectedOptions,
    };

    const localStorageData = getFromLocalStorage("quizData") || {};
    saveToLocalStorage("quizData", { ...localStorageData, [params.id]: data });

    if (params.id !== "5") {
      router.push(`/quiz/${Number(params.id) + 1}`, { scroll: false });
    } else {
      router.push("/loader", { scroll: false });
    }
  };

  let disabled = selectedOptions.length === 0;

  if (params.id === "5") {
    disabled = selectedOptions.length === 0 || selectedOptions.length > 3;
  }

  const handleSelectOption = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter(
            (selectedOption) => selectedOption !== option
          )
        : [...prevSelectedOptions, option]
    );
  };

  return (
    <OptionsContainer>
      <QuestionTitle>{question}</QuestionTitle>
      <QuestionSubTitle>{subQuestion}</QuestionSubTitle>
      {questionsList.map((option) => (
        <Option
          key={option}
          onClick={() => handleSelectOption(option)}
          selected={selectedOptions.includes(option)}
        >
          <OptionText>{option}</OptionText>
          <Checkbox selected={selectedOptions.includes(option)} />
        </Option>
      ))}
      <Button onClick={handleClick} disabled={disabled}>
        {t(`quiz${params.id}.next`)}
      </Button>
    </OptionsContainer>
  );
};

export default MultipleSelect;

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

const OptionsContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  cursor: pointer;
  background-color: #2c003e;
  transition: background-color 0.3s ease;
  ${({ selected }) =>
    selected &&
    `
    background-color: #3c004e;
    border-color: #e4229c;
  `}
`;

const OptionText = styled.span`
  color: white;
  font-size: 18px;
`;

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #ff0099;
  background-color: ${({ selected }) => (selected ? "#ff0099" : "transparent")};
`;
