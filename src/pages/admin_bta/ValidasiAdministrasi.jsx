import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Search, 
  Eye, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Filter
} from 'lucide-react';

const ValidasiAdministrasi = () => {
  // State data dummy mahasiswa yang mengunggah bukti pembayaran
  const [students, setStudents] = useState([
    {
      id: 1,
      nim: "202601002",
      nama: "Ahmad Maufur",
      prodi: "S1 Informatika",
      tanggalUpload: "07 Juli 2026 - 10:15",
      status: "Menunggu Validasi",
      buktiBayar: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop", // contoh gambar struk
      tipeFile: "image"
    },
    {
      id: 2,
      nim: "202602015",
      nama: "Siti Aminah",
      prodi: "S1 Pendidikan Agama Islam",
      tanggalUpload: "07 Juli 2026 - 09:30",
      status: "Menunggu Validasi",
      buktiBayar: "dokumen_transfer_siti.pdf", // simulasi PDF
      tipeFile: "pdf"
    },
    {
      id: 3,
      nim: "202601044",
      nama: "Muhammad Rizqi",
      prodi: "S1 Sistem Informasi",
      tanggalUpload: "06 Juli 2026 - 16:45",
      status: "Menunggu Validasi",
      buktiBayar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      tipeFile: "image"
    }
  ]);

  // State untuk pencarian, filter, dan modal preview
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [studentToReject, setStudentToReject] = useState(null);

  // Filter data berdasarkan input pencarian
  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm)
  );

  // Aksi Setuju / Approve
  const handleApprove = (id, nama) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status: "Tervalidasi" } : student
    ));
    alert(`Sukses memvalidasi pembayaran atas nama ${nama}. Akses web MQ telah dibuka.`);
  };

  // Membuka modal penolakan
  const openRejectModal = (student) => {
    setStudentToReject(student);
    setShowRejectModal(true);
  };

  // Aksi Tolak / Minta Revisi (Submit dari Modal)
  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      alert("Silakan masukkan alasan penolakan/revisi terlebih dahulu.");
      return;
    }
    setStudents(students.map(student => 
      student.id === studentToReject.id ? { ...student, status: "Ditolak / Butuh Revisi" } : student
    ));
    alert(`Pembayaran ${studentToReject.nama} ditolak dengan alasan: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason("");
    setStudentToReject(null);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Validasi Administrasi Pendaftaran</h1>
        <p className="text-sm text-slate-500 mt-1">
          Periksa bukti pembayaran administrasi BTA (Rp100.000) mahasiswa baru untuk membuka gerbang akses aplikasi.
        </p>
      </div>

      {/* Toolbar Pencarian & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari nama atau NIM mahasiswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-slate-700 placeholder-slate-400 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm self-end md:self-auto">
          <Filter size={14} />
          <span>Status: Menunggu Validasi ({filteredStudents.filter(s => s.status === "Menunggu Validasi").length})</span>
        </div>
      </div>

      {/* Tabel Utama */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-sm font-semibold">
                <th className="p-4 rounded-tl-2xl">Mahasiswa</th>
                <th className="p-4">Program Studi</th>
                <th className="p-4">Waktu Unggah</th>
                <th className="p-4 text-center">Bukti Slip</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center rounded-tr-2xl w-56">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-medium">
                    Tidak ada antrean administrasi pendaftaran saat ini.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    {/* Kolom Mahasiswa */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{student.nama}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{student.nim}</div>
                    </td>
                    
                    {/* Kolom Prodi */}
                    <td className="p-4 text-slate-600 font-medium">
                      {student.prodi}
                    </td>
                    
                    {/* Kolom Waktu */}
                    <td className="p-4 text-xs text-slate-500">
                      {student.tanggalUpload}
                    </td>
                    
                    {/* Kolom Bukti Slip (Pratinjau Mini) */}
                    <td className="p-4">
                      <div className="flex justify-center">
                        {student.tipeFile === 'image' ? (
                          <div 
                            onClick={() => setSelectedStudent(student)}
                            className="relative group w-14 h-14 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 cursor-pointer shadow-sm"
                          >
                            <img src={student.buktiBayar} alt="Struk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Eye size={14} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => setSelectedStudent(student)}
                            className="group flex flex-col items-center justify-center w-14 h-14 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 cursor-pointer shadow-sm hover:bg-rose-100 transition-colors"
                          >
                            <FileText size={20} />
                            <span className="text-[9px] font-bold tracking-tight mt-0.5">PDF</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Kolom Status */}
                    <td className="p-4">
                      {student.status === "Menunggu Validasi" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Menunggu Validasi
                        </span>
                      )}
                      {student.status === "Tervalidasi" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <CheckCircle size={12} />
                          Tervalidasi
                        </span>
                      )}
                      {student.status === "Ditolak / Butuh Revisi" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                          <XCircle size={12} />
                          Butuh Revisi
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi */}
                    <td className="p-4 text-center">
                      {student.status === "Menunggu Validasi" ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleApprove(student.id, student.nama)}
                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-1.5 px-3 rounded-lg shadow-sm transition-colors"
                          >
                            <Check size={14} />
                            <span>Validasi / Approve</span>
                          </button>
                          <button
                            onClick={() => openRejectModal(student)}
                            className="flex items-center gap-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-xs py-1.5 px-3 rounded-lg transition-colors"
                          >
                            <X size={14} />
                            <span>Tolak</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Sudah Diproses</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Pratinjau Besar (Preview Bukti Bayar) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800">Bukti Pembayaran</h3>
                <p className="text-xs text-slate-500">{selectedStudent.nama} ({selectedStudent.nim})</p>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 bg-slate-100 flex items-center justify-center min-h-[300px]">
              {selectedStudent.tipeFile === 'image' ? (
                <img 
                  src={selectedStudent.buktiBayar} 
                  alt="Bukti Transfer Besar" 
                  className="max-h-[450px] object-contain rounded-lg shadow-md border border-white"
                />
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full text-center flex flex-col items-center">
                  <div className="p-4 bg-rose-50 text-rose-600 rounded-full mb-3">
                    <FileText size={40} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{selectedStudent.buktiBayar}</h4>
                  <p className="text-xs text-slate-500 mb-4">Simulasi Dokumen Struk Transfer Transfer_Rp100000.pdf</p>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 font-medium">
                    Dokumen PDF Valid untuk Validasi Luring
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Form Alasan Penolakan / Minta Revisi */}
      {showRejectModal && studentToReject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 bg-rose-50 flex items-center gap-2 text-rose-800">
              <AlertCircle size={20} />
              <h3 className="font-bold">Konfirmasi Tolak / Minta Revisi</h3>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-slate-600 mb-3">
                Berikan alasan penolakan berkas untuk mahasiswa <strong>{studentToReject.nama}</strong> agar mereka tahu bagian mana yang harus diperbaiki.
              </p>
              <textarea
                rows="4"
                placeholder="Contoh: Gambar bukti transfer buram/pecah, nominal transfer kurang dari Rp100.000, atau bukti transfer terindikasi palsu..."
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

export default ValidasiAdministrasi;