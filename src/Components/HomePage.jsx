import { useLocation, Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (link) => path === link;

  return (
    <>
      <header className="header">
        <div className="myProhome">
          <div className="profileImghome"></div>
          <p>S.MD.Muzammil</p>
        </div>

        <nav className="navbars">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>

          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>

          <Link
            to="/techstack"
            className={`nav-link ${isActive("/techstack") ? "active" : ""}`}
          >
            Tech Stack
          </Link>

          <Link
            to="/login"
            className={`nav-link ${isActive("/login") ? "active" : ""}`}
          >
            Login
          </Link>

          <Link
            id="Register-btn"
            to="/register"
            className={`nav-link ${isActive("/register") ? "active" : ""}`}
          >
            Register
          </Link>
        </nav>
      </header>

      <main className="body">
        <section className="hero-card">
          <h1><span>DevFlow-IQ</span></h1>
          <p>
            DevFlow-IQ is a Java Full-Stack 
            web application designed to streamline 
            and optimize the software development workflow. 
            Built using Java, React, and SQL, the project 
            focuses on creating a clean, modern, and scalable 
            architecture while delivering an intuitive 
            and user-friendly UI/UX experience.
          </p>

          <button className="primary-btn">Project-Detail</button>
        </section>
      </main>

      <footer className="footer">
        <a href="https://linkedin.com" className="social">LinkedIn</a>
        <a href="https://github.com" className="social">GitHub</a>
        <a href="https://naukri.com" className="social">Naukri</a>
        <a href="https://leetcode.com" className="social">LeetCode</a>
      </footer>
    </>
  );
}

export default HomePage;
