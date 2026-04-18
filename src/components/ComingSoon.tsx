import { Clock } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  message?: string;
}

export default function ComingSoon({
  title = 'Coming Soon',
  message = 'Halaman ini sedang dalam pengembangan. Nantikan informasi lengkapnya.',
}: ComingSoonProps) {
  return (
    <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '300px' }}>
      <div className="bg-white rounded-2xl p-12 max-w-[400px] w-full text-center shadow-coming">
        <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold text-slate-800">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          {message}
        </p>
        <div className="w-[60px] h-1 bg-accent rounded-full mx-auto mt-6" />
      </div>
    </div>
  );
}
