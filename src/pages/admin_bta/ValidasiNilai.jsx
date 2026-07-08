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
  Clock
} from 'lucide-react';

const ValidasiNilai = () => {
  // State data dummy unggahan nilai dari para tutor
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

  // State pencarian dan modal penolakan
  const [searchTerm, setSearchTerm] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Filter pencarian berdasarkan kelas atau nama tutor
  const filteredFiles = gradeFiles.filter(item => 
    item.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Aksi 1: Unduh Dokumen Excel (Simulasi)
  const handleDownload = (fileName) => {
    alert(`Mengunduh dokumen: ${fileName}\n\nSilakan buka file ini di Excel perangkat Anda untuk mengecek kewajaran nilai sebelum melakukan validasi.`);
  };

  // Aksi 2: Validasi & Teruskan ke Kepala Pusat
  const handleApprove = (id, kelas) => {
    setGradeFiles(gradeFiles.map(item => 
      item.id === id ? { ...item, status: "Diteruskan ke Kepala Pusat" } : item
    ));
    alert(`Berhasil memvalidasi nilai ${kelas}. Data telah diteruskan ke dashboard Kepala Pusat (Pak Ulin) untuk disahkan.`);
  };

  // Membuka modal kembalikan file
  const openRejectModal = (item) => {
    setSelectedFile(item);
    setShowRejectModal(true);
  };

  // Aksi 3: Kembalikan ke Tutor (Submit dari Modal)
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

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Validasi Nilai Akhir</h1>
        <p className="text-sm text-slate-500 mt-1">
          Pintu penyaringan terakhir. Unduh dan periksa format file Excel dari Tutor sebelum diteruskan kepada Kepala Pusat.
        </p>
      </div>

      {/* Toolbar Pencarian */}
      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari berdasarkan Kelas atau Nama Tutor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-slate-700 shadow-sm"
          />
        </div>
      </div>

      {/* Tabel Utama */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-sm font-semibold">
                <th className="p-4 rounded-tl-2xl w-64">Informasi Kelas & Tutor</th>
                <th className="p-4 w-48">Waktu Unggahan</th>
                <th className="p-4 text-center">Dokumen Excel</th>
                <th className="p-4 text-center w-56">Status Validasi</th>
                <th className="p-4 text-center rounded-tr-2xl w-64">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">
                    Tidak ada data unggahan nilai yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    {/* Kolom Informasi */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.kelas}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.tutor}</div>
                    </td>
                    
                    {/* Kolom Waktu */}
                    <td className="p-4 text-xs font-medium text-slate-600">
                      {item.waktuUnggah}
                    </td>
                    
                    {/* Kolom Dokumen (Tombol Download) */}
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 w-fit">
                          <FileSpreadsheet size={16} />
                          <span className="font-semibold text-xs truncate max-w-[120px]" title={item.namaFile}>
                            {item.namaFile}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDownload(item.namaFile)}
                          className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 hover:underline flex items-center gap-1 mt-1"
                        >
                          <Download size={12} /> Unduh Dokumen Review
                        </button>
                      </div>
                    </td>
                    
                    {/* Kolom Status */}
                    <td className="p-4 text-center">
                      {item.status === "Menunggu Validasi" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                          <Clock size={12} />
                          Menunggu Validasi
                        </span>
                      )}
                      {item.status === "Diteruskan ke Kepala Pusat" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <CheckCircle2 size={12} />
                          Diteruskan
                        </span>
                      )}
                      {item.status === "Dikembalikan ke Tutor" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                          <XCircle size={12} />
                          Dikembalikan
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi */}
                    <td className="p-4 text-center">
                      {item.status === "Menunggu Validasi" ? (
                        <div className="flex flex-col gap-2 justify-center">
                          <button
                            onClick={() => handleApprove(item.id, item.kelas)}
                            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-3 rounded-lg shadow-sm transition-colors"
                          >
                            <Send size={14} />
                            <span>Validasi & Teruskan</span>
                          </button>
                          <button
                            onClick={() => openRejectModal(item)}
                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-xs py-2 px-3 rounded-lg transition-colors"
                          >
                            <X size={14} />
                            <span>Kembalikan ke Tutor</span>
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

      {/* MODAL: Form Alasan Pengembalian (Reject) */}
      {showRejectModal && selectedFile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 bg-rose-50 flex items-center gap-2 text-rose-800">
              <AlertCircle size={20} />
              <h3 className="font-bold">Kembalikan Dokumen ke Tutor</h3>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Anda akan menolak dan mengembalikan dokumen nilai <strong>{selectedFile.kelas}</strong>. Tutor <strong>{selectedFile.tutor}</strong> akan menerima notifikasi ini.
              </p>
              
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Alasan Pengembalian Dokumen</label>
              <textarea
                rows="3"
                placeholder="Contoh: Format Excel rusak, masih banyak kolom nilai yang kosong, atau salah unggah dokumen..."
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