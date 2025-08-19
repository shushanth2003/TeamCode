import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState({
    dob: "",
    gender: "",
    location: "",
    address: "",
    bio: "",
    website: "",
    profileurl: "",
    photo: null,      // Preview URL for UI
    photoFile: null,  // Actual file for upload (optional)
  });
  const [saveMsg, setSaveMsg] = useState("");
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${email}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("API error:", err));
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      setFields((prev) => ({
        ...prev,
        photo: URL.createObjectURL(files[0]), // for preview
        photoFile: files,                  // actual file for upload
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Prepare form data
    const data = {
      fullname: user.fullname,
      email: user.email,
      phoneno: user.phoneno,
      role: user.role,
      dob: fields.dob,
      gender: fields.gender,
      location: fields.location,
      address: fields.address,
      bio: fields.bio,
      website: fields.website,
      profileurl: fields.profileurl,
      // Optionally add photo if backend supports Base64 or URL as string
    };

    // If sending image file: use multipart/form-data and FormData
    // Here we just send JSON (photo not included).
    try {
      await axios.post("http://localhost:8080/api/profile", data);
      setSaveMsg("Profile saved successfully!");
    } catch (err) {
      setSaveMsg("Failed to save profile.");
    }
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-100 to-blue-300">
        <span className="text-xl font-bold text-blue-700">Loading...</span>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-100 to-blue-300 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl px-8 py-10">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">Profile</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSave}>
          {/* Fetched data (readonly) */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Full Name:</label>
            <input type="text" value={user.fullname} readOnly className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200" />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Email:</label>
            <input type="text" value={user.email} readOnly className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200" />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Phone Number:</label>
            <input type="text" value={user.phoneno} readOnly className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200" />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Role:</label>
            <input type="text" value={user.role} readOnly className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200" />
          </div>
          {/* User-editable fields */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Date of Birth:</label>
            <input type="date" name="dob" value={fields.dob} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Gender:</label>
            <input type="text" name="gender" value={fields.gender} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Location:</label>
            <input type="text" name="location" value={fields.location} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Website:</label>
            <input type="url" name="website" value={fields.website} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-900 font-semibold mb-1">Profile URL:</label>
            <input type="url" name="profileurl" value={fields.profileurl} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-900 font-semibold mb-1">Address:</label>
            <textarea name="address" rows="3" value={fields.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-900 font-semibold mb-1">Bio:</label>
            <textarea name="bio" rows="4" value={fields.bio} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200" />
          </div>
          {/* Photo upload and preview */}
          <div className="md:col-span-2 flex flex-col items-center mt-2">
            <label className="block text-blue-900 font-semibold mb-2">Profile Photo</label>
            {fields.photo ? (
              <img src={fields.photo} alt="Preview" className="w-24 h-24 object-cover rounded-full border-4 border-blue-300 shadow mb-4" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-blue-200 flex items-center justify-center text-3xl text-blue-400 mb-4">👤</div>
            )}
            <label className="cursor-pointer inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              {fields.photo ? "Change Photo" : "Upload Photo"}
            </label>
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl font-semibold py-3 px-6 shadow-lg transition-all text-lg"
            >
              Save
            </button>
          </div>
          {saveMsg && (
            <div className="md:col-span-2 mt-4 text-center font-semibold text-green-600">{saveMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
