import React, { useState } from 'react';
import { 
  Search, 
  Save, 
  FileEdit, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle,
  FileCheck
} from 'lucide-react';

const TesPenempatan = () => {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [inputValues, setInputValues] = useState({ makhorijul: "", tajwid: "", sifatul_huruf: "" });
  const [validationError, setValidationError] = useState("");

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

  const handleSaveValues = (id) => {
    const { makhorijul, tajwid, sifatul_huruf } = inputValues;

    if (!makhorijul || !tajwid || !sifatul_huruf) {
      setValidationError("Semua kolom komponen nilai wajib diisi.");
      return;
    }

    const mVal = parseInt(makhorijul);
    const tVal = parseInt(tajwid);
    const sVal = parseInt(sifatul_huruf);

    if (mVal < 50 || mVal > 100 || tVal < 50 || tVal > 100 || sVal < 50 || sVal > 100) {
      setValidationError("Batas input nilai komponen harus berada di rentang 50 - 100.");
      return;
    }

    const average = (mVal + tVal + sVal) / 3;
    const penempatanOtomatis = average >= 75 ? "MQ 2" : "MQ 1";

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

    setEditingId(null);
    setValidationError("");
    alert(`Data nilai berhasil disimpan ke sistem! Berdasarkan nilai rata-rata (${average.toFixed(1)}), mahasiswa dialokasikan ke ${penempatanOtomatis}.`);
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
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
            Salin dan digitalisasikan data nilai hasil pengujian kertas lembar luring para Ustadz ke dalam sistem aplikasi BTA.
          </p>
        </div>
      </div>

      {/* TOOLBAR PENCARIAN UTAMA */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            placeholder="Ketik NIM atau Nama Mahasiswa untuk mencari..."
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
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search size={32} className="text-gray-300" />
                      <p>Mahasiswa yang Anda cari tidak ditemukan.</p>
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
                      
                      {/* Form Input / Output: Makhorijul Huruf */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="makhorijul"
                            min="50"
                            max="100"
                            value={inputValues.makhorijul}
                            onChange={handleInputChange}
                            className="w-24 text-center py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-800 shadow-inner transition-all"
                            placeholder="50-100"
                          />
                        ) : (
                          <span className={`font-mono text-base font-black px-3 py-1.5 rounded-lg ${student.nilai.makhorijul ? 'text-gray-800 bg-gray-50 border border-gray-100' : 'text-gray-300'}`}>
                            {student.nilai.makhorijul || "—"}
                          </span>
                        )}
                      </td>

                      {/* Form Input / Output: Tajwid */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="tajwid"
                            min="50"
                            max="100"
                            value={inputValues.tajwid}
                            onChange={handleInputChange}
                            className="w-24 text-center py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-800 shadow-inner transition-all"
                            placeholder="50-100"
                          />
                        ) : (
                          <span className={`font-mono text-base font-black px-3 py-1.5 rounded-lg ${student.nilai.tajwid ? 'text-gray-800 bg-gray-50 border border-gray-100' : 'text-gray-300'}`}>
                            {student.nilai.tajwid || "—"}
                          </span>
                        )}
                      </td>

                      {/* Form Input / Output: Sifatul Huruf */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <input 
                            type="number"
                            name="sifatul_huruf"
                            min="50"
                            max="100"
                            value={inputValues.sifatul_huruf}
                            onChange={handleInputChange}
                            className="w-24 text-center py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green text-gray-800 shadow-inner transition-all"
                            placeholder="50-100"
                          />
                        ) : (
                          <span className={`font-mono text-base font-black px-3 py-1.5 rounded-lg ${student.nilai.sifatul_huruf ? 'text-gray-800 bg-gray-50 border border-gray-100' : 'text-gray-300'}`}>
                            {student.nilai.sifatul_huruf || "—"}
                          </span>
                        )}
                      </td>

                      {/* Status Penempatan Badges */}
                      <td className="p-5 text-center">
                        {student.status === "Belum Dites" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                            <HelpCircle size={12} />
                            Belum Dites
                          </span>
                        )}
                        {student.status === "MQ 1" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-bta-yellow/20 text-yellow-700 border border-bta-yellow/40">
                            <CheckCircle2 size={12} />
                            Tingkat MQ 1
                          </span>
                        )}
                        {student.status === "MQ 2" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-50 text-bta-green border border-bta-green/20">
                            <CheckCircle2 size={12} />
                            Tingkat MQ 2
                          </span>
                        )}
                      </td>

                      {/* Tombol Aksi Operasional Form */}
                      <td className="p-5 text-center">
                        {isEditing ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleSaveValues(student.id)}
                              className="flex items-center justify-center gap-1.5 bg-bta-green hover:bg-green-900 text-white font-black text-xs py-2 px-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
                            >
                              <Save size={14} />
                              <span>Simpan</span>
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 font-bold text-xs py-2 px-3 rounded-xl transition-colors"
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