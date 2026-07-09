import React from 'react';

function Dashboard() {
  return (
    <div className="w-full animate-fade-in-up font-sans">
      
      {/* ==========================================
          BANNER AHLAN WA SAHLAN
      ========================================== */}
      <div className="bg-bta-green rounded-[2rem] p-8 md:p-10 mb-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden border-b-8 border-bta-yellow shadow-xl">
        
        {/* Dekorasi Latar Banner */}
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-bta-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Teks Sapaan Utama */}
        <div className="relative z-10 md:w-2/3 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tight">
            Ahlan wa Sahlan, Gunanda Dwi Tara!
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            Anda terdaftar sebagai mahasiswa prodi Informatika. Seluruh informasi penempatan kelas, presensi, dan kelulusan akan diatur melalui dasbor ini.
          </p>
        </div>

        {/* Kotak Penempatan Kelas di Kanan Banner */}
        <div className="relative z-10 mt-8 md:mt-0 md:w-1/3 flex justify-center md:justify-end w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 text-center w-full md:w-auto shadow-lg transform transition-transform hover:scale-105">
            <p className="text-bta-yellow text-[10px] md:text-xs font-black uppercase tracking-widest mb-1">
              Penempatan Kelas
            </p>
            {/* Mengambil data dummy Gunanda: MQ 2 */}
            <p className="text-4xl md:text-5xl font-black text-white">
              MQ 2
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          GRID KARTU DATA (Responsif Mobile-First)
      ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Status Akun */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden border-t-4 border-t-bta-yellow">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg md:text-xl font-black text-bta-green">Status Akun</h2>
            <span className="bg-green-100 text-green-700 text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
              Aktif
            </span>
          </div>
          <div className="flex-grow flex flex-col justify-between">
             <p className="text-gray-500 text-sm mb-6 leading-relaxed">
               Akun Anda beroperasi normal dan memiliki akses penuh ke sistem BTA.
             </p>
             {/* Tombol Dummy Visual */}
             <div className="w-full bg-bta-yellow text-bta-black text-center font-extrabold py-3.5 rounded-xl shadow-md cursor-default">
               Terverifikasi
             </div>
          </div>
        </div>

        {/* Card 2: Tingkat MQ */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg md:text-xl font-black text-bta-green">Tingkat MQ</h2>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center py-4">
            <p className="text-5xl font-black text-bta-green">MQ 2</p>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3 bg-gray-50 px-4 py-2 rounded-lg">
              Gelombang Aktif
            </p>
          </div>
        </div>

        {/* Card 3: Pengumuman */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          {/* Aksen Hiasan Sudut */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-bta-yellow/10 rounded-bl-full pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <h2 className="text-lg md:text-xl font-black text-bta-green">Pengumuman</h2>
            <span className="bg-blue-50 text-blue-600 text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
              Info
            </span>
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 text-sm leading-relaxed font-semibold">
              Selamat datang di Sistem Informasi BTA. <br/><br/>
              <span className="text-gray-400 font-normal">Pastikan Anda selalu memeriksa pembaruan informasi dari Pusat Keaswajaan secara berkala.</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;