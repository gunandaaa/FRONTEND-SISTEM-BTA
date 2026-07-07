import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  CheckSquare, 
  Search, 
  Award, 
  AlertTriangle,
  FileBadge,
  User
} from 'lucide-react';

const PengesahanKelulusan = () => {
  // Data dummy mahasiswa yang nilainya sudah divalidasi oleh staf
  const [students, setStudents] = useState([
    {
      id: 1,
      nim: "202601001",
      nama: "Rifqi Al-Faruq",
      kelas: "MQ 2 - A",
      tutor: "Ustadz Muhammad Ali",
      nilaiAkhir: 88,
      hurufMutu: "A",
      status: "Menunggu Pengesahan"
    },
    {
      id: 2,
      nim: "202601002",
      nama: "Ahmad Maufur",
      kelas: "MQ 2 - A",
      tutor: "Ustadz Muhammad Ali",
      nilaiAkhir: 75,
      hurufMutu: "B+",
      status: "Menunggu Pengesahan"
    },
    {
      id: 3,
      nim: "202602015",
      nama: "Siti Aminah",
      kelas: "MQ 1 - C",
      tutor: "Ustadzah Siti Aminah",
      nilaiAkhir: 92,
      hurufMutu: "A",
      status: "Disahkan" // Contoh yang sudah disahkan
    },
    {
      id: 4,
      nim: "202603009",
      nama: "Zainal Abidin",
      kelas: "MQ 1 - C",
      tutor: "Ustadzah Siti Aminah",
      nilaiAkhir: 45,
      hurufMutu: "E",
      status: "Menunggu Pengesahan" // Contoh anomali nilai yang mungkin dikembalikan
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter pencarian
  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm) ||
    student.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Aksi 1: Sahkan Kelulusan Individu
  const handleApproveSingle = (id, nama) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status: "Disahkan" } : student
    ));
    alert(`Kelulusan atas nama ${nama} berhasil disahkan. Sistem sekarang mengizinkan mahasiswa tersebut untuk mengunduh sertifikat.`);
  };

  // Aksi 2: Sahkan Semua Nilai (Massal)
  const handleApproveAll = () => {
    const pendingCount = students.filter(s => s.status === "Menunggu Pengesahan").length;
    
    if (pendingCount === 0) {
      alert("Tidak ada data yang perlu disahkan saat ini.");
      return;
    }

    if (window.confirm(`Anda yakin ingin mengesahkan ${pendingCount} data kelulusan secara massal?`)) {
      setStudents(students.map(student => 
        student.status === "Menunggu Pengesahan" ? { ...student, status: "Disahkan" } : student
      ));
      alert(`${pendingCount} data kelulusan berhasil disahkan serentak.`);
    }
  };

  // Membuka modal penolakan (Kembalikan ke Staf)
  const openRejectModal = (student) => {
    setSelectedStudent(student);
    setShowRejectModal(true);
  };

  // Aksi 3: Submit Kembalikan ke Staf
  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      alert("Silakan masukkan alasan pengembalian data.");
      return;
    }

    setStudents(students.map(student => 
      student.id === selectedStudent.id ? { ...student, status: "Dikembalikan ke Staf" } : student
    ));
    
    alert(`Data kelulusan ${selectedStudent.nama} dikembalikan ke Staf dengan catatan: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedStudent(null);
  };

  // Fungsi untuk memberi warna badge berdasarkan huruf mutu
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (grade.startsWith('C')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-rose-100 text-rose-800 border-rose-200'; // D atau E
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pengesahan Kelulusan (Validasi Akhir)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Periksa dan sahkan nilai akhir mahasiswa. Persetujuan Anda akan menerbitkan sertifikat kelulusan secara otomatis.
          </p>
        </div>
        
        {/* Tombol Setuju Massal */}
        <button 
          onClick={handleApproveAll}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-colors shrink-0"
        >
          <CheckSquare size={18} />
          <span>Sahkan Semua Nilai</span>
        </button>
      </div>

      {/* Toolbar Pencarian */}
      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari berdasarkan Nama, NIM, atau Kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-slate-700 shadow-sm"
          />
        </div>
      </div>

      {/* Tabel Data Kelulusan */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-sm font-semibold">
                <th className="p-4 rounded-tl-2xl">Data Mahasiswa</th>
                <th className="p-4">Kelas & Tutor</th>
                <th className="p-4 text-center">Nilai Akhir</th>
                <th className="p-4 text-center">Huruf Mutu</th>
                <th className="p-4 text-center">Status Validasi</th>
                <th className="p-4 text-center rounded-tr-2xl w-48">Aksi Pengesahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-medium">
                    Tidak ada data kelulusan yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    {/* Kolom Mahasiswa */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        {student.nama}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-1 ml-5">{student.nim}</div>
                    </td>
                    
                    {/* Kolom Kelas & Tutor */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{student.kelas}</div>
                      <div className="text-xs text-slate-500 mt-1">{student.tutor}</div>
                    </td>

                    {/* Kolom Nilai Akhir */}
                    <td className="p-4 text-center">
                      <span className="text-lg font-black text-slate-800">{student.nilaiAkhir}</span>
                    </td>

                    {/* Kolom Huruf Mutu */}
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg border shadow-sm ${getGradeColor(student.hurufMutu)}`}>
                        {student.hurufMutu}
                      </span>
                    </td>
                    
                    {/* Kolom Status */}
                    <td className="p-4 text-center">
                      {student.status === "Menunggu Pengesahan" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Menunggu
                        </span>
                      )}
                      {student.status === "Disahkan" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <FileBadge size={12} />
                          Disahkan
                        </span>
                      )}
                      {student.status === "Dikembalikan ke Staf" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                          <XCircle size={12} />
                          Dikembalikan
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi */}
                    <td className="p-4 text-center">
                      {student.status === "Menunggu Pengesahan" ? (
                        <div className="flex flex-col gap-2 justify-center">
                          <button
                            onClick={() => handleApproveSingle(student.id, student.nama)}
                            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-1.5 px-3 rounded-lg shadow-sm transition-colors"
                          >
                            <CheckCircle size={14} />
                            <span>Sahkan Kelulusan</span>
                          </button>
                          <button
                            onClick={() => openRejectModal(student)}
                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-xs py-1.5 px-3 rounded-lg transition-colors"
                          >
                            <AlertTriangle size={14} />
                            <span>Kembalikan</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium italic">Selesai Diproses</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Kembalikan ke Staf */}
      {showRejectModal && selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 bg-rose-50 flex items-center gap-2 text-rose-800">
              <AlertTriangle size={20} />
              <h3 className="font-bold">Kembalikan Data ke Staf</h3>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Anda akan mengembalikan data kelulusan <strong>{selectedStudent.nama}</strong> ({selectedStudent.nim}). Silakan berikan catatan untuk Staf agar mereka dapat mengecek ulang anomali nilai ini.
              </p>
              
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Catatan / Alasan</label>
              <textarea
                rows="3"
                placeholder="Contoh: Nilai akhir 45 terlalu rendah tanpa ada keterangan, mohon cek ulang rekapan tutor..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-rose-500 placeholder-slate-400 shadow-inner"
              />
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button 
                onClick={() => { setShowRejectModal(false); setRejectReason(""); }}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
              <button 
                onClick={handleRejectSubmit}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Kirim Penolakan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengesahanKelulusan;