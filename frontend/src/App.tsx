import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [branch, setBranch] = useState("");
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");
  const [password, setPassword] = useState("");

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {
    const user = await axios.post("http://localhost:3000/signin", {
      name,
      email,
      password,
      roll,
      branch,
      dept,
      role,
    });
    // setName("");
    // setBranch("");
    // setRoll("");
    // setEmail("");
    // setPassword("");
    alert("User Already Created" + user);
    return user;
    
  };

  return (
    <div>
      <nav>
        <h2>LMS </h2>
        <div>
          <button onClick={handleModal}>SignUp</button>
          <button onClick={handleModal}>SignIn</button>
        </div>
        {modal && (
          <div>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                color: "white",
                backgroundColor: "black",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              <option value="STUDENT" style={{ color: "black" }}>
                Student
              </option>
              <option value="TEACHER" style={{ color: "black" }}>
                Teacher
              </option>
              <option value="ADMIN" style={{ color: "black" }}>
                Admin
              </option>
            </select>

            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </nav>
    </div>
  );
};
export default App;
