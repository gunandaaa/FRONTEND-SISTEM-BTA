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
      tutor: null, 
      jarakTutor: null
    }
  ]);

  const availableTutors = [
    { id: 101, nama: "Ustadz M. Syakir, S.Sos", jarak: "1.8 km" },
    { id: 102, nama: "Ustadzah Siti Aminah, M.Ag", jarak: "3.2 km" },
    { id: 103, nama: "Ustadz Rohmatulloh, S.Pd.I", jarak: "5.0 km" },
    { id: 104, nama: "Ustadz Abdul Haris, M.A", jarak: "0.5 km" }
  ];

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassQuota, setNewClassQuota] = useState(30);
  const [newClassLevel, setNewClassLevel] = useState("MQ 1");

  const [selectedTutorPerClass, setSelectedTutorPerClass] = useState({});

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

  const handleTutorDropdownChange = (classId, tutorId) => {
    const tutorObj = availableTutors.find(t => t.id === parseInt(tutorId));
    setSelectedTutorPerClass({
      ...selectedTutorPerClass,
      [classId]: tutorObj
    });
  };

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

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <Layers size={24} />
            </div>
            Manajemen Kelas & Plotting
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Kelola kapasitas kuota ruang belajar aktif dan distribusikan penugasan ustadz pengajar.
          </p>
        </div>
        
        {/* Tombol Pembuatan Kelas Utama */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black text-sm py-3.5 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300 shrink-0 w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Buat Kelas Baru</span>
        </button>
      </div>

      {/* GRID KARTU KELAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map((cls) => {
          const isFull = cls.terisi >= cls.kuotaMax;
          const percentage = (cls.terisi / cls.kuotaMax) * 100;
          
          return (
            <div key={cls.id} className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              
              {/* Bagian Atas Card */}
              <div className="p-6 md:p-8 relative overflow-hidden">
                {/* Ornamen Latar Tipis */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full z-0 group-hover:scale-110 transition-transform"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    cls.tingkat === 'MQ 2' 
                      ? 'bg-green-50 text-bta-green border border-bta-green/20' 
                      : 'bg-bta-yellow/20 text-yellow-700 border border-bta-yellow/40'
                  }`}>
                    Tingkat {cls.tingkat}
                  </span>
                  <div className={`flex items-center gap-1.5 font-bold text-xs px-3 py-1.5 rounded-lg border ${
                    isFull ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                  }`}>
                    <Users size={14} />
                    <span>{cls.terisi} <span className="text-gray-400 font-normal">/ {cls.kuotaMax}</span></span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-800 mb-6 relative z-10">{cls.namaKelas}</h3>
                
                {/* Progress Bar Kuota Minimalis */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-8 relative z-10">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${isFull ? 'bg-red-500' : 'bg-bta-green'}`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Status Penugasan Tutor */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100/60 relative z-10">
                  <div className="text-gray-400 font-black text-[10px] mb-2 uppercase tracking-widest flex items-center gap-1">
                    <GraduationCap size={12} /> Ustadz Pengampu
                  </div>
                  {cls.tutor ? (
                    <div className="space-y-1.5">
                      <div className="font-bold text-bta-green flex items-center gap-2">
                        <CheckCircle size={16} className="shrink-0" strokeWidth={2.5} />
                        <span className="truncate">{cls.tutor}</span>
                      </div>
                      {cls.jarakTutor && (
                        <div className="text-gray-500 flex items-center gap-1.5 pl-6 text-xs font-medium">
                          <MapPin size={12} className="text-gray-400" />
                          <span>Jarak Lokasi: <strong className="text-gray-700">{cls.jarakTutor}</strong></span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-500 font-bold text-sm bg-orange-50 px-3 py-2 rounded-xl border border-orange-100/50">
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                      Belum Dipetakan
                    </div>
                  )}
                </div>
              </div>

              {/* Bagian Bawah Card (Aksi Plotting) */}
              <div className="p-6 bg-gray-50/50 border-t border-gray-100 mt-auto">
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <select
                      onChange={(e) => handleTutorDropdownChange(cls.id, e.target.value)}
                      defaultValue=""
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-xs font-bold text-gray-700 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>— Pilih Tutor / Ustadz —</option>
                      {availableTutors.map((tutor) => (
                        <option key={tutor.id} value={tutor.id}>
                          {tutor.nama} ({tutor.jarak})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlotTutor(cls.id)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-bta-green hover:bg-green-900 text-white font-black text-xs py-3 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <UserPlus size={16} strokeWidth={2.5} />
                    <span>Konfirmasi Penugasan</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POP-UP MODAL: FORM KELAS BARU */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header BTA */}
            <div className="p-6 bg-bta-green flex items-center justify-between relative overflow-hidden">
               <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
               <h3 className="font-black text-white text-lg flex items-center gap-2 relative z-10">
                 <Layers size={20} className="text-bta-yellow" />
                 Buka Ruang Kelas Baru
               </h3>
               <button onClick={() => setShowCreateModal(false)} className="text-white/60 hover:text-white transition-colors relative z-10">
                 <X size={24} />
               </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleCreateClassSubmit}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-black text-bta-green uppercase tracking-wider mb-2">Nama Ruang / Kode Kelas</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kelas MQ 1 - C"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-bta-green uppercase tracking-wider mb-2">Tingkat Kurikulum</label>
                    <div className="relative">
                      <select
                        value={newClassLevel}
                        onChange={(e) => setNewClassLevel(e.target.value)}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green cursor-pointer appearance-none"
                      >
                        <option value="MQ 1">MQ 1 (Dasar)</option>
                        <option value="MQ 2">MQ 2 (Lanjut)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-bta-green uppercase tracking-wider mb-2">Kapasitas Maksimal</label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="50"
                      value={newClassQuota}
                      onChange={(e) => setNewClassQuota(e.target.value)}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-bta-green hover:bg-green-900 text-white font-black rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Simpan Data Kelas
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