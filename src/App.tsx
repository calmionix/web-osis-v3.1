import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';
import Pengurus from '@/pages/Pengurus';
import Program from '@/pages/Program';
import Galeri from '@/pages/Galeri';
import EventPage from '@/pages/EventPage';
import Kontak from '@/pages/Kontak';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminPengurus from '@/pages/admin/AdminPengurus';
import AdminGaleri from '@/pages/admin/AdminGaleri';
import AdminEvent from '@/pages/admin/AdminEvent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/tentang" element={<PublicLayout><Tentang /></PublicLayout>} />
        <Route path="/pengurus" element={<PublicLayout><Pengurus /></PublicLayout>} />
        <Route path="/program" element={<PublicLayout><Program /></PublicLayout>} />
        <Route path="/galeri" element={<PublicLayout><Galeri /></PublicLayout>} />
        <Route path="/event" element={<PublicLayout><EventPage /></PublicLayout>} />
        <Route path="/kontak" element={<PublicLayout><Kontak /></PublicLayout>} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pengurus" element={<AdminPengurus />} />
          <Route path="galeri" element={<AdminGaleri />} />
          <Route path="event" element={<AdminEvent />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  );
}
