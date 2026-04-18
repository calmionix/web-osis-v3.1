import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', path: '/', soon: false },
  { label: 'Tentang', path: '/tentang', soon: false },
  { label: 'Pengurus', path: '/pengurus', soon: false },
  { label: 'Program', path: '/program', soon: true },
  { label: 'Galeri', path: '/galeri', soon: true },
  { label: 'Event', path: '/event', soon: true },
  { label: 'Kontak', path: '/kontak', soon: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 px-4 hidden md:block">
        <p className="text-xs font-medium tracking-wide">
          <Star className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" fill="currentColor" />
          MTs Darul Hikam Cirebon — Terakreditasi A | Kementerian Agama
        </p>
      </div>

      {/* Main Nav */}
      <nav className="bg-white/85 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-display text-sm font-bold tracking-[0.06em] text-slate-800">
                OSIS MTs DARUL HIKAM
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.soon ? '#' : link.path}
                  onClick={(e) => link.soon && e.preventDefault()}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.path) && !link.soon
                      ? 'text-primary font-semibold bg-primary-light/50'
                      : link.soon
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                    }
                  `}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.soon && (
                      <span className="text-[9px] font-semibold bg-accent-light text-accent-dark px-1.5 py-0.5 rounded">
                        SOON
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>

            {/* Login Button */}
            <div className="hidden lg:block">
              <Link
                to="/login"
                className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl
                  hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-primary transition-all duration-200"
              >
                Login Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.soon ? '#' : link.path}
                  onClick={(e) => {
                    if (link.soon) e.preventDefault();
                    else setMobileOpen(false);
                  }}
                  className={`
                    block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path) && !link.soon
                      ? 'text-primary font-semibold bg-primary-light/50'
                      : link.soon
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.soon && (
                      <span className="text-[9px] font-semibold bg-accent-light text-accent-dark px-1.5 py-0.5 rounded">
                        SOON
                      </span>
                    )}
                  </span>
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 mt-2 text-center bg-primary text-white text-sm font-semibold rounded-xl
                  hover:bg-primary-dark transition-colors"
              >
                Login Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
