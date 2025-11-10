import { useState, useEffect } from 'react'
import contactData from '../data/contact/contact-info.json'

interface ContactData {
  email: string
  phone: string
  linkedin: string
  github: string
  location: {
    city: string
    state: string
    country: string
  }
  availability: string
  preferredContact: string
  workingHours: string
  message: string
}

const Contact = () => {
  const [data, setData] = useState<ContactData | null>(null)

  useEffect(() => {
    setData(contactData as ContactData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Me</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>

            <div className="contact-item">
              <h3>Phone</h3>
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </div>

            <div className="contact-item">
              <h3>LinkedIn</h3>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
            </div>

            <div className="contact-item">
              <h3>GitHub</h3>
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
              </a>
            </div>

            <div className="contact-item">
              <h3>Location</h3>
              <span>{data.location.city}, {data.location.state}, {data.location.country}</span>
            </div>
          </div>

          <div className="contact-details">
            <div className="availability">
              <h3>Availability</h3>
              <p>{data.availability}</p>
            </div>

            <div className="working-hours">
              <h3>Working Hours</h3>
              <p>{data.workingHours}</p>
            </div>

            <div className="preferred-contact">
              <h3>Preferred Contact Method</h3>
              <p>{data.preferredContact}</p>
            </div>

            <div className="message">
              <h3>Let's Connect</h3>
              <p>{data.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact