import React, { useContext, useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { _post } from "../api/apiClient";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const AddClient = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: null,
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthAdvocateContext);
  const advocateId = user._id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    toast.promise(
      _post(`/client/add-client/${advocateId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      {
        loading: "Adding client...",
        success: () => {
          resetForm();
          return "Client added successfully!";
        },
        error: "Error adding client. Please try again.",
      }
    ).finally(() => setIsLoading(false));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      profilePicture: null,
      password: ''
    });
    setShowForm(false); // Hide the form after submission
  };

  const handleToggleForm = () => {
    if (showForm) {
      resetForm(); // Clear form entries when closing
    } else {
      setShowForm(true); // Show the form
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4">Add a New Client</h1>
        <p className="text-lg mb-4">
          To add a new client, click the "Add Client" button below to open the form. Fill in the details and submit to add the client.
        </p>
        <button
          onClick={handleToggleForm} // Toggle form visibility and reset form
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          {showForm === false && <MdPersonAdd className="h-6 w-6" />}
          {showForm === false ? ' Add Client' : ' Close Form'}
        </button>
      </div>

      {showForm && (
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
          <button
            type="submit"
            className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={16} color="#ffffff" /> : "Add Client"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddClient;
