import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Award, GraduationCap, Star } from 'lucide-react';
import { getPengurus } from '@/lib/data';
import Silhouette from '@/components/Silhouette';

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

function HeroSection() {
  return (
    <section className="pt-[112px] md:pt-[120px] bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-[55%] text-center lg:text-left">
            <AnimatedSection delay={0}>
              <span className="inline-block text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-4">
                ORGANISASI SISWA INTRA SEKOLAH
              </span>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-slate-800 leading-[1.15]">
                OSIS MTs Darul Hikam
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="text-base md:text-lg text-slate-500 mt-5 max-w-[520px] mx-auto lg:mx-0 leading-relaxed">
                Madrasah islami fokus akhlak, prestasi, dan Al-Qur'an. Membangun generasi Qur'ani yang berilmu, berakhlak mulia, dan siap menghadapi tantangan masa depan.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
                <Link
                  to="/pengurus"
                  className="inline-flex items-center px-8 py-3.5 bg-primary text-white text-[15px] font-semibold rounded-xl
                    hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-primary-lg transition-all duration-200"
                >
                  Jelajahi
                </Link>
                <Link
                  to="/tentang"
                  className="inline-flex items-center px-8 py-3.5 border-2 border-slate-200 text-slate-700 text-[15px] font-semibold rounded-xl
                    hover:border-primary hover:text-primary transition-all duration-200"
                >
                  Tentang Kami
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
                <div className="text-center lg:text-left">
                  <div className="font-display text-2xl md:text-[28px] font-bold text-primary">10+</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">Bidang OSIS</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center lg:text-left">
                  <div className="font-display text-2xl md:text-[28px] font-bold text-primary">200+</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">Siswa Aktif</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center lg:text-left">
                  <div className="font-display text-2xl md:text-[28px] font-bold text-primary">A</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">Akreditasi</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Geometric Star */}
          <div className="lg:w-[45%] flex items-center justify-center">
            <AnimatedSection delay={300} className="w-full flex flex-col items-center">
              <div className="relative animate-slow-rotate">
                {/* Concentric rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-slate-200" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border-2 border-dashed border-slate-200" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full border-2 border-dashed border-slate-200" />
                </div>
                {/* Star Image */}
                <img
                  src="./images/hero-star.png"
                  alt="Islamic geometric star"
                  className="relative z-10 w-[280px] h-[280px] md:w-[360px] md:h-[360px] object-contain"
                />
                {/* Gold dots at 8 points */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 bg-accent rounded-full"
                    style={{
                      top: `${50 - 44 * Math.cos(deg * Math.PI / 180)}%`,
                      left: `${50 + 44 * Math.sin(deg * Math.PI / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>
              {/* Decorative border pattern */}
              <div className="w-full h-10 mt-8 bg-repeat-x opacity-30" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #1a5f2a 0px, #1a5f2a 8px, transparent 8px, transparent 16px)',
                backgroundSize: '24px 2px',
                backgroundPosition: 'bottom',
              }} />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function SambutanSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary">
              SAMBUTAN
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-slate-800 mt-3">
              Selamat Datang
            </h2>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={150}>
          <div className="max-w-[800px] mx-auto mt-8 bg-slate-50 rounded-2xl p-8 md:p-12 relative">
            <span className="absolute top-4 left-6 text-7xl font-display text-primary opacity-[0.08] leading-none select-none">"</span>
            <p className="text-slate-500 text-center leading-[1.8] relative z-10">
              Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi OSIS MTs Darul Hikam Cirebon. Website ini menjadi jendela informasi bagi seluruh warga sekolah dan masyarakat luas mengenai kegiatan, program, dan prestasi yang diraih oleh OSIS MTs Darul Hikam.
            </p>
            <p className="font-display text-sm font-semibold text-primary text-center mt-6">
              — OSIS MTs Darul Hikam
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function StatistikSection() {
  const stats = [
    { icon: Users, number: '12', label: 'Pengurus OSIS' },
    { icon: BookOpen, number: '6', label: 'Bidang Keilmuan' },
    { icon: Award, number: 'A', label: 'Akreditasi' },
    { icon: GraduationCap, number: '200+', label: 'Siswa Aktif' },
  ];

  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 150}>
              <div className="text-center">
                <stat.icon className="w-10 h-10 md:w-12 md:h-12 text-accent mx-auto mb-3" strokeWidth={1.5} />
                <div className="font-display text-3xl md:text-[40px] font-bold text-white">{stat.number}</div>
                <div className="text-sm font-medium text-white/70 mt-1">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrukturPreview() {
  const pengurus = getPengurus();
  const ketua = pengurus.find(p => p.jabatan === 'Ketua OSIS');
  const wakil = pengurus.find(p => p.jabatan === 'Wakil Ketua OSIS');

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary">PENGURUS</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-slate-800 mt-2">
              Struktur Organisasi
            </h2>
            <p className="text-slate-500 mt-3 max-w-[600px] mx-auto">
              Susunan pengurus OSIS MTs Darul Hikam periode 2024/2025
            </p>
          </div>
        </AnimatedSection>

        {/* Inti OSIS */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px] mx-auto mb-8">
            {/* Ketua */}
            <div className="bg-white rounded-2xl p-8 shadow-card border-t-4 border-primary text-center">
              <Star className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-slate-800">Ketua OSIS</h3>
              {ketua ? (
                <div className="mt-3">
                  {ketua.foto ? (
                    <img src={ketua.foto} alt={ketua.nama} className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
                  ) : (
                    <Silhouette size={64} className="mx-auto mb-2" />
                  )}
                  <p className="font-display text-base font-semibold text-slate-700">{ketua.nama}</p>
                  <span className="inline-block mt-1 text-xs bg-primary-light text-primary px-2.5 py-1 rounded-md font-medium">{ketua.kelas}</span>
                </div>
              ) : (
                <div className="mt-3">
                  <Silhouette size={64} className="mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Belum ada data</p>
                </div>
              )}
            </div>
            {/* Wakil */}
            <div className="bg-white rounded-2xl p-8 shadow-card border-t-4 border-primary text-center">
              <Users className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-slate-800">Wakil Ketua OSIS</h3>
              {wakil ? (
                <div className="mt-3">
                  {wakil.foto ? (
                    <img src={wakil.foto} alt={wakil.nama} className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
                  ) : (
                    <Silhouette size={64} className="mx-auto mb-2" />
                  )}
                  <p className="font-display text-base font-semibold text-slate-700">{wakil.nama}</p>
                  <span className="inline-block mt-1 text-xs bg-primary-light text-primary px-2.5 py-1 rounded-md font-medium">{wakil.kelas}</span>
                </div>
              ) : (
                <div className="mt-3">
                  <Silhouette size={64} className="mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Belum ada data</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* View All Button */}
        <AnimatedSection delay={200}>
          <div className="text-center mt-8">
            <Link
              to="/pengurus"
              className="inline-flex items-center px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl
                hover:bg-primary-dark transition-colors"
            >
              Lihat Seluruh Struktur
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SambutanSection />
      <StatistikSection />
      <StrukturPreview />
    </main>
  );
}
