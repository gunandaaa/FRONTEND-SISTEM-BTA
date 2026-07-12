import { useState, useEffect } from "react";
import api from "../../api/axios";

function ManajemenTutor() {
  const [tutors, setTutors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Tutor' });

  // 1. FUNGSI AMBIL DATA (GET)
  const fetchTutors = async () => {
    try {
      const response = await api.get('/users');
      // Filter hanya role 'Tutor'
      const dataTutor = response.data.data.filter(user => 
        user.roles.some(r => r.name === 'Tutor')
      );
      setTutors(dataTutor);
    } catch (error) {
      console.error("Gagal mengambil data", error);
    }
  };

  useEffect(() => { fetchTutors(); }, []);

  // 2. FUNGSI SIMPAN (POST)
  const handleSimpan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/users', formData);
      fetchTutors(); 
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'Tutor' });
    } catch (error) {
      alert("Gagal menyimpan data: " + (error.response?.data?.message || "Terjadi kesalahan"));
    } finally {
      setIsLoading(false);
    }
  };

  // 3. FUNGSI HAPUS (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus tutor ini?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchTutors();
      } catch (error) {
        alert("Gagal menghapus: " + error.response?.data?.message);
      }
    }
  };

  // Filter untuk pencarian
  const filteredTutors = tutors.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up font-sans pb-10">
      {/* Header & Aksi */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Manajemen Data Tutor</h1>
          <p className="text-gray-500 text-sm">Kelola akun dan hak akses pengajar BTA.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-bta-green text-white px-5 py-2.5 rounded-xl font-bold">
          Tambah Tutor
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400">Nama</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400">Email</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTutors.map((tutor) => (
              <tr key={tutor.id}>
                <td className="px-8 py-4 font-bold text-gray-800">{tutor.name}</td>
                <td className="px-8 py-4 text-gray-600">{tutor.email}</td>
                <td className="px-8 py-4 text-right">
                  <button onClick={() => handleDelete(tutor.id)} className="text-red-500 font-bold">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSimpan} className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-black">Tambah Tutor</h2>
            <input 
              className="w-full p-3 border rounded-xl"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              className="w-full p-3 border rounded-xl"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input 
              className="w-full p-3 border rounded-xl"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <button type="submit" disabled={isLoading} className="w-full bg-bta-green text-white py-3 rounded-xl font-bold">
              {isLoading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManajemenTutor;