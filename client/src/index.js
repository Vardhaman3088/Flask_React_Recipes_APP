import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateRecipe from "./components/CreateRecipe";
import './styles/main.css'
const App = () => {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/create_recipe" element={<CreateRecipe />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

// ReactDOM.render(<App/>, document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
