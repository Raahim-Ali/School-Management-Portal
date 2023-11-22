import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import icon from "./icon.png";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";

function Login({ setemail, email }) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Please enter email and password to login."
  );

  const Navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/login", { email, password });
      const { token } = response.data;
      console.log("response.data", response.data);
      localStorage.setItem("authToken", token);
      axios.defaults.headers.authorization = token;
      Navigate("/app/home", { replace: true });
    } catch (error) {
      setErrorMessage("Enter login details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2 className="header-login" style={{ textAlign: "center" }}>
          SCHOOL MANAGEMENT SYSTEM
        </h2>
        <img className="icon" src={icon} alt="Icon" />
        <h3 className="text">Enter your login details</h3>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={handleLogin}>
            {isLoading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
