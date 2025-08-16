import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email"); // Get email from storage
  console.log("Email from local Storage",email);
  useEffect(() => {
   axios.get(`http://localhost:8080/api/user/${email}`)
  .then(res => {
    console.log("API DATA:", res.data);
    setUser(res.data);
  })
  .catch(err => console.error("API error:", err));
  }, [email]);

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h2>Profile</h2>
      <label>Full Name:</label>
      <input type="text" value={user.fullname} readOnly />
      <br />
      <label>Email:</label>
      <input type="text" value={user ? user.email : ""} readOnly />
      <br />
      <label>Phone Number:</label>
      <input type="text" value={user.phoneno} readOnly />
      <br />
      <label>Role:</label>
      <input type="text" value={user.role} readOnly />
      <label>Date of Birth:</label>
      <input type="date" name="dob" />
      <label>Gender:</label>
      <input type="text" />
      <label>location</label>
      <input type="text"/>
      <label>Address:</label>
      <textarea name="address" rows="3"></textarea>
      <label>Bio:</label>
      <textarea name="bio" rows="4"></textarea>
      <label>Website</label>
      <input type="url" name="website" />
      <label>Profile url</label>
      <input type="url" name="website" />
      <label>Upload Photo:</label>
      <input type="file" name="photo" accept="image/*" />
    </div>
  );
}

export default Profile;
