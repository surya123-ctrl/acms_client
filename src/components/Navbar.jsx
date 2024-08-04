import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const advocateLoggedInDetails = useContext(AuthAdvocateContext);
  console.log("navbar", advocateLoggedInDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsModalOpen(false);
    advocateLoggedInDetails.setIsAdvocateLoggedIn(null);
    localStorage.setItem("acms_advocate_user", null);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <a
              href="/"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Home</span>
            </a>
            <a
              href="#features"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Features</span>
            </a>
            <a
              href="#clients"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Clients</span>
            </a>
            <a
              href="#pricing"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Pricing</span>
            </a>
            <a
              href="#contact"
              className="link-transition text-xl text-white font-medium relative overflow-hidden"
            >
              <span>Contact</span>
            </a>
          </div>
          <div className="flex space-x-4">
            {advocateLoggedInDetails?.isAdvocateLoggedIn ? (
              <div className="relative">
                <img
                  src={
                    advocateLoggedInDetails?.isAdvocateLoggedIn?.data.user
                      .profilePicture
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-lime-400 cursor-pointer"
                  onClick={toggleModal}
                />
                {isModalOpen && (
                  <div className="absolute right-0 mt-2 w-auto bg-gray-800 rounded-md shadow-lg py-2 px-2">
                    <p className="text-gray-100 mt-2">
                      {advocateLoggedInDetails?.isAdvocateLoggedIn?.data?.user
                        .firstName +
                        " " +
                        advocateLoggedInDetails?.isAdvocateLoggedIn?.data?.user
                          .middleName +
                        " " +
                        advocateLoggedInDetails?.isAdvocateLoggedIn?.data?.user
                          .lastName}
                    </p>
                    <p className="text-gray-100 mt-2">
                      {
                        advocateLoggedInDetails?.isAdvocateLoggedIn?.data?.user
                          .email
                      }
                    </p>
                    <p className="text-gray-100 mt-2">
                      {
                        advocateLoggedInDetails?.isAdvocateLoggedIn?.data?.user
                          .phoneNumber
                      }
                    </p>
                    <p className="text-gray-100 mt-2">
                      {
                        advocateLoggedInDetails?.isAdvocateLoggedIn?.data?.user
                          ._id
                      }
                    </p>
                    <Link
                      // to="/login"
                      onClick={handleLogout}
                      className="block text-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md mt-2"
                    >
                      Logout
                    </Link>
                  </div>
                )}
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
