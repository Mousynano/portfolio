## Masalah yang repetitif

Mengecek satu domain adalah pekerjaan sederhana. Mengecek puluhan ide produk, campaign, atau brand satu per satu memakan waktu dan menghasilkan catatan yang berantakan. DomainDesk mengubah proses tersebut menjadi satu bulk workflow tanpa login, API key, database, atau backend aplikasi yang harus terus aktif.

## Workflow produk

Pengguna menempelkan daftar hingga 100 domain. Aplikasi mengambil hostname, menormalisasi input, membuang duplikat, lalu memeriksa endpoint RDAP registry publik.

![Workflow input DomainDesk](/assets/images/projects/domaindesk/input.webp "Pengguna dapat menempelkan daftar campuran dan menjalankan satu bulk check.")

Saat proses berjalan, interface menampilkan progress dan ringkasan jumlah. Hasil dinormalisasi menjadi tersedia, terdaftar, tidak didukung, dan belum pasti. Pengguna dapat membatalkan batch, mencari hasil, melakukan filter berdasarkan status, dan mengekspor data yang terlihat.

![Interface proses dan hasil DomainDesk](/assets/images/projects/domaindesk/results.webp "Progress, ringkasan status, filter, pencarian, cancellation, dan export berada dalam satu workflow.")

![Output CSV dari DomainDesk](/assets/images/projects/domaindesk/csv-output.webp "Dataset hasil ekspor mencakup domain, status yang dinormalisasi, timestamp, dan detail.")

## Yang saya bangun

Saya mengimplementasikan checking engine di browser dan user flow-nya:

- parsing input fleksibel untuk baris, spasi, koma, titik koma, dan URL lengkap;
- normalisasi hostname dan pembuangan duplikat;
- discovery bootstrap RDAP IANA dan request ke registry authoritative;
- bounded concurrency queue;
- timeout request, satu kali retry, dan cancellation;
- normalisasi status dan detail yang dapat dipahami pengguna;
- filtering, search, progress reporting, dan ekspor CSV;
- deployment static di Netlify tanpa application backend.

## Trade-off engineering

RDAP publik memungkinkan produk tanpa API key, tetapi dukungan dan perilaku response setiap registry tidak sepenuhnya seragam. Karena itu DomainDesk membedakan hasil unsupported dan uncertain daripada berpura-pura semua TLD memiliki tingkat kepastian yang sama.

Aplikasi ini adalah alat discovery dan shortlisting, bukan registrar. Ketersediaan akhir tetap harus diverifikasi melalui registrar sebelum pembelian. Batasan ini menjaga copy tetap akurat dan mencegah response registry publik berubah menjadi janji palsu.

## Hasil

DomainDesk sudah live dan mengubah pekerjaan manual yang repetitif menjadi workflow yang dapat dicari, dibatalkan, dan diekspor. Proyek ini dibangun dalam engineering evaluation dengan constraint bahwa produk harus tetap sederhana, deployable, dan berguna tanpa infrastruktur berbayar.
