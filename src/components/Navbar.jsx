import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(AuthAdvocateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsModalOpen(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Function to format date and time
  const formatDateTime = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(formatDateTime(new Date()));
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Home</span>
            </Link>
            <Link
              to="#features"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Features</span>
            </Link>
            <Link
              to="#clients"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Clients</span>
            </Link>
            <Link
              to="#pricing"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Pricing</span>
            </Link>
            <Link
              to="#contact"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Contact</span>
            </Link>
            {user && (
              <Link
                to="/add-client"
                className="link-transition text-xl text-white font-medium relative overflow-hidden"
              >
                <span>Add Client</span>
              </Link>
            )}
            {user && (
              <Link
                to="/client"
                className="link-transition text-xl text-white font-medium relative overflow-hidden"
              >
                <span>Clients</span>
              </Link>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <div className="text-gray-100 text-sm mr-4">
                  {currentDateTime}
                </div>
                <div className="relative">
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-lime-400 cursor-pointer"
                    onClick={toggleModal}
                  />
                  {isModalOpen && (
                    <div className="absolute right-0 mt-2 w-auto bg-gray-800 rounded-md shadow-lg py-2 px-2 z-10">
                      <p className="text-gray-100 mt-2">
                        {user.firstName +
                          " " +
                          user.middleName +
                          " " +
                          user.lastName}
                      </p>
                      <p className="text-gray-100 mt-2">{user.email}</p>
                      <p className="text-gray-100 mt-2">{user.phoneNumber}</p>
                      <p className="text-gray-100 mt-2">{user._id}</p>
                      <Link
                        onClick={handleLogout}
                        className="block text-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md mt-2"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="button-transition bg-lime-400 text-xl text-white px-4 py-2 rounded border border-lime-400 relative overflow-hidden"
                >
                  <span className="relative z-10">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="button-transition text-xl text-white px-4 py-2 rounded border border-lime-400 relative overflow-hidden"
                >
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
