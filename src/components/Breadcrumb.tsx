import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const labelMap: Record<string, string> = {
  'admin': 'Admin',
  'dashboard': 'Dashboard',
  'pengurus': 'Pengurus',
  'galeri': 'Galeri',
  'event': 'Event',
  'tentang': 'Tentang',
  'kontak': 'Kontak',
  'login': 'Login',
  'program': 'Program',
};

interface BreadcrumbProps {
  isAdmin?: boolean;
}

export default function Breadcrumb({ isAdmin = false }: BreadcrumbProps) {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbItems = segments.map((segment, index) => {
    const label = labelMap[segment] || segment;
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    return { label, href, isLast };
  });

  return (
    <nav className="flex items-center gap-1.5 text-sm py-4 px-4 md:px-8">
      {isAdmin && (
        <>
          <Link to="/admin/dashboard" className="text-slate-400 hover:text-slate-600 transition-colors">
            Admin
          </Link>
          {breadcrumbItems.length > 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
        </>
      )}
      {breadcrumbItems.slice(isAdmin ? 1 : 0).map((item, index) => (
        <span key={item.href} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
          {item.isLast ? (
            <span className="text-slate-600 font-medium">{item.label}</span>
          ) : (
            <Link to={item.href} className="text-slate-400 hover:text-slate-600 transition-colors">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
