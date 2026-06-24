import './Body.css';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <img src={project.image} alt={project.title} className="card-image" />
      <div className="card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <a href={project.link} className="card-button" target="_blank" rel="noreferrer">
          View Project
        </a>
      </div>
    </article>
  );
}
