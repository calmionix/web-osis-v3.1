import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center pt-[112px] md:pt-[120px]">
      <div className="text-center px-4 relative">
        {/* Decorative star */}
        <Star className="w-48 h-48 md:w-52 md:h-52 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" strokeWidth={1} />

        <div className="relative z-10">
          <h1 className="font-display text-[100px] md:text-[120px] font-bold text-primary/20 leading-none select-none">
            404
          </h1>
          <h2 className="font-display text-2xl md:text-[28px] font-semibold text-slate-800 -mt-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-500 mt-4 max-w-[400px] mx-auto">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl
              hover:bg-primary-dark transition-colors mt-8"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
