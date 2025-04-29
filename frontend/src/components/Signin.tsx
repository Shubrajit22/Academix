import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SigninProps {}

const Signin: React.FC<SigninProps> = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');
  const [branch, setBranch] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [dept, setDept] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signin', {
        name,
        email,
        password,
        roll,
        branch,
        dept,
        role,
      });
    console.log(response)
      if (response.data) {
        alert('User Created Successfully');
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        alert('User creation failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('An error occurred during sign-in.');
      setModal(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f4f4' }}>
      <div style={{ width: '900px', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)' }}>
        <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h2>LMS</h2>
          <div>
            <button onClick={handleModal} style={{ background: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>SignUp</button>
            <button onClick={handleModal} style={{ background: '#28a745', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>SignIn</button>
          </div>
        </nav>
        {modal && (
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button onClick={handleSubmit} style={{ width: '100%', background: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;