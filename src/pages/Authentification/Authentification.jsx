import React, { useState } from "react";
import Authorization from "./Authorization";
import Registration from "./Registration";
import styled from "styled-components";

function Authentification() {
  const [authentificationState, SetAuthentificationState] =
    useState("authorization");

  return (
    <div>
      <FormWrapper>
        <ButtonWrapper>
          <Button
            className={
              authentificationState === "authorization" ? "active" : ""
            }
            onClick={() => {
              SetAuthentificationState("authorization");
            }}
          >
            Authorization
          </Button>
          <Button
            className={authentificationState === "registration" ? "active" : ""}
            onClick={() => {
              SetAuthentificationState("registration");
            }}
          >
            Registration
          </Button>
        </ButtonWrapper>
        {authentificationState === "authorization" && <Authorization />}
        {authentificationState === "registration" && <Registration />}
      </FormWrapper>
    </div>
  );
}
const FormWrapper = styled.div`
  margin: 2rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 0rem 1rem;
  font-weight: 600;
`;

export default Authentification;
