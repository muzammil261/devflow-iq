import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./DeveloperDashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function DeveloperDashboard() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("developerProfile") || ""
  );
  const [searchChart, setSearchChart] = useState("");

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
  }, []);

  const myProjects = projects.filter(
    (p) => p.role === "developer" && p.email === loggedInUser.email
  );

  const completed = myProjects.filter((p) => p.completed);
  const notCompleted = myProjects.filter((p) => !p.completed);

  const chartData = {
    labels: myProjects
      .filter((p) =>
        p.name.toLowerCase().includes(searchChart.toLowerCase())
      )
      .map((p) => p.name),
    datasets: [
      {
        label: "Completed",
        data: myProjects
          .filter((p) =>
            p.name.toLowerCase().includes(searchChart.toLowerCase())
          )
          .map((p) => (p.completed ? 1 : 0)),
        backgroundColor: "rgba(168,85,247,0.8)",
        borderRadius: 6,
      },
    ],
  };

  const markCompleted = (projectName) => {
    const updated = projects.map((p) =>
      p.name === projectName && p.email === loggedInUser.email
        ? { ...p, completed: true }
        : p
    );
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const handleProfileEdit = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setProfileImg(url);
    localStorage.setItem("developerProfile", url);
  };

  const handleProfileRemove = () => {
    setProfileImg("");
    localStorage.removeItem("developerProfile");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">DevFlow-IQ</h2>

        <div className="myPro">
          <div
            className="profileImg"
            style={{
              backgroundImage: `url(${
                profileImg ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              })`,
            }}
          ></div>
          <p>{loggedInUser.name}</p>
          <div className="profile-buttons">
            <label htmlFor="profileUpload" className="edit-btn">
              Edit
            </label>
            <input
              type="file"
              id="profileUpload"
              hidden
              accept="image/*"
              onChange={handleProfileEdit}
            />
            <button className="remove-btn" onClick={handleProfileRemove}>
              Remove
            </button>
          </div>
        </div>

        <ul>
          <li
            className={activeTab === "dashboard" ? "active-tab" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeTab === "completed" ? "active-tab" : ""}
            onClick={() => setActiveTab("completed")}
          >
            Projects
          </li>
          <li
            className={activeTab === "settings" ? "active-tab" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div className="topbar">
              <input
                type="text"
                placeholder="Search Project..."
                value={searchChart}
                onChange={(e) => setSearchChart(e.target.value)}
              />
            </div>

            <div className="stats-cards">
              <div className="card">
                {myProjects.length > 0 ? (
                  <Bar data={chartData} />
                ) : (
                  <p className="empty-msg">No projects assigned yet</p>
                )}
              </div>
            </div>

            <div className="table-card">
              <h3>All Assigned Projects</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {myProjects.map((p, i) => (
                    <tr key={i}>
                      <td>{loggedInUser.name}</td>
                      <td>{p.email}</td>
                      <td>{p.name}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        {myProjects.filter((d) => d.email === p.email).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* COMPLETED / NOT COMPLETED */}
        {activeTab === "completed" && (
          <>
            <div className="table-card">
              <h3>Completed Projects</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((p, i) => (
                    <tr key={i}>
                      <td>{loggedInUser.name}</td>
                      <td>{p.email}</td>
                      <td>{p.name}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card">
              <h3>Not Completed Projects</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Mark Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {notCompleted.map((p, i) => (
                    <tr key={i}>
                      <td>{loggedInUser.name}</td>
                      <td>{p.email}</td>
                      <td>{p.name}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => markCompleted(p.name)}
                        >
                          Completed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="settings">
            <h2>Settings</h2>
            <input placeholder="Change Email" />
            <input type="password" placeholder="Change Password" />
            <button>Update</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default DeveloperDashboard;
