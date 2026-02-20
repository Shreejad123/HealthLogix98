import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SurgeryTable from "./surgeryTable";
import SurgerySearch from "./searchbar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [surgeryList, setSurgeryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("surgeryList");
    if (savedData) {
      setSurgeryList(JSON.parse(savedData));
    }
  }, []);

  const filteredSurgeries =
    searchTerm.trim() === ""
      ? surgeryList
      : surgeryList.filter((surgery) =>
          surgery.patientFullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );

  // Add new surgery
  const handleAddClick = () => {
    navigate("/add-surgery");
  };

  // Edit surgery (passed to SurgeryTable)
  const handleEdit = (index) => {
    navigate(`/edit-surgery/${index}`);
  };

  // Delete surgery (passed to SurgeryTable)
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedList = surgeryList.filter((_, i) => i !== index);
      setSurgeryList(updatedList);
      localStorage.setItem("surgeryList", JSON.stringify(updatedList));
    }
  };

  // Handle search input from SurgerySearch component
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className="text mb-4">Surgeries</h1>
      <SurgerySearch searchTerm={searchTerm} handleSearch={handleSearch} />
      <button onClick={handleAddClick} className="btn btn-secondary">
        Add Surgery
      </button>
      {surgeryList.length === 0 ? (
        <p style={{ color: "red", marginTop: "20px" }}>
          No surgeries added yet.
        </p>
      ) : (
        <>
          {filteredSurgeries.length > 0 ? (
            <SurgeryTable
              surgeryList={filteredSurgeries}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p style={{ color: "red", marginTop: "20px" }}>
              No surgeries found for "{searchTerm}"
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
