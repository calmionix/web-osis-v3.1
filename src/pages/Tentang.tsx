import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star } from 'lucide-react';

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

export default function Tentang() {
  const keyPoints = [
    'Terakreditasi A oleh Kementerian Agama',
    'Fokus pada Tahfidz Al-Qur\'an dan Kitab Kuning',
    'Pembentukan Karakter Islami (Akhlakul Karimah)',
    'Pengembangan Prestasi Akademik & Non-Akademik',
    'Lingkungan Pesantren yang Kondusif',
  ];

  return (
    <main className="pt-[112px] md:pt-[120px]">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Tentang Kami</h1>
          <nav className="flex items-center justify-center gap-2 mt-3 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Tentang</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Text */}
            <AnimatedSection>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-800">
                  MTs Darul Hikam Cirebon
                </h2>
                <p className="text-slate-500 mt-4 leading-[1.8]">
                  MTs Darul Hikam Cirebon adalah Madrasah Tsanawiyah swasta yang berada di bawah naungan Kementerian Agama Republik Indonesia. Sekolah ini telah memperoleh akreditasi A dan berkomitmen untuk menyelenggarakan pendidikan Islami yang berkualitas.
                </p>
                <p className="text-slate-500 mt-4 leading-[1.8]">
                  Dengan visi menjadi madrasah unggulan yang menghasilkan generasi Qur'ani, MTs Darul Hikam menekankan pembelajaran Al-Qur'an, pembentukan akhlak mulia, dan pengembangan prestasi akademik maupun non-akademik siswa.
                </p>

                {/* Key Points */}
                <div className="mt-6 space-y-3">
                  {keyPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Image */}
            <AnimatedSection delay={150}>
              <div className="relative h-[400px] lg:h-[480px] rounded-2xl overflow-hidden bg-primary-light flex items-center justify-center">
                <img
                  src="./images/about-pattern.jpg"
                  alt="Islamic geometric pattern"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="w-32 h-32 text-primary opacity-20" strokeWidth={1} />
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* OSIS Section */}
          <AnimatedSection delay={200} className="mt-16">
            <div className="bg-white rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-800">
                Tentang OSIS
              </h2>
              <p className="text-slate-500 mt-4 leading-[1.8]">
                Organisasi Siswa Intra Sekolah (OSIS) MTs Darul Hikam adalah organisasi resmi siswa yang berperan sebagai wadah pengembangan potensi, kepemimpinan, dan kreativitas siswa. OSIS menyelenggarakan berbagai kegiatan keagamaan, akademik, dan sosial untuk membentuk siswa yang berilmu, berakhlak, dan berjiwa pemimpin.
              </p>

              {/* Vision Box */}
              <div className="mt-8 bg-primary-light rounded-xl p-6 border-l-4 border-primary">
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-primary">
                  VISI
                </span>
                <p className="font-display text-lg font-semibold text-slate-800 mt-2">
                  Mewujudkan siswa yang bertaqwa, berprestasi, dan berakhlak mulia.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
