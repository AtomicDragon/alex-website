import React from 'react'
import './Hero.css'
import heroVideo from '../assets/hero-computer-code-2.mp4';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <video autoPlay loop muted src={heroVideo} />
      <div className="hero-content">
        <h1>Hi, I'm Alex<span className="accent">.</span></h1>
        <p className="lead">I build accessible, performant, and beautiful web apps using React.</p>
        <div className="cta">
          <a className="btn" href="#projects">See projects</a>
          <a className="btn btn-outline" href="#contact">Contact me</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
