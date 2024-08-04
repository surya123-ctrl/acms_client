import React, { useContext } from "react";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import { useNavigate } from "react-router-dom";

const Private = ({ Component }) => {
  const navigate = useNavigate();
  const advocateLoggedInDetails = useContext(AuthAdvocateContext);

  if (!advocateLoggedInDetails.isAdvocateLoggedIn) {
    navigate("/login");
    return null; // Render nothing while redirecting
  }

  return <Component />;
};

export default Private;
