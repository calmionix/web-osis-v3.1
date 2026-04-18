import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Image, Calendar, LogOut, Star, Clock } from 'lucide-react';
import { useAuth, useRealtimeClock } from '@/hooks/useAuth';
import Breadcrumb from '@/components/Breadcrumb';
import { isAdminLoggedIn } from '@/lib/data';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Pengurus', path: '/admin/pengurus' },
  { icon: Image, label: 'Galeri', path: '/admin/galeri', soon: true },
  { icon: Calendar, label: 'Event', path: '/admin/event', soon: true },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { formattedTime, formattedDate } = useRealtimeClock();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const isActive = (path: string) => location.pathname === path;

  const pageTitle = menuItems.find(item => isActive(item.path))?.label || 'Admin';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-slate-800 z-40 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <Star className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <span className="font-display text-base font-bold text-white tracking-wide">
              OSIS ADMIN
            </span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.soon ? '#' : item.path}
                  onClick={(e) => item.soon && e.preventDefault()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path) && !item.soon
                      ? 'bg-primary/20 text-white border-l-[3px] border-primary'
                      : item.soon
                        ? 'text-slate-500 cursor-not-allowed'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="flex-1">{item.label}</span>
                  {item.soon && (
                    <span className="text-[9px] font-semibold bg-accent-light text-accent-dark px-1.5 py-0.5 rounded">
                      SOON
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-[260px] min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="font-display text-lg font-semibold text-slate-800">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{formattedTime}</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-400">{formattedDate}</span>
            </div>
            <div className="px-3 py-1.5 bg-primary-light rounded-lg text-xs font-medium text-primary">
              Admin
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100">
          <Breadcrumb isAdmin />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
