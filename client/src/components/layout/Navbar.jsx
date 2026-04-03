import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { mainNavLinks } from '../../data/navigation.js';
import { cn } from '../../utils/cn.js';
import { Container } from '../ui/Container.jsx';
import { IconButton } from '../ui/IconButton.jsx';
import { Logo } from '../ui/Logo.jsx';
import { ThemeToggle } from '../ui/ThemeToggle.jsx';

function navClass({ isActive }) {
  return cn(
    'whitespace-nowrap text-sm font-medium transition-colors',
    isActive ? 'text-accent' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { lineCount } = useCart();
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200/90 bg-white/90 backdrop-blur-md dark:border-neutral-900 dark:bg-black/90">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <div className="flex items-center gap-3 lg:gap-8">
            <IconButton
              label="Open menu"
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </IconButton>
            <Logo className="min-w-0 self-center" navFramed />
            <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
              {mainNavLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <IconButton
              label="Search shop"
              onClick={() => {
                navigate('/shop');
              }}
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </IconButton>
            <ThemeToggle />
            {user ? (
              <>
                <div className="hidden items-center gap-2 sm:flex">
                  <span
                    className="max-w-[9rem] truncate text-xs font-medium text-neutral-600 dark:text-neutral-400"
                    title={user.email}
                  >
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await signOut();
                      navigate('/');
                    }}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                    Sign out
                  </button>
                </div>
                <Link
                  to="/login"
                  aria-label="Account"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition-colors hover:bg-neutral-100 sm:hidden dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <User className="h-5 w-5" strokeWidth={1.75} />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                aria-label="Sign in"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <User className="h-5 w-5" strokeWidth={1.75} />
              </Link>
            )}
            <Link
              to="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
              {lineCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white">
                  {lineCount > 99 ? '99+' : lineCount}
                </span>
              ) : null}
            </Link>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,20rem)] flex-col border-r border-neutral-200 bg-white shadow-xl dark:border-neutral-900 dark:bg-black lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
                <Logo compact navFramed className="min-w-0 flex-1 self-center" />
                <IconButton label="Close menu" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </IconButton>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {mainNavLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-4 py-3 text-base font-semibold',
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
