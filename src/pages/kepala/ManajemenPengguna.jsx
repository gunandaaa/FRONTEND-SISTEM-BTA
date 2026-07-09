import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Power, 
  ShieldUser, 
  User,
  X,
  Save,
  MoreVertical
} from 'lucide-react';

const ManajemenPengguna = () => {
  // ==========================================
  // LOGIKA & DATA DUMMY GUNANDA (TIDAK DISENTUH)
  // ==========================================
  const [users, setUsers] = useState([
    { id: 1, nama: "Ustadz Ahmad Fauzi", username: "ahmadfauzi", role: "Tutor", status: "Aktif" },
    { id: 2, nama: "Staf Keaswajaan BTA", username: "stafbta", role: "Staf", status: "Aktif" },
    { id: 3, nama: "Kepala Rektorat", username: "rektorat", role: "Rektorat", status: "Aktif" },
    { id: 4, nama: "Ustadzah Siti Aminah", username: "siti_a", role: "Tutor", status: "Non-Aktif" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, nama: "", username: "", password: "", role: "Tutor" });

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Aktif" ? "Non-Aktif" : "Aktif" } : u));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map(u => u.id === formData.id ? { ...formData, status: "Aktif" } : u));
    } else {
      setUsers([...users, { ...formData, id: Date.now(), status: "Aktif" }]);
    }
    setShowModal(false);
    setFormData({ id: null, nama: "", username: "", password: "", role: "Tutor" });
  };

  const openEditModal = (user) => {
    setFormData(user);
    setIsEditing(true);
    setShowModal(true);
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    // Menggunakan animasi masuk ringan berbasis CSS (animate-fade-in-up) yang tidak memberatkan RAM
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight">Manajemen Pengguna</h1>
          <p className="text-gray-500 mt-2 font-medium">Kelola hak akses dan status akun Tutor, Staf, dan Rektorat secara terpusat.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(false); setShowModal(true); }}
          className="inline-flex items-center justify-center gap-2 bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black text-sm py-3 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Buat Akun Baru</span>
        </button>
      </div>

      {/* Tabel Pengguna (Desain Kartu Premium) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Info Pengguna</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Peran Akses</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Status Akun</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  
                  {/* Kolom Nama & Username */}
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bta-green/10 flex items-center justify-center text-bta-green font-bold">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{user.nama}</p>
                        <p className="font-medium text-gray-400 text-xs mt-0.5">@{user.username}</p>
                      </div>
                    </div>
                  </td>

                  {/* Kolom Peran */}
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      user.role === 'Tutor' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                      user.role === 'Staf' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                      'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  {/* Kolom Status */}
                  <td className="p-5 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border inline-flex items-center gap-1.5 ${
                      user.status === 'Aktif' 
                        ? 'bg-green-50 text-bta-green border-bta-green/30' 
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Aktif' ? 'bg-bta-green animate-pulse' : 'bg-red-600'}`}></span>
                      {user.status}
                    </span>
                  </td>

                  {/* Kolom Aksi */}
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openEditModal(user)} 
                        className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Pengguna"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => toggleStatus(user.id)} 
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === 'Aktif' 
                            ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' 
                            : 'text-gray-400 hover:text-bta-green hover:bg-green-50'
                        }`}
                        title={user.status === 'Aktif' ? "Non-Aktifkan" : "Aktifkan"}
                      >
                        <Power size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Tambah/Edit Pengguna */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-bta-green flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="font-black text-white text-lg relative z-10 flex items-center gap-2">
                <ShieldUser size={20} className="text-bta-yellow" />
                {isEditing ? "Edit Data Pengguna" : "Tambah Akun Baru"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white transition-colors relative z-10">
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-bta-green uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.nama} 
                    onChange={(e) => setFormData({...formData, nama: e.target.value})} 
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all" 
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-bta-green uppercase tracking-wider mb-2">Username</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.username} 
                          onChange={(e) => setFormData({...formData, username: e.target.value})} 
                          className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all" 
                          placeholder="username_baru"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-bta-green uppercase tracking-wider mb-2">Password</label>
                        <input 
                          type="password" 
                          required={!isEditing} 
                          placeholder={isEditing ? "Biarkan kosong jika tidak diubah" : "********"} 
                          onChange={(e) => setFormData({...formData, password: e.target.value})} 
                          className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all placeholder:text-xs" 
                        />
                    </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-bta-green uppercase tracking-wider mb-2">Peran / Jabatan Akses</label>
                  <div className="relative">
                    <select 
                      value={formData.role} 
                      onChange={(e) => setFormData({...formData, role: e.target.value})} 
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green appearance-none cursor-pointer"
                    >
                      <option value="Tutor">👨‍🏫 Tutor BTA</option>
                      <option value="Staf">🏢 Staf Administrasi</option>
                      <option value="Rektorat">🏛️ Rektorat</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <MoreVertical size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-3xl">
                <button type="button" onClick={() => setShowModal(false)} className="mr-3 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors">
                  Batal
                </button>
                <button type="submit" className="flex items-center gap-2 bg-bta-green hover:bg-green-900 text-white font-black py-2.5 px-6 rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <Save size={16} /> 
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenPengguna;