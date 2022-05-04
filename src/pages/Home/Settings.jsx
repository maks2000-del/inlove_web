import React, { useContext } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Context } from "../../context";

function Settings() {
  const [context, setContext] = useContext(Context);
  const [secondUserName, setSecondUserName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchRequestInfo = async () => {
    try {
      const couple = await checkForParthnersRequest();
      console.log(couple);
      if (couple.boy_id === context.userId) {
        await getUserById(couple.girl_id);
      }
      if (couple.girl_id === context.userId) {
        await getUserById(couple.boy_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const userData = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: "GET",
      });
      const user = await userData.json();

      setSecondUserName(user.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByName = async (userName) => {
    try {
      const userData = await fetch(
        `http://localhost:3001/api/user/name/${userName}`,
        {
          method: "GET",
        }
      );
      const user = await userData.json();
      console.log(user.id);
      return user.id;
    } catch (error) {
      console.log(error);
    }
  };

  const checkForParthnersRequest = async () => {
    const coupleData = await fetch(
      `http://localhost:3001/api/coupleById/${context.userId}`,
      {
        method: "GET",
      }
    );
    if (coupleData.status === 505 || coupleData.status === 505) {
      console.log(coupleData.statusText);
      return "error";
    } else {
      const couple = await coupleData.json();
      const newContextData = {
        authorized: context.authorized,
        userId: context.userId,
        userName: context.userName,
        userEmail: context.userEmail,
        userSex: context.userSex,
        coupleId: couple.id,
        coupleStatus: couple.status,
      };
      setContext(newContextData);
      return couple;
    }
  };

  const sendCoupleRequest = async (secondUserId) => {
    let inputData =
      context.userSex === "male"
        ? {
            boyId: context.userId,
            girlId: secondUserId,
            status: "request",
          }
        : {
            boyId: secondUserId,
            girlId: context.userId,
            status: "request",
          };
    console.log(inputData);
    const coupleData = await fetch(`http://localhost:3001/api/couple`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });
    const couple = await coupleData.json();
    const newContextData = {
      authorized: context.authorized,
      userId: context.userId,
      userName: context.userName,
      userEmail: context.userEmail,
      userSex: context.userSex,
      coupleId: couple.id,
      coupleStatus: "request",
    };
    setContext(newContextData);
    return couple;
  };

  const updateCoupleStatus = async (status) => {
    let inputData = {
      status: status,
    };

    const coupleData = await fetch(
      `http://localhost:3001/api/couple/${context.coupleId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      }
    );
    const couple = await coupleData.json();
    const newContextData = {
      authorized: context.authStatus,
      userId: context.id,
      userName: context.name,
      userEmail: context.email,
      userSex: context.sex,
      coupleId: context.coupleId,
      coupleStatus: couple.status,
    };
    setContext(newContextData);
    console.log(context.coupleStatus);
  };

  useEffect(() => {
    fetchRequestInfo();
  }, []);

  return (
    <div>
      {context.coupleStatus === "none" && (
        <FormStyle onSubmit={submitHandler}>
          <div className="text">
            <h4>Send request to yout parthner</h4>
          </div>
          <div className="input_and_button">
            <div>
              <input
                onChange={(e) => {
                  setSecondUserName(e.target.value);
                }}
                type="text"
                value={secondUserName}
              />
            </div>
            <Button
              onClick={async () => {
                const secondUserId = await getUserByName(secondUserName);
                if (secondUserId) {
                  sendCoupleRequest(secondUserId);
                }
              }}
            >
              Send
            </Button>
          </div>
        </FormStyle>
      )}
      {context.coupleStatus === "request" && (
        <FormStyle>
          <h4>You have couples' request from user: {secondUserName}</h4>
          <div>
            <Button
              onClick={async () => {
                updateCoupleStatus("accepted");
              }}
            >
              Accept
            </Button>
          </div>
        </FormStyle>
      )}
      {context.coupleStatus === "accepted" && <div></div>}
    </div>
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
