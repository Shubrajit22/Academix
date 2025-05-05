import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StudentClassContent() {
  const { classId } = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClassContents = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/student/classes/${classId}/contents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setContents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClassContents();
  }, [classId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Class Content</h2>
      {loading ? (
        <p>Loading...</p>
      ) : contents.length === 0 ? (
        <p>No content available.</p>
      ) : (
        <ul className="space-y-4">
          {contents.map((item) => (
            <li key={item.id} className="bg-white shadow rounded p-4">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                Uploaded by Teacher ID: {item.teacherId}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
