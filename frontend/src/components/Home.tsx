import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
    navigate('/signin', { state: { role } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md">Welcome to LMS</h1>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          A modern learning platform for students and teachers to collaborate, learn, and grow.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg font-medium"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg font-medium"
        >
          Signup
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div
            className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-sm p-8 animate-fadeIn border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login As</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleRoleClick('STUDENT')}
                className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition font-medium text-lg"
              >
                Student
              </button>
              <button
                onClick={() => handleRoleClick('TEACHER')}
                className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition font-medium text-lg"
              >
                Teacher
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-100 transition font-medium text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
