// LoginPage.js
import React, { useContext, useState } from "react";
import { _post } from "../api/apiClient";
import ImageSlider from "../components/ImageSlider";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const advocateLoggedInDetails = useContext(AuthAdvocateContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await _post("/auth/login", formData);
      advocateLoggedInDetails?.setIsAdvocateLoggedIn(response.data);
      localStorage.setItem("acms_advocate_user", JSON.stringify(response.data));
      setFormData({
        email: "",
        phoneNumber: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-8">
      <div className="bg-gray-800 text-white flex rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="w-1/2 hidden md:block">
          <ImageSlider />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-lime-400">Login</h2>
          <p className="text-gray-400 mb-8">
            Please enter your credentials to login.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={16} color="#000000" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
