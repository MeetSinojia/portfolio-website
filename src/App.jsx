import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'achievements', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('')

    // Simple mailto solution
    const mailtoLink = `mailto:sinojiameet321@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    
    window.location.href = mailtoLink
    setFormStatus('success')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setIsSubmitting(false)
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Meet</span>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a href="#about" onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#projects" onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#skills" onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#experience" onClick={() => scrollToSection('experience')} className={activeSection === 'experience' ? 'active' : ''}>Experience</a>
            <a href="#achievements" onClick={() => scrollToSection('achievements')} className={activeSection === 'achievements' ? 'active' : ''}>Achievements</a>
            <a href="#contact" onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </div>
          <div className="nav-actions">
            <button 
              className="dark-mode-toggle" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="greeting">Hello, I'm</span>
              <span className="name">Meet Sinojia</span>
              <span className="title">Software Engineer</span>
            </h1>
            <p className="hero-description">
              Passionate Flutter and React developer with expertise in cross-platform mobile apps and modern web development. 
              Specializing in building scalable applications with clean architecture and beautiful user interfaces.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </div>
            <div className="social-links">
              <a href="https://linkedin.com/in/meet-sinojia" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/meet-sinojia" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://leetcode.com/meet-sinojia" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fas fa-code"></i>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-image">
                <div className="avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="profile-info">
                <h3>Meet Sinojia</h3>
                <p>Software Engineer @ UBS</p>
                <div className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about animate-on-scroll">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate Flutter and React developer with a strong foundation in 
                Computer Science from Vellore Institute of Technology. I specialize in building 
                cross-platform mobile applications and modern web applications with beautiful user interfaces.
              </p>
              <p>
                My expertise includes developing full-stack applications using Flutter, React.js, and Node.js, 
                with experience in cloud deployment and database management. I'm also an active 
                competitive programmer with achievements on LeetCode, CodeChef, and Codeforces.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>2+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>10+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>1930+</h3>
                  <p>LeetCode Rating</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <i className="fas fa-code"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects animate-on-scroll">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-container">
            <div className="project-item">
              <div className="project-header">
                <h3>Mr. Mechanic</h3>
                <div className="project-links">
                  <a href="https://github.com/MeetSinojia/mr_mechanics_demo" target="_blank" rel="noopener noreferrer" className="project-link">Demo</a>
                  <a href="https://github.com/MeetSinojia/mr_mechanics_demo" target="_blank" rel="noopener noreferrer" className="project-link">Source</a>
                </div>
              </div>
              <div className="project-tech">
                <span className="tech-tag">Flutter</span>
                <span className="tech-tag">Golang</span>
                <span className="tech-tag">Gin</span>
                <span className="tech-tag">MySQL</span>
                <span className="tech-tag">AWS</span>
              </div>
              <ul className="project-description">
                <li>Developed a cross-platform Flutter Mobile app for vendor management, billing, and inventory</li>
                <li>Implemented responsive UI for browsers and tablets using custom layouts and Flutter web optimization</li>
                <li>Integrated REST APIs built in Golang (Gin framework) with secure JWT auth and OTP via MSG91</li>
                <li>Used Provider for state management and JSON localization for multilingual support</li>
                <li>Deployed web app on Render with AWS RDS backend and S3 for image storage</li>
              </ul>
            </div>
            
            <div className="project-item">
              <div className="project-header">
                <h3>EchoShop</h3>
                <div className="project-links">
                  <a href="https://github.com/MeetSinojia/EchoShop" target="_blank" rel="noopener noreferrer" className="project-link">Demo</a>
                  <a href="https://github.com/MeetSinojia/EchoShop" target="_blank" rel="noopener noreferrer" className="project-link">Source</a>
                </div>
              </div>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Firebase</span>
                <span className="tech-tag">Stripe</span>
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
                <span className="tech-tag">JavaScript</span>
              </div>
              <ul className="project-description">
                <li>Developed EchoShop, an e-commerce website using React.js, Firebase, and Stripe for secure payments</li>
                <li>Integrated location-based features via Big Cloud Data API and optimized delivery times using Dijkstra's algorithm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills animate-on-scroll">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <div className="skill-tags">
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">Dart</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Angular</span>
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">JavaScript</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skill-tags">
                <span className="skill-tag">Golang (Gin)</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">.NET</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Cloud</h3>
              <div className="skill-tags">
                <span className="skill-tag">AWS (RDS, S3)</span>
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">Postman</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Render</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Other Skills</h3>
              <div className="skill-tags">
                <span className="skill-tag">C++</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Data Structures</span>
                <span className="skill-tag">Algorithms</span>
                <span className="skill-tag">Signal Processing</span>
                <span className="skill-tag">JWT Authentication</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience animate-on-scroll">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Software Engineer</h3>
                  <span className="company">UBS Pune, India</span>
                  <span className="duration">Feb 2024 – Current</span>
                </div>
                <ul className="timeline-description">
                  <li>Optimized Data Quality Checks (DQC) for large-scale data processing (100GB+ monthly) using Python, NumPy, and Pandas</li>
                  <li>Improved efficiency by reducing processing time by 10%, minimizing false data, and streamlining workflows</li>
                  <li>Enhanced Data API by adding pagination and rate limiting, reducing average data fetch time from 10 seconds to 2 seconds</li>
                  <li>Collaborated with front-end developers to integrate APIs with React-based internal dashboards</li>
                  <li>Implemented role-based and user-specific access control using JWT authentication</li>
                </ul>
                <div className="tech-stack">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">SQL</span>
                  <span className="tech-tag">.NET</span>
                  <span className="tech-tag">C#</span>
                  <span className="tech-tag">Angular</span>
                  <span className="tech-tag">Java</span>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Prism Developer</h3>
                  <span className="company">Samsung R&D India</span>
                  <span className="duration">Dec 2022 – Aug 2023</span>
                </div>
                <ul className="timeline-description">
                  <li>Collaborated on a UWB human angle detection, achieving 86% accuracy using the MUSIC and ESPRIT algorithms</li>
                  <li>Analyzed a dataset of 12,000 UWB images to enhance data-driven outcomes and project impact</li>
                </ul>
                <div className="tech-stack">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Signal Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements animate-on-scroll">
        <div className="container">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Knight on LeetCode</h3>
              <p>Highest rating of 1930+ (Top 5%)</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>3 Star on CodeChef</h3>
              <p>Highest rating of 1606</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3>Pupil on Codeforces</h3>
              <p>Highest rating of 1284</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Binance Ideathon</h3>
              <p>Runner Up in 'Blockchain for Good' 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact animate-on-scroll">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>I'm always interested in new opportunities and exciting projects. Feel free to reach out!</p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>sinojiameet321@gmail.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+91 9426377084</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://linkedin.com/in/meet-sinojia" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/meet-sinojia" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://leetcode.com/meet-sinojia" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fas fa-code"></i>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              {formStatus === 'success' && (
                <div className="form-status success">
                  <i className="fas fa-check-circle"></i>
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="form-status error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>Failed to send message. Please try again or contact me directly.</span>
                </div>
              )}
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Meet Sinojia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
