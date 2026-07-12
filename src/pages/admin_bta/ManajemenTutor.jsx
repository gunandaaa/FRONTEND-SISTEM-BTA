import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

function ManajemenTutor() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [tutors, setTutors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading untuk tombol Simpan
  const [isFetching, setIsFetching] = useState(true); // Loading untuk get data tabel
  const [searchQuery, setSearchQuery] = useState("");
  
  // State untuk mode Edit
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Tutor' });

  // ==========================================
  // FUNGSI API BACKEND
  // ==========================================
  
  // 1. Ambil Data Tutor (GET)
  const fetchTutors = async () => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get('/api/users');
      // Filter hanya role 'Tutor'
      const dataTutor = response.data.data.filter(user => 
        user.roles.some(r => r.name === 'Tutor')
      );
      setTutors(dataTutor);
    } catch (error) {
      console.error("Gagal mengambil data", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchTutors(); }, []);

  // 2. Simpan atau Update Data Tutor (POST / PUT)
  const handleSimpan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditMode) {
        // Jika Edit, dan password kosong, hapus dari payload agar tidak terupdate menjadi kosong
        const payload = { ...formData };
        if (!payload.password) {
          delete payload.password;
        }
        await axiosInstance.put(`/api/users/${editId}`, payload);
      } else {
        // Jika Tambah
        await axiosInstance.post('/api/users', formData);
      }
      
      fetchTutors(); 
      handleCloseModal();
    } catch (error) {
      alert("Gagal menyimpan data: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Hapus Data Tutor (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus tutor ini?")) {
      try {
        await axiosInstance.delete(`/api/users/${id}`);
        fetchTutors();
      } catch (error) {
        alert("Gagal menghapus: " + (error.response?.data?.message || "Terjadi kesalahan"));
      }
    }
  };

  // ==========================================
  // UTILITIES UI
  // ==========================================
  
  // Filter pencarian
  const filteredTutors = tutors.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Buka Modal untuk Tambah
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({ name: '', email: '', password: '', role: 'Tutor' });
    setIsModalOpen(true);
  };

  // Buka Modal untuk Edit
  const handleOpenEditModal = (tutor) => {
    setIsEditMode(true);
    setEditId(tutor.id);
    // Masukkan data lama ke form (kosongkan password demi keamanan)
    setFormData({ name: tutor.name, email: tutor.email, password: '', role: 'Tutor' });
    setIsModalOpen(true);
  };

  // Tutup Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      // Reset form setelah animasi tutup selesai
      setFormData({ name: '', email: '', password: '', role: 'Tutor' });
      setIsEditMode(false);
      setEditId(null);
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fade-in-up font-sans pb-10">
      
      {/* 1. HEADER & BARIS AKSI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Manajemen Data Tutor</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola akun dan hak akses pengajar BTA.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bta-green/50 focus:border-bta-green transition-all text-sm font-medium text-gray-700" 
              placeholder="Cari nama atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tombol Tambah diubah mengarah ke fungsi handleOpenAddModal */}
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 bg-bta-green hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-bta-green/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
            Tambah Tutor
          </button>
        </div>
      </div>

      {/* 2. TABEL DATA TUTOR */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400 w-16">No</th>
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400">Nama Tutor</th>
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400">Email / Username</th>
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400">Status</th>
                <th className="px-8 py-5 text-xs uppercase tracking-wider font-bold text-gray-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isFetching ? (
                // TAMPILAN LOADING SAAT FETCHING DATA
                <tr>
                  <td colSpan="5" className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <svg className="animate-spin h-8 w-8 text-bta-green" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-gray-500 font-bold text-sm">Memuat Data Tutor...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredTutors.length > 0 ? (
                filteredTutors.map((tutor, index) => (
                  <tr key={tutor.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-4 text-sm font-bold text-gray-500">{index + 1}</td>
                    <td className="px-8 py-4">
                      <div className="text-sm font-bold text-gray-800">{tutor.name}</div>
                    </td>
                    <td className="px-8 py-4 text-sm font-medium text-gray-600">{tutor.email}</td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        Aktif
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right flex justify-end gap-2">
                      {/* Tombol Edit dihubungkan ke fungsi handleOpenEditModal */}
                      <button onClick={() => handleOpenEditModal(tutor)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      
                      <button onClick={() => handleDelete(tutor.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-gray-500 font-medium">
                    {searchQuery ? "Data tutor tidak ditemukan." : "Belum ada data tutor."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. MODAL CRUD (Dipakai bareng untuk Tambah & Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          ></div>
          
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              {/* Judul modal berubah dinamis */}
              <h2 className="text-xl font-black text-gray-800">
                {isEditMode ? "Edit Data Tutor" : "Tambah Tutor Baru"}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form onSubmit={handleSimpan} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bta-green/50 focus:border-bta-green transition-all text-sm" 
                  placeholder="Masukkan nama lengkap tutor"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bta-green/50 focus:border-bta-green transition-all text-sm" 
                  placeholder="email@unh.ac.id"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {/* Teks label password menyesuaikan mode */}
                  {isEditMode ? "Password Baru (Opsional)" : "Password Sementara"}
                </label>
                <input 
                  type="password" 
                  required={!isEditMode} // Tidak wajib diisi jika sedang Edit
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bta-green/50 focus:border-bta-green transition-all text-sm" 
                  placeholder={isEditMode ? "Kosongkan jika tidak ingin mengubah password" : "Minimal 8 karakter"}
                />
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
                  ) : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManajemenTutor;