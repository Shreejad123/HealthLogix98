import { useState } from "react";
import "./Forgotpassword.css";
import Swal from "sweetalert2";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const EmailRegex = /\S+@\S+\.\S+/;
  const validateEmail = (email) => {
    // Email validation (simple regex)
    if (!email.trim()) {
      setemailError("Email is required");
      return false;
    }
    if (!EmailRegex.test(email)) {
      setemailError("Email is invalid");
      return false;
    }
    setemailError("");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateEmail(email);
    if (isValid) {
      Swal.fire("Form submitted successfully");
      // Implement authentication logic here (e.g., send to backend)
      console.log("Logging in with:", { email });
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Forgot Password</h3>
          <div>
            <label htmlFor="checkbox">Email:</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
