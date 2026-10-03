## Pertanyaan produk

EventAlpha adalah produk R&D untuk **rekomendasi saham Indonesia**, bukan aplikasi broker atau eksekusi trading. Pertanyaan produk saat ini lebih sempit daripada ide platform awal: apakah beberapa evidence stream yang mudah dipahami dapat membantu pengguna menentukan saham mana yang layak diperiksa lebih lanjut tanpa mengubah hasilnya menjadi tombol buy yang seolah-olah ajaib?

## Arah tiga bagian saat ini

Arah produk yang sedang digunakan adalah screening tiga bagian:

- **market behavior**, di mana MarketCore mengeksplorasi price/market feature serta eksperimen forecasting atau statistik;
- **company dan event evidence**, di mana NewsLens melacak disclosure dan corporate action yang relevan serta apakah event tersebut masih aktif atau sudah efektif selesai;
- **investability / statistical context**, di mana indikator yang interpretable dapat membantu agar rekomendasi tidak bergantung pada satu output model saja.

Variable persisnya masih terus dikurangi. Product surface yang dilihat user harus tetap mudah dipahami meskipun riset internal menggunakan banyak feature.

## Yang saat ini sudah ada

Repository sudah memiliki service modular dan experimentation infrastructure berbasis React, Express, FastAPI, PostgreSQL, local services ter-containerize, data preparation, model experimentation, dan evidence processing.

Prioritas engineering saat ini adalah **stabilisasi menggunakan data yang tersedia**, bukan menambah dependency data berbayar atau mempresentasikan semua komponen eksperimen sebagai production-ready. Beberapa sumber dan collection path masih dievaluasi, termasuk bagaimana dokumen IDX dapat dikumpulkan dan dipelihara secara bertanggung jawab.

## Yang saya tangani

Saya merancang product dan system architecture, service boundary, container setup, experiment workflow, evidence lifecycle, dan capability boundary. Proyek ini juga saya gunakan untuk memaksa keputusan tentang apa yang *tidak* perlu dibangun: execution trading, recommendation score yang opaque, dan dependency data besar sengaja berada di luar scope saat ini.

## Rekomendasi, bukan eksekusi

EventAlpha ditujukan untuk menampilkan kandidat dan evidence yang layak diperiksa lebih lanjut. Sistem tidak mengeksekusi trade, mengelola brokerage account, atau mengklaim return yang dijamin. Dengan begitu problem engineering tetap fokus pada kualitas rekomendasi, relevansi evidence, dan explainability tanpa berpura-pura bahwa sistem eksperimental adalah produk eksekusi yang regulated.

## Constraint saat ini

Blocker utama sekarang bukan lagi luasnya arsitektur. Masalah utamanya adalah menentukan data apa yang bisa diperoleh cukup konsisten untuk mendukung workflow screening yang sempit dan dapat dipercaya. Sebelum hal tersebut stabil, menambah model baru kurang bernilai dibanding membuat produk lebih kecil dengan data provenance dan evidence expiry yang eksplisit.
