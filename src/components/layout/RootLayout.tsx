import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import GlobalNav from '../navigation/GlobalNav';
import Footer from '../Footer';
import { trackPageView } from '../../lib/analytics';

const SECTION_THEMES = ['programming', 'chef', 'fun'] as const;

/**
 * App shell. Derives the active "world" from the first path segment and applies
 * it as a `data-theme` on the root wrapper so the entire chrome (nav, footer,
 * page) re-skins to that world's palette.
 */
export default function RootLayout() {
  const { pathname } = useLocation();
  const segment = pathname.split('/')[1];
  const theme = (SECTION_THEMES as readonly string[]).includes(segment)
    ? segment
    : 'home';

  // Report a page view on every navigation.
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <div
      data-theme={theme}
      className="flex min-h-screen flex-col bg-background text-text"
    >
      <GlobalNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
