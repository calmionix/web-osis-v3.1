// localStorage data management for OSIS MTs Darul Hikam

export interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  bidang: string;
  kelas: string;
  foto: string | null;
  createdAt: number;
}

export const JABATAN_OPTIONS = [
  'Ketua OSIS',
  'Wakil Ketua OSIS',
  'Sekretaris 1',
  'Sekretaris 2',
  'Bendahara 1',
  'Bendahara 2',
  'Ketua Bidang 1',
  'Ketua Bidang 2',
  'Ketua Bidang 3',
  'Ketua Bidang 4',
  'Ketua Bidang 5',
  'Ketua Bidang 6',
  'Anggota Bidang 1',
  'Anggota Bidang 2',
  'Anggota Bidang 3',
  'Anggota Bidang 4',
  'Anggota Bidang 5',
  'Anggota Bidang 6',
];

export const BIDANG_OPTIONS = [
  'Inti',
  'Keagamaan',
  'Demokrasi & Lingkungan',
  'Prestasi Akademik & Non-Akademik',
  'Kesehatan',
  'Komunikasi & IT / Publikasi',
  'Keamanan & Ketertiban',
];

export const KELAS_OPTIONS = [
  'VIII-A', 'VIII-B', 'VIII-C', 'VIII-D',
  'VIII-E', 'VIII-F', 'VIII-G', 'VIII-H',
];

export const BIDANG_DATA = [
  { id: 1, nama: 'Keagamaan' },
  { id: 2, nama: 'Demokrasi & Lingkungan' },
  { id: 3, nama: 'Prestasi Akademik & Non-Akademik' },
  { id: 4, nama: 'Kesehatan' },
  { id: 5, nama: 'Komunikasi & IT / Publikasi' },
  { id: 6, nama: 'Keamanan & Ketertiban' },
];

