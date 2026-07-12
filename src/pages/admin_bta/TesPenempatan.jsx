import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Save, 
  FileEdit, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import axiosInstance from '../../api/axios';

const TesPenempatan = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State untuk mode edit baris (inline editing)
  const [editingId, setEditingId] = useState(null);
  const [inputValues, setInputValues] = useState({ makhorijul: "", tajwid: "", sifatul_huruf: "" });
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // READ: FETCH DATA MAHASISWA BELUM TES
  // ==========================================
  const fetchBelumTes = async () => {
    setIsLoading(true);
    setValidationError("");
    try {
      const response = await axiosInstance.get('/api/admin/tes-penempatan/belum-tes');
      // Format data dari backend agar sesuai dengan struktur tabel UI
      const formattedData = response.data.data.map(mhs => ({
        id: mhs.id,
        nim: mhs.nim,
        nama: mhs.user?.name || "Nama Tidak Tersedia",
        prodi: mhs.program_studi,
        status: "Belum Dites",
        nilai: { makhorijul: "", tajwid: "", sifatul_huruf: "" } // Komponen sementara di UI
      }));
      setStudents(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setValidationError("Gagal mengambil data dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBelumTes();
  }, []);

  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm)
  );

  const handleEditClick = (student) => {
    setEditingId(student.id);
    setInputValues({
      makhorijul: student.nilai.makhorijul,
      tajwid: student.nilai.tajwid,
      sifatul_huruf: student.nilai.sifatul_huruf,
    });
    setValidationError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // ==========================================
  // UPDATE: KIRIM RATA-RATA KE BACKEND
  // ==========================================
  const handleSaveValues = async (id) => {
    const { makhorijul, tajwid, sifatul_huruf } = inputValues;

    // 1. Validasi Kolom Kosong
    if (!makhorijul || !tajwid || !sifatul_huruf) {
      setValidationError("Semua komponen nilai (Makhorijul, Tajwid, Sifatul Huruf) wajib diisi.");
      return;
    }

    const mVal = parseInt(makhorijul);
    const tVal = parseInt(tajwid);
    const sVal = parseInt(sifatul_huruf);

    // 2. Validasi Rentang Nilai (0 - 100)
    if (mVal < 0 || mVal > 100 || tVal < 0 || tVal > 100 || sVal < 0 || sVal > 100) {
      setValidationError("Input nilai harus berada di rentang 0 - 100.");
      return;
    }

    // 3. Kalkulasi Rata-rata
    const average = Math.round((mVal + tVal + sVal) / 3);
    
    setIsSubmitting(true);
    setValidationError("");

    try {
      // 4. Tembak API (Hanya mengirim mahasiswa_id dan nilai rata-rata)
      const response = await axiosInstance.post('/api/admin/tes-penempatan/input-nilai', {
        mahasiswa_id: id,
        nilai_tes: average
      });

      alert(`Sukses: ${response.data.message}\n(Rata-rata: ${average})`);
      
      setEditingId(null);
      // Refresh tabel agar mahasiswa yang sudah dites hilang dari daftar "Belum Tes"
      fetchBelumTes();

    } catch (error) {
      console.error("Gagal simpan nilai:", error);
      if (error.response) {
        if (error.response.status === 422) {
          setValidationError("Gagal validasi server. Pastikan rentang nilai min:0 di backend sudah diterapkan.");
        } else if (error.response.status === 400) {
          setValidationError(error.response.data.message); // Jika terdeteksi sudah pernah tes
        } else {
          setValidationError("Terjadi kesalahan pada server.");
        }
      } else {
        setValidationError("Gagal terhubung ke server.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // TAMPILAN UI/UX BTA
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <FileCheck size={24} />
            </div>
            Tes Penempatan (Input Nilai Luring)
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Salin dan digitalisasikan data nilai hasil pengujian luring ke dalam sistem.
          </p>
        </div>
        <button 
          onClick={fetchBelumTes}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-bta-green transition-colors"
        >
          <RefreshCw size={16} /> Segarkan Data
        </button>
      </div>

      {/* TOOLBAR PENCARIAN UTAMA */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Ketik NIM atau Nama Mahasiswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-700 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      {/* ALERT ERROR VALIDASI (ANIMASI INDAH) */}
      {validationError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-bold shadow-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} className="shrink-0 text-red-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* TABEL UTAMA INPUT DATA */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Data Mahasiswa</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-36">Makhorijul Huruf</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-36">Tajwid</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-36">Sifatul Huruf</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-40">Status Alokasi</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-48">Tindakan Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bta-green"></div>
                      <p>Mencari antrean mahasiswa...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <CheckCircle2 size={40} className="text-green-500/50" />
                      <p>Semua mahasiswa sudah mendapatkan nilai tes.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isEditing = editingId === student.id;
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                      
                      {/* Kolom Profil Mahasiswa */}
                      <td className="p-5">
                        <div className="font-bold text-gray-800">{student.nama}</div>
                        <div className="text-xs text-gray-400 font-mono mt-1">{student.nim}</div>
                        <div className="text-xs text-bta-green font-bold bg-green-50 border border-bta-green/10 px-2 py-0.5 rounded mt-2 inline-block">
                          {student.prodi}
                        </div>
                      </td>
                      
                      {/* Form Input: Makhorijul */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="makhorijul"
                            min="0"
                            max="100"
                            value={inputValues.makhorijul}
                            onChange={handleInputChange}
                            className="w-20 text-center py-2.5 px-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-800 shadow-inner transition-all"
                            placeholder="0-100"
                          />
                        ) : (
                          <span className={`font-mono text-base font-black px-3 py-1.5 rounded-lg text-gray-300`}>
                            —
                          </span>
                        )}
                      </td>

                      {/* Form Input: Tajwid */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="tajwid"
                            min="0"
                            max="100"
                            value={inputValues.tajwid}
                            onChange={handleInputChange}
                            className="w-20 text-center py-2.5 px-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-800 shadow-inner transition-all"
                            placeholder="0-100"
                          />
                        ) : (
                          <span className={`font-mono text-base font-black px-3 py-1.5 rounded-lg text-gray-300`}>
                            —
                          </span>
                        )}
                      </td>

                      {/* Form Input: Sifatul Huruf */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="sifatul_huruf"
                            min="0"
                            max="100"
                            value={inputValues.sifatul_huruf}
                            onChange={handleInputChange}
                            className="w-20 text-center py-2.5 px-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-800 shadow-inner transition-all"
                            placeholder="0-100"
                          />
                        ) : (
                          <span className={`font-mono text-base font-black px-3 py-1.5 rounded-lg text-gray-300`}>
                            —
                          </span>
                        )}
                      </td>

                      {/* Status Badges */}
                      <td className="p-5 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                          <HelpCircle size={12} />
                          Belum Dites
                        </span>
                      </td>

                      {/* Tombol Aksi */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleSaveValues(student.id)}
                              disabled={isSubmitting}
                              className="flex items-center justify-center gap-1.5 bg-bta-green hover:bg-green-900 text-white font-black text-xs py-2 px-3 rounded-xl shadow-md transition-all disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : (
                                <Save size={14} />
                              )}
                              <span>Simpan</span>
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={isSubmitting}
                              className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 font-bold text-xs py-2 px-3 rounded-xl transition-colors disabled:opacity-50"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(student)}
                            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-green-50 text-bta-green border border-bta-green/20 font-black text-xs py-2 px-4 rounded-xl shadow-sm hover:shadow transition-all"
                          >
                            <FileEdit size={14} />
                            <span>Input Nilai</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TesPenempatan;