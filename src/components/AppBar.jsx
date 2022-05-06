import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";
import React, { useContext } from "react";

function AppBar() {
  const [context] = useContext(Context);

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <Wrapper>
      <div className="logo">inLove</div>
      <div className="search-bar">
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
    </div>
    <div className="user-info">{context.userName}:{context.coupleStatus}</div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 1rem 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  .logo {
    flex: 1;
    text-align: center;
  }
  .user-info {
    flex: 1;
    text-align: center;
  }
  .search-bar {
    flex: 4;
  }
`;

const FormStyle = styled.form`
  

  div {
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

export default AppBar;
