## Pertanyaan produk

Banyak stock tools merangkum evidence yang kompleks menjadi skor yang terlihat sangat yakin. EventAlpha dikembangkan sebagai platform riset dan decision-support yang menjaga market data, evidence, konteks model, risiko, dan ketidakpastian tetap terlihat.

Tujuannya bukan menghasilkan instruksi buy atau sell yang dijamin benar. Platform harus membantu researcher memahami mengapa suatu peluang ditampilkan, evidence apa yang mendukungnya, dan kapan sistem sebenarnya tidak memiliki clear edge.

## Yang sudah tersedia

Repository saat ini memiliki product stack modular:

- frontend React dan API Express;
- internal AI service berbasis FastAPI;
- PostgreSQL dengan vector support, Redis worker, dan MinIO storage;
- market-data ingestion dan persiapan technical feature;
- local model training, reviewed release package, model registry, promotion, dan inference workflow;
- pemrosesan evidence corporate action dan berita;
- reporting, job tracking, dan automation workflow.

Eksperimen awal mengevaluasi beberapa model. Random Forest memberikan hasil terkuat pada salah satu perbandingan training, tetapi statusnya adalah experimental baseline, bukan active production model.

## Kontribusi saya

Saya merancang dan mengiterasi arsitektur sistem, container deployment, workflow data dan training, model registry, batas operasional, serta product flow berbasis evidence. Sebagian besar pekerjaan engineering berfokus pada pengurangan ambiguitas: memisahkan local training dari Docker inference, memvalidasi release artifact, mencegah seed data masuk ke training nyata, dan mendokumentasikan kondisi fallback ke news-only output.

## Fitur saat ini dan roadmap

Corporate-action dan news processing sudah diimplementasikan. Fundamental atau money-management analysis yang lengkap masih berada pada roadmap. Technical market feature dan experimentation sudah tersedia, tetapi unified technical-screening product workflow masih dalam pengembangan.

Diagram cover pada halaman ini menggambarkan target screening workflow: market data, news, dan technical evidence menuju AI-supported decision layer. Diagram tersebut bukan klaim bahwa seluruh sumber sudah difusion menjadi satu production model yang tervalidasi.

## Constraint reliability dan kejujuran

Platform memperlakukan yfinance sebagai convenience data source, bukan feed exchange-grade dengan kontrak layanan. Confidence model belum terkalibrasi. News masih menjadi evidence layer terpisah dan tidak seharusnya menaikkan atau membalik technical confidence sebelum fusion plan tervalidasi secara out-of-sample.

Caveat ini merupakan bagian produk, bukan catatan kecil yang disembunyikan setelah demo. EventAlpha masih dalam pengembangan dan waitlist akan dibuka setelah public experience yang stabil tersedia.
