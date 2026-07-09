import { useState } from "react";
import { BookOpen, Calendar, Clock, MapPin, Users, CheckCircle2, Info } from "lucide-react";

function Kelasku() {
  // ==========================================
  // LOGIKA & DATA DUMMY GUNANDA (TIDAK DISENTUH)
  // ==========================================
  const [sudahHadir, setSudahHadir] = useState(false);

  const daftarKelas = [
    {
      id: 1,
      kelas: "MQ 2 - A",
      hari: "Jumat",
      jam: "13.00 - 15.00 WIB",
      ruangan: "Ruang BTA 1",
      mahasiswa: 24,
    },
    {
      id: 2,
      kelas: "MQ 1 - B",
      hari: "Sabtu",
      jam: "08.00 - 10.00 WIB",
      ruangan: "Ruang BTA 2",
      mahasiswa: 27,
    },
  ];

  const handleHadir = () => {
    setSudahHadir(true);
    alert("Kehadiran tutor berhasil dicatat.");
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (MENGIKUTI MOCKUP IMAGE)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">

      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F4C3A] tracking-tight flex items-center gap-3">
            <div className="bg-[#0F4C3A]/10 p-2.5 rounded-xl text-[#0F4C3A]">
              <BookOpen size={24} />
            </div>
            Kelasku & Jadwal Mengajar
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Daftar kelas BTA yang diamanahkan kepada Anda pada semester ini.
          </p>
        </div>
      </div>

      {/* DAFTAR KARTU KELAS (TICKET STYLE DARI MOCKUP) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {daftarKelas.map((kelas) => (
          <div
            key={kelas.id}
            className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col md:flex-row"
          >
            
            {/* Bagian Kiri: Info Kelas */}
            <div className="p-8 flex-1">
              <div className="flex justify-start items-center gap-3 mb-8">
                <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FEF08A] text-[#854D0E]">
                  Semester Aktif
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                  <Users size={14} className="text-gray-400" />
                  {kelas.mahasiswa} Mahasiswa
                </span>
              </div>

              <h2 className="text-4xl font-black text-[#0F4C3A] mb-8 tracking-tight">
                Kelas {kelas.kelas}
              </h2>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Hari</p>
                  <p className="font-bold text-gray-800 flex items-center gap-2.5">
                    <Calendar size={18} className="text-gray-400" /> {kelas.hari}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Waktu</p>
                  <p className="font-bold text-gray-800 flex items-center gap-2.5">
                    <Clock size={18} className="text-gray-400" /> 
                    <span className="flex flex-col">
                      <span>{kelas.jam.split(' - ')[0]} -</span>
                      <span>{kelas.jam.split(' - ')[1]}</span>
                    </span>
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lokasi Kelas</p>
                  <p className="font-bold text-gray-800 flex items-center gap-2.5">
                    <MapPin size={18} className="text-gray-400" /> {kelas.ruangan}
                  </p>
                </div>
              </div>
            </div>

            {/* Pemisah Bergaris Putus-putus (Ticket Divider) */}
            <div className="hidden md:flex flex-col justify-between items-center relative">
              <div className="w-8 h-8 bg-slate-50 rounded-full absolute -top-4"></div>
              <div className="h-full border-l-2 border-dashed border-gray-200 my-4"></div>
              <div className="w-8 h-8 bg-slate-50 rounded-full absolute -bottom-4"></div>
            </div>

            {/* Bagian Kanan: Aksi (Absensi & Daftar) */}
            <div className="bg-white p-8 flex flex-col justify-center gap-4 border-t md:border-t-0 border-gray-100 md:w-64 shrink-0">
              
              <button
                onClick={handleHadir}
                disabled={sudahHadir}
                className={`w-full flex flex-col items-center justify-center gap-1.5 rounded-2xl py-4 px-4 font-black text-sm transition-all duration-300 shadow-sm ${
                  sudahHadir
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#0F4C3A] hover:bg-[#0a382a] text-white hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {sudahHadir ? (
                  <>
                    <CheckCircle2 size={20} strokeWidth={2.5} /> Terabsen Hadir
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} strokeWidth={2.5} /> Klik Hadir
                    </div>
                    <span className="text-[11px] font-medium text-white/80">(Absensi)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => alert("Membuka daftar mahasiswa kelas.")}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-sm py-4 px-4 rounded-2xl transition-colors shadow-sm"
              >
                Daftar Mahasiswa
              </button>
              
            </div>

          </div>
        ))}
      </div>

      {/* KOTAK INFORMASI (MOCKUP STYLE: KUNING & PUTIH) */}
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col md:flex-row">
        <div className="bg-[#FDE047] p-8 flex items-center justify-center md:w-64 shrink-0">
          <Info size={56} strokeWidth={1.5} className="text-[#854D0E]" />
        </div>
        <div className="p-8 md:p-10 flex-1">
          <h2 className="text-xl font-black text-[#0F4C3A] mb-6">
            Perhatian Khusus Tutor
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0"></div>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Tutor hanya dapat melihat kelas yang ditugaskan oleh Staf BTA.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0"></div>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Kehadiran tutor dicatat melalui tombol <strong className="text-[#0F4C3A]">Klik Hadir (Absensi)</strong> sebelum kelas dimulai.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0"></div>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Gunakan tombol <strong className="text-gray-800">Daftar Mahasiswa</strong> untuk membuka daftar peserta pada kelas tersebut.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0"></div>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Jadwal mengajar dapat berubah sewaktu-waktu sesuai keputusan pihak administrasi BTA.
              </p>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Kelasku;