import { useState, useEffect } from 'react'
import contactData from '../data/contact/contact-info.json'
import './contact-styles.css'

interface ContactInfo {
  email: string
  phone: string
  location: {
    city: string
    state: string
    country: string
  }
  linkedin: string
  github: string
  availability: string
  preferredContact: string
  workingHours: string
  message: string
}

const Contact = () => {
  const [data, setData] = useState<ContactInfo | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    setData(contactData as ContactInfo)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1500)
  }

  const getContactIcon = (type: string) => {
    const icons = {
      email: '📧',
      phone: '📱',
      location: '📍',
      linkedin: '💼',
      github: '🐙',
      website: '🌐',
      availability: '⏰',
      timezone: '🌍'
    }
    return icons[type as keyof typeof icons] || '📞'
  }

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading contact information...</p>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="section-title">Let's Work Together</h1>
          <p className="contact-subtitle">
            Ready to bring your next project to life? Let's discuss how we can collaborate.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <div className="info-card card">
                <h3>Get In Touch</h3>
                <p className="info-description">
                  I'm always interested in hearing about new opportunities, whether it's for a 
                  full-time role, consulting project, or just a chat about technology.
                </p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">{getContactIcon('email')}</span>
                    <div className="contact-text">
                      <span className="contact-label">Email</span>
                      <a href={`mailto:${data.email}`} className="contact-value">
                        {data.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <span className="contact-icon">{getContactIcon('phone')}</span>
                    <div className="contact-text">
                      <span className="contact-label">Phone</span>
                      <a href={`tel:${data.phone}`} className="contact-value">
                        {data.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <span className="contact-icon">{getContactIcon('location')}</span>
                    <div className="contact-text">
                      <span className="contact-label">Location</span>
                      <span className="contact-value">
                        {`${data.location.city}, ${data.location.state}, ${data.location.country}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <span className="contact-icon">{getContactIcon('availability')}</span>
                    <div className="contact-text">
                      <span className="contact-label">Availability</span>
                      <span className="contact-value availability-status">
                        {data.availability}
                      </span>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <span className="contact-icon">{getContactIcon('timezone')}</span>
                    <div className="contact-text">
                      <span className="contact-label">Working Hours</span>
                      <span className="contact-value">{data.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-card card">
                <h4>Connect With Me</h4>
                <div className="social-links">
                  <a 
                    href={data.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                  >
                    <span className="social-icon">💼</span>
                    <span>LinkedIn</span>
                  </a>
                  
                  <a 
                    href={data.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link github"
                  >
                    <span className="social-icon">🐙</span>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-card card">
                <h3>Send a Message</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Project discussion, collaboration, etc."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="form-textarea"
                      placeholder="Tell me about your project or how we can work together..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner small"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="form-message success">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="form-message error">
                      ❌ Something went wrong. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="contact-additional">
            <div className="additional-card card">
              <h3>Collaboration Opportunities</h3>
              <div className="opportunities-grid">
                <div className="opportunity-item">
                  <span className="opportunity-icon">💼</span>
                  <h4>Full-Time Roles</h4>
                  <p>Senior/Lead developer positions in AI, cloud, or full-stack development</p>
                </div>
                
                <div className="opportunity-item">
                  <span className="opportunity-icon">🤝</span>
                  <h4>Consulting Projects</h4>
                  <p>Technical consulting for AI/ML implementations and cloud architecture</p>
                </div>
                
                <div className="opportunity-item">
                  <span className="opportunity-icon">🚀</span>
                  <h4>Startup Collaboration</h4>
                  <p>CTO or technical advisor roles for innovative startups</p>
                </div>
                
                <div className="opportunity-item">
                  <span className="opportunity-icon">📚</span>
                  <h4>Speaking & Training</h4>
                  <p>Technical talks, workshops, and training on emerging technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact