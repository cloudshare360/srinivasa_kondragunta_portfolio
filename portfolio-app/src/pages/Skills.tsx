import { useState, useEffect } from 'react'
import skillsData from '../data/skills/skills.json'

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

  if (!data) return <div>Loading...</div>

  return (
    <div className="skills-page">
      <div className="container">
        <h1>Skills & Technologies</h1>
        
        <div className="skills-grid">
          {data.categories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.name}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                    <div className="skill-meta">
                      {skill.years} year{skill.years !== 1 ? 's' : ''} experience
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills