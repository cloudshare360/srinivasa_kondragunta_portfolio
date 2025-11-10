import { useState, useEffect } from 'react'
import skillsData from '../data/skills/skills.json'
import './skills-styles.css'

interface Skill {
  name: string
  level: string
  years: number
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

interface SkillsData {
  categories: SkillCategory[]
}

const Skills = () => {
  const [data, setData] = useState<SkillsData | null>(null)

  useEffect(() => {
    setData(skillsData as SkillsData)
  }, [])

  const getSkillLevel = (level: string) => {
    const levels = {
      'Expert': 95,
      'Advanced': 85,
      'Intermediate': 70,
      'Beginner': 40
    }
    return levels[level as keyof typeof levels] || 50
  }

  const getSkillIcon = (categoryName: string) => {
    const icons = {
      'Programming Languages': '💻',
      'Web Technologies': '🌐',
      'Frameworks & Libraries': '⚛️',
      'Databases': '🗄️',
      'Cloud Platforms': '☁️',
      'DevOps & Tools': '🛠️',
      'AI/ML Technologies': '🤖',
      'Mobile Development': '📱'
    }
    return icons[categoryName as keyof typeof icons] || '🔧'
  }

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading skills...</p>
      </div>
    )
  }

  return (
    <div className="skills-page">
      <section className="skills-hero">
        <div className="container">
          <h1 className="section-title">Skills & Expertise</h1>
          <p className="skills-subtitle">
            16+ years of hands-on experience across multiple technologies and domains
          </p>
        </div>
      </section>

      <section className="skills-content">
        <div className="container">
          <div className="skills-grid">
            {data.categories.map((category, index) => (
              <div key={index} className="skill-category card" data-category={index}>
                <div className="category-header">
                  <span className="category-icon">{getSkillIcon(category.name)}</span>
                  <h3 className="category-title">{category.name}</h3>
                </div>
                
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-experience">{skill.years}y</span>
                      </div>
                      <div className="skill-progress">
                        <div 
                          className="skill-bar"
                          style={{ 
                            width: `${getSkillLevel(skill.level)}%`,
                            animationDelay: `${index * 100 + skillIndex * 50}ms`
                          }}
                        ></div>
                      </div>
                      <div className="skill-level">{skill.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Skills Summary */}
          <div className="skills-summary">
            <div className="summary-card card">
              <h3>Technical Expertise Summary</h3>
              <div className="expertise-stats">
                <div className="stat-box">
                  <span className="stat-number">{data.categories.length}</span>
                  <span className="stat-label">Technology Domains</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">
                    {data.categories.reduce((total, cat) => total + cat.skills.length, 0)}
                  </span>
                  <span className="stat-label">Technical Skills</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">16+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
              <div className="expertise-highlights">
                <h4>Core Competencies</h4>
                <div className="competency-tags">
                  <span className="competency-tag">Full-Stack Development</span>
                  <span className="competency-tag">AI/ML Engineering</span>
                  <span className="competency-tag">Cloud Architecture</span>
                  <span className="competency-tag">DevOps & CI/CD</span>
                  <span className="competency-tag">Mobile Development</span>
                  <span className="competency-tag">Enterprise Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills