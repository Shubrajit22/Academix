import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Clear any previous errors
    setError('');

    // Basic client-side validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      // Making the API request to register
      const response = await axios.post('http://localhost:3000/signin', {
        name,
        email,
        password,
        role,
      });

      // Assuming the response contains user data and token
      localStorage.setItem('token', response.data.token);
      navigate(role === 'STUDENT' ? '/student-dashboard' : '/teacher-dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="mt-2 p-3 border rounded-lg w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="mt-2 p-3 border rounded-lg w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mt-2 p-3 border rounded-lg w-full"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mt-2 p-3 border rounded-lg w-full"
      >
        <option value="STUDENT">Student</option>
        <option value="TEACHER">Teacher</option>
      </select>
      <button
        onClick={handleRegister}
        className="mt-4 p-3 bg-blue-600 text-white rounded-lg w-full"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      <div className="mt-4 text-center">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/signin')}
          className="text-blue-600 cursor-pointer"
        >
          Login here
        </span>
      </div>
    </div>
  );
};

export default Signup;
