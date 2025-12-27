// LoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Email validation (simple regex)
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const loginDetails = {
        email,
        password,
      };
      console.log("loginDetails", loginDetails);
      Swal.fire("Login sucessful!");

      console.log("Logging in with:", { email, password });
      navigate("/dashboard");
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Login</h3>
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
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                className="custom-checkbox"
                id="checkbox"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
              />
              <label htmlFor="email">Remember me:</label>
            </div>
          </div>
          <div className="forgot-password">
            <a href="/Forgotpassword">Forgot Password</a>
          </div>
          <div>
            {" "}
            <button type="submit" className="btn btn-secondary">
              Sign In
            </button>
          </div>
          <div>
            Don't have an account? <a href="/registration"> Register </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
