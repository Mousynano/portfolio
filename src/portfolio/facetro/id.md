## Mengapa sistem ini dibutuhkan

FACETRO mendukung workflow presensi berbasis face recognition, reporting, dan akses pintu di Universitas Negeri Semarang. Selama masa magang, sistem digunakan pada FIPP, Fakultas Teknik, dan Digital Center untuk program PRIGEL. Tantangannya bukan sekadar menghasilkan identitas dari gambar. Platform juga harus mengelola profil, log presensi, aktivitas perangkat, file terlindungi, laporan, notifikasi, dan deployment pada infrastruktur cloud serta edge.

Backend awal menggabungkan terlalu banyak tanggung jawab dalam satu deployment. File handling dan operasi Telegram berada bersama core API sehingga maintenance dan perubahan infrastruktur menjadi lebih sulit.

## Tanggung jawab saya

Sebagai Backend Engineer Intern dari September 2024 sampai Juli 2025, saya bekerja pada platform ini dalam dua fase magang. Kontribusi saya mencakup:

- memisahkan tanggung jawab core backend, Telegram, object storage, dan ML inference;
- mengembangkan REST API untuk presence, door lock, profile, log user dan device, activity data, serta operasi admin;
- mengintegrasikan Google SSO dan protected file access;
- memigrasikan file storage ke MinIO dengan versioning;
- mengimplementasikan workflow quick recap dan full recap presensi;
- mendukung deployment automation, operasi melalui Portainer, serta migrasi GCP ke perangkat edge Huawei Atlas;
- memvalidasi pipeline rekognisi Dlib dan FaceNet yang dilaporkan dalam studi magang.

## Evolusi sistem yang dideploy

Laporan magang mendokumentasikan pemisahan workload backend dan ML ke beberapa service. Request dirutekan melalui layer load balancing, sementara storage, database, backend, dan ML dipisahkan. Desain yang digunakan pada periode laporan juga mencakup update container otomatis dan pemrosesan ML master-slave.

![Arsitektur FACETRO yang didokumentasikan pada laporan magang](/assets/images/projects/facetro/deployed-architecture.webp "Arsitektur pada laporan magang fase kedua. Ini adalah sistem era laporan yang dideploy, bukan eksplorasi desain HAProxy dan Tailscale setelahnya.")

Saya tidak mempromosikan rancangan HAProxy, Tailscale, dan workload cluster yang lebih baru sebagai hasil deployment. Pekerjaan tersebut adalah eksplorasi arsitektur setelah periode utama case study ini.

## Workflow operasional yang dikembangkan

Pekerjaan pada platform tidak hanya berkaitan dengan inference. Cakupannya termasuk secure login, rekap presensi, activity reporting, pengelolaan profil dan gambar, broadcast Telegram berbasis role, serta administrasi container.

![Antarmuka login FACETRO pada laporan](/assets/images/projects/facetro/login.webp "Google SSO ditambahkan bersama workflow login yang sudah ada.")

![Operasional Portainer pada laporan](/assets/images/projects/facetro/portainer.webp "Portainer memberi pandangan operasional yang lebih jelas terhadap container dan penggunaan resource.")

## Perubahan yang dihasilkan

Tanggung jawab backend menjadi lebih modular, object storage dipisahkan dari application server, dan workflow seperti SSO, pembuatan recap, protected file, serta container management menjadi bagian dari platform yang dideploy. Pekerjaan migrasi juga memindahkan backend dan ML dari lingkungan berbasis GCP menuju infrastruktur edge Huawei Atlas.

Laporan mencatat rata-rata total processing time sebesar 407,21 ms untuk tahap backend dan ML pada pengujian fase tersebut. Saya tidak mengklaim peningkatan jumlah pengguna atau deployment time karena metrik itu memang tidak dikumpulkan selama engagement.

## Batasan dan pelajaran

Pelajaran terbesarnya adalah bahwa produk ML production pada akhirnya banyak ditentukan oleh sistem di sekitar model: identity, storage, kontrak API, deployment, reporting, authorization, dan recovery path. Pengalaman ini juga menunjukkan pentingnya menentukan metrik operasional sebelum optimasi dimulai. Sistem berkembang, tetapi beberapa before-and-after metrics yang berguna tidak tersedia.
