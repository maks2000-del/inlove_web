import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Context } from "../context";

import "@splidejs/react-splide/css";

function Dates() {
  const [context, setContext] = useContext(Context);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    const checkLocalData = localStorage.getItem("dates");

    if (checkLocalData) {
      setDates(JSON.parse(checkLocalData));
    } else {
      try {
        const api = await fetch(
          `http://localhost:3001/api/dates/${context.coupleId}`
        );
        const data = await api.json();

        //localStorage.setItem("dates", JSON.stringify(data.recipes));
        setDates(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>My dates</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {dates.map((date) => {
            return (
              <SplideSlide key={date.id}>
                <Card>
                  <TextInfo>
                    <p>{date.title}</p>
                    <p>{date.action_date.substring(0, 10)}</p>
                  </TextInfo>
                  <Gradient inputColor={dateBGColours[date.bg_color_id]} />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const dateBGColours = {
  0 : "rgba(255, 0, 0, 0.5)",
  1 : "rgba(255, 200, 0, 0.5)",
  2 : "rgba(0, 255, 18, 0.5)",
  3 : "rgba(0, 255, 255, 0.5)",
  4 : "rgba(0, 0, 255, 0.5)",
  5 : "rgba(255, 0, 255, 0.5)",
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const TextInfo = styled.div`
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-context: center;
  align-items: center;
  width: 100%;
  p {
    margin-bottom: 1rem;
    color: white;
    width: 80%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
  }
`;

const Card = styled.div`
  min-height: 12rem;
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
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), ${props => props.inputColor || "rgba(0, 0, 0, 0.5)"});
`;

export default Dates;
