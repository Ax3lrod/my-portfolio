# Project Portfolio Analysis & Restructuring Plan

Berdasarkan pengecekan dokumen `CONTRIBUTIONS.md` dan arsip proyek saat ini, saya telah mempelajari dan merangkum proyek-proyek yang benar-benar **menjual keahlianmu sebagai Fullstack Software Engineer**. Proyek-proyek kecil yang kurang relevan (seperti Calculator, HTML/CSS statis) akan disingkirkan dari etalase utama.

Berikut adalah catatan detail dari *experience* dan kontribusimu pada proyek-proyek utama yang layak di- *highlight*:

## 🟢 Proyek Berkualitas Tinggi (Wajib Masuk Portfolio)

### 1. Big Data Final Project: Steam Spam/Bot Review Detection
*   **Tipe:** Fullstack & Data Engineering (System Architect)
*   **Fokus Kontribusi:**
    *   Membangun arsitektur *hybrid data lakehouse* (Kafka, PySpark, Trino, MinIO) untuk memproses lebih dari 6.4 juta *review* secara *real-time*.
    *   Mengembangkan *pipeline* Machine Learning (Isolation Forest & K-Means untuk pelabelan otomatis) dan model klasifikasi berbasis BERT.
    *   Membuat REST API menggunakan **FastAPI** dan mengintegrasikannya dengan *dashboard* visualisasi (Streamlit/React).
*   **Nilai Jual:** Menunjukkan penguasaan sistem terdistribusi, *backend*, *machine learning*, dan *container orchestration* (Docker). Ini adalah proyek yang sangat impresif.

### 2. GENICS 2.0 (ShareITS)
*   **Tipe:** Fullstack Web Development (Backend Lead)
*   **Fokus Kontribusi:**
    *   Memimpin pengembangan *backend* dari awal hingga akhir menggunakan **TypeScript, Node.js, dan Express**.
    *   Merancang arsitektur REST API, *routing*, dan integrasi database, sembari berkontribusi aktif dalam penyambungan API di sisi *frontend* (Next.js).
*   **Nilai Jual:** Membuktikan kapasitasmu sebagai seorang Fullstack Engineer dan kapabilitas sebagai *Backend Lead* yang mengatur siklus hidup pengembangan sistem.

### 3. Virtual Try-On E-Commerce (WebAR)
*   **Tipe:** Fullstack / Frontend Development
*   **Fokus Kontribusi:**
    *   Menghubungkan aplikasi e-commerce Next.js dengan teknologi *Augmented Reality* (WebAR).
    *   Mengembangkan logika manipulasi *cart* yang kompleks (perhitungan diskon, validasi stok secara *real-time*, dan penyimpanan lokal persisten).
*   **Nilai Jual:** Keterampilan mengelola *state* yang kompleks pada aplikasi Next.js berskala menengah hingga besar.

### 4. Sustainamap (Juara 3 FIT Competition 2025 Hackathon)
*   **Tipe:** Frontend Development / Interactive Data App (Lead FE)
*   **Fokus Kontribusi:**
    *   Mengembangkan sistem pemetaan (*mapping*) berlapis menggunakan **Leaflet** untuk menampilkan data ekologis kompleks (PLTU dan pengawasan hutan).
    *   Membangun integrasi pelaporan berlokasi yang divalidasi dengan kuat menggunakan **Zod** dan **React-Dropzone**.
*   **Nilai Jual:** Kemampuan mengeksekusi aplikasi data interaktif di bawah tekanan waktu (*hackathon*) dengan UI yang sangat modern (HeroUI, Framer Motion).

### 5. SRE ITS Official Website
*   **Tipe:** Frontend Development & DevOps (Director of Web Dev)
*   **Fokus Kontribusi:**
    *   Membangun alur registrasi bertahap yang kompleks dengan **React Hook Form** dan **TanStack Query**.
    *   Menerapkan standar infrastruktur CI/CD di tingkat tim dengan konfigurasi **Husky** (*pre-push hooks*) dan *lint-staged*.
*   **Nilai Jual:** Kemampuan memimpin tim (11 developer) sekaligus memastikan kualitas kode dan pengalaman DevOps yang baik.

### 6. Petroleum Integrated Days 2024 (Petrolida 2025)
*   **Tipe:** Frontend Engineering
*   **Fokus Kontribusi:** Mengembangkan *funnel* registrasi yang sangat bercabang (berbagai jenis lomba dan *event* internasional) serta halaman *tracking* pemesanan secara *real-time*.
*   **Nilai Jual:** Keterampilan memetakan logika bisnis (*multi-event registration*) ke dalam kode *frontend*.

### 7. A Renewal Agent 6.0 (ARA 6.0)
*   **Tipe:** Frontend Engineering
*   **Fokus Kontribusi:** Membangun seluruh logika UI dan interaksi dari sistem autentikasi (login/register) dan membuat *dashboard admin internal*.
*   **Nilai Jual:** Fokus kuat pada *user flows* fundamental (Autentikasi).

### 8. BEM ITS Official Website
*   **Tipe:** Frontend Engineering
*   **Fokus Kontribusi:** Merancang sistem multibahasa (i18n) menggunakan `next-intl` dengan *middleware locale-aware*.
*   **Nilai Jual:** Pemahaman *Advanced Routing* di Next.js dan optimasi *Core Web Vitals*.

---

## 🔴 Proyek yang Harus Dihapus (Kurang Relevan/Terlalu Sederhana)
Saya akan menghapus proyek-proyek berikut dari `projectArchive.ts` karena tidak mencerminkan tingkat kemahiranmu saat ini:
1. **Responsive Calculator:** Hanya mendemonstrasikan kapabilitas dasar state management.
2. **Yumochi (Mochi Landing Page):** Hanya menggunakan HTML/CSS/JS statis murni.
3. **Basic Media Schooling (Team 20):** Hanya menggunakan HTML/CSS murni.
4. **Eclipta (IT ITS 2023):** Landing page standar, fungsinya bisa ditutupi oleh proyek-proyek besar di atas.
5. *(Opsional)* **Antasena ITS Team Internship:** Proyek Laravel. Ini bisa dipertahankan jika ingin menunjukkan variasi *tech stack* (PHP/Laravel), namun kurang relevan dengan *core stack* (Next/Node) dan posisi Fullstack JS. Saya akan **menyimpannya** namun menempatkannya di urutan lebih rendah, atau **menghapusnya** jika ingin fokus ke TS/JS.

---

## Rencana Tindakan Selanjutnya

Jika kamu setuju dengan perbaikan ini, aku akan memperbarui file `src/const/projectArchive.ts` agar hanya berisi proyek-proyek terbaik di atas, dengan deskripsi, *tech stack*, dan *role* yang disinkronkan secara langsung dan akurat dari `CONTRIBUTIONS.md`.
