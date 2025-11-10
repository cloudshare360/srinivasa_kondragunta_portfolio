import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Srinivasa Kondragunta
        </Link>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation