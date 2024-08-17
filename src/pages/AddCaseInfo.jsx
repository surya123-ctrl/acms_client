import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { _get, _post } from "../api/apiClient";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { AuthAdvocateContext } from "../context/AuthAdvocateContext";

const caseTypesList = [
  { value: "90", label: "A227 - MATTERS UNDER ARTICLE 227" },
  { value: "106", label: "A228 - MATTERS UNDER ARTICLE 228" },
  { value: "123", label: "A340 - APPLICATION U/S 340" },
  { value: "102", label: "A372 - CRL. MISC. APPLICATION U/S 372" },
  { value: "103", label: "A372D - CRL. MISC. APPLICATION U/S 372 DEFECTIVE" },
  { value: "15", label: "A378 - CRL. MISC. APPLICATION U/S 378" },
  { value: "38", label: "A378D - CRL. MISC. APPLICATION U/s 378 DEFECTIVE" },
  { value: "112", label: "A389 - CRL MISC APPLICATION U/S 389(2)" },
  { value: "17", label: "A482 - APPLICATION U/s 482" },
  { value: "121", label: "A483 - APPLICATION U/s 483" },
  { value: "127", label: "ABAIL - ANTICIPATORY BAIL" },
  {
    value: "137",
    label: "ABAILC - CRIMINAL MISC ANTICIPATORY BAIL CANCELLATION APPLICATION",
  },
  { value: "50", label: "AMAL - AMALGAMATION ORDER" },
  { value: "89", label: "APPL - APPLICATION" },
  { value: "40", label: "ARBT - CIVIL MISC. ARBITRATION APPLICATION" },
  { value: "41", label: "ARCO - ARBITRATION&CONCILI. APPL.U/s11(4)" },
  { value: "124", label: "ARPL - APPEAL U/s 37 OF ARBT AND CONCILIATION A" },
  { value: "126", label: "ARPLD - APPEAL U/s 37 OF ARBT AND CONCILIATION A" },
  { value: "16", label: "BAIL - CRIMINAL MISC. BAIL APPLICATION" },
  { value: "107", label: "BAILC - CRIMINAL MISC. BAIL CANCELLATION APPL." },
  { value: "151", label: "C14A1 - Appeal against acquittal in SC/ST Act" },
  {
    value: "152",
    label: "C14A1D - Appeal against acquittal in SC/ST Act defective",
  },
  { value: "100", label: "C372 - CRIMINAL APPEAL U/S 372 Cr.PC." },
  { value: "101", label: "C372D - CRIMINAL APPEAL U/S 372 Cr.PC DEFECTIVE" },
  { value: "108", label: "C378 - CRIMINAL APPEAL U/S 378 CR.PC." },
  { value: "109", label: "C378D - CRIMINAL APPEAL U/S 378 Cr.PC DEFECTIVE" },
  { value: "18", label: "CAPL - CONTEMPT APPLICATION (CIVIL)" },
  { value: "51", label: "CAPT - CAPITAL CASES" },
  { value: "83", label: "CAPTD - CAPITAL CASE DEFECTIVE" },
  { value: "65", label: "CEAP - CENTRAL EXCISE REFERENCE APPLICATION" },
  { value: "66", label: "CEAPD - CENTRAL EXCISE REFERENCE APPL. DEFECTIVE" },
  { value: "84", label: "CERA - CENTRAL EXCISE REFERENCE APPLICATION" },
  { value: "104", label: "CERAD - CENTRAL EXCISE REFERENCE APPL. DEFECTIVE" },
  { value: "59", label: "CERE - CENTRAL EXCISE REFERENCE" },
  { value: "60", label: "CERED - CENTRAL EXCESE REFERENCE DEFECTIVE" },
  { value: "74", label: "CEXA - CENTRAL EXCISE APPEAL" },
  { value: "75", label: "CEXAD - CENTRAL EXCISE APPEAL DEFECTIVE" },
  { value: "6", label: "CLRE - CIVIL REVISION" },
  { value: "37", label: "CLRED - CIVIL REVISION DEFECTIVE" },
  { value: "131", label: "CMRA - CIVIL MISC REVIEW APPLICATION" },
  { value: "133", label: "CMRAD - CIVIL MISC REVIEW APP-DEFECTIVE" },
  { value: "69", label: "COMA - COMPANY APPEAL" },
  { value: "80", label: "COMAD - COMPANY APPEAL DEFECTIVE" },
  { value: "11", label: "COMP - COMPANY APPLICATION" },
  { value: "32", label: "CONA - CONTEMPT APPEAL" },
  { value: "55", label: "CONAD - CONTEMPT APPEAL DEFECTIVE" },
  { value: "26", label: "COPP - COMPANY PETITION" },
  { value: "29", label: "COSU - COMPANY ORIGINAL SUIT" },
  { value: "28", label: "CRCL - CONTEMPT APPLICATION (CRIMINAL)" },
  { value: "98", label: "CREF - CRIMINAL REFERENCE" },
  { value: "99", label: "CREFD - CRIMINAL REFERENCE DEFECTIVE" },
  { value: "13", label: "CRLA - CRIMINAL APPEAL" },
  { value: "35", label: "CRLAD - CRIMINAL APPEAL DEFECTIVE" },
  { value: "30", label: "CRLP - CRIMINAL MISC. WRIT PETITION" },
  { value: "14", label: "CRLR - CRIMINAL REVISION" },
  { value: "36", label: "CRLRD - CRIMINAL REVISION DEFECTIVE" },
  { value: "119", label: "CROB - CROSS OBJECTION" },
  { value: "105", label: "CRPIL - CRIMINAL WRIT-PUBLIC INTEREST LITIGATION" },
  { value: "130", label: "CRRA - CRIMINAL REVIEW APPLICATION" },
  { value: "132", label: "CRRAD - CRIMINAL MISC REVIEW APP-DEFECTIVE" },
  { value: "94", label: "CUSA - CUSTOMS APPEAL" },
  { value: "95", label: "CUSAD - CUSTOM APPEAL DEFECTIVE" },
  { value: "115", label: "DUMMYC - DUMMY CIVIL" },
  { value: "116", label: "DUMMYCR - DUMMY CRIMINAL" },
  { value: "76", label: "EAPL - ESTATE DUTY APPEAL" },
  { value: "77", label: "EAPLD - ESTATE DUTY APPEAL DEFECTIVE" },
  { value: "33", label: "ECASE - EXECUTION CASE" },
  { value: "44", label: "EDAP - ESTATE DUTY APPLICATION" },
  { value: "67", label: "EDAPD - ESTATE DUTY REFERENCE APPL. DEFECTIVE" },
  { value: "46", label: "EDRE - ESTATE DUTY REFERENCE" },
  { value: "61", label: "EDRED - ESTATE DUTY REFERENCE DEFECTIVE" },
  { value: "134", label: "EFAPL - EQUATION FIRST APPEAL" },
  { value: "135", label: "EFAPLD - EQUATION FIRST APPEAL DEFECTIVE" },
  { value: "27", label: "ELEP - ELECTION PETITION" },
  { value: "3", label: "FAFO - FIRST APPEAL FROM ORDER" },
  { value: "25", label: "FAFOD - FIRST APPEAL FROM ORDER DEFECTIVE" },
  { value: "1", label: "FAPL - FIRST APPEAL" },
  { value: "23", label: "FAPLD - FIRST APPEAL DEFECTIVE" },
  { value: "96", label: "FEXA - FOREIGN EXCHANGE APPEAL" },
  { value: "97", label: "FEXAD - FOREIGN EXCHANGE APPEAL DEFECTIVE" },
  { value: "78", label: "GAPL - GIFT TAX APPEAL" },
  { value: "79", label: "GAPLD - GIFT TAX APPEAL DEFECTIVE" },
  { value: "81", label: "GOVA - GOVERNMENT APPEAL" },
  { value: "82", label: "GOVAD - GOVERNMRNT APPEAL DEFECTIVE" },
  { value: "128", label: "GSTAL - GOODS AND SERVICE TAX APPEAL" },
  { value: "129", label: "GSTALD - GOODS AND SERVICE TAX APPEAL DEFECTIVE" },
  { value: "57", label: "GTAP - GIFT TAX APPLICATION" },
  { value: "68", label: "GTAPD - GIFT TAX REFERENCE APPL. DEFECTIVE" },
  { value: "53", label: "GTRE - GIFT TAX REFERENCE" },
  { value: "63", label: "GTRED - GIFT TAX REFERENCE DEFECTIVE" },
  { value: "88", label: "HABC - HABEAS CORPUS WRIT PETITION" },
  { value: "70", label: "IAPL - INCOME TAX APPEAL" },
  { value: "71", label: "IAPLD - INCOME TAX APPEAL DEFECTIVE" },
  { value: "10", label: "ITAP - INCOME TAX APPLICATION" },
  { value: "39", label: "ITAPD - INCOME TAX APPLICATION DEFECTIVE" },
  { value: "7", label: "ITRE - INCOME TAX REFERENCE" },
  { value: "62", label: "ITRED - INCOME TAX REFERENCE DEFECTIVE" },
  { value: "85", label: "JAPL - JAIL APPEAL" },
  { value: "86", label: "JAPLD - JAIL APPEAL DEFECTIVE" },
  { value: "49", label: "MCOA - MISC. COMPANY APPLICATION" },
  { value: "54", label: "MTAL - MATRIMONIAL" },
  { value: "145", label: "NA379 - Criminal Misc. Application U/s 379 BNSS" },
  { value: "146", label: "NA413 - Criminal Misc. Application U/s 413 BNSS" },
  {
    value: "147",
    label: "NA413D - Criminal Misc. Application U/s 413 BNSS Defective",
  },
  { value: "148", label: "NA419 - Criminal Misc. Application U/s 419 BNSS" },
  {
    value: "149",
    label: "NA419D - Criminal Misc. Application U/s 419 BNSS Defective",
  },
  { value: "150", label: "NA430 - Criminal Misc. Application U/s 430(2) BNSS" },
  { value: "138", label: "NA528 - Application u/s 528 BNSS" },
  { value: "139", label: "NA529 - Application u/s 529 BNSS" },
  {
    value: "144",
    label: "NABAIL - Criminal Misc. Anticipatory Bail Application U/s 482 BNSS",
  },
  { value: "140", label: "NC413 - Criminal Appeal U/s 413 BNSS" },
  { value: "141", label: "NC413D - Criminal Appeal U/s 413 BNSS Defective" },
  { value: "142", label: "NC419 - Criminal Appeal U/s 419 BNSS" },
  { value: "143", label: "NC419D - Criminal Appeal U/s 419 BNSS Defective" },
  { value: "93", label: "OLR - OFFICIAL LIQUIDATOR REPORTS" },
  { value: "113", label: "OSUT - ORIGINAL SUIT" },
  { value: "114", label: "PRCS - PROBATE CASE" },
  { value: "45", label: "REFC - REFERENCE AGAINST MISC. ACTS." },
  { value: "87", label: "REFE - REFERRED CASE(CAPITAL CASE)" },
  { value: "118", label: "RERA - RERA APPEAL" },
  { value: "120", label: "RERAD - RERA APPEAL DEFECTIVE" },
  { value: "31", label: "SAFO - SECOND APPEAL FROM ORDER" },
  { value: "91", label: "SAFOD - SECOND APPEAL FROM ORDER DEFECTIVE" },
  { value: "125", label: "SAMC - SECOND APPEAL MISC CASES" },
  { value: "2", label: "SAPL - SECOND APPEAL" },
  { value: "24", label: "SAPLD - SECOND APPEAL DEFECTIVE" },
  { value: "5", label: "SCAP - SUPREME COURT APPEAL" },
  { value: "122", label: "SCAPD - SUPREME COURT APPEAL DEFECTIVE" },
  { value: "110", label: "SCCR - S.C.C. REVISION" },
  { value: "111", label: "SCCRD - S.C.C. REVISION DEFECTIVE" },
  { value: "4", label: "SPLA - SPECIAL APPEAL" },
  { value: "34", label: "SPLAD - SPECIAL APPEAL DEFECTIVE" },
  { value: "8", label: "STRE - SALES/TRADE TAX REVISION" },
  { value: "42", label: "STRED - SALES/TRADE TAX REVISION DEFECTIVE" },
  { value: "9", label: "TACL - TRANSFER APPLICATION (CIVIL)" },
  { value: "43", label: "TACLD - TRANSFER APPLICATION DEFECTIVE(CIVIL)" },
  { value: "19", label: "TACR - TRANSFER APPLICATION (CRIMINAL)" },
  { value: "12", label: "TEST - TESTAMENTARY CASE" },
  { value: "56", label: "TESU - TESTAMENTARY SUIT" },
  { value: "72", label: "WAPL - WEALTH TAX APPEAL" },
  { value: "73", label: "WAPLD - WEALTH TAX APPEAL DEFECTIVE" },
  { value: "92", label: "WPIL - WRIT - PUBLIC INTEREST LITIGATION" },
  { value: "20", label: "WRIA - WRIT - A" },
  { value: "21", label: "WRIB - WRIT - B" },
  { value: "22", label: "WRIC - WRIT - C" },
  { value: "52", label: "WTAP - WEALTH TAX APPLICATION" },
  { value: "58", label: "WTAPD - WEALTH TAX APPLICATION DEFECTIVE" },
  { value: "117", label: "WTAR - WEALTH TAX REFERENCE" },
  { value: "64", label: "WTARD - WEALTH TAX REFERENCE DEFECTIVE" },
  { value: "47", label: "WTAX - WRIT TAX" },
  { value: "48", label: "WTRE - W.T.R." },
];

