import { Link } from 'react-router-dom';
import { footerColumns } from '../../data/navigation.js';
import { Container } from '../ui/Container.jsx';
import { Logo } from '../ui/Logo.jsx';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 dark:border-neutral-900 dark:bg-black">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo navFramed className="max-w-[12rem]" />
            <p className="max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Demo clothing storefront — curated pieces, limited drops, and a full cart / checkout flow for portfolio use.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-neutral-600 transition-colors hover:text-accent dark:text-neutral-400 dark:hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-500 sm:flex-row sm:text-left">
          <p>&copy; {year} Railframe (demo). Not a real brand.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            <Link to="/policy" className="hover:text-neutral-800 dark:hover:text-neutral-300">
              Policies
            </Link>
            <Link to="/faq" className="hover:text-neutral-800 dark:hover:text-neutral-300">
              FAQ
            </Link>
            <Link to="/contact" className="hover:text-neutral-800 dark:hover:text-neutral-300">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
