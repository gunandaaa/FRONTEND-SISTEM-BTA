import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

function ManajemenPeriode() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [periodes, setPeriodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading submit form
  const [isFetching, setIsFetching] = useState(true); // Loading get data
  const [togglingId, setTogglingId] = useState(null); // Loading untuk toggle switch

  // Form Data untuk POST Add Periode
  const [formData, setFormData] = useState({ 
    nama_periode: '', 
    batas_waktu_input_nilai: '', 
    is_active: false 
  });

  // ==========================================
  // FUNGSI API BACKEND
  // ==========================================

  // 1. Ambil Data Periode (GET)
  const fetchPeriodes = async () => {
    setIsFetching(true);
    try {
      // Asumsi endpoint GET list periode adalah /api/admin/periode
      const response = await axiosInstance.get('/api/admin/periode');
      // Pastikan backend mengembalikan array data
      setPeriodes(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data periode", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchPeriodes(); }, []);

  // 2. Simpan Data Periode Baru (POST)
  const handleSimpan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API merekomendasikan form-data atau json, kita gunakan JSON karena axios otomatis menangani ini
      await axiosInstance.post('/api/admin/periode', {
        ...formData,
        // Konversi boolean ke 1/0 jika backend spesifik meminta angka, tapi false/true biasanya aman di Laravel
        is_active: formData.is_active ? 1 : 0 
      });
      fetchPeriodes(); 
      handleCloseModal();
    } catch (error) {
      alert("Gagal menambahkan periode: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Set Periode Aktif (PATCH - Master Switch)
  const handleToggleActive = async (id, currentStatus) => {
    // Cegah hit API berulang jika sudah aktif atau sedang loading
    if (currentStatus || togglingId !== null) return; 

    if (window.confirm("Aktifkan periode ini? Periode lain akan dinonaktifkan secara otomatis.")) {
      setTogglingId(id);
      try {
        await axiosInstance.patch(`/api/admin/periode/${id}/set-active`);
        fetchPeriodes(); // Refresh data untuk memperbarui UI (kartu aktif & toggle)
      } catch (error) {
        alert("Gagal mengaktifkan periode: " + (error.response?.data?.message || "Terjadi kesalahan"));
      } finally {
        setTogglingId(null);
      }
    }
  };

  // ==========================================
  // UTILITIES UI & LOGIC
  // ==========================================
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ nama_periode: '', batas_waktu_input_nilai: '', is_active: false });
  };

  // Logika untuk Countdown Timer
  const getCountdown = (deadlineStr) => {
    if (!deadlineStr) return { text: "Batas Waktu Tidak Valid", isWarning: false, isDanger: false };
    
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: "Waktu Habis", isWarning: false, isDanger: true };
    if (diffDays === 0) return { text: "Hari Ini Terakhir", isWarning: true, isDanger: true };
    if (diffDays <= 7) return { text: `${diffDays} Hari Lagi`, isWarning: true, isDanger: false };
    
    return { text: `${diffDays} Hari Lagi`, isWarning: false, isDanger: false };
  };

  // Format Tanggal untuk UI (Contoh: 09 Oktober 2026)
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  // Pemisahan Data: Cari 1 periode aktif untuk Highlight Card, sisanya masuk ke Riwayat
  const activePeriode = periodes.find(p => p.is_active === true || p.is_active === 1);
  const riwayatPeriode = periodes.filter(p => p.id !== activePeriode?.id);

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-10">
      
      {/* 1. HEADER & BARIS AKSI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Manajemen Periode</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola sakelar utama operasional akademik BTA.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-bta-green hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-bta-green/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
          Tambah Periode
        </button>
      </div>

      {/* 2. HIGHLIGHT KARTU PERIODE AKTIF */}
      {isFetching ? (
        <div className="h-40 bg-gray-100 rounded-3xl animate-pulse flex items-center justify-center">
           <span className="text-gray-400 font-bold">Memuat Status Sistem...</span>
        </div>
      ) : activePeriode ? (
        <div className="bg-bta-green rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-bta-green/20">
          <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-bta-yellow/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-bta-yellow text-bta-black text-xs font-black tracking-wide uppercase mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
                Sistem Sedang Berjalan
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                {activePeriode.nama_periode}
              </h2>
              <p className="text-white/80 font-medium text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Tenggat Input Nilai: {formatDate(activePeriode.batas_waktu_input_nilai)}
              </p>
            </div>
            
            {/* COUNTDOWN TIMER */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl min-w-[200px] text-center">
              <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Sisa Waktu Input Nilai</p>
              <div className={`text-3xl font-black ${
                getCountdown(activePeriode.batas_waktu_input_nilai).isDanger ? 'text-red-400' : 'text-bta-yellow'
              }`}>
                {getCountdown(activePeriode.batas_waktu_input_nilai).text}
              </div>
            </div>
          </div>
        </div>
      ) : (
         <div className="bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-3xl p-8 text-center flex flex-col items-center">
            <svg className="w-12 h-12 text-yellow-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h3 className="text-lg font-black text-yellow-800">Tidak Ada Periode Aktif</h3>
            <p className="text-yellow-700 text-sm mt-1">Sistem saat ini dalam keadaan tidak memiliki periode berjalan. Silakan aktifkan salah satu periode di bawah.</p>
         </div>
      )}

      {/* 3. TABEL RIWAYAT PERIODE */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-black text-gray-800">Daftar & Riwayat Periode</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400">Nama Periode</th>
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400">Tenggat Nilai</th>
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400 text-center">Master Switch (Status)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {riwayatPeriode.length > 0 ? (
                riwayatPeriode.map((periode) => {
                  const countdown = getCountdown(periode.batas_waktu_input_nilai);
                  const isPast = countdown.text === "Waktu Habis";
                  
                  return (
                    <tr key={periode.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="text-sm font-bold text-gray-800">{periode.nama_periode}</div>
                        <div className="text-xs font-medium text-gray-400 mt-0.5">Dibuat: {formatDate(periode.created_at)}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm font-bold text-gray-700">{formatDate(periode.batas_waktu_input_nilai)}</div>
                        {/* Highlight Merah jika sudah dekat batas waktu & bukan waktu habis murni */}
                        {!isPast && (
                          <div className={`text-xs font-bold mt-1 ${countdown.isDanger ? 'text-red-500' : countdown.isWarning ? 'text-yellow-600' : 'text-gray-400'}`}>
                            {countdown.text}
                          </div>
                        )}
                        {isPast && <div className="text-xs font-bold mt-1 text-gray-400">Telah Berakhir</div>}
                      </td>
                      <td className="px-8 py-5 text-center">
                        {/* TOGGLE SWITCH CUSTOM TAILWIND */}
                        <div className="flex justify-center items-center">
                          <button 
                            type="button"
                            onClick={() => handleToggleActive(periode.id, periode.is_active)}
                            disabled={togglingId === periode.id}
                            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-bta-green focus:ring-offset-2 ${
                              periode.is_active ? 'bg-bta-green' : 'bg-gray-200 hover:bg-gray-300'
                            } ${togglingId === periode.id ? 'opacity-50 cursor-wait' : ''}`}
                          >
                            <span className="sr-only">Set Active</span>
                            <span 
                              aria-hidden="true" 
                              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                periode.is_active ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-10 text-center text-gray-500 font-medium">
                    Tidak ada riwayat periode akademik.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL TAMBAH PERIODE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>
          
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in-up overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-800">Tambah Periode Akademik</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form onSubmit={handleSimpan} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Periode</label>
                <input 
                  type="text" 
                  required
                  maxLength={100}
                  value={formData.nama_periode}
                  onChange={(e) => setFormData({...formData, nama_periode: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bta-green/50 focus:border-bta-green transition-all text-sm font-medium" 
                  placeholder="Contoh: Ganjil 2026/2027"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Batas Waktu Input Nilai</label>
                <input 
                  type="date" 
                  required
                  value={formData.batas_waktu_input_nilai}
                  onChange={(e) => setFormData({...formData, batas_waktu_input_nilai: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bta-green/50 focus:border-bta-green transition-all text-sm font-medium" 
                />
                <p className="text-xs text-gray-500 mt-2 font-medium">Tutor tidak dapat menginput/mengubah nilai setelah tanggal ini berakhir.</p>
              </div>

              {/* Opsi Auto-Aktivasi */}
              <div className="flex items-center gap-3 p-4 bg-bta-yellow/10 rounded-xl border border-bta-yellow/20">
                <input 
                  type="checkbox" 
                  id="isActiveToggle"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-5 h-5 text-bta-green rounded border-gray-300 focus:ring-bta-green focus:ring-offset-0 cursor-pointer" 
                />
                <label htmlFor="isActiveToggle" className="text-sm font-bold text-yellow-800 cursor-pointer select-none">
                  Langsung Aktifkan Periode Ini
                  <span className="block text-xs font-medium text-yellow-700/80 mt-0.5">Otomatis menonaktifkan periode yang saat ini berjalan (Smart Activation).</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-5 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-5 py-3 bg-bta-green text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Simpan Periode"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManajemenPeriode;