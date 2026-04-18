import { Link } from 'react-router-dom';
import ComingSoon from '@/components/ComingSoon';

export default function Program() {
  return (
    <main className="pt-[112px] md:pt-[120px]">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Program OSIS</h1>
          <nav className="flex items-center justify-center gap-2 mt-3 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Program</span>
          </nav>
        </div>
      </section>

      {/* Content with Coming Soon */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative">
            {/* Background content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none select-none">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-card">
                  <div className="h-48 bg-slate-100 rounded-xl mb-4" />
                  <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-100 rounded w-full mb-1" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                </div>
              ))}
            </div>
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-slate-800/40 rounded-2xl flex items-center justify-center">
              <ComingSoon
                title="Program OSIS"
                message="Halaman program OSIS sedang dalam pengembangan. Nantikan informasi lengkap mengenai program-program unggulan kami."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
