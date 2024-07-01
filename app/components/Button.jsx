import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, disabled }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: #e4229c;
  color: white;
  font-size: 18px;
  padding: 16px 0;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  width: 100%;

  &:disabled {
    opacity: 35%;
    cursor: not-allowed;
  }
`;
