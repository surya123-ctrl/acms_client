import React, { useContext, useState } from "react";
import IMage from "../assets/slide-1.jpg";
import { _post } from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    caseTypesHandled: "",
    qualification: "",
    profilePicture: null,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await _post("auth/signup", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        caseTypesHandled: "",
        qualification: "",
        profilePicture: null,
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-8">
      <div className="bg-gray-800 text-white flex rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Left side with image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={IMage}
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-lime-400">Sign Up</h2>
          <p className="text-gray-400 mb-8">
            Please fill in the form below to create an account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="middleName" className="block font-medium">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                  required
                />
              </div>
            </div>
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
              <label htmlFor="caseTypesHandled" className="block font-medium">
                Case Type Handled
              </label>
              <select
                id="caseTypesHandled"
                name="caseTypesHandled"
                value={formData.caseTypesHandled}
                onChange={handleInputChange}
                className="form-select mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                required
              >
                <option value="">Select a case type</option>
                <option value="Criminal">Criminal</option>
                <option value="Rape">Rape</option>
                <option value="Property">Property</option>
                <option value="Civil">Civil</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="qualification" className="block font-medium">
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profilePicture" className="block font-medium">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {isLoading ? <ClipLoader size={16} color="#000000" /> : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
