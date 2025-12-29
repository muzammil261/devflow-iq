import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegisterPage.css";

function RegisterPage() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) return alert("Passwords not matching");

    const newUser = { name, email, password, role };

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      if (users.some((u) => u.email === email)) {
        return alert("User already exists");
      }

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      // ✅ Save new user as loggedInUser
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      navigate(`/${role}`);
    } catch {
      alert("JSON Server not running");
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="RegisterPageBox">
        <p className="rp">Register as {role}</p>

        <div className="input-group">
          <input placeholder="Name" required onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <input placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirm(e.target.value)} />
        </div>

        <button id="submit">Register</button>
      </div>
    </form>
  );
}

export default RegisterPage;
