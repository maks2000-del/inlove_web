import React, { useContext } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Context } from "../../context";

function Settings() {
  const [context , setContext] = useContext(Context);
  
  let secondUserName = "";
  const [complimentText, setComplimentText] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchRequestInfo = async () => {
    const couple = await checkForParthnersRequest();
    console.log(couple);
    await getUserById(couple.girl_id);
  }

  const getUserById = async (userId) => {
    const userData = await fetch(
      `http://localhost:3001/api/user/${userId}`,
      {
        method: "GET",
      }
    );
    const user = await userData.json();
    console.log(user.name);
    secondUserName = user.name;
  };

  const checkForParthnersRequest = async () => {
    const coupleData = await fetch(
      `http://localhost:3001/api/coupleById/${context.userId}`,
      {
        method: "GET",
      }
    );
    const couple = await coupleData.json();
    return couple;
  };

  // useEffect(() => {
  //   fetchRequestInfo();
  // }, []);

  return (
    <FormStyle onSubmit={submitHandler}>
      <div className="text">
        <h4>Send request to yout parthner</h4>
      </div>
      <div className="input_and_button">
        <div>
          <input
            onChange={(e) => {
              setComplimentText(e.target.value);
            }}
            type="text"
            value={complimentText}
          />
        </div>
        <Button
          onClick={() => {
            fetchRequestInfo();
          }}
        >
          Send
        </Button>
      </div>
      <div>You have couples' request from user: {secondUserName}</div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0rem 10rem;
  display: flex;
  flex-direction: column;

  .input_and_button {
    display: flex;
    button {
      flex: 0.3;
    }
  }
  h4 {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }

  div {
    width: 100%;
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 3rem;
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

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 0rem 2rem;
  font-weight: 600;
  cursor: pointer;
`;

export default Settings;
