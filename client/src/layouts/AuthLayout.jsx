import { Link, Outlet } from 'react-router-dom';
import { Logo } from '../components/ui/Logo.jsx';
import { ThemeToggle } from '../components/ui/ThemeToggle.jsx';

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-4 sm:px-6">
        <Outlet />
      </div>
      <p className="pb-6 text-center text-xs text-neutral-500">
        <Link to="/" className="font-medium text-accent hover:underline">
          Back to store
        </Link>
      </p>
    </div>
  );
}
