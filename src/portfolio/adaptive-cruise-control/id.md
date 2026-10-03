## Pertanyaan riset

Adaptive cruise control harus mengatur perilaku following tanpa mereduksi masalah menjadi satu angka objective “terbaik”. Studi saat ini menguji bagaimana baseline canonical Differential Evolution dan beberapa varian DE modern bekerja saat melakukan tuning controller PID melalui repeated optimization, evaluasi dynamic response, robustness, dan safety.

## Desain eksperimen saat ini

Perbandingan saat ini mencakup **Genetic Algorithm, canonical Differential Evolution, FVRADE, RNEGDE, Neighborhood-SHADE, dan DE-NPS-FP**. Setiap objective dievaluasi melalui independent run berulang dengan population dan iteration budget yang sama agar perbandingan tidak diam-diam memberi satu metode computational opportunity lebih besar.

Software mencatat convergence behavior, objective value, time-response metrics, safety measure seperti TTC/TTE, serta robustness pada beberapa physical-parameter scenario. Statistical audit mencakup pemeriksaan distribusi dan paired non-parametric comparison, bukan memperlakukan satu lucky run sebagai hasil akhir.

## Kontribusi saya

Saya mengerjakan software simulasi dan optimasi, experimental pipeline, statistical auditing, robustness scenario, visualisasi, technical analysis, dan pengembangan manuskrip. Ini adalah proyek riset dengan kontribusi software dan methodological ownership yang cukup luas sehingga keseluruhan engineering workflow dapat saya jelaskan secara langsung.

## Apa yang ditunjukkan hasil saat ini

Temuan saat ini yang paling penting bukanlah satu pemenang dramatis. Beberapa metode keluarga DE converge ke boundary-active region yang secara praktis sama, dengan perbedaan median objective value yang sangat kecil. Perbedaan yang lebih menarik justru muncul pada runtime overhead, convergence behavior, dan dispersion antar repeated run.

Artinya, pertanyaan riset bergeser dari “optimizer mana yang menghasilkan satu angka paling rendah?” menjadi apakah complexity algoritma tambahan benar-benar menghasilkan improvement kontrol yang meaningful pada evaluation budget yang sama.

## Status dan batasan

Riset masih aktif dan manuskrip masih terus disempurnakan. Hasil berbasis simulasi dan tidak boleh dianggap sebagai controller kendaraan yang siap dipakai di jalan tanpa physical validation, constraint sensor dan actuator, implementation latency, serta skenario traffic yang lebih luas.
