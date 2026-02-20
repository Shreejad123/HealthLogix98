import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./patientDetails.module.css";

const PatientDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("surgeryList");
    if (savedData) {
      const list = JSON.parse(savedData);
      setPatient(list[index]);
    }
  }, [index]);

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.patientdeatils}>
          <h2 className="text-center mb-4">Patient Details</h2>
          <p>
            <div className="col-sm">
              <strong>Patient Name: </strong>
              <div className="col-sm">{patient.patientFullName}</div>
            </div>
          </p>
          <p>
            <div className="col-sm">
              <strong>Patient Number:</strong>
              {patient.patientNumber}
            </div>
          </p>
          <p>
            <div>
              <strong>Phone: </strong>
              {patient.phoneNumber}
            </div>
          </p>
          <p>
            <div>
              <strong>Surgery Date: </strong>
              {patient.surgeryDate}
            </div>
          </p>
          <p>
            <div>
              <strong>Stent Removal Date:</strong> {patient.stentRemovalDate}
            </div>
          </p>
          <p>
            <div>
              <strong>Patient Reminder: </strong>
              {patient.patientReminder ? "Yes" : "No"}
            </div>
          </p>
          <p>
            <div>
              <strong>Doctor Reminder:</strong>{" "}
              {patient.doctorReminder ? "Yes" : "No"}
            </div>
          </p>

          <button
            className="btn btn-info"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
