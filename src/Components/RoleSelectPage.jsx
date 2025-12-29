import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegisterPage.css";

function RoleSelect() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const next = () => {
    if (!role) return alert("Select role");
    navigate(`/register/${role}`);
  };

  return (
    <div className="RegisterPageBox">
      <p className="rp">Select Role</p>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Choose Role</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="developer">Developer</option>
      </select>

      <button id="submit" onClick={next}>Continue</button>
    </div>
  );
}

export default RoleSelect;
