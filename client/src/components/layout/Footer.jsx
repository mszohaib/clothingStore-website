import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { footerColumns, instagramUrl } from '../../data/navigation.js';
import { Container } from '../ui/Container.jsx';
import { Logo } from '../ui/Logo.jsx';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 dark:border-neutral-900 dark:bg-black">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo imageClassName="h-9 max-h-11 w-auto sm:h-10 sm:max-w-[9.5rem]" />
            <p className="max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Curated streetwear &amp; thrift from Pakistan. Original pieces, limited drops, DM-era upgraded to a
              proper store experience.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-accent dark:text-white dark:hover:text-accent"
            >
              <Camera className="h-5 w-5" strokeWidth={1.75} />
              Instagram
            </a>
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
          <p>&copy; {year} ThriftVerse. All rights reserved.</p>
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
