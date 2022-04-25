import styled from "styled-components";
import { useState } from "react";

function MemoryConstructor() {
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [memoryDateText, setMemoryDateText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Enter memory title</h4>
          <input
            onChange={(e) => {
              setMemoryTitle(e.target.value);
            }}
            type="text"
            value={memoryTitle}
          />
        </div>
      </FormStyle>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Memory text</h4>
          <input
            onChange={(e) => {
              setMemoryText(e.target.value);
            }}
            type="text"
            value={memoryText}
          />
        </div>
      </FormStyle>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <h4>Memory date</h4>
          <input
            onChange={(e) => {
              setMemoryDateText(e.target.value);
            }}
            type="text"
            value={memoryDateText}
          />
        </div>
        <Button>
          <button
            onClick={() => {
              console.log(
                memoryTitle + " " + memoryText + " " + memoryDateText
              );
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
  margin: 0rem 10rem;

  h4 {
    margin-bottom: 1rem;
    margin-top: 1rem;
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

export default MemoryConstructor;
