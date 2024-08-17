import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import { _get } from "../api/apiClient";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const Client = () => {
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthAdvocateContext);
  const advocateId = user?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      toast
        .promise(
          _get(`/client/getclients/${advocateId}`),
          {
            loading: "Loading clients...",
            success: (response) => {
              setClients(response?.data?.data || []);
              return "Clients loaded successfully!";
            },
            error: "Error loading clients.",
          }
        )
        .finally(() => setIsLoading(false));
    };
    fetchClients();
  }, [advocateId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
        <ClipLoader size={50} color="#ffffff" />
      </div>
    );
  }

  const handleCardClick = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  return (
    <div className="bg-gray-800 p-8 min-h-screen cursor-pointer">
      {clients && clients.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {clients.map((client) => (
            <div
              key={client._id}
              className="w-80 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden mb-4 relative transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleCardClick(client._id)}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
                  src={client.profilePicture}
                  alt="Client Profile"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300">
                  <h2 className="text-2xl font-semibold">
                    {client.firstName} {client.middleName} {client.lastName}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={client.profilePicture}
                      alt="Client Avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      {client.firstName} {client.middleName} {client.lastName}
                    </h3>
                    <p className="text-sm text-gray-400">{client.email}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-300">
                    <strong>Phone Number:</strong> {client.phoneNumber}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-300">
                    <strong>Case Types:</strong>{" "}
                    {client.case.join(", ") || "No cases assigned"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white text-center">No clients available.</div>
      )}
    </div>
  );
};

export default Client;
