import { useState, useEffect } from 'react'

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

  useEffect(() => {
    // Dynamically import project files
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

  if (projects.length === 0) return <div>Loading...</div>

  return (
    <div className="projects-page">
      <div className="container">
        <h1>Projects</h1>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-meta">
                <span className="duration">Duration: {project.duration}</span>
                <span className="status">Status: {project.status}</span>
              </div>

              <div className="technologies">
                <h4>Technologies:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="highlights">
                <h4>Key Achievements:</h4>
                <ul>
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              {project.link && (
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects