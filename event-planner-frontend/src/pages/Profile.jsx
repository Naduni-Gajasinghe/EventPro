import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName(res.data.name || "");
      setBio(res.data.bio || "");
      setProfilePicture(res.data.profilePicture || "");
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      "http://localhost:5000/profile",
      { name, bio, profilePicture },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-3 rounded"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      {profilePicture && (
        <img src={profilePicture} alt="Profile Preview" className="w-24 h-24 rounded-full mb-4" />
      )}
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
