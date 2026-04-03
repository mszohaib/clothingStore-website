import { useEffect, useState } from 'react';
import { announcementItems } from '../../data/navigation.js';

export function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % announcementItems.length), 4500);
    return () => clearInterval(t);
  }, []);

  const text = announcementItems[i] ?? announcementItems[0];

  return (
    <div className="relative z-50 border-b border-accent/25 bg-neutral-950 text-center text-xs font-medium tracking-wide text-neutral-200 dark:border-accent/20 dark:bg-black">
      <p className="py-2.5 px-4 transition-opacity duration-300">{text}</p>
    </div>
  );
}
