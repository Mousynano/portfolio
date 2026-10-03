## Kenapa framework ini dibuat

Masalah deployment di PT Sakura System Solutions bukan sekadar “bagaimana menjalankan container.” Setiap environment customer dapat memiliki konfigurasi, akses jaringan, dan constraint operasional yang berbeda. Workflow kirim package lalu deploy secara manual menjadi rapuh ketika orang yang melakukan deployment harus berulang kali mengoordinasikan file, port, nilai environment, dan langkah recovery pada target yang berbeda.

Deployee dimulai sebagai proof of concept untuk membuat workflow tersebut lebih konsisten tanpa berpura-pura bahwa semua environment customer itu identik.

## Arsitektur yang saya pilih

Saya merancang sistem dengan model **server-agent**. Server pusat mengelola deployment intent dan visibility, sedangkan agent berjalan di setiap target environment dan melakukan pekerjaan deployment secara lokal.

Constraint pentingnya adalah connectivity. Daripada mewajibkan setiap target membuka management port inbound baru, agent dapat memulai komunikasi keluar menuju server. Model ini lebih mudah dipasang pada environment yang akses inbound-nya dibatasi atau mahal secara operasional untuk dikoordinasikan.

Framework berkembang melalui beberapa iterasi internal dan mencapai **v1.9.0** selama masa magang.

## Yang saya implementasikan

Peran saya pada PoC lebih dekat ke small product owner sekaligus implementer dibanding sekadar menjalankan ticket. Saya menangani keputusan teknis dan implementasi untuk:

- server-agent deployment flow dan target state;
- deployment plan, current state, dan deployment history;
- configuration, secret, volume, network, dan container lifecycle operation;
- pilihan runtime exposure untuk local-only, host-bound, dan all-interface access;
- setup path reverse proxy dan Cloudflare Tunnel;
- container log dan resource visibility;
- rollback dan Last Known Good recovery behavior;
- konsep blue-green deployment untuk mengurangi risiko recovery;
- deployment pilot production dan integrasi DNS kantor.

## Cara berpikir operasional di baliknya

Framework ini sengaja dibentuk berdasarkan operasi setelah deployment. Interface deployment tidak terlalu berguna kalau operator bisa menyalakan container tetapi tidak bisa melihat apa yang berjalan, memeriksa log, memahami exposure failure, atau melakukan recovery ketika sebuah release bermasalah.

Karena itu progres proyek bergeser dari sekadar “mengirim deployment” menuju state model yang lebih eksplisit: apa yang direncanakan, apa yang sedang berjalan, apa yang terjadi sebelumnya, apa yang dilaporkan target, dan recovery path apa yang tersedia.

## Batasan

Deployee adalah proyek internal perusahaan dan masih berupa pilot, bukan platform komersial publik. Saya hanya memaparkan pola engineering dan kontribusi saya tanpa membuka data client, credential, detail deployment proprietary, atau mengklaim skala rollout yang belum tervalidasi.

Nilai portfolio terkuat dari proyek ini adalah problem sistemnya: mengubah deployment constraint yang heterogen menjadi workflow yang lebih visible, repeatable, dan recoverable.
