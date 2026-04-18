import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, MessageCircle, Instagram, Youtube } from 'lucide-react';

const menuLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Pengurus', path: '/pengurus' },
  { label: 'Program', path: '/program' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Event', path: '/event' },
  { label: 'Kontak', path: '/kontak' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Star className="w-7 h-7 text-primary" strokeWidth={1.5} />
              <span className="font-display text-sm font-bold tracking-[0.06em]">
                OSIS MTs DARUL HIKAM
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              MTs Darul Hikam Cirebon
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>Jl. Kolektoran No.20, Panjunan, Lemahwungkuk, Kota Cirebon</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
              <Phone className="w-4 h-4 shrink-0 text-primary" />
              <span>(0231) 123456</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
              <Mail className="w-4 h-4 shrink-0 text-primary" />
              <span>mtsdarulhikam.cirebon@gmail.com</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => alert('WhatsApp Channel belum tersedia')}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert('Instagram belum tersedia')}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert('YouTube belum tersedia')}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Column 2 - Menu */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Menu</h4>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Info */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Akreditasi: A</li>
              <li>Naungan: Kementerian Agama</li>
              <li>Status: MTs Swasta</li>
              <li>Jenjang: Madrasah Tsanawiyah</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2025 OSIS Darul Hikam Cirebon. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Made with ❤️ by Calmionix
          </p>
        </div>
      </div>
    </footer>
  );
}
