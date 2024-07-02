"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../components/Button";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";
import { useTranslation } from "../../../i18n/client";

const Email = ({ params: { lng } }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email) {
      const emailData = {
        order: "6",
        title: "email",
        type: "email",
        answer: data.email,
      };
      const localStorageData = getFromLocalStorage("quizData");
      saveToLocalStorage(`quizData`, {
        ...localStorageData,
        [emailData.order]: emailData,
      });

      router.push("/thank-you", { scroll: false });
    }
  };

  let disabled = Object.keys(errors).length;

  return (
    <Wraper>
      <Title>{t("email.email")}</Title>;
      <SubTitle>{t("email.enterYourEmail")}</SubTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Button type="submit" disabled={disabled} onClick={onSubmit}>
            {t("email.next")}
          </Button>
        </InputContainer>
      </FormContainer>
    </Wraper>
  );
};

export default Email;

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
const Title = styled.h3`
  color: white;
  font-size: 24px;
  margin-top: 16px;
  text-align: center;
`;

const SubTitle = styled.h3`
  color: #c4c8cc;
  font-size: 18px;
  margin-top: 16px;
  text-align: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.span`
  color: #ff0099;
  margin: 5px 0;
`;
