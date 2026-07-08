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
  // State data dummy pengguna
  const [users, setUsers] = useState([
    { id: 1, nama: "Ustadz Ahmad Fauzi", username: "ahmadfauzi", role: "Tutor", status: "Aktif" },
    { id: 2, nama: "Staf Keaswajaan BTA", username: "stafbta", role: "Staf", status: "Aktif" },
    { id: 3, nama: "Kepala Rektorat", username: "rektorat", role: "Rektorat", status: "Aktif" },
    { id: 4, nama: "Ustadzah Siti Aminah", username: "siti_a", role: "Tutor", status: "Non-Aktif" }
  ]);

  // State Modal & Form
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, nama: "", username: "", password: "", role: "Tutor" });

  // Fungsi Toggle Status Aktif/Non-Aktif
  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Aktif" ? "Non-Aktif" : "Aktif" } : u));
  };

  // Fungsi Simpan (Tambah/Edit)
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

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Pengguna</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola hak akses dan status akun Tutor, Staf, dan Rektorat.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(false); setShowModal(true); }}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-colors"
        >
          <Plus size={18} />
          <span>Buat Akun Baru</span>
        </button>
      </div>

      {/* Tabel Pengguna */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
              <th className="p-4 rounded-tl-2xl">Nama Pengguna</th>
              <th className="p-4">Username</th>
              <th className="p-4">Peran / Jabatan</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center rounded-tr-2xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-800">{user.nama}</td>
                <td className="p-4 font-mono text-slate-500">{user.username}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === 'Tutor' ? 'bg-blue-50 text-blue-700' : 
                    user.role === 'Staf' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-purple-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-center gap-2">
                  <button onClick={() => openEditModal(user)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => toggleStatus(user.id)} className={`p-2 rounded-lg ${user.status === 'Aktif' ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'}`}>
                    <Power size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: Tambah/Edit Pengguna */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">{isEditing ? "Edit Data Pengguna" : "Tambah Akun Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nama Lengkap</label>
                  <input type="text" required value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Username</label>
                        <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
                        <input type="password" required={!isEditing} placeholder={isEditing ? "********" : ""} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Peran / Jabatan</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm">
                    <option value="Tutor">Tutor</option>
                    <option value="Staf">Staf</option>
                    <option value="Rektorat">Rektorat</option>
                  </select>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-xl text-sm">
                  <Save size={16} /> Simpan Data
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