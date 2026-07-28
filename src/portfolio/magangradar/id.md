## Masalah yang diselesaikan

Katalog berisi puluhan ribu lowongan secara teknis bisa dicari, tetapi tetap sulit diprioritaskan. Kandidat perlu mengetahui peluang mana yang sesuai dengan bukti pada CV, mana yang kompetisinya tinggi, gap apa yang masih ada, dan apa yang perlu diperbaiki sebelum melamar.

MagangRadar mengubah snapshot 21.985 lowongan menjadi dua workflow yang berguna: eksplorasi manual dan prioritas berbasis CV.

## Cara pengguna memakainya

Pengguna dapat mencari katalog berdasarkan posisi, lokasi, jenjang, kuota, dan jumlah pelamar. Ketika membutuhkan jawaban yang lebih fokus, pengguna mengunggah CV PDF, memberi target posisi dan lokasi secara opsional, menyetujui pemrosesan, lalu meminta analisis.

![Titik awal analisis CV di MagangRadar](/assets/images/projects/magangradar/cv-upload.webp "CV hanya diproses untuk request analisis dan tidak disimpan oleh MagangRadar.")

Hasil tidak ditampilkan sebagai probabilitas diterima yang misterius. MagangRadar mengekstraksi profil kandidat, memilih subset kandidat dari seluruh katalog, memeringkat maksimal sepuluh rekomendasi, lalu menjelaskan alasan kecocokan, hal yang perlu diperkuat, dan tindakan sebelum melamar.

![Ringkasan kandidat dan rekomendasi prioritas pertama](/assets/images/projects/magangradar/recommendation-summary.webp "Interface memisahkan evidence profil, fit, competition, dan tindakan praktis.")

![Rekomendasi prioritas berikutnya](/assets/images/projects/magangradar/recommendation-list.webp "Setiap rekomendasi tetap menyediakan tautan ke lowongan resmi untuk diverifikasi.")

Pengguna yang tidak memerlukan analisis AI tetap bisa membandingkan seluruh snapshot secara lokal di browser.

![Pencarian lowongan manual](/assets/images/projects/magangradar/job-browser.webp "Pencarian dan filter berjalan di browser tanpa memanggil analysis function.")

## Yang saya bangun

Saya merancang dan mengimplementasikan arsitektur produk serta recommendation flow:

- static export Next.js yang menyajikan katalog lowongan melalui Netlify CDN;
- pencarian, filter, pagination, dan perbandingan lokal tanpa backend request;
- Netlify Function yang menerima PDF maksimal 3 MB dan menyimpan Gemini key di sisi server;
- ekstraksi CV terstruktur dan deterministic prefilter dari 21.985 lowongan menjadi maksimal 55 kandidat;
- AI reranking untuk maksimal sepuluh rekomendasi akhir;
- pemisahan konsep fit, competition, dan feasibility daripada satu skor tanpa penjelasan;
- consent, no-store response, input limit, rate limit, dan defensive prompt rules.

Feasibility score adalah alat prioritas, bukan probabilitas diterima. Perbedaan ini dibuat eksplisit karena false certainty mungkin terlihat meyakinkan, tetapi menghasilkan saran yang lebih buruk.

## Keputusan arsitektur

Katalog lowongan hanya berubah saat snapshot baru sengaja dipersiapkan dan dideploy. Dengan begitu, pengalaman browsing publik tetap static, cepat, dan murah. AI hanya dipanggil ketika pengguna mengunggah CV sehingga trafik pencarian biasa tidak menghabiskan kuota model.

Serverless function terlebih dahulu menggunakan deterministic logic untuk memperkecil ruang pencarian. Mengirim semua 21.985 lowongan ke model akan mahal, lambat, dan tidak perlu. Model hanya bekerja pada shortlist canonical dan hanya boleh mengembalikan job key yang valid.

## Hasil dan batasan

MagangRadar sudah live sebagai produk publik. Sistem menyediakan browsing katalog cepat dan workflow rekomendasi yang menghasilkan shortlist, alasan, gap, dan tindakan. Dataset merupakan snapshot bertanggal, bukan feed real-time, dan setiap rekomendasi mengarah kembali ke lowongan resmi untuk verifikasi.
