import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Image, Calendar, Plus, Upload, TrendingUp, Award } from 'lucide-react';
import { getPengurus } from '@/lib/data';

export default function Dashboard() {
  const [stats, setStats] = useState({ pengurus: 0, bidang: 0, galeri: 0, events: 0 });

  useEffect(() => {
    const pengurus = getPengurus();
    setStats({
      pengurus: pengurus.length,
      bidang: new Set(pengurus.map(p => p.bidang)).size,
      galeri: 0,
      events: 0,
    });
  }, []);

  const statCards = [
    { icon: Users, label: 'Total Pengurus', value: stats.pengurus, color: 'primary' },
    { icon: BookOpen, label: 'Bidang Terisi', value: stats.bidang, color: 'accent' },
    { icon: Image, label: 'Galeri Foto', value: stats.galeri, color: 'primary' },
    { icon: Calendar, label: 'Event Aktif', value: stats.events, color: 'accent' },
  ];

  const quickActions = [
    { icon: Plus, label: 'Tambah Pengurus', path: '/admin/pengurus', color: 'primary' },
    { icon: Upload, label: 'Upload Foto', path: '/admin/galeri', color: 'accent', soon: true },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 md:p-8 text-white">
        <h2 className="font-display text-xl md:text-2xl font-semibold">
          Selamat Datang, Admin!
        </h2>
        <p className="text-white/70 mt-2 text-sm">
          Kelola data pengurus OSIS, galeri, dan event MTs Darul Hikam Cirebon.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-card border border-slate-100">
            <div className={`w-10 h-10 rounded-lg ${card.color === 'primary' ? 'bg-primary-light' : 'bg-accent-light'} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color === 'primary' ? 'text-primary' : 'text-accent-dark'}`} strokeWidth={1.5} />
            </div>
            <div className="font-display text-2xl font-bold text-slate-800">{card.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-display text-base font-semibold text-slate-800 mb-4">Aksi Cepat</h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              onClick={(e) => action.soon && e.preventDefault()}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                action.soon
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : action.color === 'primary'
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-accent text-white hover:bg-accent-dark'
              }`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
              {action.soon && (
                <span className="text-[9px] font-semibold bg-white/20 px-1.5 py-0.5 rounded">
                  SOON
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-card border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <h4 className="font-display text-sm font-semibold text-slate-800">Status Data</h4>
          </div>
          <p className="text-sm text-slate-500">
            {stats.pengurus > 0
              ? `Terdata ${stats.pengurus} pengurus OSIS aktif di sistem.`
              : 'Belum ada data pengurus. Silakan tambahkan melalui menu Pengurus.'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center">
              <Award className="w-4 h-4 text-accent-dark" strokeWidth={1.5} />
            </div>
            <h4 className="font-display text-sm font-semibold text-slate-800">Informasi</h4>
          </div>
          <p className="text-sm text-slate-500">
            Semua data disimpan secara lokal di browser. Pastikan untuk tidak menghapus data browser agar data tetap tersimpan.
          </p>
        </div>
      </div>
    </div>
  );
}
