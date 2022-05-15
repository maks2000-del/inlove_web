import React from "react";
import AppBar from "../../components/AppBar";
import NavMenue from "../../components/NavMenu";
import Home from "./Home";
import Memory from "./Memory";
import ComplimentConstructor from "./ComplimentConstructor";
import MemoryConstructor from "./MemoryConstructor";
import Settings from "./Settings";
import SpacialDateConstructor from "./SpacialDateConstructor";
import { Route, Routes } from "react-router-dom";

function Pages() { 
  return (
    <div>
      <AppBar/>
      <NavMenue/>
    <Routes>
      <Route path="/" element={<Settings />} />
      <Route path="/home" element={<Home />} />
      <Route path="/memory/:id" element={<Memory />} />
      <Route path="/complimentConstructor/" element={<ComplimentConstructor />} />
      <Route path="/memoryConstructor/" element={<MemoryConstructor />} />
      <Route path="/settings/" element={<Settings />} />
      <Route path="/spacialDateConstructor/" element={<SpacialDateConstructor />} />
    </Routes>
    </div>
  );
}

export default Pages;
