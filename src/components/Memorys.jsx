import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { Context } from "../context";

import "@splidejs/react-splide/css";

function Memorys() {
  const [context, setContext] = useContext(Context);
  const [memorys, setMemorys] = useState([]);

  useEffect(() => {
    getMemorys();
  }, []);

  const getMemorys = async () => {
    const checkLocalData = localStorage.getItem("memorys");

    if (checkLocalData) {
      getMemorys(JSON.parse(checkLocalData));
    } else {
      const api = await fetch(
        `http://localhost:3001/api/memorys/${context.coupleId}`
      );
      const data = await api.json();

      //localStorage.setItem("popular", JSON.stringify(data.recipes));
      setMemorys(data);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>My memorys</h3>

        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {memorys.map((memory) => {
            return (
              <SplideSlide key={memory.id}>
                <Card>
                  <Link to={"/memory/" + memory.id}>
                    <p>{memory.title}</p>
                    <img src={`http://localhost:3001/${memory.photos_id}`} alt={memory.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 80%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-context: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Memorys;
