import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [classCode, setClassCode] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEnrolledClasses = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/student/get-classes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setClasses(data);
  };

  const handleJoinClass = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/student/join-class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ classId: classCode }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Class joined successfully.");
      setClassCode("");
      fetchEnrolledClasses();
    } else {
      alert(data.message || "Failed to join class.");
    }

    setLoading(false);
  };

  const viewClassContent = (classId: string) => {
    navigate(`/student/class/${classId}/contents`);
  };

  useEffect(() => {
    fetchEnrolledClasses();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Class ID"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleJoinClass}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Class"}
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Enrolled Classes</h3>
        <ul className="space-y-2">
          {classes.map((cls) => (
            <li key={cls.id} className="bg-white rounded shadow p-4">
              <h4 className="font-bold">{cls.name}</h4>
              <p>Teacher: {cls.teacher?.name}</p>
              <button
                onClick={() => viewClassContent(cls.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Class Content
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
