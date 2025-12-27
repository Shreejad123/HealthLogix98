// src/components/Registration.jsx
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./registrationForm.css";
import Swal from "sweetalert2";

const Registration = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const nameRegex = /^[a-zA-Z\s'-]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const validateFirstName = (name) => {
    if (!name.trim()) {
      setFirstNameError("First name is required.");
      return false;
    }
    if (!nameRegex.test(name)) {
      setFirstNameError(
        "Only letters, spaces, hyphens, and apostrophes allowed."
      );
      return false;
    }
    setFirstNameError("");
    return true;
  };

  const validateLastName = (name) => {
    if (!name.trim()) {
      setLastNameError("Last name is required.");
      return false;
    }
    if (!nameRegex.test(name)) {
      setLastNameError(
        "Only letters, spaces, hyphens, and apostrophes allowed."
      );
      return false;
    }
    setLastNameError("");
    return true;
  };

  const validateContact = (number) => {
    if (!number.trim()) {
      setContactError("Contact number is required.");
      return false;
    }
    if (!phoneRegex.test(number)) {
      setContactError("Contact number must be exactly 10 digits.");
      return false;
    }
    setContactError("");
    return true;
  };
  const validateEmail = (emailtest) => {
    if (!emailtest.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(emailtest)) {
      setEmailError("Email is invalid");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePasswords = (pass, confirmPass) => {
    if (!pass) {
      setPasswordError("Password is required.");
      setConfirmPasswordError("Confirm password is required");
      return false;
    }
    if (pass.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return false;
    }
    setPasswordError("");

    if (pass !== confirmPass) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmailValid = validateEmail(email);
    const isvalidateContact = validateContact(contactNumber);
    const arePasswordsValid = validatePasswords(password, confirmPassword);

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isvalidateContact &&
      isEmailValid &&
      arePasswordsValid
    ) {
      console.log("Form submitted:", {
        firstName,
        lastName,
        contactNumber,
        email,
        password,
        confirmPassword,
      });

      Swal.fire("Registration successful!", "success");
      navigate("/dashboard");
      // reset fields
      setFirstName("");
      setLastName("");
      setContactNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="row jumbotron box8">
          <h2 className="text-center">Register</h2>
          <div className="col-sm-5 form-group">
            <label htmlFor="firstNameInput">First Name</label>
            <input
              type="text"
              id="firstNameInput"
              value={firstName}
              placeholder="Enter your First Name"
              className="form-control"
              onChange={(e) => {
                setFirstName(e.target.value);
                validateFirstName(e.target.value);
              }}
            />
            {firstNameError && (
              <p style={{ color: "red", marginLeft: "50px" }}>
                {firstNameError}
              </p>
            )}
          </div>
          <div className="col-sm-6 form-group">
            <label htmlFor="lastNameInput">Last Name</label>
            <input
              type="text"
              id="lastNameInput"
              value={lastName}
              className="form-control"
              placeholder="Enter your Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
                validateLastName(e.target.value);
              }}
            />
            {lastNameError && (
              <p style={{ color: "red", marginLeft: "50px" }}>
                {lastNameError}
              </p>
            )}
          </div>
          <div className="col-sm-5 form-group">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && (
              <p style={{ color: "red", marginLeft: "50px" }}>{emailError}</p>
            )}
          </div>
          <div className="col-sm-6 form-group">
            <label htmlFor="contactInput">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contactInput"
              placeholder="Enter your Contact Number"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
                validateContact(e.target.value);
              }}
            />
            {contactError && (
              <p style={{ color: "red", marginLeft: "50px" }}>{contactError}</p>
            )}
          </div>
          <div className="col-sm-5 form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={password}
              placeholder="Enter your Password"
              onChange={(e) => {
                setPassword(e.target.value);
                validatePasswords(e.target.value, confirmPassword);
              }}
            />
            {passwordError && (
              <p style={{ color: "red", marginLeft: "50px" }}>
                {passwordError}
              </p>
            )}
          </div>
          <div className="col-sm-5 form-group">
            <label htmlFor="confirmPasswordInput">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              value={confirmPassword}
              placeholder="Re-Enter Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validatePasswords(password, e.target.value);
              }}
            />
            {confirmPasswordError && (
              <p style={{ color: "red", marginLeft: "50px" }}>
                {confirmPasswordError}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary submit-btn">
            Submit
          </button>
          <div className="link">
            Already have an account ? <a href="/">Login</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
