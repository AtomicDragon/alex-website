import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Placeholder, { DetailPlaceholder } from '../components/layout/Placeholder';

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFound from '../pages/NotFound';

import ProgrammingLanding from '../sections/programming/ProgrammingLanding';
import ProjectsPage from '../sections/programming/ProjectsPage';
import ProjectDetailPage from '../sections/programming/ProjectDetailPage';
import BlogPage from '../sections/programming/BlogPage';
import BlogPostPage from '../sections/programming/BlogPostPage';
import RecruiterPage from '../sections/programming/RecruiterPage';
import ChefLanding from '../sections/chef/ChefLanding';
import RecipesPage from '../sections/chef/RecipesPage';
import RecipeDetailPage from '../sections/chef/RecipeDetailPage';
import FoodBlogPage from '../sections/chef/FoodBlogPage';
import FoodBlogPostPage from '../sections/chef/FoodBlogPostPage';
import GalleryPage from '../sections/chef/GalleryPage';
import FunLanding from '../sections/fun/FunLanding';

import AdminPage from '../admin/AdminPage';

// Heavy Studio bundle — kept in its own lazy chunk, mounted outside the shell.
const StudioRoute = lazy(() => import('../sections/studio/StudioRoute'));

export default function App() {
  return (
    <Routes>
      {/* Embedded Sanity Studio — full viewport, no themed chrome */}
      <Route
        path="/studio/*"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center text-muted">
                Loading Studio…
              </div>
            }
          >
            <StudioRoute />
          </Suspense>
        }
      />

      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Programming world */}
        <Route path="/programming">
          <Route index element={<ProgrammingLanding />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="recruiter" element={<RecruiterPage />} />
        </Route>

        {/* Chef world */}
        <Route path="/chef">
          <Route index element={<ChefLanding />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipes/:slug" element={<RecipeDetailPage />} />
          <Route path="blog" element={<FoodBlogPage />} />
          <Route path="blog/:slug" element={<FoodBlogPostPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Route>

        {/* Fun world */}
        <Route path="/fun">
          <Route index element={<FunLanding />} />
          <Route
            path="games"
            element={
              <Placeholder
                title="Games"
                subtitle="Embeddable browser games, puzzles, and AI experiments."
              />
            }
          />
          <Route
            path="projects"
            element={
              <Placeholder
                title="Fun Projects"
                subtitle="Creative coding, visualizations, and art experiments."
              />
            }
          />
          <Route path=":slug" element={<DetailPlaceholder kind="Fun" />} />
        </Route>

        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
