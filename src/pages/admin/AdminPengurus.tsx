import { useState, useEffect, useCallback, useRef } from 'react';
import { Pencil, Trash2, Plus, X, Upload, AlertCircle, Search, ChevronDown } from 'lucide-react';
import {
  getPengurus, addPengurus, updatePengurus, deletePengurus,
  JABATAN_OPTIONS, BIDANG_OPTIONS, KELAS_OPTIONS,
  readFileAsBase64, saveDraft, getDraft, clearDraft,
} from '@/lib/data';
import type { Pengurus } from '@/lib/data';
import Silhouette from '@/components/Silhouette';

export default function AdminPengurus() {
  const [pengurusList, setPengurusList] = useState<Pengurus[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    bidang: 'Inti',
    kelas: 'VIII-A',
    foto: null as string | null,
  });

  // Load data
  useEffect(() => {
    setPengurusList(getPengurus());
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => {
      if (formData.nama || formData.jabatan) {
        saveDraft(formData);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [showModal, formData]);

  // Load draft on open
  const openModal = useCallback((editId?: string) => {
    setError('');
    setPreviewImage(null);
    if (editId) {
      const p = getPengurus().find(x => x.id === editId);
      if (p) {
        setFormData({
          nama: p.nama,
          jabatan: p.jabatan,
          bidang: p.bidang,
          kelas: p.kelas,
          foto: p.foto,
        });
        setPreviewImage(p.foto);
        setEditingId(editId);
      }
    } else {
      const draft = getDraft();
      if (draft) {
        setFormData({
          nama: (draft.nama as string) || '',
          jabatan: (draft.jabatan as string) || '',
          bidang: (draft.bidang as string) || 'Inti',
          kelas: (draft.kelas as string) || 'VIII-A',
          foto: (draft.foto as string | null) || null,
        });
        setPreviewImage((draft.foto as string | null) || null);
      } else {
        setFormData({ nama: '', jabatan: '', bidang: 'Inti', kelas: 'VIII-A', foto: null });
      }
      setEditingId(null);
    }
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setPreviewImage(null);
    setError('');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await readFileAsBase64(file);
      setPreviewImage(base64);
      setFormData(prev => ({ ...prev, foto: base64 }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal membaca file');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nama.trim() || !formData.jabatan) {
      setError('Nama dan jabatan wajib diisi');
      return;
    }

    let result;
    if (editingId) {
      result = updatePengurus(editingId, formData);
    } else {
      result = addPengurus(formData);
    }

    if (result.success) {
      setPengurusList(getPengurus());
      clearDraft();
      closeModal();
    } else {
      setError(result.message || 'Terjadi kesalahan');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      deletePengurus(id);
      setPengurusList(getPengurus());
    }
  };

  const filteredList = pengurusList.filter(p =>
    p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputClass = 'w-full px-3.5 py-2.5 border border-slate-200 rounded-[10px] text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all';

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pengurus..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengurus
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Foto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Jabatan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Bidang</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kelas</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada data pengurus'}
                  </td>
                </tr>
              ) : (
                filteredList.map((p, index) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
                    <td className="px-4 py-3">
                      {p.foto ? (
                        <img src={p.foto} alt={p.nama} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <Silhouette size={40} />
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{p.nama}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{p.jabatan}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{p.bidang}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block text-xs bg-primary-light text-primary px-2 py-1 rounded-md font-medium">{p.kelas}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openModal(p.id)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-coming w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display text-lg font-semibold text-slate-800">
                {editingId ? 'Edit Pengurus' : 'Tambah Pengurus'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Silhouette size={48} />
                    )}
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {previewImage ? 'Ganti Foto' : 'Upload Foto'}
                    </button>
                    <p className="text-xs text-slate-400 mt-1">Maksimal 2MB</p>
                  </div>
                </div>
              </div>

              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                  className={inputClass}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              {/* Jabatan */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Jabatan</label>
                <div className="relative">
                  <select
                    value={formData.jabatan}
                    onChange={e => setFormData(prev => ({ ...prev, jabatan: e.target.value }))}
                    className={`${inputClass} appearance-none pr-10`}
                    required
                  >
                    <option value="">Pilih Jabatan</option>
                    {JABATAN_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Bidang */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bidang</label>
                <div className="relative">
                  <select
                    value={formData.bidang}
                    onChange={e => setFormData(prev => ({ ...prev, bidang: e.target.value }))}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {BIDANG_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Kelas */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kelas</label>
                <div className="relative">
                  <select
                    value={formData.kelas}
                    onChange={e => setFormData(prev => ({ ...prev, kelas: e.target.value }))}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {KELAS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Pengurus'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
