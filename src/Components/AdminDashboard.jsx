// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./AdminDashboard.css";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// function AdminDashboard() {
//   const navigate = useNavigate();

//   /* ================= AUTH ================= */
//   const admin = JSON.parse(localStorage.getItem("loggedInUser") || "null");

//   useEffect(() => {
//     if (!admin) navigate("/");
//     if (admin && admin.role !== "admin") navigate("/");
//   }, [navigate, admin]);

//   /* ================= STATES ================= */
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [profileImg, setProfileImg] = useState(
//     localStorage.getItem("adminProfile") || ""
//   );

//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState(
//     JSON.parse(localStorage.getItem("projects")) || []
//   );

//   const [searchEmail, setSearchEmail] = useState("");

//   /* ================= LOAD USERS ================= */
//   useEffect(() => {
//     fetch("http://localhost:3001/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data.filter((u) => u.role === "manager")));
//   }, []);

//   /* ================= LOGOUT ================= */
//   const handleLogout = () => {
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("adminProfile");
//     navigate("/");
//   };

//   /* ================= PROFILE IMAGE UPLOAD ================= */
//   const handleProfileEdit = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       setProfileImg(reader.result);
//       localStorage.setItem("adminProfile", reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleProfileRemove = () => {
//     setProfileImg("");
//     localStorage.removeItem("adminProfile");
//   };

//   /* ================= CHART ================= */
//   const completedProjects = projects.filter(
//     (p) => p.role === "manager" && p.completed
//   );

//   const chartData = {
//     labels: completedProjects.map((p) => p.name),
//     datasets: [
//       {
//         label: "Completed Projects",
//         data: completedProjects.map(() => 1),
//         backgroundColor: "rgba(168,85,247,0.8)",
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       {/* ================= SIDEBAR ================= */}
//       <aside className="sidebar">
//         <h2 className="logo">DevFlow-IQ</h2>

//         <div className="profile">
//           <div
//             className="profileImg"
//             style={{
//               backgroundImage: `url(${
//                 profileImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               })`,
//             }}
//           />
//           <p>{admin?.name}</p>

//           {/* ================= EDIT & REMOVE BUTTONS ================= */}
//           <div className="profile-buttons">
//             <label htmlFor="profileUpload" className="edit-btn">
//               Edit-Img
//             </label>
//             <input
//               type="file"
//               id="profileUpload"
//               style={{ display: "none" }}
//               accept="image/*"
//               onChange={handleProfileEdit}
//             />
//             <button className="remove-btn" onClick={handleProfileRemove}>
//               Remove
//             </button>
//           </div>
//         </div>

//         <ul>
//           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
//           <li onClick={() => setActiveTab("assign")}>Assign Project</li>
//           <li onClick={() => setActiveTab("completed")}>Completed Project</li>
//           <li onClick={() => setActiveTab("settings")}>Settings</li>
//           <li className="logout" onClick={handleLogout}>
//             Logout
//           </li>
//         </ul>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <main className="main-content">
//         {activeTab === "dashboard" && (
//           <>
//             <input
//               className="search"
//               placeholder="Search manager by email..."
//               value={searchEmail}
//               onChange={(e) => setSearchEmail(e.target.value)}
//             />

//             <div className="dashboard-top">
//               <div className="chart-card">
//                 <Bar data={chartData} />
//               </div>

//               <div className="info-card">
//                 <h3>Admin Panel</h3>
//                 <p>Welcome {admin?.name}</p>
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;


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
import "./AdminDashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminDashboard() {
  const navigate = useNavigate();

  /* ================= AUTH ================= */
  const admin = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  useEffect(() => {
    if (!admin || admin.role !== "admin") navigate("/");
  }, [navigate, admin]);

  /* ================= STATES ================= */
  const [activeTab, setActiveTab] = useState("dashboard");

  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("adminProfile") || ""
  );

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || []
  );

  const [searchEmail, setSearchEmail] = useState("");

  /* ================= ASSIGN FORM STATE ================= */
  const [assignData, setAssignData] = useState({
    managerEmail: "",
    projectName: "",
    startDate: "",
    endDate: "",
  });

  /* ================= LOAD MANAGERS ================= */
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.filter((u) => u.role === "manager")));
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("adminProfile");
    navigate("/");
  };

  /* ================= PROFILE IMAGE ================= */
  const handleProfileEdit = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImg(reader.result);
      localStorage.setItem("adminProfile", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileRemove = () => {
    setProfileImg("");
    localStorage.removeItem("adminProfile");
  };

  /* ================= ASSIGN PROJECT ================= */
  const handleAssignChange = (e) => {
    setAssignData({ ...assignData, [e.target.name]: e.target.value });
  };

  const handleAssignProject = (e) => {
    e.preventDefault();

    const manager = users.find(
      (u) => u.email === assignData.managerEmail
    );

    if (!manager) {
      alert("Manager not found");
      return;
    }

    const newProject = {
      id: Date.now(),
      managerName: manager.name,
      managerEmail: manager.email,
      projectName: assignData.projectName,
      startDate: assignData.startDate,
      endDate: assignData.endDate,
      completed: false,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    alert("Project Assigned Successfully");

    setAssignData({
      managerEmail: "",
      projectName: "",
      startDate: "",
      endDate: "",
    });
  };

    /* ================= TABLE SAFE DATA ================= */
  const tableProjects = projects.map((p) => ({
    ...p,
    managerName: p.managerName || "N/A",
    managerEmail: p.managerEmail || "N/A",
    projectName: p.projectName || "N/A",
  }));

  /* ================= PROJECT FILTERS ================= */
  // const completedProjects = projects.filter((p) => p.completed);
  // const notCompletedProjects = projects.filter((p) => !p.completed);
  const completedProjects = tableProjects.filter((p) => p.completed);
  const notCompletedProjects = tableProjects.filter((p) => !p.completed);


  /* ================= CHART ================= */
  const chartData = {
    labels: completedProjects.map((p) => p.projectName),
    datasets: [
      {
        label: "Completed Projects",
        data: completedProjects.map(() => 1),
        backgroundColor: "rgba(168,85,247,0.8)",
      },
    ],
  };


  return (
    <div className="dashboard-container">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <h2 className="logo">DevFlow-IQ</h2>

        <div className="profile">
          <div
            className="profileImg"
            style={{
              backgroundImage: `url(${
                profileImg ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              })`,
            }}
          />
          <p>{admin?.name}</p>

          <div className="profile-buttons">
            <label htmlFor="profileUpload" className="edit-btn">
              Edit-Img
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
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("assign")}>Assign Project</li>
          <li onClick={() => setActiveTab("completed")}>Completed Project</li>
          <li onClick={() => setActiveTab("settings")}>Settings</li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main-content">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <input
              className="search"
              placeholder="Search manager by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />

            <div className="dashboard-top">
              <div className="chart-card">
                <Bar data={chartData} />
              </div>

              <div className="info-card">
                <h3>Admin Panel</h3>
                <p>Welcome {admin?.name}</p>
              </div>
            </div>
          </>
        )}

        {/* ASSIGN PROJECT */}
        {activeTab === "assign" && (
          <div className="assign-form">
            <h2>Assign Project</h2>

            <form onSubmit={handleAssignProject}>
              <input
                type="email"
                name="managerEmail"
                placeholder="Manager Email"
                value={assignData.managerEmail}
                onChange={handleAssignChange}
                required
              />

              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={assignData.projectName}
                onChange={handleAssignChange}
                required
              />

              <input
                type="date"
                name="startDate"
                value={assignData.startDate}
                onChange={handleAssignChange}
                required
              />

              <input
                type="date"
                name="endDate"
                value={assignData.endDate}
                onChange={handleAssignChange}
                required
              />

              <button type="submit">Assign Project</button>
            </form>
          </div>
        )}

        {/* COMPLETED PROJECTS */}
        {activeTab === "completed" && (
          <div className="project-tables">
            <h2>Not Completed Projects</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Project</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {notCompletedProjects.map((p) => (
                  <tr key={p.id}>
                    <td>{p.managerName}</td>
                    <td>{p.managerEmail}</td>
                    <td>{p.projectName}</td>
                    <td>{p.startDate}</td>
                    <td>{p.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Completed Projects</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Project</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {completedProjects.map((p) => (
                  <tr key={p.id}>
                    <td>{p.managerName}</td>
                    <td>{p.managerEmail}</td>
                    <td>{p.projectName}</td>
                    <td>{p.startDate}</td>
                    <td>{p.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default AdminDashboard;