const AddCaseInfo = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [caseDetails, setCaseDetails] = useState({
    caseTitle: "",
    caseDescription: "",
    case_type: "",
    case_no: "",
    case_year: "",
    additionalDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setUser } = useContext(AuthAdvocateContext);
  const [cases, setCases] = useState([]);
  console.log(user._id);
  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);

      try {
        const response = await _get(`/client/getclient/${id}`);
        setClient(response?.data?.data);

        const caseResponse = await _post(`/case/getCaseOfClient/${id}`, {
          advocateId: user._id,
        });
        setCases(caseResponse?.data?.data || []);
      } catch (error) {
        console.error("Error loading client details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClient();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await _post(`/case/postCaseOfClient/${id}`, {
        ...caseDetails,
        captchacode: 8127,
        advocateId: user._id,
      });
      toast.success("Case details submitted successfully!");
    } catch (error) {
      console.error("Error submitting case details:", error);
      toast.error("Failed to submit case details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <ClipLoader color="#ffffff" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Client not found.</p>
      </div>
    );
  }

  return (
    <div className="h-auto bg-gray-900 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-8 text-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Add Case Details for {client.firstName} {client.middleName}{" "}
          {client.lastName}
        </h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border border-gray-500">
            <img
              src={client.profilePicture}
              alt="Client Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg mb-2">
              <strong>Email:</strong> {client.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Phone Number:</strong> {client.phoneNumber}
            </p>
            <div className="text-lg mb-4">
              <strong>Case Types:</strong>{" "}
              {cases.length > 0
                ? cases
                    .map((caseDetail) => (
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
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])
                : "No cases assigned"}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Case Information</h2>
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="caseTitle" className="block text-lg mb-2">
              Case Title:
            </label>
            <input
              type="text"
              id="caseTitle"
              name="caseTitle"
              value={caseDetails.caseTitle}
              onChange={handleChange}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="caseDescription" className="block text-lg mb-2">
              Case Description:
            </label>
            <textarea
              id="caseDescription"
              name="caseDescription"
              value={caseDetails.caseDescription}
              onChange={handleChange}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="case_type" className="block text-lg mb-2">
              Case Type:
            </label>
            <select
              id="case_type"
              name="case_type"
              value={caseDetails.case_type}
              onChange={handleChange}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500"
              required
            >
              <option value="" disabled>
                Select a case type
              </option>
              {caseTypesList.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="case_no" className="block text-lg mb-2">
              Case Number:
            </label>
            <input
              type="text"
              id="case_no"
              name="case_no"
              value={caseDetails.case_no}
              onChange={handleChange}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="case_year" className="block text-lg mb-2">
              Case Year:
            </label>
            <input
              type="text"
              id="case_year"
              name="case_year"
              value={caseDetails.case_year}
              onChange={handleChange}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="additionalInfo" className="block text-lg mb-2">
              Additional Information:
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={caseDetails.additionalInfo}
              onChange={handleChange}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              "Submit Case"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCaseInfo;
