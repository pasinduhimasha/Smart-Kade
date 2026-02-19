import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../style/Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";




const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const closePopup = () => { setShowPopup(false); setMessage(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        setMsgType("success");
        setMessage("Login successful! Redirecting...");
        setShowPopup(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          if (data.role === "admin") navigate("/manage-items");
          else navigate("/menu");
        }, 1500);
      } else {
        setMsgType("error");
        setMessage(data.msg || "Invalid credentials");
        setShowPopup(true);
      }
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMessage("Server error. Try again later");
      setShowPopup(true);
    }
  };

  return (
    <>
      <Navbar />
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3 className={msgType}>{msgType === "success" ? "Success" : "Error"}</h3>
            <p>{message}</p>
            <button onClick={closePopup} className="popup-btn">OK</button>
          </div>
        </div>
      )}
      <div className="auth-page">
        <div className="auth-container">
          <h2>Login</h2><br />
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
           <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

            <button type="submit" className="auth-btn">Login</button>
          </form><br />
          <p>Don't have an account? <Link to="/register">Register</Link></p>
           <p><Link to="/adminlogin">admin login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
