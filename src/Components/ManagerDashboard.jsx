// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   BarElement,
// //   CategoryScale,
// //   LinearScale,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import "./AdminDashboard.css";

// // ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // function ManagerDashboard() {
// //   const navigate = useNavigate();
// //   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// //   /* ---------------- STATES ---------------- */
// //   const [projects, setProjects] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [profileImg, setProfileImg] = useState(
// //     localStorage.getItem("managerProfile")
// //   );

// //   const [assignForm, setAssignForm] = useState({
// //     email: "",
// //     name: "",
// //     startDate: "",
// //     endDate: "",
// //   });

// //   const [searchCompleted, setSearchCompleted] = useState("");
// //   const [searchNotCompleted, setSearchNotCompleted] = useState("");

// //   /* ---------------- LOAD DATA ---------------- */
// //   useEffect(() => {
// //     setProjects(JSON.parse(localStorage.getItem("projects")) || []);
// //   }, []);

// //   useEffect(() => {
// //     fetch("http://localhost:3001/users")
// //       .then((res) => res.json())
// //       .then(setUsers);
// //   }, []);

// //   /* ---------------- HELPERS ---------------- */
// //   const getName = (email) =>
// //     users.find((u) => u.email === email)?.name || email;

// //   /* ---------------- FILTER PROJECTS ---------------- */
// //   const developerProjects = projects.filter(
// //     (p) =>
// //       p.role === "developer" && p.assignedBy === loggedInUser.email
// //   );

// //   const completed = developerProjects.filter((p) => p.completed);
// //   const notCompleted = developerProjects.filter((p) => !p.completed);

// //   /* ---------------- CHART DATA (REAL) ---------------- */
// //   const chartData = {
// //     labels: developerProjects.map((p) => getName(p.email)),
// //     datasets: [
// //       {
// //         label: "Completed",
// //         data: developerProjects.map((p) => (p.completed ? 1 : 0)),
// //         backgroundColor: "rgba(168,85,247,0.7)",
// //       },
// //     ],
// //   };

// //   /* ---------------- ASSIGN PROJECT ---------------- */
// //   const assignProject = (e) => {
// //     e.preventDefault();

// //     const newProject = {
// //       email: assignForm.email,
// //       name: assignForm.name,
// //       startDate: assignForm.startDate,
// //       endDate: assignForm.endDate,
// //       role: "developer",
// //       assignedBy: loggedInUser.email,
// //       completed: false,
// //     };

// //     const updated = [...projects, newProject];
// //     setProjects(updated);
// //     localStorage.setItem("projects", JSON.stringify(updated));

// //     setAssignForm({ email: "", name: "", startDate: "", endDate: "" });
// //     setActiveTab("dashboard");
// //   };

// //   /* ---------------- PROFILE ---------------- */
// //   const handleImageUpload = (e) => {
// //     const url = URL.createObjectURL(e.target.files[0]);
// //     setProfileImg(url);
// //     localStorage.setItem("managerProfile", url);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("loggedInUser");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <aside className="sidebar">
// //         <h2 className="logo">DevFlow-IQ</h2>

// //         <div className="myPro">
// //           <div
// //             className="profileImg"
// //             style={{
// //               backgroundImage: profileImg
// //                 ? `url(${profileImg})`
// //                 : `url("https://cdn-icons-png.flaticon.com/512/149/149071.png")`,
// //             }}
// //           ></div>
// //           <p>{loggedInUser.name}</p>
// //           <label className="editBtn">
// //             Edit Profile
// //             <input type="file" hidden onChange={handleImageUpload} />
// //           </label>
// //         </div>

// //         <ul>
// //           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
// //           <li onClick={() => setActiveTab("assign")}>Project Assign</li>
// //           <li onClick={() => setActiveTab("completed")}>Completed Projects</li>
// //           <li onClick={() => setActiveTab("settings")}>Settings</li>
// //           <li className="logout" onClick={handleLogout}>Logout</li>
// //         </ul>
// //       </aside>

// //       <main className="main-content">
// //         {/* DASHBOARD */}
// //         {activeTab === "dashboard" && (
// //           <>
// //             <div className="stats-cards">
// //               <div className="card">
// //                 <Bar data={chartData} />
// //               </div>
// //               <div className="card highlight">
// //                 {completed.length} Completed Projects
// //               </div>
// //             </div>
// //           </>
// //         )}

