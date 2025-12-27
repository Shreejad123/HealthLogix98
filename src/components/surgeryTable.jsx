import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SurgeryTable = ({ surgeryList = [], onEdit, onDelete }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(surgeryList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = surgeryList.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("/")) return dateString;
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleRowClick = (index) => {
    navigate(`/patient/${index}`);
  };

  return (
    <div>
      <table
        className="table table-striped"
        border="1"
        cellPadding="8"
        style={{ marginTop: "20px" }}
      >
        <thead className="thead-light">
          <tr>
            <th>Patient Name</th>
            <th>Patient No.</th>
            <th>Phone</th>
            <th>Surgery Date</th>
            <th>Stent Removal</th>
            <th>Patient Reminder</th>
            <th>Doctor Reminder</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((surgery, index) => (
              <tr
                key={startIndex + index}
                onClick={() => handleRowClick(startIndex + index)}
              >
                <td>{surgery.patientFullName}</td>
                <td>{surgery.patientNumber}</td>
                <td>{surgery.phoneNumber}</td>
                <td>{formatDate(surgery.surgeryDate)}</td>
                <td>{formatDate(surgery.stentRemovalDate)}</td>
                <td>{surgery.patientReminder ? "✅" : "❌"}</td>
                <td>{surgery.doctorReminder ? "✅" : "❌"}</td>
                <td>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(startIndex + index);
                    }}
                  />
                  <MdDelete
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(startIndex + index);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "red" }}>
                No surgeries found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ marginTop: "15px" }}>
          <button
            className="btn
            btn-secondary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn
            btn-secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SurgeryTable;
