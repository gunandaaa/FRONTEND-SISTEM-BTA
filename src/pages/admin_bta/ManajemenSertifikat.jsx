import React, { useState, useEffect, useRef } from "react";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Save, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import axiosInstance from "../../api/axios";

function ManajemenSertifikat() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [nomorSk, setNomorSk] = useState("");
  
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Menyimpan data template yang sedang aktif di database
  const [activeTemplate, setActiveTemplate] = useState({
    url: null,
    nomorSk: "",
    updatedAt: null
  });

  const fileInputRef = useRef(null);

  // ==========================================
  // FUNGSI API BACKEND
  // ==========================================

  // 1. Ambil Template Aktif (GET)
  const fetchActiveTemplate = async () => {
    setIsFetching(true);
    try {
      // Asumsi ada endpoint untuk mengambil template saat ini
      const response = await axiosInstance.get('/api/admin/sertifikat/template');
      setActiveTemplate(response.data.data);
      setNomorSk(response.data.data.nomor_sk);
      
      // Simulasi Data Dummy
    //   setTimeout(() => {
    //     setActiveTemplate({
    //       url: "https://via.placeholder.com/1123x794.png?text=Template+Sertifikat+Lama", // Rasio A4 Landscape
    //       nomorSk: "SK/BTA/2026/001",
    //       updatedAt: "14 Juli 2026 - 10:00 WIB"
    //     });
    //     setNomorSk("SK/BTA/2026/001");
    //     setPreviewUrl("https://via.placeholder.com/1123x794.png?text=Template+Sertifikat+Lama");
    //     setIsFetching(false);
    //   }, 800);
    } catch (error) {
      console.error("Gagal mengambil data template", error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchActiveTemplate();
  }, []);

  // 2. Simpan Template Baru (POST dengan FormData)
  const handleSimpanTemplate = async () => {
    if (!nomorSk) return alert("Nomor SK tidak boleh kosong!");
    if (!file && !activeTemplate.url) return alert("Harap unggah gambar template!");

    setIsUploading(true);
    try {
      const formData = new FormData();
      if (file) formData.append("template", file);
      formData.append("nomor_sk", nomorSk);

      // Endpoint API sesuai dokumentasi
      await axiosInstance.post("/api/admin/sertifikat/template", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Template sertifikat dan Nomor SK berhasil diperbarui!");
      // Kosongkan file input agar tidak berat di memori
      setFile(null); 
      fetchActiveTemplate(); // Tarik ulang data agar status "Diunggah pada" ter-update
    } catch (error) {
      alert("Gagal mengunggah template: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsUploading(false);
    }
  };

  // ==========================================
  // HANDLER DRAG & DROP SERTA VALIDASI FILE
  // ==========================================
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    // Validasi Format
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(selectedFile.type)) {
      return alert("Format file tidak didukung! Harap unggah format JPG atau PNG.");
    }

    // Validasi Ukuran (Maks 2MB = 2048 KB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      return alert("Ukuran file terlalu besar! Maksimal 2MB.");
    }

    setFile(selectedFile);
    // Instant Live Preview menggunakan Object URL
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    if (window.confirm("Yakin ingin membatalkan perubahan dan kembali ke template yang aktif?")) {
      setFile(null);
      setPreviewUrl(activeTemplate.url);
      setNomorSk(activeTemplate.nomorSk);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <div className="space-y-6 animate-fade-in-up font-sans pb-10">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Pengaturan Sertifikat</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola desain latar belakang dan Nomor SK Kelulusan BTA.</p>
        </div>
      </div>

      {isFetching ? (
                // TAMPILAN LOADING SAAT FETCHING DATA
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                   <div className="flex flex-col items-center justify-center space-y-3">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C3A]"></div>
                     <p>Memuat konfigurasi template...</p>
                   </div>
                 </td>
                </tr>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================= */}
          {/* KOLOM KIRI: PANEL KONTROL (Span 4)        */}
          {/* ========================================= */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h2 className="font-black text-gray-800 flex items-center gap-2">
                  <FileText className="text-bta-yellow" size={20} />
                  Pengaturan Data
                </h2>
              </div>
              <div className="p-6 space-y-5">
                
                {/* Input Nomor SK */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Surat Keputusan (SK)</label>
                  <input 
                    type="text" 
                    value={nomorSk}
                    onChange={(e) => setNomorSk(e.target.value)}
                    placeholder="Contoh: SK/BTA/2026/001"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bta-green/50 outline-none text-sm font-medium transition-all"
                  />
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">Teks ini akan dicetak otomatis di semua sertifikat kelulusan.</p>
                </div>

                <hr className="border-gray-100" />

                {/* Upload Zone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background (Template)</label>
                  
                  <div 
                    className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer ${
                      dragActive 
                        ? "border-bta-green bg-bta-green/5" 
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".jpg,.jpeg,.png"
                      onChange={handleChange}
                      className="hidden" 
                    />
                    
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 mb-3 pointer-events-none">
                      {file ? <ImageIcon size={24} className="text-bta-green" /> : <UploadCloud size={24} />}
                    </div>
                    
                    <div className="text-center pointer-events-none">
                      {file ? (
                        <p className="text-sm font-bold text-bta-green break-all px-2">{file.name}</p>
                      ) : (
                        <>
                          <p className="text-sm font-bold text-gray-700">Klik atau Drag & Drop file</p>
                          <p className="text-xs font-medium text-gray-400 mt-1">Format JPG, PNG (Maks. 2MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3">
              <button 
                onClick={handleReset}
                disabled={isUploading}
                className="flex-1 py-3.5 border-2 border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} /> Reset
              </button>
              <button 
                onClick={handleSimpanTemplate}
                disabled={isUploading}
                className="flex-[2] py-3.5 bg-bta-green text-white font-black rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-bta-green/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" /> Memproses...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Simpan Template
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ========================================= */}
          {/* KOLOM KANAN: LIVE PREVIEW (Span 8)        */}
          {/* ========================================= */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col h-full min-h-[500px]">
            
            {/* Indikator Status Template */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
              <h2 className="font-black text-gray-800 flex items-center gap-2">
                <ImageIcon className="text-bta-green" size={20} />
                Pratinjau Sertifikat
              </h2>
              {file ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">
                  <AlertCircle size={14} /> Belum Disimpan
                </span>
              ) : activeTemplate.url ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                  <CheckCircle2 size={14} /> Template Aktif ({activeTemplate.updatedAt})
                </span>
              ) : null}
            </div>

            {/* Area Preview Render (Relative Positioning untuk Overlay) */}
            <div className="flex-1 p-6 bg-gray-900/5 flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <div className="relative w-full max-w-3xl shadow-2xl rounded-sm bg-white overflow-hidden" style={{ aspectRatio: '1.414/1' /* Standar rasio A4 Landscape */ }}>
                  
                  {/* Background Template */}
                  <img 
                    src={previewUrl} 
                    alt="Preview Template" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* OVERLAY PLACEHOLDER TEXT 
                      (Posisi ini adalah simulasi, bisa disesuaikan margin top/left nya 
                       tergantung desain kosongan template sertifikat BTA) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
                    
                    {/* Header: Nomor SK */}
                    <div className="absolute top-1/4 w-full text-gray-800 text-[1vw] font-bold tracking-widest uppercase">
                      Nomor: {nomorSk || "SK/BTA/YYYY/XXX"}
                    </div>

                    {/* Tengah: Identitas Mahasiswa */}
                    <div className="mt-[30%] w-full">
                      <h2 className="text-[1.5vw] font-black text-gray-900 leading-tight font-serif">
                        NAMA MAHASISWA LENGKAP
                      </h2>
                      <p className="text-[1.2vw] font-medium text-gray-600 mt-2">
                        NIM. 23552020XX
                      </p>
                    </div>

                    {/* Bawah: Keterangan Kelulusan */}
                    <div className="mt-[8%] w-full max-w-xl mx-auto">
                      <p className="text-[1vw] text-gray-700 leading-relaxed">
                        Telah mengikuti dan dinyatakan <strong className="text-bta-green font-black">LULUS</strong> pada Ujian Baca Tulis Al-Qur'an (BTA) Tingkat <strong className="font-black">Mahir</strong> dengan predikat <strong className="font-black text-bta-green">Sangat Baik (A)</strong>.
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center text-gray-400 font-medium">
                  <ImageIcon size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>Belum ada template gambar yang diunggah.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default ManajemenSertifikat;