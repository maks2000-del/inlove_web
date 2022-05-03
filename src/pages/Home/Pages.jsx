import React from "react";
import AppBar from "../../components/AppBar";
import Category from "../../components/Category";
import Home from "./Home";
import Searched from "./Searched";
import Recepie from "./Recepie";
import ComplimentConstructor from "./ComplimentConstructor";
import MemoryConstructor from "./MemoryConstructor";
import Settings from "./Settings";
import SpacialDateConstructor from "./SpacialDateConstructor";
import { Route, Routes } from "react-router-dom";

function Pages() {
  return (
    <div>
      <AppBar/>
      <Category/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recepie/:name" element={<Recepie />} />
      <Route path="/complimentConstructor/" element={<ComplimentConstructor />} />
      <Route path="/memoryConstructor/" element={<MemoryConstructor />} />
      <Route path="/settings/" element={<Settings />} />
      <Route path="/spacialDateConstructor/" element={<SpacialDateConstructor />} />
    </Routes>
    </div>
  );
}

export default Pages;
