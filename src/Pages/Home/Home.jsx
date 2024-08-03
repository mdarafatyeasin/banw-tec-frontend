import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Health Blog</h1>
          <p>
            Discover the latest insights and information on mental health, heart diseases, COVID-19, and more.
          </p>
          <a href="#features" className="cta-button">Explore</a>
        </div>
      </header>

      <section className="features-section" id="features">
        <h2>Why Our Blog Stands Out</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Expert Insights</h3>
            <p>Gain valuable knowledge from seasoned professionals and stay informed on the latest health trends.</p>
          </div>
          <div className="feature-item">
            <h3>Community Support</h3>
            <p>Join a supportive community and share your experiences with others facing similar health challenges.</p>
          </div>
          <div className="feature-item">
            <h3>Up-to-date News</h3>
            <p>Stay updated with the latest news and developments in the health sector.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Our mission is to provide accurate, up-to-date information and support on a range of health topics. We aim to empower our readers with the knowledge they need to make informed health decisions.
          </p>
          <a href="#contact" className="cta-button">Get in Touch</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
