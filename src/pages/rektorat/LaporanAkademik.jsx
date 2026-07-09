import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  AlertTriangle,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  BookOpen
} from 'lucide-react';

const LaporanAkademik = () => {
  const [masterData] = useState([
    { id: 1, nim: "202601001", nama: "Rifqi Al-Faruq", fakultas: "Ilmu Pendidikan", prodi: "Pendidikan Agama Islam", nilaiAkhir: 88, status: "Lulus" },
    { id: 2, nim: "202602015", nama: "Siti Aminah", fakultas: "Ekonomi dan Bisnis", prodi: "Manajemen", nilaiAkhir: 75, status: "Lulus" },
    { id: 3, nim: "202601044", nama: "Muhammad Rizqi", fakultas: "Ilmu Pendidikan", prodi: "PGMI", nilaiAkhir: 45, status: "Tidak Lulus" },
    { id: 4, nim: "202603009", nama: "Zainal Abidin", fakultas: "Teknologi Informasi", prodi: "Sistem Informasi", nilaiAkhir: 42, status: "Tidak Lulus" },
    { id: 5, nim: "202601050", nama: "Budi Santoso", fakultas: "Ilmu Pendidikan", prodi: "PGMI", nilaiAkhir: 38, status: "Tidak Lulus" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterFakultas, setFilterFakultas] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const filteredData = masterData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.nim.includes(searchTerm);
    const matchFakultas = filterFakultas ? item.fakultas === filterFakultas : true;
    const matchProdi = filterProdi ? item.prodi === filterProdi : true;
    return matchSearch && matchFakultas && matchProdi;
  });

  const failedStats = useMemo(() => {
    return filteredData.reduce((acc, curr) => {
      if (curr.status === "Tidak Lulus") {
        acc[curr.prodi] = (acc[curr.prodi] || 0) + 1;
      }
      return acc;
    }, {});
  }, [filteredData]);

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <BookOpen size={24} />
            </div>
            Laporan Akademik & Kelulusan
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Pemantauan performa akademik tingkat fakultas dan program studi secara komprehensif.
          </p>
        </div>
        
        {/* Tombol Unduh Laporan Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black text-sm py-3.5 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Download size={18} strokeWidth={2.5} /> 
            <span>Unduh Laporan</span>
            <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-300 ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                  <FileText size={18} className="text-red-500" /> Format Dokumen PDF
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-bta-green rounded-xl transition-colors">
                  <FileSpreadsheet size={18} className="text-bta-green" /> Format Spreadsheet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RANGKUMAN EVALUASI KRITIS (STATS CARD) */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Aksen Latar Evaluasi */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full opacity-50 pointer-events-none"></div>
        
        <h3 className="text-base font-black text-gray-800 mb-6 flex items-center gap-2">
          <AlertTriangle size={20} className="text-red-500" strokeWidth={2.5} /> 
          Evaluasi Kritis: Defisit Kelulusan per Prodi
        </h3>
        
        <div className="flex flex-wrap gap-4 relative z-10">
          {Object.keys(failedStats).length > 0 ? (
            Object.entries(failedStats).map(([prodi, count]) => (
              <div key={prodi} className="bg-red-50 border border-red-100 px-5 py-4 rounded-2xl flex-grow md:flex-grow-0 min-w-[200px]">
                <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest mb-1">{prodi}</p>
                <p className="text-3xl font-black text-red-900 flex items-baseline gap-1">
                  {count} <span className="text-sm font-bold text-red-700/70">Mahasiswa</span>
                </p>
              </div>
            ))
          ) : (
            <div className="bg-green-50/50 border border-green-100 px-6 py-4 rounded-2xl w-full flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-bta-green animate-pulse"></div>
              <p className="text-sm text-bta-green font-bold">Luar biasa! Tidak terdeteksi adanya mahasiswa yang gagal dalam filter pencarian ini.</p>
            </div>
          )}
        </div>
      </div>

      {/* AREA FILTER & PENCARIAN */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-5">
        <div className="flex items-center gap-2 text-sm font-black text-bta-green border-b border-gray-100 pb-3">
          <Filter size={18} />
          Saring Data Laporan
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari NIM / Nama..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-700 transition-all placeholder:text-gray-400" 
            />
          </div>
          
          <select 
            value={filterFakultas}
            onChange={(e) => setFilterFakultas(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green cursor-pointer appearance-none transition-all"
          >
            <option value="">Semua Fakultas</option>
            <option value="Ilmu Pendidikan">Ilmu Pendidikan</option>
            <option value="Ekonomi dan Bisnis">Ekonomi dan Bisnis</option>
            <option value="Teknologi Informasi">Teknologi Informasi</option>
          </select>
          
          <select 
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green cursor-pointer appearance-none transition-all"
          >
            <option value="">Semua Program Studi</option>
            <option value="Pendidikan Agama Islam">Pendidikan Agama Islam</option>
            <option value="PGMI">PGMI</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>
          
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterFakultas("");
              setFilterProdi("");
            }}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-sm text-gray-700 transition-colors py-3"
          >
             <Filter size={16} /> Reset Pencarian
          </button>
        </div>
      </div>

      {/* TABEL DATA AKADEMIK */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Nomor Induk</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Nama Mahasiswa</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Fakultas / P. Studi</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Nilai Akhir</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Status Validasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search size={32} className="text-gray-300" />
                      <p>Data mahasiswa tidak ditemukan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50/80 transition-colors duration-150">
                    <td className="p-5 font-mono text-gray-500">{m.nim}</td>
                    <td className="p-5 font-bold text-gray-800">{m.nama}</td>
                    <td className="p-5">
                      <div className="font-bold text-gray-700">{m.fakultas}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{m.prodi}</div>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`text-lg font-black ${m.nilaiAkhir < 69 ? 'text-red-500' : 'text-bta-green'}`}>
                        {m.nilaiAkhir}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider border inline-block min-w-[100px] ${
                        m.status === 'Lulus' 
                          ? 'bg-green-50 text-bta-green border-bta-green/20' 
                          : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default LaporanAkademik;