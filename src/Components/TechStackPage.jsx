import React from "react";
import { Link } from "react-router-dom";
import "./TechStackPage.css";

const techStack = {
  Frontend: [
    { name: "React.js", percentage: 80 },
    { name: "JavaScript", percentage: 75 },
    { name: "HTML", percentage: 90 },
    { name: "CSS", percentage: 85 },
  ],
  Backend: [
    { name: "Java", percentage: 60 },
    { name: "Servlets", percentage: 50 },
    { name: "JDBC", percentage: 55 },
  ],
  Database: [
    { name: "MySQL", percentage: 70 },
  ],
  Tools: [
    { name: "Vite", percentage: 65 },
    { name: "VS Code", percentage: 90 },
    { name: "Git", percentage: 80 },
  ],
};

export default function TechStackPage() {
  return (
    <div className="tech-page">
      <h1>Tech Stack Usage</h1>

      <div className="cards-container">
        {Object.entries(techStack).map(([category, techs]) => (
          <div key={category} className="data-card">
            <h2 className="card-category">{category}</h2>
            {techs.map((tech) => (
              <div key={tech.name} className="tech-node">
                <div className="tech-name">{tech.name}</div>
                <div className="tech-line-container">
                  <div
                    className="tech-line"
                    style={{ width: `${tech.percentage}%` }}
                  >
                    <span className="tech-percent">{tech.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Link to="/" className="upload-btn back-home-btn">
        Back to Home
      </Link>
    </div>
  );
}
