import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '../components/layout/AnnouncementBar.jsx';
import { BottomNav } from '../components/layout/BottomNav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
