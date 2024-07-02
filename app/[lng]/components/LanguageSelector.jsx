"use client";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

const LanguageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LanguageSelector = ({ lng }) => {
  const { t } = useTranslation(lng);
  const params = useParams();

  const languages = [
    { code: "en", label: t("quiz1.questionsList.0") },
    { code: "fr", label: t("quiz1.questionsList.1") },
    { code: "de", label: t("quiz1.questionsList.2") },
    { code: "es", label: t("quiz1.questionsList.3") },
  ];
  const handleClick = (e) => {
    const data = {
      order: Number(params.id),
      title: t(`quiz${params.id}.question`),
      type: "single-select",
      answer: e.target.text,
    };

    const localStorageData = getFromLocalStorage("quizData") || {};
    return saveToLocalStorage(`quizData`, {
      ...localStorageData,
      [params.id]: data,
    });
  };

  return (
    <>
      <QuestionTitle>{t("quiz1.question")}</QuestionTitle>
      <QuestionSubTitle>{t("quiz1.subQuestion")}</QuestionSubTitle>
      <LanguageList>
        {languages.map((lang) => (
          <LanguageItem key={lang.code}>
            <StyledLink
              onClick={(e) => handleClick(e)}
              href={`/${lang.code}/quiz/2`}
            >
              {lang.label}
            </StyledLink>
          </LanguageItem>
        ))}
      </LanguageList>
    </>
  );
};

const StyledLink = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;

  margin: 16px 0;
  padding: 16px 8px;
  color: #fff;
  border: 1px solid lightgrey;
  background-color: #2c003e;
  border-radius: 12px;

  cursor: pointer;
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

const LanguageItem = styled.li``;

export default LanguageSelector;
