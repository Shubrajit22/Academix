import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  // Fetches the classes created by the teacher
  const fetchClasses = async () => {
    const token = localStorage.getItem("token");
    const teacherId = 1; // Replace with actual teacher ID from JWT or context
    const res = await fetch(`http://localhost:3000/teacher/get-rooms/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setClasses(data);
  };

  // Creates a new class
  const handleCreateClass = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const teacherId = 1; // Replace with actual teacher ID from JWT or context
    const res = await fetch("http://localhost:3000/teacher/create-class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: className, teacher_id: teacherId }),
    });
    if (res.ok) {
      fetchClasses(); // Refresh the list of classes after creation
    }
    setLoading(false);
  };

  // Deletes a class
  const handleDeleteClass = async (classId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/teacher/delete-class/${classId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      fetchClasses(); // Refresh the list of classes after deletion
    }
  };

  // Navigate to content management for a specific class
  const handleViewClassContent = (classId: string) => {
    navigate(`/class/${classId}/content`);
  };

  useEffect(() => {
    fetchClasses(); // Fetch classes when component mounts
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Teacher Dashboard</h2>

      {/* Create Class Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleCreateClass}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Class"}
        </button>
      </div>

      {/* Display Existing Classes */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Classes</h3>
        <ul className="space-y-2">
          {classes.map((cls) => (
            <li key={cls.id} className="bg-white rounded shadow p-4">
              <h4 className="font-bold">Class Name: {cls.name}</h4>
              <p>Class ID: {cls.id}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleViewClassContent(cls.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Manage Content
                </button>
                <button
                  onClick={() => handleDeleteClass(cls.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Class
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
