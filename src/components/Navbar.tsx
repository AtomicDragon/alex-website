import './Navbar.css'
import logo from '../assets/logo.png';

export const Navbar = () => {
  return (
    <nav className="navbar">
            <img src={logo} alt="Logo" className="logo" />
            Alex.Programming
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
  )
}
