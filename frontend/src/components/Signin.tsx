import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Clear any previous errors
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);

    try {
      // Sending POST request to the backend for login
      const response = await axios.post('http://localhost:3000/signin', {
        email,
        password,
      });

      // Assuming the response contains the token and user role
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Redirect based on user role
      if (user.role === 'STUDENT') {
        navigate('/student-dashboard');
      } else if (user.role === 'TEACHER') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/admin-dashboard'); // Redirect to admin dashboard (if needed)
      }
    } catch (err: any) {
      // Handle errors from API (e.g., incorrect credentials)
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
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
      <button
        onClick={handleLogin}
        className="mt-4 p-3 bg-blue-600 text-white rounded-lg w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="mt-4 text-center">
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/signup')}
          className="text-blue-600 cursor-pointer"
        >
          Sign up here
        </span>
      </div>
    </div>
  );
};

export default Login;
