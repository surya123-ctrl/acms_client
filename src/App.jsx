import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import LandingPageSection9 from "./components/LandingPageSection9";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <LandingPageSection9 />
      </BrowserRouter>
    </>
  );
};

export default App;
