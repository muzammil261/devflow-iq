import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const user = users.find(u => u.email === email);
      if (!user) return alert("User not found");
      if (user.password !== password) return alert("Wrong password");

      // ✅ FIXED: Save in "loggedInUser" for consistency
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      navigate(`/${user.role}`);
    } catch {
      alert("JSON Server not running");
    }
  };

  return (
    <form onSubmit={login}>
      <div className="LoginPageBox">
        <p className="lp">Login</p>

        <div className="input-group">
          <input
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button id="submit">Login</button>

        <p>New user? <Link to="/register">Register</Link></p>
      </div>
    </form>
  );
}

export default LoginPage;
