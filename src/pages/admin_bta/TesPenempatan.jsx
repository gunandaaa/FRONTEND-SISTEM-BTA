import React, { useState } from 'react';
import { 
  Search, 
  Save, 
  FileEdit, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

const TesPenempatan = () => {
  // State data dummy mahasiswa untuk kebutuhan tes penempatan
  const [students, setStudents] = useState([
    {
      id: 1,
      nim: "202601001",
      nama: "Rifqi Al-Faruq",
      prodi: "S1 Informatika",
      status: "Belum Dites",
      nilai: { makhorijul: "", tajwid: "", sifatul_huruf: "" }
    },
    {
      id: 2,
      nim: "202601002",
      nama: "Ahmad Maufur",
      prodi: "S1 Informatika",
      status: "MQ 1",
      nilai: { makhorijul: "75", tajwid: "70", sifatul_huruf: "72" }
    },
    {
      id: 3,
      nim: "202602015",
      nama: "Siti Aminah",
      prodi: "S1 Pendidikan Agama Islam",
      status: "Belum Dites",
      nilai: { makhorijul: "", tajwid: "", sifatul_huruf: "" }
    },
    {
      id: 4,
      nim: "202603009",
      nama: "Zainal Abidin",
      prodi: "S1 Hukum Keluarga Islam",
      status: "MQ 2",
      nilai: { makhorijul: "88", tajwid: "90", sifatul_huruf: "85" }
    }
  ]);

  // State untuk pencarian, filter, dan form input baris yang sedang diedit
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [inputValues, setInputValues] = useState({ makhorijul: "", tajwid: "", sifatul_huruf: "" });
  const [validationError, setValidationError] = useState("");

  // Filter pencarian berdasarkan nama atau NIM
  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm)
  );

  // Aktifkan mode edit nilai untuk baris mahasiswa tertentu
  const handleEditClick = (student) => {
    setEditingId(student.id);
    setInputValues({
      makhorijul: student.nilai.makhorijul,
      tajwid: student.nilai.tajwid,
      sifatul_huruf: student.nilai.sifatul_huruf,
    });
    setValidationError("");
  };

  // Handle perubahan nilai di form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // Validasi dan Simpan Nilai
  const handleSaveValues = (id) => {
    const { makhorijul, tajwid, sifatul_huruf } = inputValues;

    // Pastikan semua kolom form terisi angka
    if (!makhorijul || !tajwid || !sifatul_huruf) {
      setValidationError("Semua kolom komponen nilai wajib diisi.");
      return;
    }

    // Validasi batas angka minimal 50 dan maksimal 100
    const mVal = parseInt(makhorijul);
    const tVal = parseInt(tajwid);
    const sVal = parseInt(sifatul_huruf);

    if (mVal < 50 || mVal > 100 || tVal < 50 || tVal > 100 || sVal < 50 || sVal > 100) {
      setValidationError("Batas input nilai komponen harus berada di rentang 50 - 100.");
      return;
    }

    // Simulasi logika sederhana backend untuk menentukan tingkat MQ otomatis berdasarkan rata-rata
    const average = (mVal + tVal + sVal) / 3;
    const penempatanOtomatis = average >= 75 ? "MQ 2" : "MQ 1";

    // Update state utama
    setStudents(students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          status: penempatanOtomatis,
          nilai: { makhorijul, tajwid, sifatul_huruf }
        };
      }
      return student;
    }));

    // Reset keadaan editing
    setEditingId(null);
    setValidationError("");
    alert(`Data nilai berhasil disimpan ke sistem! Berdasarkan nilai rata-rata (${average.toFixed(1)}), mahasiswa dialokasikan ke ${penempatanOtomatis}.`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Tes Penempatan (Input Nilai Luring)</h1>
        <p className="text-sm text-slate-500 mt-1">
          Salin dan digitalisasikan data nilai hasil pengujian kertas lembar luring para Ustadz ke dalam sistem aplikasi BTA.
        </p>
      </div>

      {/* Toolbar Pencarian Utama */}
      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Ketik NIM atau Nama Mahasiswa untuk mencari cepat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-slate-700 placeholder-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* Alert Error Validasi */}
      {validationError && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-center gap-2 text-sm font-medium animate-shake">
          <AlertCircle size={18} className="shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Tabel Utama Input Nilai */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-sm font-semibold">
                <th className="p-4 rounded-tl-2xl">Mahasiswa</th>
                <th className="p-4 text-center w-28">Makhorijul Huruf</th>
                <th className="p-4 text-center w-28">Tajwid</th>
                <th className="p-4 text-center w-28">Sifatul Huruf</th>
                <th className="p-4 text-center w-36">Status Hasil</th>
                <th className="p-4 text-center rounded-tr-2xl w-44">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-medium">
                    Mahasiswa yang Anda cari tidak ditemukan.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isEditing = editingId === student.id;
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/60 transition-colors duration-150">
                      {/* Kolom Profil Mahasiswa */}
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{student.nama}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{student.nim}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{student.prodi}</div>
                      </td>
                      
                      {/* Form Input / Output: Makhorijul Huruf */}
                      <td className="p-4 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="makhorijul"
                            min="50"
                            max="100"
                            value={inputValues.makhorijul}
                            onChange={handleInputChange}
                            className="w-20 text-center py-1.5 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:border-emerald-500 text-slate-800 shadow-inner"
                            placeholder="50-100"
                          />
                        ) : (
                          <span className={`font-mono font-bold ${student.nilai.makhorijul ? 'text-slate-800' : 'text-slate-300'}`}>
                            {student.nilai.makhorijul || "—"}
                          </span>
                        )}
                      </td>

                      {/* Form Input / Output: Tajwid */}
                      <td className="p-4 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="tajwid"
                            min="50"
                            max="100"
                            value={inputValues.tajwid}
                            onChange={handleInputChange}
                            className="w-20 text-center py-1.5 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:border-emerald-500 text-slate-800 shadow-inner"
                            placeholder="50-100"
                          />
                        ) : (
                          <span className={`font-mono font-bold ${student.nilai.tajwid ? 'text-slate-800' : 'text-slate-300'}`}>
                            {student.nilai.tajwid || "—"}
                          </span>
                        )}
                      </td>

                      {/* Form Input / Output: Sifatul Huruf */}
                      <td className="p-4 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="sifatul_huruf"
                            min="50"
                            max="100"
                            value={inputValues.sifatul_huruf}
                            onChange={handleInputChange}
                            className="w-20 text-center py-1.5 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:border-emerald-500 text-slate-800 shadow-inner"
                            placeholder="50-100"
                          />
                        ) : (
                          <span className={`font-mono font-bold ${student.nilai.sifatul_huruf ? 'text-slate-800' : 'text-slate-300'}`}>
                            {student.nilai.sifatul_huruf || "—"}
                          </span>
                        )}
                      </td>

                      {/* Status Penempatan */}
                      <td className="p-4 text-center">
                        {student.status === "Belum Dites" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            <HelpCircle size={12} />
                            Belum Dites
                          </span>
                        )}
                        {student.status === "MQ 1" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                            <CheckCircle2 size={12} className="text-amber-500" />
                            Tingkat MQ 1
                          </span>
                        )}
                        {student.status === "MQ 2" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle2 size={12} className="text-emerald-500" />
                            Tingkat MQ 2
                          </span>
                        )}
                      </td>

                      {/* Tombol Kontrol Aksi */}
                      <td className="p-4 text-center">
                        {isEditing ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleSaveValues(student.id)}
                              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-1.5 px-3 rounded-lg shadow-sm transition-colors"
                            >
                              <Save size={14} />
                              <span>Simpan</span>
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 font-semibold text-xs py-1.5 px-2.5 rounded-lg transition-colors"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(student)}
                            className="inline-flex items-center gap-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs py-1.5 px-4 rounded-lg shadow-sm transition-all"
                          >
                            <FileEdit size={14} />
                            <span>{student.status === "Belum Dites" ? "Input Nilai" : "Edit Nilai"}</span>
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