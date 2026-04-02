import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Receipt } from 'lucide-react';
import { cn } from '../utils/cn.js';
import { Logo } from '../components/ui/Logo.jsx';
import { ThemeToggle } from '../components/ui/ThemeToggle.jsx';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: Receipt },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:flex">
          <div className="flex h-16 items-center border-b border-neutral-200 px-4 dark:border-neutral-800">
            <Logo to="/admin" />
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-accent/15 text-accent'
                      : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
            <NavLink
              to="/"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              View storefront
            </NavLink>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-neutral-200 bg-white/90 px-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90 lg:h-16 lg:px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <Logo to="/admin" />
            </div>
            <h1 className="hidden font-display text-lg font-bold lg:block">Admin</h1>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          <div className="border-b border-neutral-200 bg-white px-2 py-2 dark:border-neutral-800 dark:bg-neutral-900 lg:hidden">
            <nav className="flex gap-1 overflow-x-auto pb-1">
              {links.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'shrink-0 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide',
                      isActive
                        ? 'bg-accent text-white'
                        : 'text-neutral-600 dark:text-neutral-400',
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
