import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, ArrowRight, Bell, Clock } from "lucide-react";

function Dashboard() {
  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // Tidak ada logika state yang dirubah.
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">

      {/* BANNER SAPAAN */}
      <div className="bg-bta-green rounded-[2rem] p-8 md:p-10 relative overflow-hidden border-b-8 border-bta-yellow shadow-xl">
        {/* Ornamen Estetika Latar */}
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-bta-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-bta-yellow mb-1 tracking-wide">
            Al Mukarom,
          </h1>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Dr. Ahmad Ulin Niam, M. Pd.
          </h2>
          <p className="mt-4 text-white/80 font-medium max-w-2xl leading-relaxed text-sm md:text-base">
            Selamat datang di Sistem Informasi BTA Universitas Nurul Huda.
            Semoga aktivitas mengajar hari ini berjalan dengan lancar.
          </p>
        </div>
      </div>

      {/* KARTU STATISTIK RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Kelas */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-green flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-green-50 text-bta-green rounded-2xl">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Kelas Diampu</p>
          </div>
          <div>
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">4</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Kelas Semester Ganjil</p>
          </div>
        </div>

        {/* Card 2: Mahasiswa */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-yellow flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-yellow-50 text-yellow-600 rounded-2xl">
              <Users size={24} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mahasiswa Bimbingan</p>
          </div>
          <div>
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">96</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Total mahasiswa aktif</p>
          </div>
        </div>

        {/* Card 3: Jadwal Terdekat */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-orange-500 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-orange-50 text-orange-500 rounded-2xl">
              <Calendar size={24} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jadwal Terdekat</p>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-black text-orange-600 tracking-tight">Jumat</h2>
              <span className="text-sm font-bold text-gray-400">•</span>
              <span className="text-base font-bold text-gray-700">13.00 - 15.00 WIB</span>
            </div>
            <p className="text-sm text-gray-500 font-bold mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              MQ 2 - A
            </p>
          </div>
        </div>

      </div>

      {/* PINTASAN OPERASIONAL */}
      <div>
        <h2 className="text-xl font-black text-bta-green mb-5 flex items-center gap-2">
          Pintasan Cepat
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Pintasan 1: Jadwal */}
          <Link
            to="/tutor/kelasku"
            className="bg-bta-green rounded-3xl p-8 text-white relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-3">
                  Jadwal Mengajar Hari Ini
                </h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-sm font-medium">
                  Lihat jadwal kelas, lakukan absensi tutor, dan akses daftar mahasiswa.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-bta-yellow font-bold text-sm tracking-wide uppercase">
                <span>Buka Halaman</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Pintasan 2: Penilaian */}
          <Link
            to="/tutor/penilaian"
            className="bg-bta-yellow rounded-3xl p-8 text-bta-black relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-3">
                  Masa Penilaian
                </h3>
                <p className="text-bta-black/70 text-sm leading-relaxed max-w-sm font-semibold">
                  Upload nilai akhir mahasiswa menggunakan template Excel yang telah disediakan.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-bta-green font-bold text-sm tracking-wide uppercase">
                <span>Buka Halaman</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* INFORMASI TERBARU */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
        <div className="border-b border-gray-100 px-6 py-5 bg-gray-50/50 flex items-center gap-2">
          <Bell size={20} className="text-bta-yellow" />
          <h2 className="text-lg font-black text-bta-green">
            Informasi Terbaru
          </h2>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">

          {/* Info 1 */}
          <div className="flex gap-4">
            <div className="w-1.5 bg-bta-green rounded-full shrink-0"></div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Jadwal Mengajar Berikutnya
              </h3>
              <p className="text-gray-500 mt-1.5 text-sm font-medium flex items-center gap-1.5 flex-wrap">
                <Clock size={14} className="text-gray-400" />
                Jumat, 10 Juli 2026 <span className="text-gray-300 font-bold px-1">•</span> 13.00 - 15.00 WIB <span className="text-gray-300 font-bold px-1">•</span> <strong className="text-bta-green">Kelas MQ 2 - A</strong>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 ml-5"></div>

          {/* Info 2 */}
          <div className="flex gap-4">
            <div className="w-1.5 bg-bta-yellow rounded-full shrink-0"></div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Pengingat Penilaian
              </h3>
              <p className="text-gray-500 mt-1.5 text-sm font-medium leading-relaxed">
                Pengunggahan nilai mahasiswa dibuka hingga tanggal <strong className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">31 Juli 2026</strong>. 
                Mohon pastikan format Excel sesuai dengan template.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;