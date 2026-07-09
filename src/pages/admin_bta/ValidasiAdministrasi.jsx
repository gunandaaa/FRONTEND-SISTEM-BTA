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
  Filter,
  CreditCard
} from 'lucide-react';

const ValidasiAdministrasi = () => {
  // ==========================================
  // LOGIKA & DATA DUMMY GUNANDA (TIDAK DISENTUH)
  // ==========================================
  const [students, setStudents] = useState([
    {
      id: 1,
      nim: "202601002",
      nama: "Ahmad Maufur",
      prodi: "S1 Informatika",
      tanggalUpload: "07 Juli 2026 - 10:15",
      status: "Menunggu Validasi",
      buktiBayar: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop", 
      tipeFile: "image"
    },
    {
      id: 2,
      nim: "202602015",
      nama: "Siti Aminah",
      prodi: "S1 Pendidikan Agama Islam",
      tanggalUpload: "07 Juli 2026 - 09:30",
      status: "Menunggu Validasi",
      buktiBayar: "dokumen_transfer_siti.pdf", 
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [studentToReject, setStudentToReject] = useState(null);

  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm)
  );

  const handleApprove = (id, nama) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status: "Tervalidasi" } : student
    ));
    alert(`Sukses memvalidasi pembayaran atas nama ${nama}. Akses web MQ telah dibuka.`);
  };

  const openRejectModal = (student) => {
    setStudentToReject(student);
    setShowRejectModal(true);
  };

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
              <CreditCard size={24} />
            </div>
            Validasi Administrasi Pendaftaran
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Periksa bukti pembayaran administrasi BTA (Rp100.000) mahasiswa baru untuk membuka gerbang akses kelas MQ.
          </p>
        </div>
      </div>

      {/* TOOLBAR PENCARIAN & FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari nama atau NIM mahasiswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-700 placeholder:text-gray-400 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-gray-600 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl self-start md:self-auto w-full md:w-auto uppercase tracking-wider">
          <Filter size={14} className="text-bta-green" />
          <span>Antrean Menunggu: <strong className="text-bta-green text-sm">{filteredStudents.filter(s => s.status === "Menunggu Validasi").length}</strong></span>
        </div>
      </div>

      {/* TABEL UTAMA ANTRIAN */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Identitas Mahasiswa</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Program Studi</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Waktu Unggah</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Bukti Transfer</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Status Validasi</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-56">Tindakan Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                     <div className="flex flex-col items-center justify-center space-y-3">
                        <CheckCircle size={40} className="text-gray-200" />
                        <p>Tidak ada antrean validasi pembayaran saat ini.</p>
                     </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition-colors duration-150 group">
                    
                    {/* Kolom Mahasiswa */}
                    <td className="p-5">
                      <div className="font-bold text-gray-800">{student.nama}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{student.nim}</div>
                    </td>
                    
                    {/* Kolom Prodi */}
                    <td className="p-5 text-gray-600 font-semibold">
                      {student.prodi}
                    </td>
                    
                    {/* Kolom Waktu */}
                    <td className="p-5">
                      <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                        {student.tanggalUpload}
                      </span>
                    </td>
                    
                    {/* Kolom Pratinjau Mini Bukti */}
                    <td className="p-5">
                      <div className="flex justify-center">
                        {student.tipeFile === 'image' ? (
                          <div 
                            onClick={() => setSelectedStudent(student)}
                            className="relative group/img w-14 h-14 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-100 cursor-pointer shadow-sm hover:border-bta-green hover:shadow-md transition-all duration-300"
                            title="Klik untuk memperbesar bukti"
                          >
                            <img src={student.buktiBayar} alt="Struk Transfer" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-bta-green/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                              <Eye size={18} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => setSelectedStudent(student)}
                            className="flex flex-col items-center justify-center w-14 h-14 bg-bta-yellow/20 text-yellow-700 rounded-xl border-2 border-transparent cursor-pointer shadow-sm hover:border-bta-yellow hover:bg-bta-yellow/30 transition-all duration-300"
                            title="Klik untuk melihat detail PDF"
                          >
                            <FileText size={20} />
                            <span className="text-[9px] font-black tracking-widest mt-1 uppercase">PDF</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Kolom Status */}
                    <td className="p-5">
                      {student.status === "Menunggu Validasi" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                          Menunggu Pengecekan
                        </span>
                      )}
                      {student.status === "Tervalidasi" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                          <CheckCircle size={14} />
                          Tervalidasi
                        </span>
                      )}
                      {student.status === "Ditolak / Butuh Revisi" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-50 text-red-600 border border-red-200">
                          <XCircle size={14} />
                          Butuh Revisi Berkas
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi Eksekusi */}
                    <td className="p-5 text-center">
                      {student.status === "Menunggu Validasi" ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleApprove(student.id, student.nama)}
                            className="flex items-center justify-center gap-1 bg-bta-green hover:bg-green-900 text-white font-black text-[11px] uppercase tracking-wider py-2 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(7,69,38,0.39)] hover:shadow-lg transition-all hover:-translate-y-0.5"
                            title="Setujui Pembayaran"
                          >
                            <Check size={14} strokeWidth={3} />
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(student)}
                            className="flex items-center justify-center gap-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-[11px] uppercase tracking-wider py-2 px-3 rounded-xl transition-colors"
                            title="Tolak Pembayaran"
                          >
                            <X size={14} strokeWidth={3} />
                            Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-bold italic bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 inline-block">Proses Selesai</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: PRATINJAU BUKTI BAYAR (LIGHTBOX STYLE) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-transparent max-w-2xl w-full flex flex-col items-center">
            
            {/* Header Pratinjau Melayang */}
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                <h3 className="font-black text-white text-lg drop-shadow-md">Pratinjau Bukti Transfer</h3>
                <p className="text-xs font-medium text-bta-yellow">{selectedStudent.nama} <span className="text-white/60">({selectedStudent.nim})</span></p>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="w-10 h-10 bg-white/10 hover:bg-red-500 backdrop-blur-md rounded-full text-white flex items-center justify-center border border-white/20 transition-all shadow-lg"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Konten Gambar / PDF */}
            <div className="w-full bg-white rounded-3xl p-2 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
              {selectedStudent.tipeFile === 'image' ? (
                <div className="bg-gray-100 rounded-2xl overflow-hidden flex justify-center p-2">
                  <img 
                    src={selectedStudent.buktiBayar} 
                    alt="Bukti Transfer Mahasiswa" 
                    className="max-h-[60vh] object-contain rounded-xl shadow-sm border border-white"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-12 rounded-2xl border border-gray-100 w-full text-center flex flex-col items-center justify-center min-h-[300px]">
                  <div className="p-6 bg-bta-yellow/20 text-yellow-600 rounded-full mb-4 shadow-inner border border-bta-yellow/30">
                    <FileText size={48} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-black text-gray-800 text-lg mb-1 truncate max-w-md">{selectedStudent.buktiBayar}</h4>
                  <p className="text-sm font-medium text-gray-500 mb-6">Simulasi Pratinjau Dokumen PDF Terlampir</p>
                  <span className="text-xs bg-bta-green/10 text-bta-green px-4 py-2 rounded-xl border border-bta-green/20 font-black uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={14} /> Dokumen Terverifikasi Aman
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FORM PENOLAKAN / REVISI */}
      {showRejectModal && studentToReject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Header Modal Merah */}
            <div className="p-6 bg-red-600 flex items-center justify-between relative overflow-hidden">
               <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
               <h3 className="font-black text-white text-lg flex items-center gap-2 relative z-10">
                 <AlertCircle size={20} className="text-bta-yellow" />
                 Konfirmasi Revisi Berkas
               </h3>
               <button onClick={() => { setShowRejectModal(false); setRejectReason(""); }} className="text-white/60 hover:text-white transition-colors relative z-10">
                 <X size={24} />
               </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-4 leading-relaxed bg-red-50 p-4 rounded-xl border border-red-100">
                Berikan catatan spesifik mengapa bukti transfer milik <strong className="text-gray-900">{studentToReject.nama}</strong> ditolak, agar mahasiswa mengetahui instruksi perbaikannya.
              </p>
              
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Alasan Penolakan</label>
              <textarea
                rows="4"
                placeholder="Contoh: Bukti transfer terpotong, tidak menampilkan tanggal / waktu transaksi..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-gray-400 transition-all"
              />
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
              <button 
                onClick={() => { setShowRejectModal(false); setRejectReason(""); }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleRejectSubmit}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                Kirim Notifikasi Revisi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiAdministrasi;