/** GROQ queries. Kept as plain strings; pass params via client.fetch. */

export const programmingProjectsQuery = `
*[_type == "programmingProject"] | order(coalesce(date, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  tagline,
  description,
  category,
  techStack,
  featured,
  date,
  coverImage
}`;
