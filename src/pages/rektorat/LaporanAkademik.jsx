import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  AlertTriangle,
  ChevronDown,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

const LaporanAkademik = () => {
  // Master Data
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

  // Logika Filter
  const filteredData = masterData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.nim.includes(searchTerm);
    const matchFakultas = filterFakultas ? item.fakultas === filterFakultas : true;
    const matchProdi = filterProdi ? item.prodi === filterProdi : true;
    return matchSearch && matchFakultas && matchProdi;
  });

  // Kalkulasi rangkuman mahasiswa tidak lulus per prodi
  const failedStats = useMemo(() => {
    return filteredData.reduce((acc, curr) => {
      if (curr.status === "Tidak Lulus") {
        acc[curr.prodi] = (acc[curr.prodi] || 0) + 1;
      }
      return acc;
    }, {});
  }, [filteredData]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Akademik & Kelulusan</h1>
          <p className="text-sm text-slate-500 mt-1">Pemantauan performa akademik tingkat fakultas dan program studi.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition"
          >
            <Download size={18} /> Unduh Laporan Akademik
          </button>
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 z-10 overflow-hidden">
              <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2"><FileText size={16}/> PDF</button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2"><FileSpreadsheet size={16}/> Excel</button>
            </div>
          )}
        </div>
      </div>

      {/* Rangkuman Evaluasi (Stats Card) */}
      <div className="mb-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-rose-500" /> Evaluasi: Jumlah Mahasiswa Tidak Lulus per Prodi
        </h3>
        <div className="flex flex-wrap gap-4">
          {Object.keys(failedStats).length > 0 ? (
            Object.entries(failedStats).map(([prodi, count]) => (
              <div key={prodi} className="bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl">
                <p className="text-xs text-rose-600 font-bold uppercase">{prodi}</p>
                <p className="text-xl font-black text-rose-900">{count} Mahasiswa</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic">Tidak ada mahasiswa yang tidak lulus pada kriteria ini.</p>
          )}
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={16} />
          <input type="text" placeholder="Cari NIM/Nama..." className="w-full pl-10 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" onChange={(e) => setFilterFakultas(e.target.value)}>
          <option value="">Semua Fakultas</option>
          <option value="Ilmu Pendidikan">Ilmu Pendidikan</option>
          <option value="Ekonomi dan Bisnis">Ekonomi dan Bisnis</option>
          <option value="Teknologi Informasi">Teknologi Informasi</option>
        </select>
        <select className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" onChange={(e) => setFilterProdi(e.target.value)}>
          <option value="">Semua Prodi</option>
          <option value="Pendidikan Agama Islam">Pendidikan Agama Islam</option>
          <option value="PGMI">PGMI</option>
          <option value="Manajemen">Manajemen</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
        </select>
        <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-sm text-slate-700">
           <Filter size={16} /> Reset Filter
        </button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900 text-white text-xs uppercase">
              <th className="p-4">NIM</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Fakultas</th>
              <th className="p-4">Prodi</th>
              <th className="p-4 text-center">Nilai Akhir</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredData.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono">{m.nim}</td>
                <td className="p-4 font-semibold">{m.nama}</td>
                <td className="p-4">{m.fakultas}</td>
                <td className="p-4">{m.prodi}</td>
                <td className="p-4 text-center font-bold">{m.nilaiAkhir}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.status === 'Lulus' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanAkademik;