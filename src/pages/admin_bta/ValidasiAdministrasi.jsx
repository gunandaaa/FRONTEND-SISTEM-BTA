import React, { useState, useEffect } from 'react';
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
// IMPORT AXIOS
import axiosInstance from '../../api/axios';

const ValidasiAdministrasi = () => {
  // STATE MASTER
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // STATE MODAL
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [studentToReject, setStudentToReject] = useState(null);

  // URL BASE UNTUK MENGAKSES FILE STORAGE DARI LARAVEL
  const STORAGE_URL = 'http://localhost:8000/storage/';

  // ==========================================
  // READ: FETCH DATA ANTREAN
  // ==========================================
  const fetchAntrean = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/api/admin/antrean-slip');
      setStudents(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data antrean:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAntrean();
  }, []);

  // Filter pencarian nama / NIM
  const filteredStudents = students.filter(student => {
    const nama = student.mahasiswa?.user?.name || "";
    const nim = student.mahasiswa?.nim || "";
    return nama.toLowerCase().includes(searchTerm.toLowerCase()) || nim.includes(searchTerm);
  });

  // ==========================================
  // UPDATE: APPROVE / TOLAK PEMBAYARAN
  // ==========================================
  const handleApprove = async (id, nama) => {
    if(window.confirm(`Validasi (Setujui) pembayaran atas nama ${nama}?`)) {
      try {
        await axiosInstance.put(`/api/admin/validasi-slip/${id}`, {
          status_validasi: 'Valid'
        });
        alert(`Sukses memvalidasi pembayaran atas nama ${nama}. Akses web MQ telah dibuka.`);
        fetchAntrean(); // Segarkan tabel
      } catch (error) {
        console.error("Gagal menyetujui:", error);
        alert("Gagal melakukan validasi.");
      }
    }
  };

  const openRejectModal = (student) => {
    setStudentToReject(student);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("Silakan masukkan alasan penolakan/revisi terlebih dahulu.");
      return;
    }
    
    try {
      // Backend saat ini hanya butuh status_validasi, tetapi ke depannya alasan revisi bisa ditambahkan di backend
      await axiosInstance.put(`/api/admin/validasi-slip/${studentToReject.id}`, {
        status_validasi: 'Ditolak'
      });
      alert(`Pembayaran ${studentToReject.mahasiswa?.user?.name} berhasil ditolak.`);
      setShowRejectModal(false);
      setRejectReason("");
      setStudentToReject(null);
      fetchAntrean(); // Segarkan tabel
    } catch (error) {
      console.error("Gagal menolak:", error);
      alert("Gagal melakukan penolakan.");
    }
  };

  // ==========================================
  // HELPER UNTUK CEK TIPE FILE & FORMAT TANGGAL
  // ==========================================
  const isImage = (filename) => {
    if (!filename) return false;
    return filename.match(/\.(jpeg|jpg|png|gif)$/i) != null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // ==========================================
  // TAMPILAN UI/UX
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
            Periksa bukti pembayaran administrasi BTA (Rp100.000) mahasiswa baru.
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
          <span>Antrean Menunggu: <strong className="text-bta-green text-sm">{students.filter(s => s.status_validasi === "Pending").length}</strong></span>
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
              {isLoading ? (
                 <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bta-green"></div>
                      <p>Memuat antrean dari server...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                     <div className="flex flex-col items-center justify-center space-y-3">
                        <CheckCircle size={40} className="text-gray-200" />
                        <p>Tidak ada data pembayaran sesuai pencarian.</p>
                     </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition-colors duration-150 group">
                    
                    {/* Kolom Mahasiswa */}
                    <td className="p-5">
                      <div className="font-bold text-gray-800">{student.mahasiswa?.user?.name || '-'}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{student.mahasiswa?.nim || '-'}</div>
                    </td>
                    
                    {/* Kolom Prodi */}
                    <td className="p-5 text-gray-600 font-semibold">
                      {student.mahasiswa?.program_studi || '-'}
                    </td>
                    
                    {/* Kolom Waktu */}
                    <td className="p-5">
                      <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                        {formatDate(student.created_at)}
                      </span>
                    </td>
                    
                    {/* Kolom Pratinjau Mini Bukti */}
                    <td className="p-5">
                      <div className="flex justify-center">
                        {isImage(student.file_slip_pembayaran) ? (
                          <div 
                            onClick={() => setSelectedStudent(student)}
                            className="relative group/img w-14 h-14 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-100 cursor-pointer shadow-sm hover:border-bta-green hover:shadow-md transition-all duration-300"
                            title="Klik untuk memperbesar bukti"
                          >
                            <img src={`${STORAGE_URL}${student.file_slip_pembayaran}`} alt="Struk Transfer" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-bta-green/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                              <Eye size={18} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => setSelectedStudent(student)}
                            className="flex flex-col items-center justify-center w-14 h-14 bg-bta-yellow/20 text-yellow-700 rounded-xl border-2 border-transparent cursor-pointer shadow-sm hover:border-bta-yellow hover:bg-bta-yellow/30 transition-all duration-300"
                            title="Klik untuk melihat dokumen"
                          >
                            <FileText size={20} />
                            <span className="text-[9px] font-black tracking-widest mt-1 uppercase">PDF</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Kolom Status (Sesuai Enum Backend) */}
                    <td className="p-5">
                      {student.status_validasi === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                          Menunggu
                        </span>
                      )}
                      {student.status_validasi === "Valid" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                          <CheckCircle size={14} />
                          Tervalidasi
                        </span>
                      )}
                      {student.status_validasi === "Ditolak" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-50 text-red-600 border border-red-200">
                          <XCircle size={14} />
                          Ditolak
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi Eksekusi */}
                    <td className="p-5 text-center">
                      {student.status_validasi === "Pending" ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleApprove(student.id, student.mahasiswa?.user?.name)}
                            className="flex items-center justify-center gap-1 bg-bta-green hover:bg-green-900 text-white font-black text-[11px] uppercase tracking-wider py-2 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(7,69,38,0.39)] hover:shadow-lg transition-all hover:-translate-y-0.5"
                          >
                            <Check size={14} strokeWidth={3} /> Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(student)}
                            className="flex items-center justify-center gap-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-[11px] uppercase tracking-wider py-2 px-3 rounded-xl transition-colors"
                          >
                            <X size={14} strokeWidth={3} /> Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-bold italic bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 inline-block">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: PRATINJAU BUKTI BAYAR */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-transparent max-w-2xl w-full flex flex-col items-center">
            
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                <h3 className="font-black text-white text-lg drop-shadow-md">Pratinjau Dokumen</h3>
                <p className="text-xs font-medium text-bta-yellow">{selectedStudent.mahasiswa?.user?.name} <span className="text-white/60">({selectedStudent.mahasiswa?.nim})</span></p>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="w-10 h-10 bg-white/10 hover:bg-red-500 backdrop-blur-md rounded-full text-white flex items-center justify-center border border-white/20 transition-all shadow-lg"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="w-full bg-white rounded-3xl p-2 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
              {isImage(selectedStudent.file_slip_pembayaran) ? (
                <div className="bg-gray-100 rounded-2xl overflow-hidden flex justify-center p-2">
                  <img 
                    src={`${STORAGE_URL}${selectedStudent.file_slip_pembayaran}`} 
                    alt="Bukti Transfer" 
                    className="max-h-[60vh] object-contain rounded-xl shadow-sm border border-white"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-12 rounded-2xl border border-gray-100 w-full text-center flex flex-col items-center justify-center min-h-[300px]">
                  <div className="p-6 bg-bta-yellow/20 text-yellow-600 rounded-full mb-4 shadow-inner border border-bta-yellow/30">
                    <FileText size={48} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-6">Ini adalah dokumen PDF. Untuk melihat secara penuh, silakan buka link di bawah:</p>
                  <a 
                    href={`${STORAGE_URL}${selectedStudent.file_slip_pembayaran}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-bta-green text-white hover:bg-green-800 px-6 py-3 rounded-xl shadow-md font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                  >
                    Buka Dokumen PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FORM PENOLAKAN */}
      {showRejectModal && studentToReject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            <div className="p-6 bg-red-600 flex items-center justify-between relative overflow-hidden">
               <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
               <h3 className="font-black text-white text-lg flex items-center gap-2 relative z-10">
                 <AlertCircle size={20} className="text-bta-yellow" />
                 Konfirmasi Tolak Berkas
               </h3>
               <button onClick={() => { setShowRejectModal(false); setRejectReason(""); }} className="text-white/60 hover:text-white transition-colors relative z-10">
                 <X size={24} />
               </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-4 leading-relaxed bg-red-50 p-4 rounded-xl border border-red-100">
                Berikan catatan spesifik mengapa bukti transfer milik <strong className="text-gray-900">{studentToReject.mahasiswa?.user?.name}</strong> ditolak. (Note: Data ini nantinya akan bisa disimpan setelah update backend selesai).
              </p>
              
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Alasan Penolakan</label>
              <textarea
                rows="4"
                placeholder="Contoh: Bukti transfer terpotong, tidak menampilkan tanggal..."
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
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Tolak Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiAdministrasi;