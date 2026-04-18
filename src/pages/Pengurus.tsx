import { useState, useEffect, useRef } from 'react';
import { getPengurus, BIDANG_DATA } from '@/lib/data';
import type { Pengurus } from '@/lib/data';
import Silhouette from '@/components/Silhouette';
import { Star, Users, User } from 'lucide-react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </div>
  );
}

function PersonCard({ pengurus, label, borderColor = 'primary' }: { pengurus?: Pengurus; label: string; borderColor?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-card border-t-4 ${borderColor === 'accent' ? 'border-accent' : 'border-primary'} text-center`}>
      <div className="flex items-center justify-center mb-3">
        <User className={`w-6 h-6 ${borderColor === 'accent' ? 'text-accent' : 'text-primary'}`} strokeWidth={1.5} />
      </div>
      <h4 className="font-display text-sm font-semibold text-slate-500 uppercase tracking-wide">{label}</h4>
      {pengurus ? (
        <div className="mt-3">
          {pengurus.foto ? (
            <img src={pengurus.foto} alt={pengurus.nama} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-primary-light" />
          ) : (
            <Silhouette size={64} className="mx-auto mb-2" />
          )}
          <p className="font-display text-base font-semibold text-slate-800">{pengurus.nama}</p>
          <span className="inline-block mt-1.5 text-xs bg-primary-light text-primary px-2.5 py-1 rounded-md font-medium">{pengurus.kelas}</span>
        </div>
      ) : (
        <div className="mt-3">
          <Silhouette size={56} className="mx-auto mb-2" />
          <p className="text-sm text-slate-400 italic">Belum ada data</p>
        </div>
      )}
    </div>
  );
}

export default function Pengurus() {
  const [filter, setFilter] = useState('semua');
  const [pengurusList, setPengurusList] = useState<Pengurus[]>([]);

  useEffect(() => {
    setPengurusList(getPengurus());
  }, []);

  const ketua = pengurusList.find(p => p.jabatan === 'Ketua OSIS');
  const wakil = pengurusList.find(p => p.jabatan === 'Wakil Ketua OSIS');
  const sekretaris1 = pengurusList.find(p => p.jabatan === 'Sekretaris 1');
  const sekretaris2 = pengurusList.find(p => p.jabatan === 'Sekretaris 2');
  const bendahara1 = pengurusList.find(p => p.jabatan === 'Bendahara 1');
  const bendahara2 = pengurusList.find(p => p.jabatan === 'Bendahara 2');

  const filterTabs = [
    { label: 'Semua', value: 'semua' },
    { label: 'Inti', value: 'inti' },
    { label: 'Sekretaris & Bendahara', value: 'sekben' },
    { label: 'Bidang 1-3', value: 'bidang1' },
    { label: 'Bidang 4-6', value: 'bidang2' },
  ];

  const showInti = filter === 'semua' || filter === 'inti';
  const showSekben = filter === 'semua' || filter === 'sekben';
  const showBidang1 = filter === 'semua' || filter === 'bidang1';
  const showBidang2 = filter === 'semua' || filter === 'bidang2';

  return (
    <main className="pt-[112px] md:pt-[120px]">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Pengurus OSIS</h1>
          <nav className="flex items-center justify-center gap-2 mt-3 text-sm">
            <a href="/" className="text-white/70 hover:text-white transition-colors">Beranda</a>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Pengurus</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Filter Tabs */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {filterTabs.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === tab.value
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Inti OSIS */}
          {showInti && (
            <AnimatedSection delay={100}>
              <div className="mb-10">
                <h2 className="font-display text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Inti OSIS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px]">
                  <PersonCard pengurus={ketua} label="Ketua OSIS" />
                  <PersonCard pengurus={wakil} label="Wakil Ketua OSIS" />
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Sekretaris & Bendahara */}
          {showSekben && (
            <AnimatedSection delay={150}>
              <div className="mb-10">
                <h2 className="font-display text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Sekretaris & Bendahara
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PersonCard pengurus={sekretaris1} label="Sekretaris 1" borderColor="accent" />
                  <PersonCard pengurus={sekretaris2} label="Sekretaris 2" borderColor="accent" />
                  <PersonCard pengurus={bendahara1} label="Bendahara 1" borderColor="accent" />
                  <PersonCard pengurus={bendahara2} label="Bendahara 2" borderColor="accent" />
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Bidang-Bidang */}
          {(showBidang1 || showBidang2) && BIDANG_DATA.map((bidang) => {
            const isFirstThree = bidang.id <= 3;
            if ((isFirstThree && !showBidang1) || (!isFirstThree && !showBidang2)) return null;

            const ketuaBidang = pengurusList.find(p => p.jabatan === `Ketua Bidang ${bidang.id}`);
            const anggota1 = pengurusList.find(p => p.jabatan === `Anggota Bidang ${bidang.id}`);
            const anggota2 = pengurusList.filter(p => p.jabatan === `Anggota Bidang ${bidang.id}`)[1];

            return (
              <AnimatedSection key={bidang.id} delay={bidang.id * 100}>
                <div className="mb-10">
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400">
                      Bidang {bidang.id}
                    </span>
                    <h2 className="font-display text-xl font-semibold text-slate-800">{bidang.nama}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <PersonCard pengurus={ketuaBidang} label={`Ketua Bidang ${bidang.id}`} borderColor="primary" />
                    <PersonCard pengurus={anggota1} label="Anggota 1" borderColor="accent" />
                    <PersonCard pengurus={anggota2} label="Anggota 2" borderColor="accent" />
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {pengurusList.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-16 bg-white rounded-2xl">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-display text-lg font-semibold">Belum Ada Data Pengurus</p>
                <p className="text-slate-400 text-sm mt-2">Data pengurus akan muncul setelah ditambahkan oleh admin.</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </main>
  );
}
