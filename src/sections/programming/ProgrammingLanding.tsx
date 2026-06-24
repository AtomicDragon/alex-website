import { Link } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import {
  featuredProjectsQuery,
  latestPostsQuery,
} from '../../lib/sanity/queries';
import type {
  ProgrammingProjectCard,
  BlogPostCard,
} from '../../lib/sanity/types';
import ProjectCard from '../../components/cards/ProjectCard';
import PostCard from '../../components/cards/PostCard';
import SkillsMatrix from './SkillsMatrix';
import { RESUME_URL } from './data';

export default function ProgrammingLanding() {
  const { data: featured } = useSanityQuery<ProgrammingProjectCard[]>(
    featuredProjectsQuery,
  );
  const { data: latest } = useSanityQuery<BlogPostCard[]>(latestPostsQuery);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      {/* Hero */}
      <section>
        <p className="text-accent">{'// developer'}</p>
        <h1 className="mt-2 text-5xl font-bold text-primary">
          Alex — Software Engineer
        </h1>
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
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-text transition-colors hover:text-accent"
          >
            Download résumé
          </a>
          <Link
            to="/programming/recruiter"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-text transition-colors hover:text-accent"
          >
            Recruiter mode
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      {featured && featured.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-primary">Featured projects</h2>
            <Link
              to="/programming/projects"
              className="text-sm text-accent hover:underline"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-bold text-primary">Skills</h2>
        <SkillsMatrix />
      </section>

      {/* Latest articles */}
      {latest && latest.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-primary">Latest articles</h2>
            <Link
              to="/programming/blog"
              className="text-sm text-accent hover:underline"
            >
              All articles →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
