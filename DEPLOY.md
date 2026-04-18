# Panduan Deploy ke GitHub Pages

## Ringkasan Perubahan

File-file yang diperbaiki agar website berjalan di GitHub Pages:

### 1. vite.config.ts
- **Sebelum**: `base: './'`
- **Sesudah**: `base: '/web-osis-v3/'`

### 2. src/pages/Home.tsx (baris 116)
- **Sebelum**: `src="/images/hero-star.png"`
- **Sesudah**: `src="./images/hero-star.png"`

### 3. src/pages/Tentang.tsx (baris 93)
- **Sebelum**: `src="/images/about-pattern.jpg"`
- **Sesudah**: `src="./images/about-pattern.jpg"`

### 4. .github/workflows/deploy.yml (file baru)
- Workflow GitHub Actions untuk auto-deploy ke GitHub Pages

---

## Cara Push ke GitHub

### Opsi A: Push Langsung ke Repository

```bash
# 1. Masuk ke folder project
# (folder ini sudah berisi semua file yang diperbaiki)

# 2. Inisialisasi git dan push
cd web-osis-v3-final
git init
git remote add origin https://github.com/calmionix/web-osis-v3.git
git branch -M main
git add .
git commit -m "fix: konfigurasi untuk GitHub Pages"
git push -f origin main
```

### Opsi B: Update Repository yang Sudah Ada

```bash
# 1. Clone repository lama
git clone https://github.com/calmionix/web-osis-v3.git
cd web-osis-v3

# 2. Hapus semua file lama (kecuali .git)
# Pada Windows:
Get-ChildItem -Exclude .git | Remove-Item -Recurse -Force
# Pada Linux/Mac:
# rm -rf !(|.git)

# 3. Copy semua file dari web-osis-v3-final ke sini
# (copy manual atau dengan command)

# 4. Push
git add .
git commit -m "fix: konfigurasi untuk GitHub Pages"
git push origin main
```

---

## Aktivasi GitHub Pages (WAJIB)

Setelah push, lakukan ini di GitHub:

1. Buka https://github.com/calmionix/web-osis-v3
2. Klik tab **Settings**
3. Di sidebar kiri, klik **Pages**
4. Pada bagian "Build and deployment"
5. Pilih **Source**: `GitHub Actions`
6. Selesai!

Website akan otomatis ter-deploy ke: `https://calmionix.github.io/web-osis-v3/`

---

## Status Deploy

Untuk melihat status deploy:
1. Klik tab **Actions** di repository
2. Lihat workflow "Deploy to GitHub Pages"
3. Tunggu hingga statusnya hijau (selesai)
4. Buka URL website Anda
