import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchEvent = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:5000/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvent(res.data);
  };

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:5000/events/${id}/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(res.data);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/events/${id}/comments`,
      { text: newComment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchEvent();
    fetchComments();
  }, [id]);

  if (!event) return <p className="text-center mt-10">Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        📅 {new Date(event.date).toDateString()}
      </p>

      {/* Comments */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border p-3 rounded bg-gray-50">
              <p className="text-sm font-medium text-gray-800">
                {c.User?.name || "Anonymous"}
              </p>
              <p className="text-gray-600 text-sm">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Add new comment */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border flex-1 p-2 rounded"
          />
          <button
            onClick={handleAddComment}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
