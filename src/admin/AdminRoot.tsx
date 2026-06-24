import { AdminAuthProvider } from './auth/AdminAuthProvider';
import { useAdminAuth } from './auth/context';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

function AdminGate() {
  const { status } = useAdminAuth();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Checking access…
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <AdminLogin />;
  }

  return <AdminLayout />;
}

/** Entry point for the whole /admin area: theme wrapper + auth provider. */
export default function AdminRoot() {
  return (
    <div data-theme="home" className="min-h-screen bg-background text-text">
      <AdminAuthProvider>
        <AdminGate />
      </AdminAuthProvider>
    </div>
  );
}