export function getPengurus(): Pengurus[] {
  try {
    const data = localStorage.getItem('osis_pengurus');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function savePengurus(pengurus: Pengurus[]) {
  localStorage.setItem('osis_pengurus', JSON.stringify(pengurus));
}

export function addPengurus(data: Omit<Pengurus, 'id' | 'createdAt'>): { success: boolean; message?: string } {
  const pengurus = getPengurus();
  
  // Check position limit
  const jabatan = data.jabatan;
  const isKetuaBidang = jabatan.startsWith('Ketua Bidang');
  const isAnggotaBidang = jabatan.startsWith('Anggota Bidang');
  const isInti = ['Ketua OSIS', 'Wakil Ketua OSIS', 'Sekretaris 1', 'Sekretaris 2', 'Bendahara 1', 'Bendahara 2'].includes(jabatan);
  
  if (isInti) {
    const count = pengurus.filter(p => p.jabatan === jabatan).length;
    if (count >= 1) {
      return { success: false, message: 'Jumlah pengurus untuk posisi ini sudah penuh' };
    }
  }
  
  if (isKetuaBidang) {
    const count = pengurus.filter(p => p.jabatan === jabatan).length;
    if (count >= 1) {
      return { success: false, message: 'Jumlah pengurus untuk posisi ini sudah penuh' };
    }
  }
  
  if (isAnggotaBidang) {
    const bidangNum = jabatan.split(' ').pop();
    const count = pengurus.filter(p => p.jabatan === `Anggota Bidang ${bidangNum}`).length;
    if (count >= 2) {
      return { success: false, message: 'Jumlah pengurus untuk posisi ini sudah penuh (maksimal 2 anggota)' };
    }
  }
  
  const newPengurus: Pengurus = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  
  pengurus.push(newPengurus);
  savePengurus(pengurus);
  return { success: true };
}

export function updatePengurus(id: string, data: Partial<Pengurus>): { success: boolean; message?: string } {
  const pengurus = getPengurus();
  const index = pengurus.findIndex(p => p.id === id);
  if (index === -1) return { success: false, message: 'Data tidak ditemukan' };
  
  // If jabatan is changing, check limits
  if (data.jabatan && data.jabatan !== pengurus[index].jabatan) {
    const jabatan = data.jabatan;
    const isKetuaBidang = jabatan.startsWith('Ketua Bidang');
    const isAnggotaBidang = jabatan.startsWith('Anggota Bidang');
    const isInti = ['Ketua OSIS', 'Wakil Ketua OSIS', 'Sekretaris 1', 'Sekretaris 2', 'Bendahara 1', 'Bendahara 2'].includes(jabatan);
    
    if (isInti) {
      const count = pengurus.filter(p => p.jabatan === jabatan && p.id !== id).length;
      if (count >= 1) {
        return { success: false, message: 'Jumlah pengurus untuk posisi ini sudah penuh' };
      }
    }
    
    if (isKetuaBidang) {
      const count = pengurus.filter(p => p.jabatan === jabatan && p.id !== id).length;
      if (count >= 1) {
        return { success: false, message: 'Jumlah pengurus untuk posisi ini sudah penuh' };
      }
    }
    
    if (isAnggotaBidang) {
      const bidangNum = jabatan.split(' ').pop();
      const count = pengurus.filter(p => p.jabatan === `Anggota Bidang ${bidangNum}` && p.id !== id).length;
      if (count >= 2) {
        return { success: false, message: 'Jumlah pengurus untuk posisi ini sudah penuh (maksimal 2 anggota)' };
      }
    }
  }
  
  pengurus[index] = { ...pengurus[index], ...data };
  savePengurus(pengurus);
  return { success: true };
}

export function deletePengurus(id: string) {
  const pengurus = getPengurus().filter(p => p.id !== id);
  savePengurus(pengurus);
}

export function getPengurusByJabatan(jabatan: string): Pengurus | undefined {
  return getPengurus().find(p => p.jabatan === jabatan);
}

export function getPengurusByBidang(bidangId: number): Pengurus[] {
  const ketuaBidang = getPengurus().find(p => p.jabatan === `Ketua Bidang ${bidangId}`);
  const anggota = getPengurus().filter(p => p.jabatan === `Anggota Bidang ${bidangId}`);
  return ketuaBidang ? [ketuaBidang, ...anggota] : anggota;
}

// Auth helpers
export const ADMIN_USERNAME = 'n7KxP4LmQz';
export const ADMIN_PASSWORD = 'Aq9#Lm2Xv!T7pR';

export function loginAdmin(username: string, password: string): { success: boolean; message: string } {
  // Check block
  const blockTime = localStorage.getItem('block_time');
  if (blockTime && parseInt(blockTime) > Date.now()) {
    const hoursLeft = Math.ceil((parseInt(blockTime) - Date.now()) / (1000 * 60 * 60));
    return { success: false, message: `Akun diblokir ${hoursLeft} jam karena terlalu banyak percobaan gagal.` };
  }
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem('admin_session', JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
    localStorage.removeItem('login_attempts');
    localStorage.removeItem('block_time');
    return { success: true, message: 'Login berhasil' };
  }
  
  // Track failed attempt
  const attempts = parseInt(localStorage.getItem('login_attempts') || '0') + 1;
  localStorage.setItem('login_attempts', String(attempts));
  
  if (attempts >= 3) {
    const blockUntil = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('block_time', String(blockUntil));
    return { success: false, message: 'Akun diblokir 24 jam karena terlalu banyak percobaan gagal.' };
  }
  
  return { success: false, message: `Password salah (${attempts}/3)` };
}

export function logoutAdmin() {
  localStorage.removeItem('admin_session');
}

export function isAdminLoggedIn(): boolean {
  try {
    const session = localStorage.getItem('admin_session');
    if (!session) return false;
    const data = JSON.parse(session);
    if (!data.loggedIn) return false;
    // Check if session is within 24 hours
    if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('admin_session');
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Draft auto-save
export function saveDraft(data: Record<string, unknown>) {
  localStorage.setItem('pengurus_draft', JSON.stringify(data));
}

export function getDraft(): Record<string, unknown> | null {
  try {
    const data = localStorage.getItem('pengurus_draft');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  localStorage.removeItem('pengurus_draft');
}

// Image upload helper
export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Ukuran foto maksimal 2MB'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
