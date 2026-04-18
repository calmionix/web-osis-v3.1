import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { loginAdmin } from '@/lib/data';

function PasswordCheck({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <XCircle className="w-3.5 h-3.5 text-red-400" />
      )}
      <span className={`text-xs ${met ? 'text-green-600' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const hasMinLength = password.length >= 12;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = loginAdmin(username, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-primary-light px-4">
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* Logo */}
          <div className="text-center">
            <Star className="w-10 h-10 text-primary mx-auto" strokeWidth={1.5} />
            <h1 className="font-display text-2xl font-semibold text-slate-800 mt-4">Admin Panel</h1>
            <p className="text-sm text-slate-400 mt-1">OSIS MTs Darul Hikam</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-[10px] text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 border border-slate-200 rounded-[10px] text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-1.5 pt-1">
              <PasswordCheck label="Minimal 12 karakter" met={hasMinLength} />
              <PasswordCheck label="Huruf besar & kecil" met={hasUpperLower} />
              <PasswordCheck label="Angka" met={hasNumber} />
              <PasswordCheck label="Simbol" met={hasSymbol} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white text-sm font-semibold rounded-xl
                hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-sm text-slate-500">
          <a href="/" className="hover:text-primary transition-colors">Kembali ke Beranda</a>
        </p>
      </div>
    </main>
  );
}
