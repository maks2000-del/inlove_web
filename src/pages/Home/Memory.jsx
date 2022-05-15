import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Memory() {
  let params = useParams();
  const [details, SetDetails] = useState({});

  const fetchMemory = async (id) => {
    const data = await fetch(`http://localhost:3001/api/memory/${id}`);
    const detailData = await data.json();
    detailData.memory_date = detailData.memory_date.toString().substring(0, 10);
    SetDetails(detailData);
  };

  useEffect(() => {
    fetchMemory(params.id);
  }, [params.id]);

  return (
    <Wrapper>
      <h2>{details.title}</h2>
      <DetailWrapper>
        <div>
          <img src={`http://localhost:3001/${details.photos_id}`} alt=""></img>
        </div>
        <Info>
          <h4>date: {details.memory_date}</h4>
          <h4>location: {details.location}</h4>
          <h4>description: {details.description}</h4>
        </Info>
      </DetailWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 2rem 10rem 0rem 10rem;
`;

const DetailWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    font-weight: 500;
    margin-bottom: 2rem;
  }
  h4 {
    font-weight: 450;
    margin-bottom: 1rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    width: 20rem;
  }
`;

const Info = styled.div`
  margin-left: 2rem;
`;

export default Memory;
