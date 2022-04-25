import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recepie() {
  let params = useParams();
  const [details, SetDetails] = useState({});
  const [activeTab, SetActiveTab] = useState("instructions");

  const fetchRecepie = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${name}/information/?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    SetDetails(detailData);
  };

  useEffect(() => {
    fetchRecepie(params.name);
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""></img>
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => {
            SetActiveTab("instructions");
          }}
        >
          Instrutions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => {
            SetActiveTab("ingredients");
          }}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
          </div>
        )}
        {activeTab === "ingredients" && (
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {/* <ul>
          {details.extendedIngredients.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          })}
        </ul> */}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;
  display: flex;
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
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 2rem;
`;

export default Recepie;
