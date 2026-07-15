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
      // Sesuaikan endpoint ini dengan route api.php kamu
      const response = await axiosInstance.get('/api/admin/tes-penempatan/belum-tes');
      
      // Data sudah diformat rapi dari Controller Backend
      const formattedData = response.data.data.map(mhs => ({
        id: mhs.id,
        nim: mhs.nim,
        nama: mhs.nama, // Langsung pakai 'nama' dari response backend
        prodi: mhs.program_studi, // Langsung pakai 'program_studi' dari response backend
        status: "Belum Dites",
        nilai: { makhorijul: "", tajwid: "", sifatul_huruf: "" }
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

  // Menghitung rata-rata secara live untuk UI
  const calculateLiveAverage = () => {
    const m = parseInt(inputValues.makhorijul) || 0;
    const t = parseInt(inputValues.tajwid) || 0;
    const s = parseInt(inputValues.sifatul_huruf) || 0;
    
    if (m === 0 && t === 0 && s === 0 && (!inputValues.makhorijul && !inputValues.tajwid && !inputValues.sifatul_huruf)) return "-";
    return Math.round((m + t + s) / 3);
  };

  // ==========================================
  // UPDATE: KIRIM RATA-RATA KE BACKEND
  // ==========================================
  const handleSaveValues = async (id) => {
    const { makhorijul, tajwid, sifatul_huruf } = inputValues;

    // 1. Validasi Kolom Kosong
    if (makhorijul === "" || tajwid === "" || sifatul_huruf === "") {
      setValidationError("Semua komponen nilai wajib diisi penuh.");
      return;
    }

    const mVal = parseInt(makhorijul);
    const tVal = parseInt(tajwid);
    const sVal = parseInt(sifatul_huruf);

    // 2. Validasi Rentang Nilai (0 - 100)
    if (mVal < 0 || mVal > 100 || tVal < 0 || tVal > 100 || sVal < 0 || sVal > 100) {
      setValidationError("Input per komponen harus berada di rentang 0 - 100.");
      return;
    }

    // 3. Kalkulasi Rata-rata Akhir
    const average = Math.round((mVal + tVal + sVal) / 3);
    
    setIsSubmitting(true);
    setValidationError("");

    try {
      // 4. Tembak API Controller inputNilai
      const response = await axiosInstance.post('/api/admin/tes-penempatan/input-nilai', {
        mahasiswa_id: id,
        nilai_tes: average
      });

      alert(`Sukses: ${response.data.message}\n(Nilai Akhir: ${average})`);
      
      setEditingId(null);
      // Refresh tabel agar data terbaru menghilang dari daftar belum tes
      fetchBelumTes();

    } catch (error) {
      console.error("Gagal simpan nilai:", error);
      if (error.response) {
        if (error.response.status === 422) {
          // Tangkap error jika backend masih pasang min:50
          setValidationError("Gagal validasi. Pastikan di Controller Laravel 'nilai_tes' menggunakan min:0 bukan min:50.");
        } else if (error.response.status === 400) {
          setValidationError(error.response.data.message); // Tangkap error cek duplikat TesPenempatan
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

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-10">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <FileCheck size={24} />
            </div>
            Input Nilai Tes Penempatan
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-sm">
            Salin data nilai hasil pengujian luring ke dalam sistem. Mahasiswa dengan nilai ≥ 50 otomatis masuk kriteria Mahir.
          </p>
        </div>
        <button 
          onClick={fetchBelumTes}
          className="flex items-center gap-2 text-sm font-bold bg-gray-50 text-gray-600 hover:text-bta-green hover:bg-green-50 px-4 py-2.5 rounded-xl border border-gray-200 transition-colors"
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

      {/* ALERT ERROR VALIDASI */}
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
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-24">Makhorijul</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-24">Tajwid</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-24">Sifatul Huruf</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider bg-bta-green/5 w-32 border-l border-r border-gray-100">Nilai Akhir</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider w-40">Tindakan</th>
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
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <CheckCircle2 size={48} className="text-green-500/50" />
                      <div>
                        <p className="font-bold text-gray-600">Antrean Bersih!</p>
                        <p className="text-xs">Semua mahasiswa yang terdaftar sudah memiliki nilai tes.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isEditing = editingId === student.id;
                  const liveAvg = isEditing ? calculateLiveAverage() : "-";
                  const potentialTingkat = liveAvg !== "-" ? (liveAvg >= 50 ? "Mahir" : "Menengah") : "";
                  
                  return (
                    <tr key={student.id} className={`transition-colors duration-150 ${isEditing ? 'bg-bta-green/5' : 'hover:bg-gray-50/50'}`}>
                      
                      {/* Kolom Profil Mahasiswa */}
                      <td className="p-5">
                        <div className="font-bold text-gray-800">{student.nama}</div>
                        <div className="text-xs text-gray-500 font-medium mt-1">{student.nim} • {student.prodi}</div>
                      </td>
                      
                      {/* Form Input: Makhorijul */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="makhorijul"
                            min="0" max="100"
                            value={inputValues.makhorijul}
                            onChange={handleInputChange}
                            className="w-16 text-center py-2 px-1 bg-white border border-gray-300 rounded-lg text-sm font-black focus:outline-none focus:border-bta-green focus:ring-2 focus:ring-bta-green/50 text-gray-800"
                            placeholder="0"
                          />
                        ) : (
                          <span className="text-gray-300 font-black">—</span>
                        )}
                      </td>

                      {/* Form Input: Tajwid */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="tajwid"
                            min="0" max="100"
                            value={inputValues.tajwid}
                            onChange={handleInputChange}
                            className="w-16 text-center py-2 px-1 bg-white border border-gray-300 rounded-lg text-sm font-black focus:outline-none focus:border-bta-green focus:ring-2 focus:ring-bta-green/50 text-gray-800"
                            placeholder="0"
                          />
                        ) : (
                          <span className="text-gray-300 font-black">—</span>
                        )}
                      </td>

                      {/* Form Input: Sifatul Huruf */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="sifatul_huruf"
                            min="0" max="100"
                            value={inputValues.sifatul_huruf}
                            onChange={handleInputChange}
                            className="w-16 text-center py-2 px-1 bg-white border border-gray-300 rounded-lg text-sm font-black focus:outline-none focus:border-bta-green focus:ring-2 focus:ring-bta-green/50 text-gray-800"
                            placeholder="0"
                          />
                        ) : (
                          <span className="text-gray-300 font-black">—</span>
                        )}
                      </td>

                      {/* Kolom Preview Rata-Rata */}
                      <td className={`p-5 text-center border-l border-r border-gray-100 ${isEditing ? 'bg-bta-yellow/10' : 'bg-gray-50/50'}`}>
                        {isEditing ? (
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-black text-gray-900">{liveAvg}</span>
                            {potentialTingkat && (
                              <span className={`text-[10px] font-bold mt-1 uppercase px-2 py-0.5 rounded ${potentialTingkat === 'Mahir' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                {potentialTingkat}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-white text-gray-400 border border-gray-200">
                            <HelpCircle size={12} /> Pending
                          </span>
                        )}
                      </td>

                      {/* Tombol Aksi */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={isSubmitting}
                              className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 font-bold text-xs py-2 px-3 rounded-xl transition-colors disabled:opacity-50"
                            >
                              Batal
                            </button>
                            <button
                              onClick={() => handleSaveValues(student.id)}
                              disabled={isSubmitting}
                              className="flex items-center justify-center gap-1.5 bg-bta-green hover:bg-opacity-90 text-white font-black text-xs py-2 px-4 rounded-xl shadow-md transition-all disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              ) : (
                                <Save size={14} />
                              )}
                              <span>Simpan</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(student)}
                            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-green-50 text-bta-green border border-gray-200 hover:border-bta-green/30 font-black text-xs py-2 px-4 rounded-xl shadow-sm transition-all"
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