import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(""); // ✅ added category state
  const navigate = useNavigate();
  const { id } = useParams(); // event id if editing

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:5000/events/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const event = res.data;
          setTitle(event.title);
          setDescription(event.description);
          setDate(event.date.split("T")[0]); // format YYYY-MM-DD
          setCategory(event.category || ""); // ✅ prefill category
        } catch {
          alert("Event not found");
          navigate("/dashboard");
        }
      };
      fetchEvent();
    }
  }, [id, navigate]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (id) {
        await axios.put(
          `http://localhost:5000/events/${id}`,
          { title, description, date, category }, // ✅ send category
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/events",
          { title, description, date, category }, // ✅ send category
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving event: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Event" : "Create Event"}
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* ✅ Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Meeting">Meeting</option>
          <option value="Party">Party</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {id ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
