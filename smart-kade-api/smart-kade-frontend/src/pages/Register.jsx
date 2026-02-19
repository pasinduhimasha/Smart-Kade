import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error
  const [showPopup, setShowPopup] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // close popup
  const closePopup = () => {
    setShowPopup(false);
    setMessage("");
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMsgType("success");
        setMessage("Registration successful! Welcome 🎉");
        setShowPopup(true);
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMsgType("error");
        setMessage(data.msg || "Registration failed. Try again.");
        setShowPopup(true);
      }

    } catch (error) {
      console.error(error);
      setMsgType("error");
      setMessage("Server error. Please try later.");
      setShowPopup(true);
    }
  };

  return (
    <>
      {/* POPUP CARD */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3 className={msgType}>
              {msgType === "success" ? "Success" : "Error"}
            </h3>

            <p>{message}</p>

            <button onClick={closePopup} className="popup-btn">
              OK
            </button>
          </div>
        </div>
      )}

      <div className="auth-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
