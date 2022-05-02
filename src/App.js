import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Pages from "./pages/Home/Pages";
import Category from "./components/Category";
import Authentification from "./pages/Authentification/Authentification";

function App() {
  const [authorizationState, SetAuthorizationState] = useState("authorized");
  const authorize = () => {
    SetAuthorizationState("authorized");
  };

  return (
    <div className="App">
      <BrowserRouter>
        {authorizationState === "authorization" && <Authentification />}
        {authorizationState === "authorized" && <Search />}
        {authorizationState === "authorized" && <Category />}
        {authorizationState === "authorized" && <Pages />}
      </BrowserRouter>
    </div>
  );
}
export default App;
