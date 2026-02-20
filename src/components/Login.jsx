// LoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
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
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h3 className={styles.header}>Login</h3>
          <div>
            <label htmlFor="Email">Email</label>

            <div className={styles.email}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>
          </div>
          <div className={styles.forgotPassword}>
            <p></p>
            <a href="/Forgotpassword">Forgot Password?</a>
          </div>
          <div>
            {" "}
            <button
              type="submit"
              className={`btn btn-primary ${styles.loginBtn}`}
            >
              Sign In
            </button>
          </div>
          <div>
            Don't have an account ? <a href="/registration"> Register </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
