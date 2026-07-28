## Batasan operasional

Tidak semua deployment presensi dapat mengandalkan koneksi cloud yang stabil atau backend yang selalu aktif. Prototipe ini mengeksplorasi unit operasional yang lebih kecil: satu controller ESP32 yang dapat mengautentikasi pengguna, menyimpan record, mengelola credential, mengontrol relay, dan menyediakan administrasi secara lokal.

Perangkat sudah dipasang secara fisik untuk kebutuhan research and development di STEKOM Semarang dan Universitas Negeri Semarang. Sistem ini tidak dipresentasikan sebagai deployment pengguna production; antarmuka LCD dan LVGL masih berada pada tahap prototipe.

## Cara perangkat bekerja

Pengguna melakukan scan fingerprint atau menempelkan credential NFC. Controller memvalidasi credential secara lokal, menentukan event check-in atau check-out, menyimpan aksi, memperbarui interface lokal yang terhubung, dan mengontrol relay ketika diperlukan.

Antarmuka admin memungkinkan operator mengelola user dan credential, melihat record presensi, mengatur perilaku perangkat, dan mengekspor data lokal. Update WebSocket menjaga browser client lokal tetap sinkron tanpa membutuhkan remote service.

## Yang saya bangun

Pekerjaan saya berfokus pada firmware standalone dan workflow operasional lokal:

- struktur firmware ESP32 dan hardware abstraction;
- pemrosesan credential fingerprint dan NFC;
- pengelolaan user dan credential lokal;
- presence logging dan automatic check-out;
- workflow relay dan device control;
- administrasi web lokal dan update WebSocket;
- licensing dan pemeriksaan identitas perangkat;
- integrasi prototipe LVGL untuk embedded display.

## Mengapa local-first

Operasi local-first menjaga workflow presensi utama tetap tersedia ketika internet tidak dapat digunakan. Pendekatan ini juga mengurangi jumlah service eksternal untuk instalasi kecil. Trade-off-nya adalah synchronization, backup, fleet management, dan remote observability masih memerlukan desain tambahan sebelum sistem menjadi produk production yang lebih besar.

## Status saat ini

Controller berada pada status installed R&D prototype. Firmware utama dan workflow web lokal sudah tersedia, sedangkan interface LCD dan validasi lapangan yang lebih luas masih perlu disempurnakan. Nilai utama proyek ini adalah studi integrasi: hardware event, local state, web administration, security constraint, dan kebutuhan instalasi nyata berada dalam satu perangkat dengan resource terbatas.
