import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
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
