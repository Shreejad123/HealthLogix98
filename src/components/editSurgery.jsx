import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editSurgeries.css";
import Swal from "sweetalert2";

const EditSurgery = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [surgeryList, setSurgeryList] = useState([]);
  const [surgery, setSurgery] = useState({
    patientFullName: "",
    patientNumber: "",
    phoneNumber: "",
    surgeryDate: "",
    stentRemovalDate: "",
    patientReminder: false,
    doctorReminder: false,
  });

  const convertToInputDate = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString;
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const savedData = localStorage.getItem("surgeryList");
    if (savedData) {
      const list = JSON.parse(savedData);
      setSurgeryList(list);

      const selected = list[index];
      if (selected) {
        selected.surgeryDate = convertToInputDate(selected.surgeryDate);
        selected.stentRemovalDate = convertToInputDate(
          selected.stentRemovalDate
        );
        setSurgery(selected);
      }
    }
  }, [index]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSurgery((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedList = [...surgeryList];
    updatedList[index] = surgery;

    setSurgeryList(updatedList);
    localStorage.setItem("surgeryList", JSON.stringify(updatedList));
    Swal.fire("Surgery details updated");
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="container mt-3">
        <form onSubmit={handleSubmit}>
          <div className="row jumbotron box8">
            <h2 className="text-center">Edit Surgery</h2>
            <div className="col-sm-5 form-group">
              <label>Patient Full Name:</label>
              <input
                type="text"
                className="form-control"
                name="patientFullName"
                value={surgery.patientFullName}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-5 form-group">
              <label>Patient Number:</label>
              <input
                type="text"
                className="form-control"
                name="patientNumber"
                value={surgery.patientNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-5 form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={surgery.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-5 form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                name="Email"
                value={surgery.Email}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-5 form-group">
              <label>Surgery Date:</label>
              <input
                type="date"
                className="form-control"
                name="surgeryDate"
                value={surgery.surgeryDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-5 form-group">
              <label>Stent Removal Date:</label>
              <input
                className="form-control"
                type="date"
                name="stentRemovalDate"
                value={surgery.stentRemovalDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-5 form-group">
              <label>
                <input
                  type="checkbox"
                  name="patientReminder"
                  checked={surgery.patientReminder}
                  onChange={handleChange}
                />
                Patient Reminder
              </label>
            </div>
            <div className="col-sm-5 form-group">
              <label>
                <input
                  type="checkbox"
                  name="doctorReminder"
                  checked={surgery.doctorReminder}
                  onChange={handleChange}
                />
                Doctor Reminder
              </label>
            </div>
            <button type="submit" className="btn btn-secondary my-btn">
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn btn-secondary my-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSurgery;
