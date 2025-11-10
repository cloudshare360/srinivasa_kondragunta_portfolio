import { useState, useEffect } from 'react'
import aboutData from '../data/about/about-me.json'
import './home-styles.css'

interface AboutData {
  name: string
  title: string
  summary: string
  location: string
  email: string
  profileImage: string
  bio: string[]
  highlights: string[]
}

const Home = () => {
  const [data, setData] = useState<AboutData | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch this data, but since we're using static imports for now
    setData(aboutData as AboutData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-container">
              <div className="avatar-ring"></div>
              <img 
                src={data.profileImage || "/api/placeholder/200/200"} 
                alt={data.name}
                className="avatar-image"
              />
            </div>
          </div>
          
          <h1 className="hero-title">
            {data.name}
          </h1>
          
          <p className="hero-subtitle">
            {data.title}
          </p>
          
          <p className="hero-summary">
            {data.summary}
          </p>
          
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => window.location.href = '/projects'}>
              View My Work
            </button>
            <button className="cta-secondary" onClick={() => window.location.href = '/contact'}>
              Get In Touch
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">16+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Satisfied Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-content">
              {data.bio.map((paragraph, index) => (
                <p key={index} className="about-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="highlights-card card">
              <h3 className="card-title">Key Highlights</h3>
              <ul className="highlights-list">
                {data.highlights.map((highlight, index) => (
                  <li key={index} className="highlight-item">
                    <span className="highlight-icon">✦</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="section specialization-section">
        <div className="container">
          <h2 className="section-title">My Expertise</h2>
          <div className="specialization-grid">
            <div className="specialization-card card">
              <div className="spec-icon">🤖</div>
              <h3>AI & Machine Learning</h3>
              <p>Advanced AI solutions, ML model development, and intelligent automation systems.</p>
            </div>
            <div className="specialization-card card">
              <div className="spec-icon">☁️</div>
              <h3>Cloud Architecture</h3>
              <p>Scalable cloud solutions on AWS, Azure, and GCP with microservices architecture.</p>
            </div>
            <div className="specialization-card card">
              <div className="spec-icon">📱</div>
              <h3>Full-Stack Development</h3>
              <p>Modern web and mobile applications using React, Node.js, and cutting-edge frameworks.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home