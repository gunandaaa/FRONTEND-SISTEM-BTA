import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

function ManajemenKelas() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [kelasList, setKelasList] = useState([]);
  const [periodes, setPeriodes] = useState([]); 
  const [tutors, setTutors] = useState([]); 
  const [mahasiswas, setMahasiswas] = useState([]); 
  
  const [selectedPeriode, setSelectedPeriode] = useState("");
  
  // State Loading
  const [isFetchingKelas, setIsFetchingKelas] = useState(true);
  const [isFetchingPeriodes, setIsFetchingPeriodes] = useState(true);
  const [isFetchingTutors, setIsFetchingTutors] = useState(true);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  // State Modals
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalPlotOpen, setIsModalPlotOpen] = useState(false);
  const [isModalPesertaOpen, setIsModalPesertaOpen] = useState(false);

  // State Form Data
  const [formDataCreate, setFormDataCreate] = useState({
    nama_kelas: "",
    tingkat: "Menengah",
    kapasitas_jumlah: 20,
    jadwal: ""
  });
  
  const [selectedKelasId, setSelectedKelasId] = useState(null);
  const [selectedTutorId, setSelectedTutorId] = useState("");
  const [selectedMahasiswaIds, setSelectedMahasiswaIds] = useState([]);

  // ==========================================
  // FUNGSI API BACKEND
  // ==========================================

  // 1. Fetch Periode (Otomatis pilih yang aktif)
  const fetchPeriodes = async () => {
    setIsFetchingPeriodes(true);
    try {
      const response = await axiosInstance.get('/api/admin/periode');
      const data = response.data.data || [];
      setPeriodes(data);
      
      // Cari periode yang sedang aktif
      const activePeriode = data.find(p => p.is_active === true || p.is_active === 1);
      
      if (activePeriode) {
        setSelectedPeriode(activePeriode.id.toString());
      } else if (data.length > 0) {
        // Fallback jika tidak ada yang aktif, pilih yang pertama
        setSelectedPeriode(data[0].id.toString());
      }
    } catch (error) {
      console.error("Gagal mengambil data periode", error);
    } finally {
      setIsFetchingPeriodes(false);
    }
  };

  // 2. Fetch Data Tutor (Dinamis dari database)
  const fetchTutors = async () => {
    setIsFetchingTutors(true);
    try {
      const response = await axiosInstance.get('/api/users');
      // Filter hanya yang memiliki role 'Tutor'
      const dataTutor = response.data.data.filter(user => 
        user.roles.some(r => r.name === 'Tutor')
      );
      setTutors(dataTutor);
    } catch (error) {
      console.error("Gagal mengambil data tutor", error);
    } finally {
      setIsFetchingTutors(false);
    }
  };

  // 3. Fetch Data Kelas
  const fetchKelas = async () => {
    setIsFetchingKelas(true);
    try {
      const response = await axiosInstance.get('/api/admin/kelas');
      setKelasList(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data kelas", error);
    } finally {
      setIsFetchingKelas(false);
    }
  };

  // Jalankan semua fetch saat halaman pertama kali dimuat
  useEffect(() => {
    fetchPeriodes();
    fetchTutors();
    fetchKelas();
  }, []);

  // Handler Submit Buat Kelas (POST)
  const handleCreateKelas = async (e) => {
    e.preventDefault();
    if (!selectedPeriode) return alert("Pilih periode akademik terlebih dahulu!");

    setIsLoadingAction(true);
    try {
      // Gabungkan formData dengan periode_id yang sedang aktif dipilih di dropdown
      const payload = {
        ...formDataCreate,
        periode_id: parseInt(selectedPeriode)
      };

      await axiosInstance.post('/api/admin/kelas', payload);
      fetchKelas(); // Refresh data kelas
      setIsModalCreateOpen(false);
      
      // Reset form
      setFormDataCreate({ nama_kelas: "", tingkat: "Menengah", kapasitas_jumlah: 20, jadwal: "" });
    } catch (error) {
      alert("Gagal membuat kelas: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsLoadingAction(false);
    }
  };

  // Handler Plot Tutor (POST)
  const handlePlotTutor = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    try {
      await axiosInstance.post(`/api/admin/kelas/${selectedKelasId}/plot-tutor`, { tutor_id: selectedTutorId });
      fetchKelas(); // Refresh data agar nama tutor muncul di kartu
      setIsModalPlotOpen(false);
      setSelectedTutorId("");
    } catch (error) {
      alert("Gagal plot tutor: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsLoadingAction(false);
    }
  };

  // Handler Tambah Peserta Massal (POST) - (Masih simulasi UI untuk data mahasiswa)
  const handleTambahPeserta = async (e) => {
    e.preventDefault();
    if (selectedMahasiswaIds.length === 0) return alert("Pilih minimal 1 mahasiswa!");
    
    setIsLoadingAction(true);
    try {
      await axiosInstance.post(`/api/admin/kelas/${selectedKelasId}/tambah-peserta`, { mahasiswa_id: selectedMahasiswaIds });
      fetchKelas();
      setIsModalPesertaOpen(false);
      setSelectedMahasiswaIds([]);
    } catch (error) {
      alert("Gagal menambah peserta: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsLoadingAction(false);
    }
  };

  // ==========================================
  // UTILITIES UI
  // ==========================================
  const filteredKelas = kelasList.filter(k => k.periode_id?.toString() === selectedPeriode);

  const getProgressColor = (terisi, kapasitas) => {
    const persentase = (terisi / kapasitas) * 100;
    if (persentase >= 100) return "bg-red-500";
    if (persentase >= 75) return "bg-bta-yellow";
    return "bg-bta-green";
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-10">
      
      {/* 1. HEADER & BARIS AKSI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Manajemen Kelas</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola ruang kelas, plotting tutor, dan peserta.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-center">
          {/* Filter Periode */}
          <div className="relative w-full sm:w-auto">
            <select 
              value={selectedPeriode}
              onChange={(e) => setSelectedPeriode(e.target.value)}
              disabled={isFetchingPeriodes}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-bta-green/50 cursor-pointer disabled:opacity-50"
            >
              {isFetchingPeriodes ? (
                <option value="">Memuat periode...</option>
              ) : periodes.length > 0 ? (
                periodes.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nama_periode} {(p.is_active === true || p.is_active === 1) ? "(Aktif)" : ""}
                  </option>
                ))
              ) : (
                <option value="">Belum ada periode</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <button 
            onClick={() => setIsModalCreateOpen(true)}
            disabled={!selectedPeriode || isFetchingPeriodes}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-bta-green hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-bta-green/30 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
            Buat Kelas Baru
          </button>
        </div>
      </div>

      {/* 2. GRID KARTU KELAS */}
      {isFetchingKelas ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse flex items-center justify-center">
               <span className="text-gray-400 font-bold text-sm">Memuat data kelas...</span>
            </div>
          ))}
        </div>
      ) : filteredKelas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKelas.map((kelas) => {
            const terisi = kelas.terisi || 0; 
            const persentase = Math.min((terisi / kelas.kapasitas_jumlah) * 100, 100);
            const isFull = terisi >= kelas.kapasitas_jumlah;

            return (
              <div key={kelas.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300">
                {/* Header Card */}
                <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-start bg-gradient-to-r from-gray-50/50 to-transparent">
                  <div>
                    <h2 className="text-xl font-black text-gray-800 tracking-tight">{kelas.nama_kelas}</h2>
                    <span className={`inline-block mt-1.5 px-2.5 py-1 text-[10px] uppercase font-black tracking-wider rounded-md ${
                      kelas.tingkat === 'Mahir' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {kelas.tingkat}
                    </span>
                  </div>
                </div>

                {/* Body Card */}
                <div className="px-6 py-5 flex-1 space-y-5">
                  {/* Info Tutor */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tutor Pengampu</p>
                    {kelas.tutor ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-bta-green/10 flex items-center justify-center text-bta-green font-bold text-sm">
                          {kelas.tutor.name.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-700">{kelas.tutor.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-red-50 p-3 rounded-xl border border-red-100">
                        <span className="text-sm font-bold text-red-600">Belum ada tutor</span>
                        <button 
                          onClick={() => { setSelectedKelasId(kelas.id); setIsModalPlotOpen(true); }}
                          className="text-xs bg-white text-red-600 font-bold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Plot Sekarang
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info Kapasitas */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kapasitas Kelas</p>
                      <span className={`text-sm font-black ${isFull ? 'text-red-500' : 'text-gray-700'}`}>
                        {terisi} <span className="text-gray-400 font-medium">/ {kelas.kapasitas_jumlah}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor(terisi, kelas.kapasitas_jumlah)}`} style={{ width: `${persentase}%` }}></div>
                    </div>
                  </div>

                  {/* Info Jadwal */}
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <svg className="w-4 h-4 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {kelas.jadwal || <span className="italic text-gray-400">Jadwal belum ditentukan</span>}
                  </div>
                </div>

                {/* Footer Card (Aksi) */}
                <div className="border-t border-gray-50 p-4 bg-gray-50/50 flex gap-2">
                  <button 
                    disabled={isFull}
                    onClick={() => { setSelectedKelasId(kelas.id); setIsModalPesertaOpen(true); }}
                    className="flex-1 flex justify-center items-center py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-bta-green hover:text-white hover:border-bta-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed tooltip"
                    title={isFull ? "Kelas Penuh" : "Tambah Peserta"}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                  </button>
                  <button 
                    onClick={() => { setSelectedKelasId(kelas.id); setIsModalPlotOpen(true); }}
                    className="flex-1 flex justify-center items-center py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-bta-yellow hover:text-bta-black hover:border-bta-yellow transition-colors tooltip"
                    title="Plot Tutor"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  <Link 
                    to={`/admin/kelas/${kelas.id}`}
                    className="flex-1 flex justify-center items-center py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-bold text-sm tooltip"
                    title="Lihat Detail"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
             <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h3 className="text-xl font-black text-gray-800">Belum Ada Kelas</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-md">Tidak ada data kelas untuk periode akademik yang dipilih. Silakan buat wadah kelas pertama Anda.</p>
          <button 
            onClick={() => setIsModalCreateOpen(true)}
            className="mt-6 bg-bta-green text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 shadow-lg shadow-bta-green/30"
          >
            Buat Kelas Pertama
          </button>
        </div>
      )}

      {/* ========================================= */}
      {/* 3. MODALS */}
      {/* ========================================= */}

      {/* MODAL 1: BUAT KELAS BARU */}
      {isModalCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalCreateOpen(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
              <h2 className="text-xl font-black text-gray-800">Buat Kelas Baru</h2>
            </div>
            
            {/* Indikator Periode yang dituju (Otomatis dari filter atas) */}
            <div className="px-8 pt-4 pb-2">
               <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 Kelas ini akan dibuat untuk periode: {periodes.find(p => p.id.toString() === selectedPeriode)?.nama_periode || '-'}
               </div>
            </div>

            <form onSubmit={handleCreateKelas} className="p-8 pt-2 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama / Kode Kelas</label>
                <input type="text" required maxLength={100} value={formDataCreate.nama_kelas} onChange={(e) => setFormDataCreate({...formDataCreate, nama_kelas: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bta-green/50 outline-none text-sm" placeholder="Contoh: MQ1-A" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tingkat</label>
                  <select required value={formDataCreate.tingkat} onChange={(e) => setFormDataCreate({...formDataCreate, tingkat: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bta-green/50 outline-none text-sm font-bold">
                    <option value="Menengah">Menengah</option>
                    <option value="Mahir">Mahir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kapasitas Maksimal</label>
                  <input type="number" required min={1} max={50} value={formDataCreate.kapasitas_jumlah} onChange={(e) => setFormDataCreate({...formDataCreate, kapasitas_jumlah: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bta-green/50 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jadwal (Opsional)</label>
                <input type="text" value={formDataCreate.jadwal} onChange={(e) => setFormDataCreate({...formDataCreate, jadwal: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bta-green/50 outline-none text-sm" placeholder="Contoh: Jum'at, 15:30 WIB" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalCreateOpen(false)} className="flex-1 px-5 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={isLoadingAction} className="flex-1 px-5 py-3 bg-bta-green text-white rounded-xl font-bold hover:bg-opacity-90">{isLoadingAction ? "Menyimpan..." : "Simpan Kelas"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PLOT TUTOR */}
      {isModalPlotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalPlotOpen(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl animate-fade-in-up">
            <div className="p-8">
              <h2 className="text-xl font-black text-gray-800 mb-2">Plot Tutor</h2>
              <p className="text-sm text-gray-500 mb-6">Pilih pengajar untuk kelas ini.</p>
              
              {/* Dropdown Dinamis dari Database */}
              <select 
                required 
                value={selectedTutorId} 
                onChange={(e) => setSelectedTutorId(e.target.value)} 
                disabled={isFetchingTutors}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bta-yellow outline-none text-sm font-bold mb-6 disabled:opacity-60"
              >
                <option value="" disabled>-- Pilih Tutor --</option>
                {isFetchingTutors ? (
                  <option value="" disabled>Sedang memuat data...</option>
                ) : tutors.length > 0 ? (
                  tutors.map(tutor => (
                    <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
                  ))
                ) : (
                  <option value="" disabled>Belum ada data tutor di sistem</option>
                )}
              </select>

              <div className="flex gap-3">
                <button type="button" onClick={() => setIsModalPlotOpen(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl">Batal</button>
                <button onClick={handlePlotTutor} disabled={!selectedTutorId || isLoadingAction || isFetchingTutors} className="flex-1 py-3 bg-bta-yellow text-bta-black font-black rounded-xl hover:bg-opacity-90 disabled:opacity-50">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH PESERTA (Simulasi UI) */}
      {isModalPesertaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalPesertaOpen(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-fade-in-up max-h-[90vh] flex flex-col">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-gray-800">Tambah Peserta</h2>
                <p className="text-xs text-gray-500 mt-1">Pilih mahasiswa untuk dimasukkan ke kelas (Bulk Insert).</p>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              <div className="space-y-3">
                {[
                  { id: 101, nama: "Budi Santoso", nim: "2023001" },
                  { id: 102, nama: "Siti Aminah", nim: "2023002" },
                  { id: 103, nama: "Dodi Pratama", nim: "2023003" },
                ].map((mhs) => (
                  <label key={mhs.id} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:border-bta-green transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-bta-green rounded border-gray-300 focus:ring-bta-green"
                      checked={selectedMahasiswaIds.includes(mhs.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMahasiswaIds([...selectedMahasiswaIds, mhs.id]);
                        } else {
                          setSelectedMahasiswaIds(selectedMahasiswaIds.filter(id => id !== mhs.id));
                        }
                      }}
                    />
                    <div>
                      <p className="font-bold text-gray-800">{mhs.nama}</p>
                      <p className="text-xs font-medium text-gray-500">{mhs.nim}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white rounded-b-3xl flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">{selectedMahasiswaIds.length} Terpilih</span>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsModalPesertaOpen(false)} className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-200">Batal</button>
                <button onClick={handleTambahPeserta} disabled={isLoadingAction || selectedMahasiswaIds.length === 0} className="px-6 py-2.5 bg-bta-green text-white font-black rounded-xl hover:bg-opacity-90 disabled:opacity-50">Masukkan ke Kelas</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManajemenKelas;