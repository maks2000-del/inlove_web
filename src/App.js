import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Home/Pages";
import Authentification from "./pages/Authentification/Authentification";
import { Context } from "./context";

function App() {
  const [context, setContext] = useState({
    authorized: false,
    userId: 0,
    userName: "",
    userEmail: "",
    userSex: "",
    coupleId: 0,
    coupleStatus: "",
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={[context, setContext]}>
          {context.authorized === true ? <Pages /> : <Authentification />}
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
