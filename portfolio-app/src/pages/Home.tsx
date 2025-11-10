import { useState, useEffect } from 'react'
import aboutData from '../data/about/about-me.json'

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
    <div className="home-page">
      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <h1>{data.name}</h1>
            <h2>{data.title}</h2>
            <p className="summary">{data.summary}</p>
          </div>
        </section>

        <section className="about-section">
          <h3>About Me</h3>
          <div className="bio">
            {data.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="highlights-section">
          <h3>Key Highlights</h3>
          <ul className="highlights">
            {data.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Home