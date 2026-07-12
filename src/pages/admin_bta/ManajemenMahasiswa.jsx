import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Filter, 
  GraduationCap, 
  UserPlus
} from 'lucide-react';
// 1. IMPORT AXIOS
import axiosInstance from '../../api/axios'; 

const ManajemenMahasiswa = () => {
  // ==========================================
  // MASTER STATE & INTEGRASI BACKEND
  // ==========================================
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Kontrol UI
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  
  // State Form Input
  const [selectedId, setSelectedId] = useState(null);
  const [formValues, setFormValues] = useState({
    nim: "",
    name: "", // Diubah menjadi 'name' sesuai backend users table
    program_studi: "S1 Informatika",
    fakultas: "Fakultas Sains dan Teknologi", // Tambahan sesuai backend
    // Kelas dan Status dipertahankan untuk UI form, meski belum disimpan ke DB backend
    kelas: "Belum Plotting",
    status: "Aktif"
  });

  // ==========================================
  // READ: FETCH DATA DARI API
  // ==========================================
  const fetchStudents = async (query = "") => {
    setIsLoading(true);
    try {
      const url = query 
        ? `/api/admin/mahasiswa?search_nama=${query}` 
        : `/api/admin/mahasiswa`;
        
      const response = await axiosInstance.get(url);
      
      // Ambil array data dari paginasi Laravel
      const dataMahasiswa = response.data.data.data || [];
      setStudents(dataMahasiswa);
    } catch (error) {
      console.error("Error memuat data:", error);
      alert("Gagal memuat data dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil pertama kali
  useEffect(() => {
    fetchStudents();
  }, []);

  // Debounce untuk pencarian
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Filter Status Lokal (karena backend belum support filter status)
  const filteredStudents = students.filter(student => {
    // Simulasi status aktif (default) jika backend tidak mereturn status
    const studentStatus = student.status || "Aktif";
    return filterStatus ? studentStatus === filterStatus : true;
  });

  // ==========================================
  // AKSI OPERASIONAL CRUD 
  // ==========================================
  
  const openAddModal = () => {
    setModalMode("add");
    setFormValues({ 
      nim: "", name: "", program_studi: "S1 Informatika", 
      fakultas: "Fakultas Sains dan Teknologi", kelas: "Belum Plotting", status: "Aktif" 
    });
    setShowModal(true);
  };

// ==========================================
  // BUKA MODAL EDIT (SUDAH DIAKTIFKAN)
  // ==========================================
  const openEditModal = (student) => {
    setModalMode("edit");
    setSelectedId(student.id);
    
    // Tarik data saat ini dari baris tabel dan masukkan ke dalam form
    setFormValues({
      nim: student.nim,
      name: student.user?.name || "", // Ambil nama dari relasi tabel user
      program_studi: student.program_studi,
      fakultas: student.fakultas,
      kelas: student.kelas || "Belum Plotting",
      status: student.status || "Aktif"
    });
    
    setShowModal(true); // Tampilkan modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

// ==========================================
  // SIMPAN DATA (TAMBAH & UBAH VIA API)
  // ==========================================
  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.nim.trim() || !formValues.name.trim()) {
      alert("NIM dan Nama Mahasiswa wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (modalMode === "add") {
        // Mode Tambah: Gunakan POST
        await axiosInstance.post('/api/admin/mahasiswa', formValues);
        alert(`Sukses menambahkan mahasiswa baru: ${formValues.name}`);
      } else {
        // Mode Edit: Gunakan PUT beserta ID mahasiswa
        await axiosInstance.put(`/api/admin/mahasiswa/${selectedId}`, formValues);
        alert(`Sukses memperbarui data mahasiswa: ${formValues.name}`);
      }

      setShowModal(false); // Tutup modal setelah sukses
      fetchStudents();     // Refresh tabel secara otomatis
    } catch (error) {
      console.error("Gagal simpan:", error);
      if (error.response?.status === 422) {
        alert("Gagal: Pastikan isian sudah benar dan NIM belum digunakan oleh mahasiswa lain.");
      } else {
        alert("Terjadi kesalahan pada server saat memproses data.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE DATA DI API
  const handleDelete = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus permanen data mahasiswa atas nama ${nama}?`)) {
      try {
        await axiosInstance.delete(`/api/admin/mahasiswa/${id}`);
        alert(`Data mahasiswa ${nama} berhasil dihapus dari sistem.`);
        fetchStudents(); // Refresh tabel
      } catch (error) {
        console.error("Gagal hapus:", error);
        alert(error.response?.data?.message || "Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F4C3A] tracking-tight flex items-center gap-3">
            <div className="bg-[#0F4C3A]/10 p-2.5 rounded-xl text-[#0F4C3A]">
              <GraduationCap size={24} />
            </div>
            Manajemen Data Mahasiswa
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Kelola data master identitas mahasiswa, program studi, plotting kelas bimbingan, serta status aktif akademik.
          </p>
        </div>
        
        {/* Tombol Tambah Data */}
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 bg-[#0F4C3A] hover:bg-[#0a382a] text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shrink-0 w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Tambah Mahasiswa</span>
        </button>
      </div>

      {/* TOOLBAR PENCARIAN & FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Cari berdasarkan Nama atau NIM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] text-gray-700 placeholder:text-gray-400 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-[#0F4C3A] cursor-pointer appearance-none"
            >
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <Filter size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* TABEL UTAMA CRUD */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-[#0F4C3A] uppercase tracking-wider">NIM</th>
                <th className="p-5 text-xs font-black text-[#0F4C3A] uppercase tracking-wider">Nama Mahasiswa</th>
                <th className="p-5 text-xs font-black text-[#0F4C3A] uppercase tracking-wider">Program Studi</th>
                <th className="p-5 text-xs font-black text-[#0F4C3A] uppercase tracking-wider">Kelas BTA</th>
                <th className="p-5 text-center text-xs font-black text-[#0F4C3A] uppercase tracking-wider">Status</th>
                <th className="p-5 text-center text-xs font-black text-[#0F4C3A] uppercase tracking-wider w-40">Aksi Pengelolaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {isLoading ? (
                 <tr>
                 <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                   <div className="flex flex-col items-center justify-center space-y-3">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C3A]"></div>
                     <p>Memuat data dari server...</p>
                   </div>
                 </td>
               </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search size={32} className="text-gray-300" />
                      <p>Data rekapan mahasiswa tidak ditemukan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="p-5 font-mono text-gray-500 font-bold text-xs">{student.nim}</td>
                    {/* Tarik nama dari relasi tabel user */}
                    <td className="p-5 font-black text-gray-800">{student.user?.name || "Nama tidak tersedia"}</td>
                    <td className="p-5 text-gray-600 font-semibold">{student.program_studi}</td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        (student.kelas || 'Belum Plotting') === 'Belum Plotting' 
                          ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                          : 'bg-green-50 text-[#0F4C3A] border border-[#0F4C3A]/10'
                      }`}>
                        {student.kelas || "Belum Plotting"}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                        (student.status || 'Aktif') === 'Aktif' 
                          ? 'bg-green-50 text-[#0F4C3A] border border-[#0F4C3A]/20' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {student.status || "Aktif"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100"
                          title="Ubah Data"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id, student.user?.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                          title="Hapus Data"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POP-UP MODAL FORM INTERAKTIF (TAMBAH / UBAH DATA) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#0F4C3A] flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="font-black text-white text-lg flex items-center gap-2 relative z-10">
                <UserPlus size={20} className="text-[#FAEA29]" />
                {modalMode === "add" ? "Tambah Mahasiswa Baru" : "Perbarui Data Mahasiswa"}
              </h3>
              <button onClick={() => !isSubmitting && setShowModal(false)} className="text-white/60 hover:text-white transition-colors relative z-10">
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body Form */}
            <form onSubmit={handleSaveSubmit}>
              <div className="p-6 space-y-4">
                
                {/* Input NIM */}
                <div>
                  <label className="block text-xs font-black text-[#0F4C3A] uppercase tracking-wider mb-2">Nomor Induk Mahasiswa (NIM)</label>
                  <input
                    type="text"
                    name="nim"
                    required
                    disabled={modalMode === "edit"}
                    placeholder="Contoh: 202601005"
                    value={formValues.nim}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Input Nama (Diubah name attributenya jadi 'name') */}
                <div>
                  <label className="block text-xs font-black text-[#0F4C3A] uppercase tracking-wider mb-2">Nama Lengkap Mahasiswa</label>
                  <input
                    type="text"
                    name="name" 
                    required
                    placeholder="Masukkan nama sesuai KTP/KTM"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all"
                  />
                </div>

                {/* Tambahan Dropdown Fakultas dari API Backend */}
                <div>
                  <label className="block text-xs font-black text-[#0F4C3A] uppercase tracking-wider mb-2">Fakultas</label>
                  <div className="relative">
                    <select
                      name="fakultas"
                      value={formValues.fakultas}
                      onChange={handleInputChange}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer appearance-none"
                    >
                      <option value="Fakultas Sains dan Teknologi">Fakultas Sains dan Teknologi</option>
                      <option value="Fakultas Ilmu Pendidikan">Fakultas Ilmu Pendidikan</option>
                      <option value="Fakultas Ekonomi dan Bisnis">Fakultas Ekonomi dan Bisnis</option>
                      <option value="Fakultas Agama Islam">Fakultas Agama Islam</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Dropdown Program Studi (Diubah namenya menjadi program_studi) */}
                <div>
                  <label className="block text-xs font-black text-[#0F4C3A] uppercase tracking-wider mb-2">Program Studi</label>
                  <div className="relative">
                    <select
                      name="program_studi"
                      value={formValues.program_studi}
                      onChange={handleInputChange}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer appearance-none"
                    >
                      <option value="S1 Informatika">S1 Informatika</option>
                      <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                      <option value="S1 Pendidikan Agama Islam">S1 Pendidikan Agama Islam</option>
                      <option value="S1 Manajemen">S1 Manajemen</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Dropdown Kelas */}
                  <div>
                    <label className="block text-xs font-black text-[#0F4C3A] uppercase tracking-wider mb-2">Plotting Kelas</label>
                    <div className="relative">
                      <select
                        name="kelas"
                        value={formValues.kelas}
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer appearance-none"
                      >
                        <option value="Belum Plotting">Belum Plotting</option>
                        <option value="MQ 1 - A">MQ 1 - A</option>
                        <option value="MQ 1 - B">MQ 1 - B</option>
                        <option value="MQ 2 - A">MQ 2 - A</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Status */}
                  <div>
                    <label className="block text-xs font-black text-[#0F4C3A] uppercase tracking-wider mb-2">Status Siswa</label>
                    <div className="relative">
                      <select
                        name="status"
                        value={formValues.status}
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer appearance-none"
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Cuti">Cuti</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#0F4C3A] hover:bg-[#0a382a] text-white font-black rounded-xl text-sm shadow-lg disabled:opacity-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  {isSubmitting ? 'Menyimpan...' : (modalMode === "add" ? "Simpan Mahasiswa" : "Perbarui Data")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenMahasiswa;