import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contextapi/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function SupervisorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsSupervisorLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/supervisors/login`,
        null,
        { params: { email, password } }
      );

      localStorage.setItem("supervisor", JSON.stringify(res.data));
      setIsSupervisorLoggedIn(true);
      navigate("/supervisor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffe5e3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#FFB1AC",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#fff" }}>Supervisor Login</h2>
        {error && (
          <p
            style={{
              color: "#fff",
              background: "rgba(255, 0, 0, 0.6)",
              padding: "8px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#fff" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#fff" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fff",
            color: "#FFB1AC",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ffd0cb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
        >
          Login
        </button>
      </form>
    </div>
  );
}
