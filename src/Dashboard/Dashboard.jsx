import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null); // Initial state as null
  const [blogData, setBlogData] = useState([]); // Initial state as empty array
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Ensure userData is loaded before fetching blogs
    if (userData) {
      const { user } = userData; // Destructure inside useEffect
      const id = user.id;
      fetch(`https://banaw-tec-backend.onrender.com/api/blogs/doctor/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBlogData(data); // Update blogData with fetched data
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    }
  }, [userData]); // Dependency on userData

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home"); // Navigate to homepage or any other route
    window.location.reload();
  };

  const handleUpdateDraft = async (blogId) => {
    try {
      const response = await fetch(
        `https://banaw-tec-backend.onrender.com/api/blogs/blog/${blogId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ draft: false }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update draft status");
      }

      const updatedBlog = await response.json();
      console.log("Updated Blog:", updatedBlog);

      // Refresh blog data after update
      setBlogData((prevBlogData) =>
        prevBlogData.map((blog) =>
          blog.id === blogId ? { ...blog, draft: false } : blog
        )
      );
    } catch (error) {
      console.error("Error updating draft status:", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await fetch(
        `https://banaw-tec-backend.onrender.com/api/blogs/blog/${blogId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }

      // Remove the deleted blog from the UI
      setBlogData((prevBlogData) =>
        prevBlogData.filter((blog) => blog.id !== blogId)
      );
      console.log(`Blog with ID ${blogId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { user, additional_info } = userData;
  const id = user.id;

  console.log(id);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="profile-section">
          <img
            src={additional_info.profile_picture}
            alt="Profile"
            className="profile-picture"
          />
          <div className="user-info">
            <h2>{`${user.first_name} ${user.last_name}`}</h2> {/* Display full name */}
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {additional_info.address}</p>
            <p><strong>Role:</strong> {additional_info.role}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-container">
        <div className="blog-data">
          <h2>Blogs</h2>
          {blogData.length > 0 ? (
            blogData.map((blog) => (
              <div key={blog.id} className="blog-item">
                <h3>{blog.title}</h3>
                <p>{blog.summary}</p>
                <p><strong>Draft:</strong> {blog.draft ? "Yes" : "No"}</p>
                <div className="blog-actions">
                  <button
                    className="update-button"
                    onClick={() => handleUpdateDraft(blog.id)}
                    disabled={!blog.draft} // Disable if already published
                  >
                    {blog.draft ? "Publish" : "Published"}
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
