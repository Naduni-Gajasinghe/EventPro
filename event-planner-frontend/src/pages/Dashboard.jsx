import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [events, setEvents] = useState({ myEvents: [], otherEvents: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [rsvpSummary, setRsvpSummary] = useState({});

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Expect backend to return { myEvents: [], otherEvents: [] }
      setEvents({
        myEvents: res.data.myEvents || [],
        otherEvents: res.data.otherEvents || [],
      });

      // Fetch RSVP summaries for all events
      [...(res.data.myEvents || []), ...(res.data.otherEvents || [])].forEach((ev) =>
        fetchRSVPSummary(ev.id)
      );
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUser();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch {
      alert("Error deleting event");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleRSVP = async (eventId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/rsvp/${eventId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // refresh RSVP summary
      fetchRSVPSummary(eventId);

      alert(`RSVP updated: ${status}`);
    } catch (err) {
      alert("Error setting RSVP");
    }
  };

  const fetchRSVPSummary = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/rsvp/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRsvpSummary((prev) => ({ ...prev, [eventId]: res.data }));
    } catch (err) {
      console.error("Error fetching RSVP summary:", err);
    }
  };

  const filterEvents = (list) =>
    list.filter(
      (ev) =>
        ev.title.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? ev.category === filter : true)
    );

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading events...</p>;

  const handleInvite = async (eventId, email) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/invites/${eventId}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(`Invitation sent to ${email}`);
  } catch (err) {
    alert("Error sending invite: " + err.response?.data?.error);
  }
};


  return (
    <div>
      {/* Navbar */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">EventPro</h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/event/new")}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
              >
                + Add Event
              </button>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Events</h2>
            {user && <p className="text-gray-600 text-sm">👋 Welcome back, {user.name}!</p>}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Meeting">Meeting</option>
            <option value="Party">Party</option>
          </select>
        </div>

        {/* My Events Section */}
        <h3 className="text-xl font-semibold mb-3">My Events</h3>
        {filterEvents(events.myEvents).length === 0 ? (
          <p className="text-gray-500 mb-6">You haven’t created any events yet.</p>
        ) : (
          <ul className="space-y-4 mb-8">
            {filterEvents(events.myEvents).map((ev) => (
              <li
                key={ev.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 border rounded-lg hover:shadow-md transition"
              >
                <div>
                  <h3
                      onClick={() => navigate(`/event/${ev.id}`)}
                      className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
                    >
                    {ev.title}
                  </h3>

                  <p className="text-gray-600 text-sm">{ev.description}</p>
                  <p className="text-gray-500 text-xs mt-1">📅 {new Date(ev.date).toDateString()}</p>
                  <p className="text-gray-500 text-xs">🏷 {ev.category || "Uncategorized"}</p>
                  <p className="text-gray-500 text-xs">
                    RSVP: {rsvpSummary[ev.id]?.Attending || 0} Attending |{" "}
                    {rsvpSummary[ev.id]?.Maybe || 0} Maybe |{" "}
                    {rsvpSummary[ev.id]?.["Not Going"] || 0} Not Going
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/event/edit/${ev.id}`)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  {/* Invite button for owners */}
  {user?.id === ev.createdBy && (
    <button
      onClick={() => {
        const email = prompt("Enter email to invite:");
        if (email) handleInvite(ev.id, email);
      }}
      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
    >
      Invite
    </button>
  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Other Events Section */}
        <h3 className="text-xl font-semibold mb-3">Other Events</h3>
        {filterEvents(events.otherEvents).length === 0 ? (
          <p className="text-gray-500">No other events available right now.</p>
        ) : (
          <ul className="space-y-4">
            {filterEvents(events.otherEvents).map((ev) => (
              <li
                key={ev.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 border rounded-lg hover:shadow-md transition"
              >
                <div>
                  <h3
  onClick={() => navigate(`/event/${ev.id}`)}
  className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
>
  {ev.title}
</h3>

                  <p className="text-gray-600 text-sm">{ev.description}</p>
                  <p className="text-gray-500 text-xs mt-1">📅 {new Date(ev.date).toDateString()}</p>
                  <p className="text-gray-500 text-xs">🏷 {ev.category || "Uncategorized"}</p>
                  <p className="text-gray-500 text-xs">
                    RSVP: {rsvpSummary[ev.id]?.Attending || 0} Attending |{" "}
                    {rsvpSummary[ev.id]?.Maybe || 0} Maybe |{" "}
                    {rsvpSummary[ev.id]?.["Not Going"] || 0} Not Going
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  {["Attending", "Maybe", "Not Going"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleRSVP(ev.id, status)}
                      className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