// //         {/* ASSIGN */}
// //         {activeTab === "assign" && (
// //           <form className="project-form" onSubmit={assignProject}>
// //             <h2>Assign Project to Developer</h2>
// //             <input
// //               placeholder="Developer Email"
// //               value={assignForm.email}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, email: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               placeholder="Project Name"
// //               value={assignForm.name}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, name: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               type="date"
// //               value={assignForm.startDate}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, startDate: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               type="date"
// //               value={assignForm.endDate}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, endDate: e.target.value })
// //               }
// //               required
// //             />
// //             <button>Assign</button>
// //           </form>
// //         )}

// //         {/* COMPLETED */}
// //         {activeTab === "completed" && (
// //           <>
// //             <div className="table-card">
// //               <h3>Completed Developer Projects</h3>
// //               <input
// //                 placeholder="Search"
// //                 value={searchCompleted}
// //                 onChange={(e) => setSearchCompleted(e.target.value)}
// //               />
// //               <table>
// //                 <tbody>
// //                   {completed
// //                     .filter((p) =>
// //                       p.email.toLowerCase().includes(searchCompleted)
// //                     )
// //                     .map((p, i) => (
// //                       <tr key={i}>
// //                         <td>{getName(p.email)}</td>
// //                         <td>{p.email}</td>
// //                         <td>{p.name}</td>
// //                         <td>{p.startDate}</td>
// //                         <td>{p.endDate}</td>
// //                       </tr>
// //                     ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="table-card">
// //               <h3>Not Completed Developer Projects</h3>
// //               <input
// //                 placeholder="Search"
// //                 value={searchNotCompleted}
// //                 onChange={(e) => setSearchNotCompleted(e.target.value)}
// //               />
// //               <table>
// //                 <tbody>
// //                   {notCompleted
// //                     .filter((p) =>
// //                       p.email.toLowerCase().includes(searchNotCompleted)
// //                     )
// //                     .map((p, i) => (
// //                       <tr key={i}>
// //                         <td>{getName(p.email)}</td>
// //                         <td>{p.email}</td>
// //                         <td>{p.name}</td>
// //                         <td>{p.startDate}</td>
// //                         <td>{p.endDate}</td>
// //                       </tr>
// //                     ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}

// //         {/* SETTINGS */}
// //         {activeTab === "settings" && (
// //           <div className="settings">
// //             <h2>Settings</h2>
// //             <input placeholder="Change Email" />
// //             <input type="password" placeholder="Change Password" />
// //             <button>Update</button>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // export default ManagerDashboard;

// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   BarElement,
// //   CategoryScale,
// //   LinearScale,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import "./AdminDashboard.css";

// // ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // function ManagerDashboard() {
// //   const navigate = useNavigate();

// //   // ✅ fallback if no loggedInUser in localStorage
// //   const loggedInUser =
// //     JSON.parse(localStorage.getItem("loggedInUser")) || {
// //       name: "Manager",
// //       email: "",
// //     };

