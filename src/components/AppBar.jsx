import styled from "styled-components";
import { Context } from "../context";
import React, { useContext } from "react";

function AppBar() {
  const [context] = useContext(Context);

  return (
    <Wrapper>
      <div className="user-info">
        inLove | {context.userName}: {context.coupleStatus}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 1rem 10rem;
  align-items: center;
  text-align: center;
`;

export default AppBar;
