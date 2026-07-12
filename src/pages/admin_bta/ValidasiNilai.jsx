import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Send, 
  X, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Clock,
  FileCheck2,
  Eye
} from 'lucide-react';
import axiosInstance from "../../api/axios"; // Pastikan path axios kamu benar

const ValidasiNilai = () => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [gradeFiles, setGradeFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State Loading
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Modal Penolakan
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // State Modal Pratinjau Excel
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // ==========================================
  // FUNGSI API BACKEND
  // ==========================================

  // 1. Ambil Data Antrean Nilai
  const fetchAntrean = async () => {
    setIsFetching(true);
    try {
      // Endpoint disesuaikan dengan rute backend kamu
      const response = await axiosInstance.get('/api/admin/antrean-nilai-excel');
      setGradeFiles(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data", error);
      // Fallback Dummy Data sementara API belum siap
      setGradeFiles([
        {
          id: 1, // Anggap ini id tabel antrean
          kelas_id: 101, // Ini parameter $kelas_id yang dibutuhkan controller
          kelas: "Kelas MQ 2 - A",
          tutor: "Ustadz Muhammad Ali, S.Ag",
          waktuUnggah: "07 Juli 2026 - 14:30 WIB",
          namaFile: "Nilai_Akhir_MQ2A_Ali.xlsx",
          file_url: "https://filesamples.com/samples/document/xlsx/sample3.xlsx", // Contoh URL file public
          status: "Menunggu Validasi"
        }
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAntrean();
  }, []);

  // 2. Fungsi Validasi (Sinkron dengan Controller validasiTahapSatu)
  const handleApprove = async (kelas_id, nama_kelas) => {
    setIsSubmitting(true);
    try {
      // Memanggil endpoint sesuai controller validasiTahapSatu
      await axiosInstance.patch(`/api/admin/validasi-tahap-satu/${kelas_id}`);
      
      alert(`Berhasil memvalidasi nilai ${nama_kelas}. Data telah diteruskan ke Kepala Pusat.`);
      fetchAntrean(); // Refresh data antrean
    } catch (error) {
      alert("Gagal memvalidasi nilai: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Fungsi Tolak Berkas
  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      return alert("Silakan masukkan alasan kenapa file ini dikembalikan ke tutor.");
    }
    
    setIsSubmitting(true);
    try {
      // Asumsi endpoint penolakan nilai
      await axiosInstance.patch(`/api/admin/tolak-nilai/${selectedFile.kelas_id}`, {
        alasan: rejectReason
      });
      
      alert(`Dokumen nilai ${selectedFile.kelas} berhasil dikembalikan ke tutor.`);
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedFile(null);
      fetchAntrean();
    } catch (error) {
      alert("Gagal menolak dokumen: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // UTILITIES UI
  // ==========================================

  const filteredFiles = gradeFiles.filter(item => 
    item.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Buka Modal Pratinjau menggunakan Google Docs Viewer
  const handlePreviewExcel = (fileUrl) => {
    if (!fileUrl) return alert("File tidak ditemukan.");
    
    // Konversi URL agar bisa dibaca iframe Google Viewer
    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    setPreviewUrl(googleViewerUrl);
    setShowPreviewModal(true);
  };

  // Unduh normal
  const handleDownload = (fileUrl) => {
    if (!fileUrl) return alert("URL file tidak valid");
    window.open(fileUrl, "_blank");
  };

  const openRejectModal = (item) => {
    setSelectedFile(item);
    setShowRejectModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-10">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <FileCheck2 size={24} />
            </div>
            Validasi Nilai Akhir
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Pintu penyaringan tahap pertama. Pratinjau format file Excel dari Tutor sebelum diteruskan kepada Kepala Pusat.
          </p>
        </div>
      </div>

      {/* TOOLBAR PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari berdasarkan kelas atau nama tutor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-700 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      {/* TABEL UTAMA VALIDASI BERKAS */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Informasi Kelas & Tutor</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Waktu Unggahan</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Dokumen Excel</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Status Validasi</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-64">Tindakan Berkas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {isFetching ? (
                <tr>
                  <td colSpan="5" className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <svg className="animate-spin h-8 w-8 text-bta-green" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-gray-500 font-bold text-sm">Menarik data dari server...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search size={32} className="text-gray-300" />
                      <p>Tidak ada data unggahan nilai yang ditemukan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredFiles.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    
                    {/* Kelas & Tutor */}
                    <td className="p-5">
                      <div className="font-bold text-gray-800 text-base">{item.kelas}</div>
                      <div className="text-xs text-gray-400 font-semibold mt-1">{item.tutor}</div>
                    </td>
                    
                    {/* Waktu Unggah */}
                    <td className="p-5">
                      <span className="text-xs font-mono font-bold text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                        {item.waktuUnggah}
                      </span>
                    </td>
                    
                    {/* File Excel (Bisa Diklik untuk Pratinjau) */}
                    <td className="p-5">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <button 
                          onClick={() => handlePreviewExcel(item.file_url)}
                          className="flex items-center gap-2 bg-green-50 text-bta-green px-3 py-1.5 rounded-xl border border-bta-green/20 w-fit max-w-[180px] hover:bg-green-100 transition-colors tooltip"
                          title="Klik untuk pratinjau dokumen"
                        >
                          <FileSpreadsheet size={16} strokeWidth={2.5} />
                          <span className="font-bold text-xs truncate">
                            {item.namaFile}
                          </span>
                        </button>
                        <div className="flex gap-3 mt-0.5">
                           <button onClick={() => handlePreviewExcel(item.file_url)} className="text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-bta-green flex items-center gap-1 transition-colors">
                             <Eye size={12} strokeWidth={3} /> Lihat
                           </button>
                           <span className="text-gray-300">|</span>
                           <button onClick={() => handleDownload(item.file_url)} className="text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-bta-green flex items-center gap-1 transition-colors">
                             <Download size={12} strokeWidth={3} /> Unduh
                           </button>
                        </div>
                      </div>
                    </td>
                    
                    {/* Status Lencana */}
                    <td className="p-5 text-center">
                      {item.status === "Menunggu Validasi" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                          <Clock size={12} strokeWidth={2.5} /> {item.status}
                        </span>
                      )}
                      {item.status === "Diteruskan ke Kepala Pusat" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                          <CheckCircle2 size={12} strokeWidth={2.5} /> Diteruskan
                        </span>
                      )}
                    </td>
                    
                    {/* Tombol Kontrol Eksekusi */}
                    <td className="p-5">
                      {item.status === "Menunggu Validasi" ? (
                        <div className="flex flex-col gap-2 justify-center">
                          <button
                            disabled={isSubmitting}
                            onClick={() => handleApprove(item.kelas_id, item.kelas)}
                            className="flex items-center justify-center gap-1.5 bg-bta-green hover:bg-green-900 text-white font-black text-xs py-2 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50"
                          >
                            <Send size={14} strokeWidth={2.5} />
                            <span>Validasi & Teruskan</span>
                          </button>
                          <button
                            disabled={isSubmitting}
                            onClick={() => openRejectModal(item)}
                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs py-2 px-3 rounded-xl transition-all disabled:opacity-50"
                          >
                            <X size={14} strokeWidth={2.5} />
                            <span>Kembalikan ke Tutor</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-xs text-gray-400 font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-block">Selesai Diproses</span>
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

      {/* ========================================= */}
      {/* MODAL PRATINJAU EXCEL (Menggunakan Iframe)*/}
      {/* ========================================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header Modal Pratinjau */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-700">
                  <FileSpreadsheet size={20} />
                </div>
                <h3 className="font-black text-gray-800 text-lg">Pratinjau Dokumen Excel</h3>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Konten Iframe Excel */}
            <div className="flex-1 bg-gray-100 relative">
               <iframe 
                 src={previewUrl} 
                 className="w-full h-full border-none"
                 title="Pratinjau Excel"
               ></iframe>
               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur">
                  Jika dokumen tidak muncul (karena masalah localhost), silakan unduh file.
               </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL DIALOG EVALUASI DOKUMEN NILAI       */}
      {/* ========================================= */}
      {showRejectModal && selectedFile && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            <div className="p-6 bg-red-600 flex items-center justify-between relative overflow-hidden">
               <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
               <h3 className="font-black text-white text-lg flex items-center gap-2 relative z-10">
                 <AlertCircle size={20} className="text-bta-yellow" />
                 Kembalikan Berkas Nilai
               </h3>
               <button onClick={() => { setShowRejectModal(false); setRejectReason(""); }} className="text-white/60 hover:text-white transition-colors relative z-10">
                 <X size={24} />
               </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-4 leading-relaxed bg-red-50 p-4 rounded-xl border border-red-100">
                Anda menolak memvalidasi file nilai untuk <strong className="text-gray-900">{selectedFile.kelas}</strong>. Masukkan alasan peninjauan agar tutor <strong className="text-gray-900">{selectedFile.tutor}</strong> dapat melakukan perbaikan data.
              </p>
              
              <label className="block text-xs font-black text-bta-green uppercase tracking-wider mb-2">Alasan Pengembalian</label>
              <textarea
                rows="4"
                placeholder="Contoh: Lampiran file kosong, atau format rumus rata-rata salah..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-gray-400 transition-all"
              />
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
              <button 
                disabled={isSubmitting}
                onClick={() => { setShowRejectModal(false); setRejectReason(""); }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                disabled={isSubmitting}
                onClick={handleRejectSubmit}
                className="flex items-center justify-center min-w-[140px] px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Notifikasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiNilai;