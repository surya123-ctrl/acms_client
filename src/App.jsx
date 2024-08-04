import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import AddClient from "./pages/AddClient";
import Navbar from "./components/Navbar";
import LandingPageSection9 from "./components/LandingPageSection9";
import { AuthAdvocateContext } from "./context/AuthAdvocateContext";
import Private from "./components/Private";

const App = () => {
  const [isAdvocateLoggedIn, setIsAdvocateLoggedIn] = useState(
    JSON.parse(localStorage.getItem("acms_advocate_user"))
  );

  return (
    <AuthAdvocateContext.Provider
      value={{ isAdvocateLoggedIn, setIsAdvocateLoggedIn }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-client"
            element={<Private Component={AddClient} />}
          />
        </Routes>
        <LandingPageSection9 />
      </Router>
    </AuthAdvocateContext.Provider>
  );
};

export default App;
