import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { _get, _post } from "../api/apiClient";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Cases = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthAdvocateContext);

  useEffect(() => {
    const fetchClientAndCases = async () => {
      setIsLoading(true);
      try {
        const clientResponse = await toast.promise(
          _get(`/client/getclient/${id}`),
          {
            loading: "Loading cases...",
            success: "Cases loaded successfully!",
            error: "Error loading cases. Please try again.",
          }
        );
        setClient(clientResponse?.data?.data);

        const casesResponse = await _post(`/case/getCaseOfClient/${id}`, {
          advocateId: user._id,
        });
        setCases(casesResponse.data.data || []);
      } catch (error) {
        toast.error("Error fetching client or cases.");
        console.error("Error fetching client or cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientAndCases();
  }, [id, user._id]);

  const handleViewLinkClick = (link) => {
    if (link !== "javascript:void(0);") {
      window.open(link, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
        <ClipLoader color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="h-auto bg-gray-800 flex items-center justify-center p-8">
      <div className="w-full max-w-8xl border border-gray-50 rounded-lg p-8 text-slate-100">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border border-gray-100">
            <img
              src={client?.profilePicture}
              alt="Client Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-4">
              {client?.firstName} {client?.middleName} {client?.lastName}
            </h1>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {client?.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Phone Number:</strong> {client?.phoneNumber}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Cases</h2>
        {cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {cases.map((caseItem) => (
              <div
                key={caseItem._id}
                className="border p-4 rounded-lg shadow-lg bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {caseItem.caseTitle}
                </h3>
                <p className="text-gray-300 mb-2">
                  <strong>Serial Number:</strong> {caseItem.serialNumber}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Case Details:</strong> {caseItem.caseDetails}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Petitioner vs Respondent:</strong>{" "}
                  {caseItem.petitionerVsRespondent}
                </p>
                <p
                  className={`${
                    caseItem.status === "PENDING"
                      ? "text-red-400"
                      : caseItem.status === "DISPOSED"
                      ? "text-green-400"
                      : "text-gray-300"
                  } mb-2`}
                >
                  <strong>Status:</strong> {caseItem.status}
                </p>
                <button
                  onClick={() => handleViewLinkClick(caseItem.viewLink)}
                  className="text-blue-400 hover:underline"
                >
                  View Case
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No cases found for this client.</p>
        )}
      </div>
    </div>
  );
};

export default Cases;
