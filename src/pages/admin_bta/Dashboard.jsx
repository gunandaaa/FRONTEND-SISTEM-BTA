import { Link } from "react-router-dom";

function Dashboard() {
  const cards = [
    {
      title: "Slip Menunggu Validasi",
      total: 15,
      color: "bg-bta-yellow text-bta-black shadow-[0_4px_14px_0_rgba(250,234,41,0.39)]", // Disesuaikan ke palet BTA
      link: "/admin/validasi-administrasi",
    },
    {
      title: "Kelas Belum Mendapat Tutor",
      total: 3,
      color: "bg-blue-100 text-blue-700", // Diperhalus
      link: "/admin/manajemen-kelas",
    },
    {
      title: "Laporan Nilai Menunggu Pengecekan",
      total: 5,
      color: "bg-green-100 text-bta-green", // Diperhalus
      link: "/admin/validasi-nilai",
    },
    {
      title: "Mahasiswa Belum Tes Penempatan",
      total: 21,
      color: "bg-red-100 text-red-600", // Diperhalus
      link: "/admin/tes-penempatan",
    },
  ];

  const todo = [
    "Validasi pembayaran mahasiswa baru.",
    "Melakukan plotting tutor ke kelas semester berjalan.",
    "Memeriksa file nilai yang diunggah tutor.",
    "Memasukkan hasil tes penempatan mahasiswa baru.",
  ];

  const aktivitas = [
    {
      waktu: "08.10",
      aktivitas: "Tutor Ust. Ahmad mengunggah nilai kelas MQ 2 - A",
    },
    {
      waktu: "09.25",
      aktivitas: "12 mahasiswa mengunggah bukti pembayaran.",
    },
    {
      waktu: "10.40",
      aktivitas: "Kelas MQ 1 - B berhasil dibuat.",
    },
    {
      waktu: "11.15",
      aktivitas: "3 mahasiswa telah menyelesaikan tes penempatan.",
    },
  ];

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">

      {/* BANNER SAPAAN */}
      <div className="bg-bta-green rounded-[2rem] p-8 md:p-10 relative overflow-hidden border-b-8 border-bta-yellow shadow-xl">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-bta-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Selamat Datang, Admin BTA 👋
          </h1>
          <p className="mt-3 text-white/80 font-medium max-w-xl leading-relaxed">
            Dashboard ini menampilkan seluruh pekerjaan operasional dan antrean validasi yang perlu Anda selesaikan hari ini.
          </p>
        </div>
      </div>

      {/* KARTU INDIKATOR ANTREAN */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black mb-5 ${card.color}`}
              >
                {card.total}
              </div>
              <h2 className="font-bold text-gray-800 text-lg leading-tight">
                {card.title}
              </h2>
            </div>
            
            <Link
              to={card.link}
              className="mt-6 flex items-center justify-center w-full bg-gray-50 hover:bg-bta-green text-gray-600 hover:text-white font-bold px-5 py-3 rounded-xl transition-colors duration-300 group"
            >
              Lihat Antrean
              <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        ))}
      </div>

      {/* DAFTAR PEKERJAAN & AKTIVITAS */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Kolom Kiri: To-Do List */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="border-b border-gray-100 px-8 py-6 bg-gray-50/50">
            <h2 className="text-xl font-black text-bta-green flex items-center gap-2">
              <svg className="w-5 h-5 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              Prioritas To-Do Hari Ini
            </h2>
          </div>
          <div className="p-8 flex-1">
            <ul className="space-y-4">
              {todo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-bta-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-bta-green"></div>
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: Aktivitas Sistem */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="border-b border-gray-100 px-8 py-6 bg-gray-50/50">
            <h2 className="text-xl font-black text-bta-green flex items-center gap-2">
              <svg className="w-5 h-5 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Log Aktivitas Terbaru
            </h2>
          </div>
          <div className="divide-y divide-gray-50 p-4">
            {aktivitas.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors gap-2 sm:gap-4"
              >
                <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 font-bold text-xs font-mono">
                  {item.waktu} WIB
                </span>
                <span className="text-gray-700 font-medium text-sm sm:text-right flex-1 leading-relaxed">
                  {item.aktivitas}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KOTAK INFORMASI DEVELOPER */}
      <div className="bg-bta-green/5 border border-bta-green/10 rounded-3xl p-6 md:p-8 flex items-start gap-4">
        <div className="p-2 bg-bta-green/10 rounded-full text-bta-green shrink-0 mt-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <h2 className="font-black text-bta-green text-lg mb-2">
            Informasi Sistem
          </h2>
          <p className="text-gray-600 font-medium leading-relaxed text-sm">
            Seluruh data pada dashboard ini masih menggunakan data simulasi (dummy). Ketika integrasi API backend selesai dibuat, seluruh angka pada kartu indikator, antrean pekerjaan, dan log aktivitas terbaru akan diperbarui secara *real-time* berdasarkan *database* operasional SIM BTA.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;