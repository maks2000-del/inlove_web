import React from "react";
import styled from "styled-components";
import { useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [sex, setSex] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Enter your name</h4>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
          />
        </div>
      </FormStyle>
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
          <h4>Sex</h4>
          <input
            onChange={(e) => {
              setSex(e.target.value);
            }}
            type="text"
            value={sex}
          />
        </div>
      </FormStyle>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Password</h4>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
          />
        </div>
      </FormStyle>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Repeat your password</h4>
          <input
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
            type="password"
            value={repeatedPassword}
          />
        </div>
        <Button>
          <button
            onClick={async () => {
              console.log(
                name +
                  " " +
                  email +
                  " " +
                  sex +
                  " " +
                  password +
                  " " +
                  repeatedPassword
              );
              console.log("registration button pressed");
              let InputData = {
                name: name,
                email: email,
                sex: sex,
                password: password,
              };

              const data = await fetch("http://localhost:3001/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(InputData),
              });
              const response = await data.json();
              console.log(response.status); 
            }}
          >
            Create
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

export default Registration;
