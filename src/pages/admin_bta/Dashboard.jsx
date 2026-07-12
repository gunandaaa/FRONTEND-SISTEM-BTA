import { Link } from "react-router-dom";

function Dashboard() {
  // ==========================================
  // DUMMY DATA (Nanti diganti dengan data dari API Backend)
  // ==========================================
  
  // 1. Baris Atas: Summary Cards
  const cards = [
    {
      title: "Total Mahasiswa Aktif",
      total: 800,
      color: "bg-bta-yellow text-bta-black shadow-[0_4px_14px_0_rgba(250,234,41,0.39)]",
      link: "/admin/manajemen-mahasiswa",
    },
    {
      title: "Total Kelas Aktif",
      total: 24,
      color: "bg-blue-100 text-blue-700",
      link: "/admin/manajemen-kelas",
    },
    {
      title: "Antrean Nilai",
      total: 5,
      color: "bg-green-100 text-bta-green",
      link: "/admin/validasi-nilai",
    },
    {
      title: "Slip Menunggu Validasi",
      total: 15,
      color: "bg-red-100 text-red-600",
      link: "/admin/validasi-administrasi",
    },
  ];

  // 2. Baris Tengah (Kiri): Validasi Slip Terkini
  const slipTerkini = [
    { id: "SLP-001", nama: "Ahmad Fauzi", nim: "2023001", waktu: "10 Menit lalu" },
    { id: "SLP-002", nama: "Siti Aminah", nim: "2023045", waktu: "25 Menit lalu" },
    { id: "SLP-003", nama: "Budi Santoso", nim: "2023089", waktu: "1 Jam lalu" },
    { id: "SLP-004", nama: "Rina Melati", nim: "2023112", waktu: "2 Jam lalu" },
    { id: "SLP-005", nama: "Dodi Pratama", nim: "2023156", waktu: "3 Jam lalu" },
  ];

  // 3. Baris Tengah (Kanan): Data Grafik Distribusi (Persentase)
  const distribusiKelas = [
    { tingkat: "MQ 1", persen: "85%" },
    { tingkat: "MQ 2", persen: "60%" },
  ];

  // 4. Baris Bawah: Status Kelas Aktif
  const kelasAktif = [
    { nama: "MQ 1 - A", tutor: "Ust. Ahmad", kuota: "25/30", status: "Berjalan" },
    { nama: "MQ 2 - B", tutor: "Ustz. Aisyah", kuota: "30/30", status: "Penuh" },
    { nama: "Tahsin - A", tutor: "Ust. Hasan", kuota: "15/20", status: "Berjalan" },
    { nama: "MQ 1 - C", tutor: "Belum Ada", kuota: "0/30", status: "Menunggu Tutor" },
  ];

  // ==========================================
  // TAMPILAN UI/UX BTA
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-10">

      {/* BANNER SAPAAN */}
      <div className="bg-bta-green rounded-[2rem] p-8 md:p-10 relative overflow-hidden border-b-8 border-bta-yellow shadow-xl">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-bta-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Selamat Datang, Admin BTA 👋
          </h1>
          <p className="mt-3 text-white/80 font-medium max-w-xl leading-relaxed">
            Ringkasan data operasional, validasi administrasi, dan status kelas hari ini.
          </p>
        </div>
      </div>

      {/* BARIS ATAS: KARTU INDIKATOR (SUMMARY) */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black mb-5 ${card.color}`}>
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
              Cek Detail
              <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        ))}
      </div>

      {/* BARIS TENGAH: ANTREAN & VISUALISASI */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Kiri (Grid span 2): Tabel Validasi Slip Terkini */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="border-b border-gray-100 px-8 py-6 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-black text-bta-green flex items-center gap-2">
              <svg className="w-5 h-5 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Validasi Slip Terkini
            </h2>
            <Link to="/admin/validasi-administrasi" className="text-sm font-bold text-gray-400 hover:text-bta-green transition-colors">Lihat Semua</Link>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-8 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">ID Slip</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">Mahasiswa</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">Waktu</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-wider font-bold text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {slipTerkini.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-4 text-sm font-bold text-gray-700">{item.id}</td>
                    <td className="px-8 py-4">
                      <div className="text-sm font-bold text-gray-800">{item.nama}</div>
                      <div className="text-xs font-medium text-gray-500">{item.nim}</div>
                    </td>
                    <td className="px-8 py-4 text-sm font-medium text-gray-500">{item.waktu}</td>
                    <td className="px-8 py-4 text-right">
                      <button className="px-4 py-2 bg-bta-yellow/20 text-yellow-700 hover:bg-bta-yellow hover:text-bta-black font-bold text-xs rounded-lg transition-colors">
                        Validasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kanan (Grid span 1): Grafik Distribusi Kelas */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="border-b border-gray-100 px-8 py-6 bg-gray-50/50">
            <h2 className="text-xl font-black text-bta-green flex items-center gap-2">
              <svg className="w-5 h-5 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
              Distribusi Kelas
            </h2>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-end">
            {/* Simulasi Bar Chart dengan Tailwind */}
            <div className="flex items-end justify-between h-48 gap-3">
              {distribusiKelas.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full bg-gray-100 rounded-t-xl h-full flex items-end relative overflow-hidden group">
                    <div 
                      className="w-full bg-bta-green/80 group-hover:bg-bta-green rounded-t-xl transition-all duration-500" 
                      style={{ height: item.persen }}
                    ></div>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-xs">
                      {item.persen}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{item.tingkat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BARIS BAWAH: STATUS KELAS AKTIF */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 px-8 py-6 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-xl font-black text-bta-green flex items-center gap-2">
            <svg className="w-5 h-5 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Status Kuota Kelas
          </h2>
          <Link to="/admin/manajemen-kelas" className="text-sm font-bold text-gray-400 hover:text-bta-green transition-colors">Kelola Kelas</Link>
        </div>
        <div className="p-6 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kelasAktif.map((kelas, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-5 hover:border-bta-green/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg">{kelas.nama}</h3>
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-md ${
                    kelas.status === 'Berjalan' ? 'bg-green-100 text-green-700' : 
                    kelas.status === 'Penuh' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {kelas.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex justify-between">
                    <span>Tutor:</span> <span className="text-gray-800">{kelas.tutor}</span>
                  </p>
                  <p className="text-sm font-medium text-gray-500 flex justify-between">
                    <span>Terisi:</span> <span className="text-gray-800 font-bold">{kelas.kuota}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;