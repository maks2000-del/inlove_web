import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedRecepies, SetSeatchedRecepies] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recepies = await data.json();
    SetSeatchedRecepies(recepies.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return <Grid>
    {searchedRecepies.map((item) => {
      return <Card key={item.id}>
        <img src={item.image} alt="" />
        <h4>{item.title}</h4>
      </Card>
    })}

  </Grid>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 1rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
