import { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // All blogs from API
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered blogs based on category
  const [selectedCategory, setSelectedCategory] = useState(""); // Current selected category

  useEffect(() => {
    fetch("https://banaw-tec-backend.onrender.com/api/blogs/blog/")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data); // Initialize with all blogs
      });
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "") {
      // Show all blogs if no category is selected
      setFilteredBlogs(blogs);
    } else {
      // Filter blogs by selected category
      setFilteredBlogs(blogs.filter((blog) => blog.category === category));
    }
  };

  return (
    <div className="blog-container">
      {/* Category filter dropdown */}
      <div className="filter-container">
        <label htmlFor="category-select">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Mental-Health">Mental Health</option>
          <option value="Heart-Decease">Heart Decease</option>
          <option value="Covid-19">Covid-19</option>
          <option value="Immunization">Immunization</option>
        </select>
      </div>

      {/* Display filtered blogs */}
      {filteredBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
