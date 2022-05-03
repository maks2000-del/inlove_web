import styled from "styled-components";
import { useState } from "react";
import React, { useContext } from "react";
import { Context } from "../../context";

function Authorization() {
  const [context, setContext] = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Email</h4>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            value={email}
          />
        </div>
      </FormStyle>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Repeat your password</h4>
          <input
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
            type="password"
            value={password}
          />
        </div>
        <Button>
          <button
            onClick={async () => {
              console.log(email + " " + password);
              let inputData = {
                email: email,
                password: password,
              };

              const authData = await fetch("http://localhost:3001/api/user/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputData),
              });
              const authInfo = await authData.json();
              const newContextData = {
                authorized: authInfo.authStatus,
                userId: authInfo.id,
                userName: authInfo.name,
                userEmail: authInfo.email,
              };
              setContext(newContextData);
              console.log(authInfo.authStatus);
            }}
          >
            Login
          </button>
        </Button>
      </FormStyle>
    </div>
  );
}

const FormStyle = styled.form`
  h4 {
    margin-bottom: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  div {
    width: 350px;
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 1rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    margin: 1rem;
  }
`;

export default Authorization;
