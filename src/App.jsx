import React, { useState } from "react";
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
import { AuthAdvocateContext } from "./context/AuthAdvocateContext";
import Private from "./components/Private";
import AddClient from "./pages/AddClient";
import Client from "./pages/Client";
import ClientDetail from "./pages/ClientDetail";
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <AuthAdvocateContext.Provider
        value={{ user, setUser }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/add-client"
              element={<Private Component={AddClient} />}
            />
            <Route path="/client" element={<Private Component={Client} />} />
            <Route path="/client/:id" element={<Private Component={ClientDetail} />} />
          </Routes>
          <LandingPageSection9 />
        </BrowserRouter>
      </AuthAdvocateContext.Provider>
    </>
  );
};

export default App;
