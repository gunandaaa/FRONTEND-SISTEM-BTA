import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  UserPlus, 
  MapPin, 
  CheckCircle, 
  X, 
  Layers,
  GraduationCap
} from 'lucide-react';

const ManajemenKelas = () => {
  // Data dummy daftar kelas aktif awal
  const [classes, setClasses] = useState([
    {
      id: 1,
      namaKelas: "Kelas MQ 1 - A",
      tingkat: "MQ 1",
      terisi: 25,
      kuotaMax: 30,
      tutor: "Ustadz Ahmad Fauzi, M.Pd",
      jarakTutor: "2.5 km"
    },
    {
      id: 2,
      namaKelas: "Kelas MQ 2 - A",
      tingkat: "MQ 2",
      terisi: 30,
      kuotaMax: 30,
      tutor: "Ustadz Muhammad Ali, S.Ag",
      jarakTutor: "4.1 km"
    },
    {
      id: 3,
      namaKelas: "Kelas MQ 1 - B",
      tingkat: "MQ 1",
      terisi: 12,
      kuotaMax: 25,
      tutor: null, // Belum diplot tutor
      jarakTutor: null
    }
  ]);

  // Data dummy daftar Tutor yang tersedia untuk dipilih di dropdown
  const availableTutors = [
    { id: 101, nama: "Ustadz M. Syakir, S.Sos", jarak: "1.8 km" },
    { id: 102, nama: "Ustadzah Siti Aminah, M.Ag", jarak: "3.2 km" },
    { id: 103, nama: "Ustadz Rohmatulloh, S.Pd.I", jarak: "5.0 km" },
    { id: 104, nama: "Ustadz Abdul Haris, M.A", jarak: "0.5 km" }
  ];

  // State Kontrol Modal "Buat Kelas Baru"
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassQuota, setNewClassQuota] = useState(30);
  const [newClassLevel, setNewClassLevel] = useState("MQ 1");

  // State Kontrol temporary dropdown per kelas
  const [selectedTutorPerClass, setSelectedTutorPerClass] = useState({});

  // Aksi 1: Membuat Kelas Baru (Submit Modal)
  const handleCreateClassSubmit = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      alert("Nama kelas tidak boleh kosong.");
      return;
    }

    const newClass = {
      id: Date.now(),
      namaKelas: newClassName,
      tingkat: newClassLevel,
      terisi: 0,
      kuotaMax: parseInt(newClassQuota),
      tutor: null,
      jarakTutor: null
    };

    setClasses([...classes, newClass]);
    setShowCreateModal(false);
    setNewClassName("");
    setNewClassQuota(30);
    alert(`Sukses membuat kelas baru: ${newClassName}`);
  };

  // Aksi 2: Handle Perubahan Pilihan Dropdown Tutor
  const handleTutorDropdownChange = (classId, tutorId) => {
    const tutorObj = availableTutors.find(t => t.id === parseInt(tutorId));
    setSelectedTutorPerClass({
      ...selectedTutorPerClass,
      [classId]: tutorObj
    });
  };

  // Aksi 3: Plotting Tutor ke Kelas
  const handlePlotTutor = (classId) => {
    const tutorYangDipilih = selectedTutorPerClass[classId];
    
    if (!tutorYangDipilih) {
      alert("Silakan pilih ustadz/tutor terlebih dahulu dari menu dropdown.");
      return;
    }

    setClasses(classes.map(cls => {
      if (cls.id === classId) {
        return {
          ...cls,
          tutor: tutorYangDipilih.nama,
          jarakTutor: tutorYangDipilih.jarak
        };
      }
      return cls;
    }));

    alert(`Berhasil memplot ${tutorYangDipilih.nama} ke kelas tersebut.`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Kelas & Plotting Tutor</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola kapasitas kuota ruang belajar aktif dan distribusikan penugasan ustadz pengajar sebelum perkuliahan BTA dimulai.
          </p>
        </div>
        {/* Tombol Utama */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-sm transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus size={18} />
          <span>Buat Kelas Baru</span>
        </button>
      </div>

      {/* Grid List Kelas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => {
          const isFull = cls.terisi >= cls.kuotaMax;
          
          return (
            <div key={cls.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
              {/* Bagian Atas Card */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${cls.tingkat === 'MQ 2' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                    {cls.tingkat}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium text-xs bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    <Users size={14} className="text-slate-400" />
                    <span className={isFull ? "text-rose-600 font-bold" : ""}>{cls.terisi}</span>
                    <span className="text-slate-300">/</span>
                    <span>{cls.kuotaMax} Mhs</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-4">{cls.namaKelas}</h3>
                
                {/* Progress Bar Kuota */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                  <div 
                    className={`h-full transition-all duration-300 ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${(cls.terisi / cls.kuotaMax) * 100}%` }}
                  />
                </div>

                {/* Info Status Tutor Terplot */}
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 text-xs">
                  <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider">Ustadz Pengampu:</div>
                  {cls.tutor ? (
                    <div className="space-y-1">
                      <div className="font-bold text-slate-700 flex items-center gap-1">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                        <span>{cls.tutor}</span>
                      </div>
                      {cls.jarakTutor && (
                        <div className="text-slate-500 flex items-center gap-1 pl-5">
                          <MapPin size={12} className="text-slate-400" />
                          <span>Jarak Tempuh: {cls.jarakTutor}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-amber-600 font-medium italic">Belum ada tutor ditugaskan</div>
                  )}
                </div>
              </div>

              {/* Bagian Bawah Card (Aksi Plotting) */}
              <div className="p-4 bg-slate-50 border-t border-slate-100/60 mt-auto">
                <div className="flex flex-col gap-2">
                  <select
                    onChange={(e) => handleTutorDropdownChange(cls.id, e.target.value)}
                    defaultValue=""
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-500 shadow-sm"
                  >
                    <option value="" disabled>— Pilih Tutor / Ustadz —</option>
                    {availableTutors.map((tutor) => (
                      <option key={tutor.id} value={tutor.id}>
                        {tutor.nama} ({tutor.jarak})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handlePlotTutor(cls.id)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition-colors"
                  >
                    <UserPlus size={14} />
                    <span>Plot Tutor ke Kelas</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POP-UP MODAL: Buat Kelas Baru */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-800">
                <Layers className="text-emerald-600" size={20} />
                <h3 className="font-bold">Form Tambah Kelas Baru</h3>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleCreateClassSubmit}>
              <div className="p-5 space-y-4">
                {/* Input Nama Kelas */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Nama Ruang / Kelas</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kelas MQ 1 - C"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500 shadow-sm"
                  />
                </div>

                {/* Input Tingkatan */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Tingkat Program</label>
                  <select
                    value={newClassLevel}
                    onChange={(e) => setNewClassLevel(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500 shadow-sm"
                  >
                    <option value="MQ 1">MQ 1 (Tingkat Dasar)</option>
                    <option value="MQ 2">MQ 2 (Tingkat Lanjutan)</option>
                  </select>
                </div>

                {/* Input Kuota Maksimal */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Kuota Maksimum Mahasiswa</label>
                  <input
                    type="number"
                    required
                    min="5"
                    max="50"
                    value={newClassQuota}
                    onChange={(e) => setNewClassQuota(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500 shadow-sm"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Simpan Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenKelas;