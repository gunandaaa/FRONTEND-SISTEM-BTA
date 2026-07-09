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
      status: "Disahkan"
    },
    {
      id: 4,
      nim: "202603009",
      nama: "Zainal Abidin",
      kelas: "MQ 1 - C",
      tutor: "Ustadzah Siti Aminah",
      nilaiAkhir: 45,
      hurufMutu: "E",
      status: "Menunggu Pengesahan"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm) ||
    student.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveSingle = (id, nama) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status: "Disahkan" } : student
    ));
    alert(`Kelulusan atas nama ${nama} berhasil disahkan. Sistem sekarang mengizinkan mahasiswa tersebut untuk mengunduh sertifikat.`);
  };

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

  const openRejectModal = (student) => {
    setSelectedStudent(student);
    setShowRejectModal(true);
  };

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

  // Kalibrasi string kelas warna Tailwind untuk konsistensi palet BTA
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-50 text-bta-green border-bta-green/20';
    if (grade.startsWith('B')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (grade.startsWith('C')) return 'bg-orange-50 text-orange-600 border-orange-200';
    return 'bg-red-50 text-red-600 border-red-200';
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight">Pengesahan Kelulusan</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Periksa dan sahkan nilai akhir mahasiswa secara kolektif. Persetujuan Anda akan menerbitkan nomor sertifikat resmi.
          </p>
        </div>
        
        {/* Tombol Aksi Massal */}
        <button 
          onClick={handleApproveAll}
          className="inline-flex items-center justify-center gap-2 bg-bta-green hover:bg-green-900 text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shrink-0 w-full sm:w-auto"
        >
          <CheckSquare size={18} strokeWidth={2.5} />
          <span>Sahkan Semua Nilai</span>
        </button>
      </div>

      {/* Toolbar Alat Pencarian */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center max-w-md">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari berdasarkan Nama, NIM, atau Kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-700 transition-all"
          />
        </div>
      </div>

      {/* Kontainer Tabel Utama */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Identitas Mahasiswa</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Kelas & Tutor</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Nilai Akhir</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Mutu</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Status Validasi</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-56">Otorisasi Kelulusan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search size={32} className="text-gray-300" />
                      <p>Tidak ada rekapan data kelulusan yang ditemukan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    
                    {/* Kolom Informasi Siswa */}
                    <td className="p-5">
                      <div className="text-gray-800 font-bold flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <User size={14} />
                        </div>
                        {student.nama}
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-1 ml-9">{student.nim}</div>
                    </td>
                    
                    {/* Kolom Kelas */}
                    <td className="p-5">
                      <div className="text-gray-800 font-bold">{student.kelas}</div>
                      <div className="text-xs text-gray-400 mt-1 font-semibold">{student.tutor}</div>
                    </td>

                    {/* Kolom Nilai */}
                    <td className="p-5 text-center">
                      <span className="text-lg font-black text-bta-green">{student.nilaiAkhir}</span>
                    </td>

                    {/* Kolom Huruf Mutu */}
                    <td className="p-5 text-center">
                      <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-black text-sm border shadow-sm ${getGradeColor(student.hurufMutu)}`}>
                        {student.hurufMutu}
                      </span>
                    </td>
                    
                    {/* Kolom Indikator Status */}
                    <td className="p-5 text-center">
                      {student.status === "Menunggu Pengesahan" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                          Menunggu
                        </span>
                      )}
                      {student.status === "Disahkan" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                          <FileBadge size={12} />
                          Disahkan
                        </span>
                      )}
                      {student.status === "Dikembalikan ke Staf" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-50 text-red-600 border border-red-200">
                          <XCircle size={12} />
                          Dikembalikan
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi Eksekutif */}
                    <td className="p-5">
                      {student.status === "Menunggu Pengesahan" ? (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleApproveSingle(student.id, student.nama)}
                            className="flex items-center justify-center gap-1.5 bg-bta-green hover:bg-green-900 text-white font-black text-xs py-2 px-3 rounded-xl shadow-sm transition-colors"
                          >
                            <CheckCircle size={14} />
                            <span>Sahkan Kelulusan</span>
                          </button>
                          <button
                            onClick={() => openRejectModal(student)}
                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs py-2 px-3 rounded-xl transition-all"
                          >
                            <AlertTriangle size={14} />
                            <span>Kembalikan ke Staf</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-xs text-gray-400 font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">Selesai Diproses</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PENOLAKAN / PENGEMBALIAN DATA */}
      {showRejectModal && selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-red-600 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="font-black text-white text-lg relative z-10 flex items-center gap-2">
                <AlertTriangle size={20} className="text-bta-yellow" />
                Evaluasi Data Kelulusan
              </h3>
              <button onClick={() => { setShowRejectModal(false); setRejectReason(""); }} className="text-white/60 hover:text-white transition-colors relative z-10">
                <XCircle size={24} />
              </button>
            </div>
            
            {/* Modal Form */}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-5 font-medium leading-relaxed">
                Anda menolak mengesahkan data kelulusan <strong className="text-gray-800">{selectedStudent.nama}</strong> ({selectedStudent.nim}). Masukkan catatan evaluasi agar Staf Administrasi dapat meninjau kembali anomali nilai ini.
              </p>
              
              <label className="block text-xs font-black text-bta-green uppercase tracking-wider mb-2">Catatan Evaluasi / Alasan</label>
              <textarea
                rows="4"
                placeholder="Contoh: Harap verifikasi ulang komponen nilai Tahsin dengan tutor, terdapat perbedaan input data rekapan..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-400 transition-all"
              />
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-3xl">
              <button 
                onClick={() => { setShowRejectModal(false); setRejectReason(""); }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleRejectSubmit}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Kirim ke Staf
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengesahanKelulusan;