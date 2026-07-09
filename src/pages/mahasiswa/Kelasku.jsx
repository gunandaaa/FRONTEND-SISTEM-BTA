import { useMemo } from "react";

function Kelasku() {
  // ==========================================
  // LOGIKA & DATA DUMMY GUNANDA (TIDAK DISENTUH)
  // ==========================================
  const kelas = {
    nama: "MQ 2 - A",
    tutor: "Dr. Ahmad Ulin Niam, M. Pd.",
    hari: "Jumat",
    jam: "13.00 - 15.00",
  };

  const riwayatPresensi = [
    {
      tanggal: "04 Juli 2026",
      status: "Hadir",
    },
    {
      tanggal: "11 Juli 2026",
      status: "Hadir",
    },
    {
      tanggal: "18 Juli 2026",
      status: "Izin",
    },
    {
      tanggal: "25 Juli 2026",
      status: "Alpa",
    },
  ];

  const presensiAktif = useMemo(() => {
    const sekarang = new Date();
    const hari = sekarang.getDay();
    const jam = sekarang.getHours();
    return hari === 5 && jam >= 13 && jam < 15;
  }, []);

  // Memperbarui string output kelas CSS agar sesuai palet
  const getStatusStyle = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-green-50 text-bta-green border border-bta-green/20";
      case "Izin":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "Alpa":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-black text-bta-green tracking-tight">
          Kelasku
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Informasi kelas dan riwayat kehadiran mahasiswa.
        </p>
      </div>

      {/* KARTU 1: Grid Informasi Kelas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Info Kelas */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-yellow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-bta-yellow/10 rounded-bl-full"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Nama Kelas
          </p>
          <h2 className="text-3xl font-black text-bta-green">
            {kelas.nama}
          </h2>
        </div>

        {/* Info Tutor */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-green relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-bta-green/5 rounded-bl-full"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Tutor Pendamping
          </p>
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            {kelas.tutor}
          </h2>
        </div>

        {/* Info Jadwal */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-full"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Jadwal Rutin
          </p>
          <h2 className="text-2xl font-black text-gray-800">
            {kelas.hari}
          </h2>
          <p className="text-gray-500 font-semibold mt-1">
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm">{kelas.jam}</span> WIB
          </p>
        </div>

      </div>

      {/* KARTU 2: Aksi Presensi */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-black text-bta-green flex items-center">
              <svg className="w-6 h-6 mr-2 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Presensi Hari Ini
            </h2>
            <p className="text-gray-500 mt-2 text-sm font-medium leading-relaxed">
              Tombol presensi akan otomatis aktif sesuai dengan jadwal kelas yang telah ditentukan. Pastikan koneksi Anda stabil saat melakukan presensi.
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              disabled={!presensiAktif}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-black tracking-wide transition-all duration-300 flex justify-center items-center ${
                presensiAktif
                  ? "bg-bta-yellow hover:bg-yellow-400 text-bta-black shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              }`}
              onClick={() => alert("Presensi berhasil diisi.")}
            >
              {presensiAktif ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Isi Kehadiran Sekarang
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Di Luar Jadwal Kelas
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KARTU 3: Riwayat Kehadiran (Tabel) */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-black text-bta-green mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          Riwayat Kehadiran
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-black text-bta-green uppercase tracking-wider w-16">
                  No
                </th>
                <th className="text-left py-4 px-6 text-sm font-black text-bta-green uppercase tracking-wider">
                  Tanggal Pertemuan
                </th>
                <th className="text-left py-4 px-6 text-sm font-black text-bta-green uppercase tracking-wider w-32">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
              {riwayatPresensi.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-gray-400 font-bold">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {item.tanggal}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-block text-center min-w-[80px] ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KARTU 4: Informasi Petunjuk */}
      <div className="bg-bta-green/5 border border-bta-green/10 rounded-3xl p-6 md:p-8">
        <h3 className="font-black text-bta-green mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-bta-green opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Petunjuk Presensi
        </h3>
        <ul className="space-y-3 text-gray-700 text-sm font-medium">
          <li className="flex items-start">
            <span className="text-bta-green font-bold mr-3">•</span>
            <span>Presensi hanya dapat dilakukan secara mandiri oleh mahasiswa pada <strong>hari dan jam kelas</strong> yang sedang berlangsung.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-green font-bold mr-3">•</span>
            <span>Apabila tombol presensi memiliki ikon gembok dan berwarna abu-abu, berarti jadwal pengisian presensi belum dibuka atau sudah ditutup.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-green font-bold mr-3">•</span>
            <span>Riwayat kehadiran akan direkapitulasi secara otomatis oleh sistem sebagai syarat perhitungan nilai akhir.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Kelasku;