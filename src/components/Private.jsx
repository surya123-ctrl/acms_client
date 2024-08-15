import React, { useContext } from "react";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import { Navigate } from "react-router-dom";

const Private = (props) => {
  const {user, setUser} = useContext(AuthAdvocateContext);
  console.log("Private: ", user);
  return user ? (
    <props.Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default Private;
