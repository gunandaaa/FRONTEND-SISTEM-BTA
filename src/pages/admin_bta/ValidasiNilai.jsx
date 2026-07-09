import React, { useState } from 'react';
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
  FileCheck2
} from 'lucide-react';

const ValidasiNilai = () => {
  // ==========================================
  // LOGIKA & DATA DUMMY GUNANDA (TIDAK DISENTUH)
  // ==========================================
  const [gradeFiles, setGradeFiles] = useState([
    {
      id: 1,
      kelas: "Kelas MQ 2 - A",
      tutor: "Ustadz Muhammad Ali, S.Ag",
      waktuUnggah: "07 Juli 2026 - 14:30 WIB",
      namaFile: "Nilai_Akhir_MQ2A_Ali.xlsx",
      status: "Menunggu Validasi"
    },
    {
      id: 2,
      kelas: "Kelas MQ 1 - C",
      tutor: "Ustadzah Siti Aminah, M.Ag",
      waktuUnggah: "07 Juli 2026 - 10:15 WIB",
      namaFile: "Rekap_Nilai_MQ1_C.xlsx",
      status: "Menunggu Validasi"
    },
    {
      id: 3,
      kelas: "Kelas MQ 1 - A",
      tutor: "Ustadz Ahmad Fauzi, M.Pd",
      waktuUnggah: "06 Juli 2026 - 16:00 WIB",
      namaFile: "DataNilai_Fauzi.xlsx",
      status: "Diteruskan ke Kepala Pusat"
    },
    {
      id: 4,
      kelas: "Kelas MQ 2 - B",
      tutor: "Ustadz M. Syakir, S.Sos",
      waktuUnggah: "05 Juli 2026 - 09:20 WIB",
      namaFile: "Format_Kosong_Error.xlsx",
      status: "Dikembalikan ke Tutor"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const filteredFiles = gradeFiles.filter(item => 
    item.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (fileName) => {
    alert(`Mengunduh dokumen: ${fileName}\n\nSilakan buka file ini di Excel perangkat Anda untuk mengecek kewajaran nilai sebelum melakukan validasi.`);
  };

  const handleApprove = (id, kelas) => {
    setGradeFiles(gradeFiles.map(item => 
      item.id === id ? { ...item, status: "Diteruskan ke Kepala Pusat" } : item
    ));
    alert(`Berhasil memvalidasi nilai ${kelas}. Data telah diteruskan ke dashboard Kepala Pusat (Pak Ulin) untuk disahkan.`);
  };

  const openRejectModal = (item) => {
    setSelectedFile(item);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      alert("Silakan masukkan alasan kenapa file ini dikembalikan ke tutor.");
      return;
    }
    
    setGradeFiles(gradeFiles.map(item => 
      item.id === selectedFile.id ? { ...item, status: "Dikembalikan ke Tutor" } : item
    ));
    
    alert(`Dokumen nilai ${selectedFile.kelas} berhasil dikembalikan ke ${selectedFile.tutor} dengan alasan: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedFile(null);
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
              <FileCheck2 size={24} />
            </div>
            Validasi Nilai Akhir
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Pintu penyaringan terakhir. Unduh dan periksa format file Excel dari Tutor sebelum diteruskan kepada Kepala Pusat.
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
              {filteredFiles.length === 0 ? (
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
                    
                    {/* File Excel (Pill Indah) */}
                    <td className="p-5">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-2 bg-green-50 text-bta-green px-3 py-1.5 rounded-xl border border-bta-green/10 w-fit max-w-[180px]">
                          <FileSpreadsheet size={16} strokeWidth={2.5} />
                          <span className="font-bold text-xs truncate" title={item.namaFile}>
                            {item.namaFile}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDownload(item.namaFile)}
                          className="text-[11px] font-black uppercase tracking-wider text-gray-400 hover:text-bta-green flex items-center gap-1 transition-colors mt-0.5"
                        >
                          <Download size={12} strokeWidth={3} /> Unduh & Periksa
                        </button>
                      </div>
                    </td>
                    
                    {/* Status Lencana */}
                    <td className="p-5 text-center">
                      {item.status === "Menunggu Validasi" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                          <Clock size={12} strokeWidth={2.5} />
                          Menunggu Validasi
                        </span>
                      )}
                      {item.status === "Diteruskan ke Kepala Pusat" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                          <CheckCircle2 size={12} strokeWidth={2.5} />
                          Diteruskan
                        </span>
                      )}
                      {item.status === "Dikembalikan ke Tutor" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-50 text-red-600 border border-red-200">
                          <XCircle size={12} strokeWidth={2.5} />
                          Dikembalikan
                        </span>
                      )}
                    </td>
                    
                    {/* Tombol Kontrol Eksekusi */}
                    <td className="p-5">
                      {item.status === "Menunggu Validasi" ? (
                        <div className="flex flex-col gap-2 justify-center">
                          <button
                            onClick={() => handleApprove(item.id, item.kelas)}
                            className="flex items-center justify-center gap-1.5 bg-bta-green hover:bg-green-900 text-white font-black text-xs py-2 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
                          >
                            <Send size={14} strokeWidth={2.5} />
                            <span>Validasi & Teruskan</span>
                          </button>
                          <button
                            onClick={() => openRejectModal(item)}
                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs py-2 px-3 rounded-xl transition-all"
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

      {/* MODAL DIALOG EVALUASI DOKUMEN NILAI */}
      {showRejectModal && selectedFile && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Header Modal */}
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
            
            {/* Form Konten */}
            <div className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-4 leading-relaxed bg-red-50 p-4 rounded-xl border border-red-100">
                Anda menolak memvalidasi file nilai untuk <strong className="text-gray-900">{selectedFile.kelas}</strong>. Masukkan alasan peninjauan agar tutor <strong className="text-gray-900">{selectedFile.tutor}</strong> dapat melakukan perbaikan data.
              </p>
              
              <label className="block text-xs font-black text-bta-green uppercase tracking-wider mb-2">Alasan Pengembalian</label>
              <textarea
                rows="4"
                placeholder="Contoh: Lampiran file kosong, nama mahasiswa tidak sesuai dengan daftar hadir kelas, atau format rumus rata-rata salah..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Tombol Aksi */}
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
                Kirim Notifikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiNilai;