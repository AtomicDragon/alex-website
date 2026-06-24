/** GROQ queries. Kept as plain strings; pass params via client.fetch. */

const projectCardFields = `
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
`;

export const programmingProjectsQuery = `
*[_type == "programmingProject"] | order(coalesce(date, _createdAt) desc) {
  ${projectCardFields}
}`;

export const featuredProjectsQuery = `
*[_type == "programmingProject" && featured == true] | order(coalesce(date, _createdAt) desc)[0...6] {
  ${projectCardFields}
}`;

export const projectBySlugQuery = `
*[_type == "programmingProject" && slug.current == $slug][0] {
  ${projectCardFields},
  gallery,
  content,
  architecture,
  challenges,
  githubUrl,
  liveUrl,
  timeline[] {
    date,
    title,
    description
  }
}`;

const blogCardFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  tags,
  publishedAt,
  coverImage
`;

export const blogPostsQuery = `
*[_type == "blogPost"] | order(coalesce(publishedAt, _createdAt) desc) {
  ${blogCardFields}
}`;

export const latestPostsQuery = `
*[_type == "blogPost"] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  ${blogCardFields}
}`;

export const blogPostBySlugQuery = `
*[_type == "blogPost" && slug.current == $slug][0] {
  ${blogCardFields},
  content
}`;

/* ----------------------------- Chef ----------------------------- */

const recipeCardFields = `
  _id,
  title,
  "slug": slug.current,
  heroImage,
  difficulty,
  prepTime,
  cookTime,
  servings
`;

export const recipesQuery = `
*[_type == "recipe"] | order(coalesce(_updatedAt, _createdAt) desc) {
  ${recipeCardFields}
}`;

export const featuredRecipesQuery = `
*[_type == "recipe"] | order(coalesce(_updatedAt, _createdAt) desc)[0...3] {
  ${recipeCardFields}
}`;

export const recipeBySlugQuery = `
*[_type == "recipe" && slug.current == $slug][0] {
  ${recipeCardFields},
  ingredients,
  instructions,
  notes,
  gallery
}`;

const foodBlogCardFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "coverImage": images[0]
`;

export const foodBlogQuery = `
*[_type == "foodBlog"] | order(coalesce(publishedAt, _createdAt) desc) {
  ${foodBlogCardFields}
}`;

export const foodBlogBySlugQuery = `
*[_type == "foodBlog" && slug.current == $slug][0] {
  ${foodBlogCardFields},
  content,
  images
}`;

export const galleryItemsQuery = `
*[_type == "galleryItem"] | order(coalesce(_createdAt, _updatedAt) desc) {
  _id,
  title,
  image,
  category,
  description
}`;
