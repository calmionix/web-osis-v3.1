import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

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

export default function Kontak() {
  const [formData, setFormData] = useState({ nama: '', email: '', subjek: '', pesan: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nama: '', email: '', subjek: '', pesan: '' });
    }, 3000);
  };

  const inputClass = 'w-full px-4 py-3 border border-slate-200 rounded-[10px] text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all';

  const contactInfo = [
    { icon: MapPin, text: 'Jl. Kolektoran No.20, Panjunan, Lemahwungkuk, Kota Cirebon' },
    { icon: Phone, text: '(0231) 123456' },
    { icon: Mail, text: 'mtsdarulhikam.cirebon@gmail.com' },
    { icon: Clock, text: 'Senin – Sabtu: 07.00 – 15.00 WIB' },
  ];

  return (
    <main className="pt-[112px] md:pt-[120px]">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Hubungi Kami</h1>
          <nav className="flex items-center justify-center gap-2 mt-3 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Kontak</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <AnimatedSection>
              <div>
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary">KONTAK</span>
                <h2 className="font-display text-3xl font-semibold text-slate-800 mt-2">Hubungi Kami</h2>
                <p className="text-slate-500 mt-4 leading-[1.7]">
                  Ada pertanyaan atau saran? Silakan hubungi kami melalui form berikut atau kunjungi langsung MTs Darul Hikam Cirebon.
                </p>

                <div className="mt-8 space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm text-slate-600 pt-2.5">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Form */}
            <AnimatedSection delay={150}>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-slate-800">Terima Kasih!</h3>
                    <p className="text-slate-500 mt-2">Pesan Anda telah terkirim.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={formData.nama}
                        onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                        className={inputClass}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={inputClass}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Subjek</label>
                      <input
                        type="text"
                        required
                        value={formData.subjek}
                        onChange={e => setFormData(prev => ({ ...prev, subjek: e.target.value }))}
                        className={inputClass}
                        placeholder="Subjek pesan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Pesan</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.pesan}
                        onChange={e => setFormData(prev => ({ ...prev, pesan: e.target.value }))}
                        className={`${inputClass} resize-none`}
                        placeholder="Tulis pesan Anda..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-[15px] font-semibold rounded-xl
                        hover:bg-primary-dark transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
