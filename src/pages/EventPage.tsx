import { Link } from 'react-router-dom';
import ComingSoon from '@/components/ComingSoon';

export default function EventPage() {
  return (
    <main className="pt-[112px] md:pt-[120px]">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Agenda Kegiatan</h1>
          <nav className="flex items-center justify-center gap-2 mt-3 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Event</span>
          </nav>
        </div>
      </section>

      {/* Content with Coming Soon */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative">
            {/* Background content */}
            <div className="space-y-4 opacity-30 pointer-events-none select-none">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-card flex gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-xl shrink-0" />
                  <div className="flex-1">
                    <div className="h-5 bg-slate-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-full mb-1" />
                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-slate-800/40 rounded-2xl flex items-center justify-center">
              <ComingSoon
                title="Agenda Kegiatan"
                message="Halaman event sedang dalam pengembangan. Nantikan jadwal kegiatan OSIS MTs Darul Hikam."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
