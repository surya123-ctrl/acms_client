import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { _get, _post } from "../api/apiClient";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const { user } = useContext(AuthAdvocateContext);

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);

      try {
        const clientResponse = await toast.promise(
          _get(`/client/getclient/${id}`),
          {
            loading: "Loading client details...",
            success: "Client details loaded successfully!",
            error: "Error loading client details. Please try again.",
          }
        );

        const clientData = clientResponse?.data?.data;
        setClient(clientData);

        const caseResponse = await _post(`/case/getCaseOfClient/${id}`, {
          advocateId: user._id,
        });
        console.log(caseResponse.data.data);
        setCases(caseResponse?.data?.data || []);

      } catch (error) {
        console.error("Error fetching client details or cases", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleAddCaseClick = () => {
    navigate(`/client/${id}/add-case`);
  };

  const handleEditClientClick = () => {
    navigate(`/client/${id}/edit`);
  };

  const handleViewCaseClick = () => {
    if (cases.length > 0) {
      navigate(`/case/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
        <ClipLoader color="#ffffff" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
        <p>Client not found.</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl border border-gray-50 rounded-lg p-8 text-slate-100">
        <h1 className="text-3xl font-semibold mb-4">
          {client.firstName} {client.middleName} {client.lastName}
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border border-gray-100">
            <img
              src={client.profilePicture}
              alt="Client Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 mt-8">
            <p className="text-lg mb-2">
              <strong>Email:</strong> {client.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Phone Number:</strong> {client.phoneNumber}
            </p>
            <div className="text-lg mb-4">
              <strong>Case Types:</strong>{" "}
              {cases.length > 0
                ? cases.map((caseDetail) => (
                    <span
                      key={caseDetail._id}
                      style={{
                        color:
                          caseDetail.status === "PENDING"
                            ? "red"
                            : caseDetail.status === "DISPOSED"
                            ? "green"
                            : "inherit",
                      }}
                    >
                      {caseDetail.caseDetails}
                    </span>
                  )).reduce((prev, curr) => [prev, ", ", curr])
                : "No cases assigned"}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddCaseClick}
                className="bg-green-500 text-white px-4 py-2 rounded-md border border-green-700 hover:bg-green-600"
              >
                Add Case Details
              </button>
              <button
                onClick={handleEditClientClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-700 hover:bg-blue-600"
              >
                Edit Client
              </button>
              <button
                onClick={handleViewCaseClick}
                disabled={cases.length === 0}
                className={`${
                  cases.length > 0
                    ? "bg-purple-500 hover:bg-purple-600 border-purple-700"
                    : "bg-gray-500 cursor-not-allowed border-gray-700"
                } text-white px-4 py-2 rounded-md`}
              >
                View Cases
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
