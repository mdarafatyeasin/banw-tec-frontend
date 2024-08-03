import "./Blog.css"; // Import the CSS file for styling

const Blog = (blog) => {
  const { title, summary, img, draft } = blog.blog;

  // Truncate summary if it's longer than 15 characters
  const truncatedSummary =
    summary.length > 15 ? summary.slice(0, 15) + "..." : summary;

  console.log(draft);
  return (
    <div>
      {draft ? (
        <></>
      ) : (
        <div className="blog-card">
          <img src={img} alt={title} className="blog-image" />
          <h2 className="blog-title">{title}</h2>
          <p className="blog-summary">{truncatedSummary}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