// //   /* ---------------- STATES ---------------- */
// //   const [projects, setProjects] = useState(
// //     JSON.parse(localStorage.getItem("projects")) || []
// //   );
// //   const [users, setUsers] = useState([]);
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [profileImg, setProfileImg] = useState(
// //     localStorage.getItem("managerProfile") || ""
// //   );

// //   const [assignForm, setAssignForm] = useState({
// //     email: "",
// //     name: "",
// //     startDate: "",
// //     endDate: "",
// //   });

// //   const [searchCompleted, setSearchCompleted] = useState("");
// //   const [searchNotCompleted, setSearchNotCompleted] = useState("");

// //   /* ---------------- LOAD DATA ---------------- */
// //   useEffect(() => {
// //     fetch("http://localhost:3001/users")
// //       .then((res) => res.json())
// //       .then(setUsers)
// //       .catch(() => setUsers([]));
// //   }, []);

// //   /* ---------------- HELPERS ---------------- */
// //   const getName = (email) =>
// //     users.find((u) => u.email === email)?.name || email;

// //   /* ---------------- FILTER PROJECTS ---------------- */
// //   const developerProjects = projects.filter(
// //     (p) => p.role === "developer" && p.assignedBy === loggedInUser.email
// //   );

// //   const completed = developerProjects.filter((p) => p.completed);
// //   const notCompleted = developerProjects.filter((p) => !p.completed);

// //   /* ---------------- CHART DATA ---------------- */
// //   const chartData = {
// //     labels: developerProjects.map((p) => getName(p.email)),
// //     datasets: [
// //       {
// //         label: "Completed",
// //         data: developerProjects.map((p) => (p.completed ? 1 : 0)),
// //         backgroundColor: "rgba(168,85,247,0.7)",
// //       },
// //     ],
// //   };

// //   /* ---------------- ASSIGN PROJECT ---------------- */
// //   const assignProject = (e) => {
// //     e.preventDefault();
// //     const newProject = {
// //       email: assignForm.email,
// //       name: assignForm.name,
// //       startDate: assignForm.startDate,
// //       endDate: assignForm.endDate,
// //       role: "developer",
// //       assignedBy: loggedInUser.email,
// //       completed: false,
// //     };

// //     const updated = [...projects, newProject];
// //     setProjects(updated);
// //     localStorage.setItem("projects", JSON.stringify(updated));
// //     setAssignForm({ email: "", name: "", startDate: "", endDate: "" });
// //     setActiveTab("dashboard");
// //   };

// //   /* ---------------- PROFILE ---------------- */
// //   const handleImageUpload = (e) => {
// //     const url = URL.createObjectURL(e.target.files[0]);
// //     setProfileImg(url);
// //     localStorage.setItem("managerProfile", url);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("loggedInUser");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       {/* ---------------- SIDEBAR ---------------- */}
// //       <aside className="sidebar">
// //         <h2 className="logo">DevFlow-IQ</h2>

// //         <div className="myPro">
// //           <div
// //             className="profileImg"
// //             style={{
// //               backgroundImage: profileImg
// //                 ? `url(${profileImg})`
// //                 : `url("https://cdn-icons-png.flaticon.com/512/149/149071.png")`,
// //             }}
// //           ></div>
// //           <p>{loggedInUser.name}</p>
// //           <label className="editBtn">
// //             Edit Profile
// //             <input type="file" hidden onChange={handleImageUpload} />
// //           </label>
// //         </div>

// //         <ul>
// //           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
// //           <li onClick={() => setActiveTab("assign")}>Project Assign</li>
// //           <li onClick={() => setActiveTab("completed")}>Completed Projects</li>
// //           <li onClick={() => setActiveTab("settings")}>Settings</li>
// //           <li className="logout" onClick={handleLogout}>
// //             Logout
// //           </li>
// //         </ul>
// //       </aside>

// //       {/* ---------------- MAIN CONTENT ---------------- */}
// //       <main className="main-content">
// //         {/* DASHBOARD */}
// //         {activeTab === "dashboard" && (
// //           <div className="stats-cards">
// //             <div className="card">
// //               {developerProjects.length > 0 ? (
// //                 <Bar data={chartData} />
// //               ) : (
// //                 <p style={{ color: "#fff" }}>No projects assigned yet</p>
// //               )}
// //             </div>
// //             <div className="card highlight">
// //               {completed.length} Completed Projects
// //             </div>
// //           </div>
// //         )}

// //         {/* ASSIGN PROJECT */}
// //         {activeTab === "assign" && (
// //           <form className="project-form" onSubmit={assignProject}>
// //             <h2>Assign Project to Developer</h2>
// //             <input
// //               placeholder="Developer Email"
// //               value={assignForm.email}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, email: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               placeholder="Project Name"
// //               value={assignForm.name}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, name: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               type="date"
// //               value={assignForm.startDate}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, startDate: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               type="date"
// //               value={assignForm.endDate}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, endDate: e.target.value })
// //               }
// //               required
// //             />
// //             <button>Assign</button>
// //           </form>
// //         )}

// //         {/* COMPLETED PROJECTS */}
// //         {activeTab === "completed" && (
// //           <>
// //             <div className="table-card">
// //               <h3>Completed Developer Projects</h3>
// //               <input
// //                 placeholder="Search"
// //                 value={searchCompleted}
// //                 onChange={(e) => setSearchCompleted(e.target.value)}
// //               />
// //               <table>
// //                 <tbody>
// //                   {completed
// //                     .filter((p) =>
// //                       p.email.toLowerCase().includes(searchCompleted.toLowerCase())
// //                     )
// //                     .map((p, i) => (
// //                       <tr key={i}>
// //                         <td>{getName(p.email)}</td>
// //                         <td>{p.email}</td>
// //                         <td>{p.name}</td>
// //                         <td>{p.startDate}</td>
// //                         <td>{p.endDate}</td>
// //                       </tr>
// //                     ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="table-card">
// //               <h3>Not Completed Developer Projects</h3>
// //               <input
// //                 placeholder="Search"
// //                 value={searchNotCompleted}
// //                 onChange={(e) => setSearchNotCompleted(e.target.value)}
// //               />
// //               <table>
// //                 <tbody>
// //                   {notCompleted
// //                     .filter((p) =>
// //                       p.email.toLowerCase().includes(searchNotCompleted.toLowerCase())
// //                     )
// //                     .map((p, i) => (
// //                       <tr key={i}>
// //                         <td>{getName(p.email)}</td>
// //                         <td>{p.email}</td>
// //                         <td>{p.name}</td>
// //                         <td>{p.startDate}</td>
// //                         <td>{p.endDate}</td>
// //                       </tr>
// //                     ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}

// //         {/* SETTINGS */}
// //         {activeTab === "settings" && (
// //           <div className="settings">
// //             <h2>Settings</h2>
// //             <input placeholder="Change Email" />
// //             <input type="password" placeholder="Change Password" />
// //             <button>Update</button>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // export default ManagerDashboard;


// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   BarElement,
// //   CategoryScale,
// //   LinearScale,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import "./AdminDashboard.css";

// // ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // function ManagerDashboard() {
// //   const navigate = useNavigate();

// //   const loggedInUser =
// //     JSON.parse(localStorage.getItem("loggedInUser")) || {
// //       name: "Manager",
// //       email: "",
// //     };

// //   /* ---------------- STATES ---------------- */
// //   const [projects, setProjects] = useState(
// //     JSON.parse(localStorage.getItem("projects")) || []
// //   );
// //   const [users, setUsers] = useState([]);
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [profileImg, setProfileImg] = useState(
// //     localStorage.getItem("managerProfile") || ""
// //   );

// //   const [assignForm, setAssignForm] = useState({
// //     email: "",
// //     name: "",
// //     startDate: "",
// //     endDate: "",
// //   });

// //   const [searchChart, setSearchChart] = useState("");

// //   /* ---------------- LOAD USERS ---------------- */
// //   useEffect(() => {
// //     fetch("http://localhost:3001/users")
// //       .then((res) => res.json())
// //       .then(setUsers)
// //       .catch(() => setUsers([]));
// //   }, []);

// //   /* ---------------- HELPERS ---------------- */
// //   const getName = (email) =>
// //     users.find((u) => u.email === email)?.name || email;

// //   const developerProjects = projects.filter(
// //     (p) => p.role === "developer" && p.assignedBy === loggedInUser.email
// //   );

// //   const completed = developerProjects.filter((p) => p.completed);
// //   const notCompleted = developerProjects.filter((p) => !p.completed);

// //   /* ---------------- CHART DATA ---------------- */
// //   const chartData = {
// //     labels: developerProjects
// //       .filter((p) => getName(p.email).toLowerCase().includes(searchChart.toLowerCase()))
// //       .map((p) => getName(p.email)),
// //     datasets: [
// //       {
// //         label: "Completed",
// //         data: developerProjects
// //           .filter((p) => getName(p.email).toLowerCase().includes(searchChart.toLowerCase()))
// //           .map((p) => (p.completed ? 1 : 0)),
// //         backgroundColor: "rgba(168,85,247,0.7)",
// //       },
// //     ],
// //   };

// //   /* ---------------- ASSIGN PROJECT ---------------- */
// //   const assignProject = (e) => {
// //     e.preventDefault();
// //     const newProject = {
// //       email: assignForm.email,
// //       name: assignForm.name,
// //       startDate: assignForm.startDate,
// //       endDate: assignForm.endDate,
// //       role: "developer",
// //       assignedBy: loggedInUser.email,
// //       completed: false,
// //     };
// //     const updated = [...projects, newProject];
// //     setProjects(updated);
// //     localStorage.setItem("projects", JSON.stringify(updated));
// //     setAssignForm({ email: "", name: "", startDate: "", endDate: "" });
// //     setActiveTab("dashboard");
// //   };

// //   const handleImageUpload = (e) => {
// //     const url = URL.createObjectURL(e.target.files[0]);
// //     setProfileImg(url);
// //     localStorage.setItem("managerProfile", url);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("loggedInUser");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <aside className="sidebar">
// //         <h2 className="logo">DevFlow-IQ</h2>
// //         <div className="myPro">
// //           <div
// //             className="profileImg"
// //             style={{
// //               backgroundImage: profileImg
// //                 ? `url(${profileImg})`
// //                 : `url("https://cdn-icons-png.flaticon.com/512/149/149071.png")`,
// //             }}
// //           ></div>
// //           <p>{loggedInUser.name}</p>
// //           <label className="editBtn">
// //             Edit Profile
// //             <input type="file" hidden onChange={handleImageUpload} />
// //           </label>
// //         </div>
// //         <ul>
// //           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
// //           <li onClick={() => setActiveTab("assign")}>Project Assign</li>
// //           <li onClick={() => setActiveTab("completed")}>Completed Projects</li>
// //           <li onClick={() => setActiveTab("settings")}>Settings</li>
// //           <li className="logout" onClick={handleLogout}>
// //             Logout
// //           </li>
// //         </ul>
// //       </aside>

// //       <main className="main-content">
// //         {/* DASHBOARD */}
// //         {activeTab === "dashboard" && (
// //           <>
// //             {/* SEARCH BAR ABOVE CHART */}
// //             <input
// //               type="text"
// //               placeholder="Search Developer..."
// //               value={searchChart}
// //               onChange={(e) => setSearchChart(e.target.value)}
// //               style={{
// //                 marginBottom: "1rem",
// //                 padding: "0.5rem",
// //                 borderRadius: "0.5rem",
// //                 border: "1px solid #3b82f6",
// //                 backgroundColor: "#0f172a",
// //                 color: "#e5e7eb",
// //               }}
// //             />

// //             <div className="stats-cards">
// //               <div className="card">
// //                 {developerProjects.length > 0 ? (
// //                   <Bar data={chartData} />
// //                 ) : (
// //                   <p style={{ color: "#fff" }}>No projects assigned yet</p>
// //                 )}
// //               </div>
// //               <div className="card highlight">
// //                 {completed.length} Completed Projects
// //               </div>
// //             </div>

// //             {/* TABLE BELOW CHART */}
// //             <div className="table-card">
// //               <h3>All Assigned Developer Projects</h3>
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Name</th>
// //                     <th>Email</th>
// //                     <th>Project Name</th>
// //                     <th>Start Date</th>
// //                     <th>End Date</th>
// //                     <th>Total Projects Assigned</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {developerProjects.map((p, i) => (
// //                     <tr key={i}>
// //                       <td>{getName(p.email)}</td>
// //                       <td>{p.email}</td>
// //                       <td>{p.name}</td>
// //                       <td>{p.startDate}</td>
// //                       <td>{p.endDate}</td>
// //                       <td>{developerProjects.filter(d => d.email === p.email).length}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}

// //         {/* ASSIGN PROJECT */}
// //         {activeTab === "assign" && (
// //           <form className="project-form" onSubmit={assignProject}>
// //             <h2>Assign Project to Developer</h2>
// //             <input
// //               placeholder="Developer Email"
// //               value={assignForm.email}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, email: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               placeholder="Project Name"
// //               value={assignForm.name}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, name: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               type="date"
// //               value={assignForm.startDate}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, startDate: e.target.value })
// //               }
// //               required
// //             />
// //             <input
// //               type="date"
// //               value={assignForm.endDate}
// //               onChange={(e) =>
// //                 setAssignForm({ ...assignForm, endDate: e.target.value })
// //               }
// //               required
// //             />
// //             <button>Assign</button>
// //           </form>
// //         )}

// //         {/* COMPLETED PROJECTS */}
// //         {activeTab === "completed" && (
// //           <>
// //             <div className="table-card">
// //               <h3>Completed Developer Projects</h3>
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Name</th>
// //                     <th>Email</th>
// //                     <th>Project Name</th>
// //                     <th>Start Date</th>
// //                     <th>End Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {completed.map((p, i) => (
// //                     <tr key={i}>
// //                       <td>{getName(p.email)}</td>
// //                       <td>{p.email}</td>
// //                       <td>{p.name}</td>
// //                       <td>{p.startDate}</td>
// //                       <td>{p.endDate}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="table-card">
// //               <h3>Not Completed Developer Projects</h3>
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Name</th>
// //                     <th>Email</th>
// //                     <th>Project Name</th>
// //                     <th>Start Date</th>
// //                     <th>End Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {notCompleted.map((p, i) => (
// //                     <tr key={i}>
// //                       <td>{getName(p.email)}</td>
// //                       <td>{p.email}</td>
// //                       <td>{p.name}</td>
// //                       <td>{p.startDate}</td>
// //                       <td>{p.endDate}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}

// //         {/* SETTINGS */}
// //         {activeTab === "settings" && (
// //           <div className="settings">
// //             <h2>Settings</h2>
// //             <input placeholder="Change Email" />
// //             <input type="password" placeholder="Change Password" />
// //             <button>Update</button>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // export default ManagerDashboard;










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
// import "./ManagerDashboard.css";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// function ManagerDashboard() {
//   const navigate = useNavigate();

//   const loggedInUser =
//     JSON.parse(localStorage.getItem("loggedInUser")) || {
//       name: "Manager",
//       email: "",
//     };

//   const [projects, setProjects] = useState(
//     JSON.parse(localStorage.getItem("projects")) || []
//   );
//   const [users, setUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [profileImg, setProfileImg] = useState(
//     localStorage.getItem("managerProfile") || ""
//   );

//   const [assignForm, setAssignForm] = useState({
//     email: "",
//     name: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [searchChart, setSearchChart] = useState("");

//   // Fetch users
//   useEffect(() => {
//     fetch("http://localhost:3001/users")
//       .then((res) => res.json())
//       .then(setUsers)
//       .catch(() => setUsers([]));
//   }, []);

//   const getName = (email) =>
//     users.find((u) => u.email === email)?.name || email;

//   const developerProjects = projects.filter(
//     (p) => p.role === "developer" && p.assignedBy === loggedInUser.email
//   );

//   const completed = developerProjects.filter((p) => p.completed);
//   const notCompleted = developerProjects.filter((p) => !p.completed);

//   const chartData = {
//     labels: developerProjects
//       .filter((p) =>
//         getName(p.email).toLowerCase().includes(searchChart.toLowerCase())
//       )
//       .map((p) => getName(p.email)),
//     datasets: [
//       {
//         label: "Completed",
//         data: developerProjects
//           .filter((p) =>
//             getName(p.email).toLowerCase().includes(searchChart.toLowerCase())
//           )
//           .map((p) => (p.completed ? 1 : 0)),
//         backgroundColor: "rgba(168,85,247,0.7)",
//       },
//     ],
//   };

//   const assignProject = (e) => {
//     e.preventDefault();
//     const newProject = {
//       email: assignForm.email,
//       name: assignForm.name,
//       startDate: assignForm.startDate,
//       endDate: assignForm.endDate,
//       role: "developer",
//       assignedBy: loggedInUser.email,
//       completed: false,
//     };
//     const updated = [...projects, newProject];
//     setProjects(updated);
//     localStorage.setItem("projects", JSON.stringify(updated));
//     setAssignForm({ email: "", name: "", startDate: "", endDate: "" });
//     setActiveTab("dashboard");
//   };

//   const handleImageUpload = (e) => {
//     const url = URL.createObjectURL(e.target.files[0]);
//     setProfileImg(url);
//     localStorage.setItem("managerProfile", url);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("loggedInUser");
//     navigate("/");
//   };

//   return (
//     <div className="dashboard-container">
//       {/* SIDEBAR */}
//       <aside className="sidebar">
//         <h2 className="logo">DevFlow-IQ</h2>
//         <div className="myPro">
//           <div
//             className="profileImg"
//             style={{
//               backgroundImage: profileImg
//                 ? `url(${profileImg})`
//                 : `url("https://cdn-icons-png.flaticon.com/512/149/149071.png")`,
//             }}
//           ></div>
//           <p>{loggedInUser.name}</p>
//           <label className="editBtn">
//             Edit Profile
//             <input type="file" hidden onChange={handleImageUpload} />
//           </label>
//         </div>
//         <ul>
//           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
//           <li onClick={() => setActiveTab("assign")}>Project Assign</li>
//           <li onClick={() => setActiveTab("completed")}>Completed Projects</li>
//           <li onClick={() => setActiveTab("settings")}>Settings</li>
//           <li className="logout" onClick={handleLogout}>
//             Logout
//           </li>
//         </ul>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="main-content">
//         {/* DASHBOARD */}
//         {activeTab === "dashboard" && (
//           <>
//             <div className="topbar">
//               <input
//                 type="text"
//                 placeholder="Search Developer..."
//                 value={searchChart}
//                 onChange={(e) => setSearchChart(e.target.value)}
//               />
//             </div>

//             <div className="stats-cards">
//               <div className="card">
//                 {developerProjects.length > 0 ? (
//                   <Bar data={chartData} />
//                 ) : (
//                   <p style={{ color: "#fff" }}>No projects assigned yet</p>
//                 )}
//               </div>
//               <div className="card highlight">
//                 {completed.length} Completed Projects
//               </div>
//             </div>

//             <div className="table-card">
//               <h3>All Assigned Developer Projects</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Project Name</th>
//                     <th>Start Date</th>
//                     <th>End Date</th>
//                     <th>Total Projects Assigned</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {developerProjects.map((p, i) => (
//                     <tr key={i}>
//                       <td>{getName(p.email)}</td>
//                       <td>{p.email}</td>
//                       <td>{p.name}</td>
//                       <td>{p.startDate}</td>
//                       <td>{p.endDate}</td>
//                       <td>
//                         {
//                           developerProjects.filter((d) => d.email === p.email)
//                             .length
//                         }
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {/* ASSIGN PROJECT */}
//         {activeTab === "assign" && (
//           <form className="project-form" onSubmit={assignProject}>
//             <h2>Assign Project to Developer</h2>
//             <input
//               placeholder="Developer Email"
//               value={assignForm.email}
//               onChange={(e) =>
//                 setAssignForm({ ...assignForm, email: e.target.value })
//               }
//               required
//             />
//             <input
//               placeholder="Project Name"
//               value={assignForm.name}
//               onChange={(e) =>
//                 setAssignForm({ ...assignForm, name: e.target.value })
//               }
//               required
//             />
//             <input
//               type="date"
//               value={assignForm.startDate}
//               onChange={(e) =>
//                 setAssignForm({ ...assignForm, startDate: e.target.value })
//               }
//               required
//             />
//             <input
//               type="date"
//               value={assignForm.endDate}
//               onChange={(e) =>
//                 setAssignForm({ ...assignForm, endDate: e.target.value })
//               }
//               required
//             />
//             <button>Assign</button>
//           </form>
//         )}

//         {/* COMPLETED */}
//         {activeTab === "completed" && (
//           <>
//             <div className="table-card">
//               <h3>Completed Developer Projects</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Project Name</th>
//                     <th>Start Date</th>
//                     <th>End Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {completed.map((p, i) => (
//                     <tr key={i}>
//                       <td>{getName(p.email)}</td>
//                       <td>{p.email}</td>
//                       <td>{p.name}</td>
//                       <td>{p.startDate}</td>
//                       <td>{p.endDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="table-card">
//               <h3>Not Completed Developer Projects</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Project Name</th>
//                     <th>Start Date</th>
//                     <th>End Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {notCompleted.map((p, i) => (
//                     <tr key={i}>
//                       <td>{getName(p.email)}</td>
//                       <td>{p.email}</td>
//                       <td>{p.name}</td>
//                       <td>{p.startDate}</td>
//                       <td>{p.endDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {/* SETTINGS */}
//         {activeTab === "settings" && (
//           <div className="settings">
//             <h2>Settings</h2>
//             <input placeholder="Change Email" />
//             <input type="password" placeholder="Change Password" />
//             <button>Update</button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default ManagerDashboard;



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
import "./ManagerDashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ManagerDashboard() {
  const navigate = useNavigate();

  // Logged-in manager info
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "Manager",
      email: "",
    };

  // State
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || []
  );
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("managerProfile") || ""
  );

  const [assignForm, setAssignForm] = useState({
    email: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  const [searchChart, setSearchChart] = useState("");

  // Fetch all users (developers)
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  // Helper to get developer name by email
  const getName = (email) =>
    users.find((u) => u.email === email)?.name || email;

  // Filter only developer projects assigned by this manager
  const developerProjects = projects.filter(
    (p) => p.role === "developer" && p.assignedBy === loggedInUser.email
  );
  const completed = developerProjects.filter((p) => p.completed);
  const notCompleted = developerProjects.filter((p) => !p.completed);

  // Chart data (filtered by search)
  const chartData = {
    labels: developerProjects
      .filter((p) =>
        getName(p.email).toLowerCase().includes(searchChart.toLowerCase())
      )
      .map((p) => getName(p.email)),
    datasets: [
      {
        label: "Completed",
        data: developerProjects
          .filter((p) =>
            getName(p.email).toLowerCase().includes(searchChart.toLowerCase())
          )
          .map((p) => (p.completed ? 1 : 0)),
        backgroundColor: "rgba(168,85,247,0.7)",
      },
    ],
  };

  // Assign new project to developer
  const assignProject = (e) => {
    e.preventDefault();
    const newProject = {
      email: assignForm.email,
      name: assignForm.name,
      startDate: assignForm.startDate,
      endDate: assignForm.endDate,
      role: "developer",
      assignedBy: loggedInUser.email,
      completed: false,
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setAssignForm({ email: "", name: "", startDate: "", endDate: "" });
    setActiveTab("dashboard");
  };

  // Profile image functions
  const handleProfileEdit = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setProfileImg(url);
    localStorage.setItem("managerProfile", url);
  };

  const handleProfileRemove = () => {
    setProfileImg("");
    localStorage.removeItem("managerProfile");
  };

  // Logout - just navigate home without clearing data
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">DevFlow-IQ</h2>

        <div className="profile">
          <div
            className="profileImg"
            style={{
              backgroundImage: profileImg
                ? `url(${profileImg})`
                : `url("https://cdn-icons-png.flaticon.com/512/149/149071.png")`,
            }}
          ></div>
          <p>{loggedInUser.name}</p>
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
          <li onClick={() => setActiveTab("completed")}>Completed Projects</li>
          <li onClick={() => setActiveTab("settings")}>Settings</li>
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
            <input
              type="text"
              className="search"
              placeholder="Search Developer..."
              value={searchChart}
              onChange={(e) => setSearchChart(e.target.value)}
            />

            <div className="dashboard-top">
              <div className="chart-card">
                {developerProjects.length > 0 ? (
                  <Bar data={chartData} />
                ) : (
                  <p style={{ color: "#fff" }}>No projects assigned yet</p>
                )}
              </div>
              <div className="info-card">
                <h3>{completed.length}</h3>
                <p>Completed Projects</p>
              </div>
            </div>

            <div className="project-tables">
              <h2>All Assigned Developer Projects</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Projects Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {developerProjects.map((p, i) => (
                    <tr key={i}>
                      <td>{getName(p.email)}</td>
                      <td>{p.email}</td>
                      <td>{p.name}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                      <td>
                        {developerProjects.filter((d) => d.email === p.email)
                          .length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ASSIGN PROJECT */}
        {activeTab === "assign" && (
          <form className="assign-form" onSubmit={assignProject}>
            <h2>Assign Project to Developer</h2>
            <input
              placeholder="Developer Email"
              value={assignForm.email}
              onChange={(e) =>
                setAssignForm({ ...assignForm, email: e.target.value })
              }
              required
            />
            <input
              placeholder="Project Name"
              value={assignForm.name}
              onChange={(e) =>
                setAssignForm({ ...assignForm, name: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={assignForm.startDate}
              onChange={(e) =>
                setAssignForm({ ...assignForm, startDate: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={assignForm.endDate}
              onChange={(e) =>
                setAssignForm({ ...assignForm, endDate: e.target.value })
              }
              required
            />
            <button>Assign</button>
          </form>
        )}

        {/* COMPLETED PROJECTS */}
        {activeTab === "completed" && (
          <>
            <div className="project-tables">
              <h2>Completed Developer Projects</h2>
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
                      <td>{getName(p.email)}</td>
                      <td>{p.email}</td>
                      <td>{p.name}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="project-tables">
              <h2>Not Completed Developer Projects</h2>
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
                  {notCompleted.map((p, i) => (
                    <tr key={i}>
                      <td>{getName(p.email)}</td>
                      <td>{p.email}</td>
                      <td>{p.name}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
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

export default ManagerDashboard;



