import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const u = await axios.get("/admin/users/count");     
        setUserCount(u.data ?? 0);

        const s = await axios.get("/admin/supervisors/count"); 
        setSupervisorCount(s.data ?? 0);
      } catch (err) {
        console.error("Error fetching counts", err);
        setUserCount(0);
        setSupervisorCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <div className="card users-card">
          <h2>Users</h2>
          {loading ? <p>Loading...</p> : <p>{userCount}</p>}
        </div>
        <div className="card supervisors-card">
          <h2>Supervisors</h2>
          {loading ? <p>Loading...</p> : <p>{supervisorCount}</p>}
        </div>
      </div>
    </div>
  );
}
