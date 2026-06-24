import { skills } from './data';

/** Grid of skill groups; shared by the landing and recruiter pages. */
export default function SkillsMatrix() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((group) => (
        <div
          key={group.category}
          className="rounded-xl border border-border bg-surface p-5"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
            {group.category}
          </h3>
          <ul className="mt-3 space-y-1.5">
            {group.items.map((item) => (
              <li key={item} className="text-sm text-text">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
