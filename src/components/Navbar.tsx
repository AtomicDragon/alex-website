import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../assets/logo.png';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="logo" />
        <span>Alex.Programming</span>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  )
}
