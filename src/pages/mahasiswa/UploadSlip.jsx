import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  X, 
  Image as ImageIcon,
  CreditCard,
  Info
} from 'lucide-react';
import axiosInstance from '../../api/axios'; // Pastikan path ini sesuai dengan struktur foldermu

const UploadSlip = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk menampilkan pesan sukses atau error dari backend
  const [message, setMessage] = useState(null);
  const [statusType, setStatusType] = useState(null); // 'success', 'error', atau 'warning'

  // Handle saat mahasiswa memilih file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validasi ukuran (Maksimal 2MB sesuai backend)
      if (selectedFile.size > 2 * 1024 * 1024) {
        setMessage("Ukuran file maksimal adalah 2MB.");
        setStatusType("error");
        return;
      }

      setFile(selectedFile);
      setMessage(null);
      
      // Buat pratinjau (preview) jika file adalah gambar
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null); // Jika PDF, tidak ada preview gambar
      }
    }
  };

  // Hapus file yang sudah dipilih
  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setMessage(null);
  };

  // ==========================================
  // KELOLA PENGIRIMAN FILE KE BACKEND
  // ==========================================
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage("Silakan pilih file bukti pembayaran terlebih dahulu.");
      setStatusType("warning");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Wajib menggunakan FormData untuk mengirim file
    const formData = new FormData();
    formData.append('file_slip_pembayaran', file);

    try {
      // POST ke endpoint mahasiswa
      const response = await axiosInstance.post('/api/mahasiswa/slip-pembayaran', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Wajib untuk file upload
        },
      });

      setMessage(response.data.message || "Slip pembayaran berhasil diunggah dan sedang menunggu validasi Admin.");
      setStatusType("success");
      
      // Bersihkan form setelah sukses
      setFile(null);
      setPreview(null);

    } catch (error) {
      console.error("Upload error:", error);
      
      // Tangkap respons spesifik dari backend
      if (error.response) {
        if (error.response.status === 400) {
          // Error karena sudah pernah upload (Pending/Valid)
          setMessage(error.response.data.message);
          setStatusType("warning");
        } else if (error.response.status === 422) {
          // Error validasi (format file salah, terlalu besar, dll)
          setMessage("Format file tidak didukung atau ukuran melebihi 2MB. Gunakan JPG, PNG, atau PDF.");
          setStatusType("error");
        } else {
          setMessage("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
          setStatusType("error");
        }
      } else {
        setMessage("Gagal terhubung ke server.");
        setStatusType("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans max-w-4xl mx-auto">
      
      {/* HEADER HALAMAN */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bta-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <CreditCard size={28} />
            </div>
            Pembayaran Administrasi BTA
          </h1>
          <p className="text-gray-500 mt-3 font-medium text-sm leading-relaxed max-w-2xl">
            Untuk mendapatkan akses ke kelas MQ dan mengikuti Tes Penempatan, Anda diwajibkan untuk melunasi biaya administrasi BTA sebesar <strong className="text-gray-800">Rp 100.000</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PANEL KIRI: INFO REKENING */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-bta-green rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <CreditCard size={120} />
            </div>
            <h3 className="font-black text-lg mb-6 relative z-10 flex items-center gap-2">
              <Info size={18} className="text-bta-yellow" /> Tujuan Transfer
            </h3>
            
            <div className="space-y-5 relative z-10">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Bank Tujuan</p>
                <p className="font-black text-xl text-bta-yellow">BSI (Bank Syariah Indonesia)</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Nomor Rekening</p>
                <p className="font-mono text-2xl font-bold tracking-widest bg-white/10 py-2 px-3 rounded-lg inline-block border border-white/20">7123 456 789</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Atas Nama</p>
                <p className="font-bold text-lg">Pusat BTA UNUHA</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6">
            <h4 className="font-black text-orange-800 text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} /> Instruksi Penting
            </h4>
            <ul className="text-xs text-orange-700 space-y-2 list-disc pl-4 font-medium leading-relaxed">
              <li>Pastikan nama pengirim terlihat jelas di bukti transfer.</li>
              <li>Jangan membuang struk fisik sebelum divalidasi oleh Admin.</li>
              <li>Proses validasi memakan waktu maksimal 1x24 jam di hari kerja.</li>
            </ul>
          </div>
        </div>

        {/* PANEL KANAN: FORM UPLOAD */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
            <h2 className="font-black text-xl text-gray-800 mb-6 border-b border-gray-100 pb-4">Unggah Bukti Transfer</h2>
            
            {/* Notifikasi Status */}
            {message && (
              <div className={`p-4 rounded-2xl mb-6 flex gap-3 items-start border ${
                statusType === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                statusType === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                'bg-red-50 border-red-200 text-red-800'
              }`}>
                {statusType === 'success' ? <CheckCircle size={20} className="shrink-0 mt-0.5" /> : 
                 statusType === 'warning' ? <AlertCircle size={20} className="shrink-0 mt-0.5" /> : 
                 <X size={20} className="shrink-0 mt-0.5" />}
                <p className="text-sm font-bold leading-relaxed">{message}</p>
              </div>
            )}

            <form onSubmit={handleUploadSubmit}>
              {/* Area Drag & Drop / Input File */}
              {!file ? (
                <div className="relative border-2 border-dashed border-gray-300 hover:border-bta-green bg-gray-50 hover:bg-green-50/30 transition-all duration-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center group cursor-pointer">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-white p-4 rounded-full shadow-sm text-gray-400 group-hover:text-bta-green group-hover:scale-110 transition-all duration-300 mb-4">
                    <UploadCloud size={32} strokeWidth={2} />
                  </div>
                  <h3 className="font-black text-gray-800 mb-1">Klik atau Seret file ke sini</h3>
                  <p className="text-xs text-gray-500 font-medium">Format didukung: JPG, PNG, PDF (Maks. 2MB)</p>
                </div>
              ) : (
                /* Area Preview File yang Dipilih */
                <div className="border border-gray-200 bg-gray-50 rounded-3xl p-6 relative overflow-hidden">
                  <button 
                    type="button" 
                    onClick={clearSelection}
                    className="absolute top-4 right-4 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 p-2 rounded-xl shadow-sm transition-colors z-10"
                    title="Ganti File"
                  >
                    <X size={18} />
                  </button>

                  <div className="flex flex-col items-center">
                    {preview ? (
                      <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden mb-4 border border-gray-200 flex justify-center items-center relative">
                        <img src={preview} alt="Preview Bukti Bayar" className="max-h-full object-contain" />
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                          Pratinjau Gambar
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-2xl mb-4 border border-gray-200 flex flex-col justify-center items-center text-gray-500">
                        <FileText size={40} className="mb-2 opacity-50" />
                        <span className="text-xs font-bold uppercase tracking-widest">Dokumen PDF Terpilih</span>
                      </div>
                    )}
                    
                    <div className="bg-white w-full p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                       <div className="bg-bta-green/10 p-2 rounded-lg text-bta-green">
                         {file.type.includes('pdf') ? <FileText size={20} /> : <ImageIcon size={20} />}
                       </div>
                       <div className="overflow-hidden flex-grow">
                         <p className="font-bold text-sm text-gray-800 truncate">{file.name}</p>
                         <p className="text-xs text-gray-500 font-mono mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tombol Submit */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={!file || isLoading}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm transition-all duration-300 shadow-lg ${
                    !file || isLoading 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-bta-green hover:bg-green-900 text-white hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sedang Mengunggah...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={18} strokeWidth={3} /> Kirim Bukti Transfer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadSlip;