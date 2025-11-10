import { useState, useEffect } from 'react'
import './projects-styles.css'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  duration: string
  highlights: string[]
  image: string
  link: string
  status: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const project1 = await import('../data/projects/project-1.json')
        const project2 = await import('../data/projects/project-2.json')
        const project3 = await import('../data/projects/project-3.json')
        setProjects([project1.default, project2.default, project3.default])
      } catch (error) {
        console.error('Error loading projects:', error)
      }
    }
    
    loadProjects()
  }, [])

  const categories = ['All', 'Web Development', 'Mobile Apps', 'AI/ML', 'Cloud Solutions']
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return '✅'
      case 'in progress': return '🚧'
      case 'planning': return '📋'
      default: return '💼'
    }
  }

  const getTechIcon = (tech: string) => {
    const techIcons: { [key: string]: string } = {
      'React': '⚛️',
      'Node.js': '🟢',
      'Python': '🐍',
      'JavaScript': '🟨',
      'TypeScript': '🔵',
      'AWS': '☁️',
      'MongoDB': '🍃',
      'PostgreSQL': '🐘',
      'Docker': '🐳',
      'Kubernetes': '⚙️',
      'TensorFlow': '🧠',
      'Django': '🎯',
      'Next.js': '▲',
      'Vue.js': '💚'
    }
    return techIcons[tech] || '🔧'
  }

  if (!projects.length) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <h1 className="section-title">Featured Projects</h1>
          <p className="projects-subtitle">
            Showcasing innovative solutions across web development, AI/ML, and cloud platforms
          </p>
          
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-content">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} className="project-card card" data-index={index}>
                <div className="project-image">
                  <img 
                    src={project.image || "/api/placeholder/400/250"} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="project-status">
                      {getStatusIcon(project.status)} {project.status}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-duration">{project.duration}</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {getTechIcon(tech)} {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-highlights">
                    <h4>Key Achievements</h4>
                    <ul>
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="project-actions">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View Project →
                      </a>
                    )}
                    <button className="project-details-btn">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Project Statistics */}
          <div className="projects-stats">
            <div className="stats-card card">
              <h3>Project Impact</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{projects.length}</span>
                  <span className="stat-label">Featured Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Users Impacted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">16+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
              
              <div className="methodology">
                <h4>Development Approach</h4>
                <div className="methodology-tags">
                  <span className="methodology-tag">Agile Development</span>
                  <span className="methodology-tag">Test-Driven Development</span>
                  <span className="methodology-tag">CI/CD Pipeline</span>
                  <span className="methodology-tag">Cloud-First Architecture</span>
                  <span className="methodology-tag">Performance Optimization</span>
                  <span className="methodology-tag">Security Best Practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects