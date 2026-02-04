import React from 'react';
import ProjectCard from './ProjectCard';
import './Body.css';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Portfolio Website',
    description: 'A responsive portfolio built with React and TypeScript.',
    image: project1,
    link: '/projects/project-1.html',
  },
  {
    id: 'project-2',
    title: 'Restaurant Inventory Manager',
    description: 'Creates inventory sheets and updates stock for restaurants.',
    image: project2,
    link: '/projects/project-2.html',
  },
  {
    id: 'project-3',
    title: 'Secret Santa',
    description: 'A small python project that assigns multiple secret santas to participants.',
    image: project3,
    link: '/projects/project-3.html',
  },
];

export default function Body() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="cards-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
