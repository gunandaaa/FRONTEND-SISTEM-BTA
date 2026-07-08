import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter,
  FileText,
  FileSpreadsheet,
  File as FileWord,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Database
} from 'lucide-react';

const PelaporanDanEkspor = () => {
  // Master Data Laporan (Dummy Database)
  const [masterData] = useState([
    {
      id: 1,
      nim: "202601001",
      nama: "Rifqi Al-Faruq",
      fakultas: "Ilmu Pendidikan",
      prodi: "Pendidikan Agama Islam",
      tingkatMQ: "MQ 2",
      nilaiAwal: 85,
      kehadiran: "14/14",
      nilaiAkhir: 88,
      status: "Lulus",
      noSertifikat: "BTA/UNUHA/2026/001"
    },
    {
      id: 2,
      nim: "202602015",
      nama: "Siti Aminah",
      fakultas: "Ekonomi dan Bisnis",
      prodi: "Manajemen",
      tingkatMQ: "MQ 1",
      nilaiAwal: 60,
      kehadiran: "12/14",
      nilaiAkhir: 75,
      status: "Lulus",
      noSertifikat: "BTA/UNUHA/2026/045"
    },
    {
      id: 3,
      nim: "202601044",
      nama: "Muhammad Rizqi",
      fakultas: "Ilmu Pendidikan",
      prodi: "PGMI",
      tingkatMQ: "MQ 1",
      nilaiAwal: 50,
      kehadiran: "8/14",
      nilaiAkhir: 65,
      status: "Tidak Lulus",
      noSertifikat: "-"
    },
    {
      id: 4,
      nim: "202603009",
      nama: "Zainal Abidin",
      fakultas: "Teknologi Informasi",
      prodi: "Sistem Informasi",
      tingkatMQ: "MQ 2",
      nilaiAwal: 78,
      kehadiran: "13/14",
      nilaiAkhir: 82,
      status: "Lulus",
      noSertifikat: "BTA/UNUHA/2026/092"
    }
  ]);

  // State untuk Multi-Filter dan Pencarian
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFakultas, setFilterFakultas] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [filterMQ, setFilterMQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // State untuk menu dropdown ekspor
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Logika penyaringan data bersusun (Multi-Level Filtering)
  const filteredData = masterData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.nim.includes(searchTerm) || item.noSertifikat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFakultas = filterFakultas ? item.fakultas === filterFakultas : true;
    const matchProdi = filterProdi ? item.prodi === filterProdi : true;
    const matchMQ = filterMQ ? item.tingkatMQ === filterMQ : true;
    const matchStatus = filterStatus ? item.status === filterStatus : true;

    return matchSearch && matchFakultas && matchProdi && matchMQ && matchStatus;
  });

  // Aksi Ekspor Laporan
  const handleExport = (format) => {
    alert(`Mengekspor ${filteredData.length} baris data ke format ${format.toUpperCase()}...\n\nProses unduhan akan segera dimulai.`);
    setShowExportMenu(false); // Tutup menu setelah klik
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Database size={24} className="text-emerald-600" />
            Pelaporan & Ekspor Data
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pusat master data analitik. Gunakan filter untuk menyaring laporan spesifik dan cetak dokumen resmi.
          </p>
        </div>
        
        {/* Tombol Ekspor dengan Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-colors w-full md:w-auto"
          >
            <Download size={18} />
            <span>Unduh Laporan</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Opsi Dropdown Format Ekspor */}
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-10 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-1">
                <button onClick={() => handleExport('pdf')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors">
                  <FileText size={16} className="text-rose-500" /> Unduh sbg PDF
                </button>
                <button onClick={() => handleExport('excel')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                  <FileSpreadsheet size={16} className="text-emerald-500" /> Unduh sbg Excel
                </button>
                <button onClick={() => handleExport('word')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                  <FileWord size={16} className="text-blue-500" /> Unduh sbg Word
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Area Multi-Filter Dropdown */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
          <Filter size={16} className="text-emerald-600" />
          Filter & Pencarian Spesifik
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* 1. Kolom Pencarian Teks */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input 
              type="text"
              placeholder="Cari Nama/NIM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-700"
            />
          </div>

          {/* 2. Filter Fakultas */}
          <select 
            value={filterFakultas} 
            onChange={(e) => setFilterFakultas(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          >
            <option value="">Semua Fakultas</option>
            <option value="Ilmu Pendidikan">Ilmu Pendidikan</option>
            <option value="Ekonomi dan Bisnis">Ekonomi dan Bisnis</option>
            <option value="Teknologi Informasi">Teknologi Informasi</option>
          </select>

          {/* 3. Filter Prodi */}
          <select 
            value={filterProdi} 
            onChange={(e) => setFilterProdi(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          >
            <option value="">Semua Program Studi</option>
            <option value="Pendidikan Agama Islam">Pend. Agama Islam</option>
            <option value="PGMI">PGMI</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>

          {/* 4. Filter Tingkat MQ */}
          <select 
            value={filterMQ} 
            onChange={(e) => setFilterMQ(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          >
            <option value="">Semua Tingkat MQ</option>
            <option value="MQ 1">Tingkat MQ 1</option>
            <option value="MQ 2">Tingkat MQ 2</option>
          </select>

          {/* 5. Filter Status Lulus */}
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          >
            <option value="">Semua Status Hasil</option>
            <option value="Lulus">Lulus</option>
            <option value="Tidak Lulus">Tidak Lulus (Mengulang)</option>
          </select>
        </div>
      </div>

      {/* Tabel Master Data Komprehensif */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 rounded-tl-2xl">Nama & NIM</th>
                <th className="p-4">Fakultas / Prodi</th>
                <th className="p-4 text-center">Tingkat MQ</th>
                <th className="p-4 text-center">Tes Awal</th>
                <th className="p-4 text-center">Kehadiran</th>
                <th className="p-4 text-center">Nilai Akhir</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 rounded-tr-2xl">No. Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400 font-medium">
                    Tidak ada data laporan yang cocok dengan kombinasi filter Anda.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                    {/* Profil */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.nama}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.nim}</div>
                    </td>
                    
                    {/* Akademik */}
                    <td className="p-4">
                      <div className="font-medium text-slate-700">{item.fakultas}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.prodi}</div>
                    </td>
                    
                    {/* MQ */}
                    <td className="p-4 text-center font-semibold text-slate-600">
                      {item.tingkatMQ}
                    </td>

                    {/* Tes Awal */}
                    <td className="p-4 text-center">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200">
                        {item.nilaiAwal}
                      </span>
                    </td>

                    {/* Kehadiran */}
                    <td className="p-4 text-center">
                      <span className="text-xs font-medium text-slate-600 tracking-wide">
                        {item.kehadiran}
                      </span>
                    </td>

                    {/* Nilai Akhir */}
                    <td className="p-4 text-center">
                      <span className="text-base font-black text-slate-800">
                        {item.nilaiAkhir}
                      </span>
                    </td>
                    
                    {/* Status Lulus/Gagal */}
                    <td className="p-4 text-center">
                      {item.status === "Lulus" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <CheckCircle2 size={12} />
                          Lulus
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md bg-rose-50 text-rose-700 border border-rose-100">
                          <XCircle size={12} />
                          Gagal
                        </span>
                      )}
                    </td>

                    {/* No Sertifikat */}
                    <td className="p-4">
                      {item.noSertifikat !== "-" ? (
                        <span className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1 border border-slate-200 rounded">
                          {item.noSertifikat}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Belum terbit</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Info Data */}
      <div className="mt-4 flex justify-between items-center text-xs text-slate-500 px-2">
        <span>Menampilkan {filteredData.length} baris data laporan.</span>
        <span>Sistem BTA terhubung ke Database Pusat.</span>
      </div>
    </div>
  );
};

export default PelaporanDanEkspor;