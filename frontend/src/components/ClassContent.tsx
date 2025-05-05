import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClassContent = () => {
  const { classId } = useParams();
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch class content
  const fetchClassContent = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/teacher/class/${classId}/content`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setContentList(data);
    setLoading(false);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/teacher/${classId}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("File uploaded successfully.");
      fetchClassContent(); // Refresh content list
    } catch (error) {
      alert("Failed to upload file.");
    }
    setLoading(false);
  };

  // Download content
  const handleDownload = async (contentId) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/teacher/content/${contentId}`, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "file";
    link.click();
  };

  useEffect(() => {
    fetchClassContent(); // Fetch class content on mount
  }, [classId]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Manage Class Content</h2>

      {/* File Upload Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="px-3 py-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Content"}
        </button>
      </div>

      {/* Class Content List */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Uploaded Content</h3>
        {loading && <div>Loading content...</div>}
        <ul className="space-y-2">
          {contentList.map((content) => (
            <li key={content.id} className="bg-white rounded shadow p-4">
              <h4 className="font-bold">{content.title}</h4>
              <button
                onClick={() => handleDownload(content.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassContent;
