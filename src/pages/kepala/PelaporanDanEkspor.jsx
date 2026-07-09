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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterFakultas, setFilterFakultas] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [filterMQ, setFilterMQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [showExportMenu, setShowExportMenu] = useState(false);

  const filteredData = masterData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.nim.includes(searchTerm) || item.noSertifikat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFakultas = filterFakultas ? item.fakultas === filterFakultas : true;
    const matchProdi = filterProdi ? item.prodi === filterProdi : true;
    const matchMQ = filterMQ ? item.tingkatMQ === filterMQ : true;
    const matchStatus = filterStatus ? item.status === filterStatus : true;

    return matchSearch && matchFakultas && matchProdi && matchMQ && matchStatus;
  });

  const handleExport = (format) => {
    alert(`Mengekspor ${filteredData.length} baris data ke format ${format.toUpperCase()}...\n\nProses unduhan akan segera dimulai.`);
    setShowExportMenu(false);
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <Database size={24} />
            </div>
            Pelaporan & Ekspor Data
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Pusat master data analitik. Gunakan filter untuk menyaring laporan dan cetak dokumen resmi.
          </p>
        </div>
        
        {/* Tombol Ekspor Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black text-sm py-3.5 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Download size={18} strokeWidth={2.5} />
            <span>Unduh Laporan</span>
            <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-300 ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Opsi Dropdown Format Ekspor */}
          {showExportMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-2 space-y-1">
                <button onClick={() => handleExport('pdf')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                  <FileText size={18} className="text-red-500" /> Unduh format PDF
                </button>
                <button onClick={() => handleExport('excel')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-bta-green rounded-xl transition-colors">
                  <FileSpreadsheet size={18} className="text-bta-green" /> Unduh format Excel
                </button>
                <button onClick={() => handleExport('word')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                  <FileWord size={18} className="text-blue-500" /> Unduh format Word
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Area Multi-Filter Dropdown */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-5">
        <div className="flex items-center gap-2 text-sm font-black text-bta-green border-b border-gray-100 pb-3">
          <Filter size={18} />
          Filter & Pencarian Laporan Spesifik
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Kolom Pencarian Teks */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              <Search size={16} />
            </span>
            <input 
              type="text"
              placeholder="Cari Nama/NIM/Sertifikat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-700 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* 2. Filter Fakultas */}
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

          {/* 3. Filter Prodi */}
          <select 
            value={filterProdi} 
            onChange={(e) => setFilterProdi(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green cursor-pointer appearance-none transition-all"
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
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green cursor-pointer appearance-none transition-all"
          >
            <option value="">Semua Tingkat MQ</option>
            <option value="MQ 1">Tingkat MQ 1</option>
            <option value="MQ 2">Tingkat MQ 2</option>
          </select>

          {/* 5. Filter Status Lulus */}
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green cursor-pointer appearance-none transition-all"
          >
            <option value="">Semua Status Hasil</option>
            <option value="Lulus">Lulus</option>
            <option value="Tidak Lulus">Tidak Lulus (Mengulang)</option>
          </select>
        </div>
      </div>

      {/* Tabel Master Data Komprehensif */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Identitas Mahasiswa</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Fakultas & Prodi</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Tingkat MQ</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Kehadiran</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Nilai Akhir</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Status Validasi</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Nomor Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search size={32} className="text-gray-300" />
                      <p>Tidak ada data laporan yang cocok dengan kombinasi filter Anda.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors duration-150">
                    
                    {/* Identitas */}
                    <td className="p-5">
                      <div className="font-bold text-gray-800">{item.nama}</div>
                      <div className="text-xs text-gray-400 font-mono mt-1">{item.nim}</div>
                    </td>
                    
                    {/* Akademik */}
                    <td className="p-5">
                      <div className="font-bold text-gray-700">{item.fakultas}</div>
                      <div className="text-xs text-gray-500 font-medium mt-1">{item.prodi}</div>
                    </td>
                    
                    {/* MQ & Tes Awal digabung untuk kebersihan */}
                    <td className="p-5 text-center">
                      <div className="font-black text-bta-green text-lg">{item.tingkatMQ}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pre-Test: {item.nilaiAwal}</div>
                    </td>

                    {/* Kehadiran */}
                    <td className="p-5 text-center">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest border border-gray-200 inline-block">
                        {item.kehadiran}
                      </span>
                    </td>

                    {/* Nilai Akhir */}
                    <td className="p-5 text-center">
                      <span className="text-xl font-black text-gray-800">
                        {item.nilaiAkhir}
                      </span>
                    </td>
                    
                    {/* Status Lulus/Gagal */}
                    <td className="p-5 text-center">
                      {item.status === "Lulus" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                          <CheckCircle2 size={14} />
                          Lulus
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-50 text-red-600 border border-red-200">
                          <XCircle size={14} />
                          Tidak Lulus
                        </span>
                      )}
                    </td>

                    {/* No Sertifikat */}
                    <td className="p-5">
                      {item.noSertifikat !== "-" ? (
                        <span className="font-mono text-xs font-bold text-gray-600 bg-gray-50 px-3 py-2 border border-gray-200 rounded-lg inline-block">
                          {item.noSertifikat}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 font-bold italic bg-gray-50 px-3 py-2 border border-gray-100 rounded-lg inline-block">Menunggu Terbit</span>
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
      <div className="mt-4 flex justify-between items-center text-xs font-bold text-gray-400 px-4">
        <span>Menampilkan {filteredData.length} baris data tervalidasi.</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-bta-green animate-pulse"></span>
          Sinkronisasi Database Aktif
        </span>
      </div>
    </div>
  );
};

export default PelaporanDanEkspor;