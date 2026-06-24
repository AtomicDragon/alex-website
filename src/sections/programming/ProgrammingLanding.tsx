import { Link } from 'react-router-dom';

export default function ProgrammingLanding() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-accent">{'// developer'}</p>
      <h1 className="mt-2 text-5xl font-bold text-primary">Alex — Software Engineer</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Professional portfolio and technical project showcase. Featured work,
        skills, writing, and résumé — built for fast evaluation.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/programming/projects"
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
        >
          View projects
        </Link>
        <Link
          to="/programming/recruiter"
          className="rounded-md border border-border px-5 py-2.5 font-medium text-text transition-colors hover:text-accent"
        >
          Recruiter mode
        </Link>
      </div>
    </section>
  );
}
