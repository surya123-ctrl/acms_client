import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
const App = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
};

export default App;
