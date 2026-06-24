import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';

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
import GamesPage from '../sections/fun/GamesPage';
import GameDetailPage from '../sections/fun/GameDetailPage';
import FunProjectsPage from '../sections/fun/FunProjectsPage';
import FunProjectDetailPage from '../sections/fun/FunProjectDetailPage';

import AdminRoot from '../admin/AdminRoot';
import Dashboard from '../admin/pages/Dashboard';
import ContentManager from '../admin/pages/ContentManager';
import CRM from '../admin/pages/CRM';
import Opportunities from '../admin/pages/Opportunities';
import Notes from '../admin/pages/Notes';
import Tasks from '../admin/pages/Tasks';

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
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:slug" element={<GameDetailPage />} />
          <Route path="projects" element={<FunProjectsPage />} />
          <Route path="projects/:slug" element={<FunProjectDetailPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin — own layout + auth, outside the public chrome */}
      <Route path="/admin" element={<AdminRoot />}>
        <Route index element={<Dashboard />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="crm" element={<CRM />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="notes" element={<Notes />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
