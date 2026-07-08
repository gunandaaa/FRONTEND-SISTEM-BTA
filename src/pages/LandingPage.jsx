import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Fungsi JavaScript ringan untuk efek Smooth Scrolling
  const scrollToSection = (e, sectionId) => {
    e.preventDefault(); // Mencegah URL melompat seketika
    const section = document.getElementById(sectionId);
    if (section) {
      // Menggulir perlahan ke bagian elemen yang dituju
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-bta-black">
      
      {/* 1. NAVBAR PUBLIK */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-bta-green p-2 rounded-full text-bta-yellow">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <span className="font-extrabold text-2xl text-bta-green tracking-tight">Al Mukarom</span>
            </div>

            {/* Menu Navigasi dengan Event Handler Smooth Scroll */}
            <div className="hidden md:flex space-x-8 items-center">
              <a 
                href="#beranda" 
                onClick={(e) => scrollToSection(e, 'beranda')} 
                className="text-sm font-bold text-bta-green hover:text-bta-yellow transition-colors"
              >
                Beranda
              </a>
              <a 
                href="#visimisi" 
                onClick={(e) => scrollToSection(e, 'visimisi')} 
                className="text-sm font-bold text-bta-green hover:text-bta-yellow transition-colors"
              >
                Visi & Misi
              </a>
              <a 
                href="#dokumentasi" 
                onClick={(e) => scrollToSection(e, 'dokumentasi')} 
                className="text-sm font-bold text-bta-green hover:text-bta-yellow transition-colors"
              >
                Dokumentasi
              </a>
              
              {/* Tombol Login yang diarahkan ke halaman /login */}
              <Link to="/login" className="bg-bta-yellow text-bta-black px-6 py-2.5 rounded-full font-bold hover:bg-yellow-400 transition-transform hover:scale-105 shadow-md">
                Masuk Sistem
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="beranda" className="bg-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-bta-green leading-tight mb-4">
              SISTEM <br/> BACA TULIS AL-QUR'AN <br/> DAN MQ
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mb-8">
              UNIVERSITAS NURUL HUDA
            </h2>
            <Link to="/login" className="inline-block bg-bta-green text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors shadow-lg">
              Mulai Akses
            </Link>
          </div>
          
          {/* Placeholder Gambar Tokoh */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
             <div className="absolute w-72 h-72 bg-bta-yellow rounded-full mix-blend-multiply filter blur-2xl opacity-40 top-10"></div>
             <div className="relative z-10 w-full max-w-sm h-96 bg-gray-300 rounded-t-full flex items-end justify-center overflow-hidden border-b-8 border-bta-green">
                <span className="text-gray-500 font-bold mb-10">Area Foto Profil Tokoh</span>
             </div>
          </div>
        </div>
      </section>

      {/* 3. VISI DAN MISI SECTION */}
      <section id="visimisi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-bta-green mb-16 uppercase tracking-wider">
            Visi dan Misi
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Card Visi */}
            <div className="bg-gray-100 p-8 md:p-10 rounded-2xl md:w-1/2 relative shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-bta-black mb-4">VISI</h3>
              <p className="text-gray-600 leading-relaxed">
                Mewujudkan generasi mahasiswa Universitas Nurul Huda yang unggul dalam pemahaman Baca Tulis Al-Qur'an dan pengamalan nilai-nilai keaswajaan di tengah masyarakat global.
              </p>
              <div className="absolute -bottom-6 -right-2 text-6xl text-bta-yellow opacity-80">❞</div>
            </div>

            {/* Card Misi */}
            <div className="bg-gray-100 p-8 md:p-10 rounded-2xl md:w-1/2 relative shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-bta-black mb-4">MISI</h3>
              <ul className="text-gray-600 leading-relaxed list-disc list-inside space-y-2">
                <li>Menyelenggarakan program seleksi dan penempatan kelas BTA secara terintegrasi.</li>
                <li>Menyediakan kurikulum MQ 1 dan MQ 2 yang adaptif dan terstruktur.</li>
                <li>Meningkatkan pengawasan presensi dan transparansi nilai berbasis teknologi.</li>
              </ul>
              <div className="absolute -bottom-6 -right-2 text-6xl text-bta-yellow opacity-80">❞</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOKUMENTASI SECTION */}
      <section id="dokumentasi" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-bta-green mb-16 uppercase tracking-wider">
            Dokumentasi Kegiatan
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-300 aspect-[4/3] rounded-xl flex items-center justify-center shadow-inner hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                 <span className="text-gray-500 font-medium group-hover:scale-110 transition-transform">Foto {item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-bta-green py-12 border-t-4 border-bta-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 max-w-md">
            <h3 className="text-bta-yellow font-bold text-lg mb-2">Pusat Keaswajaan UNUHA</h3>
            <p className="text-white text-sm opacity-80 leading-relaxed">
              Sistem Informasi Manajemen Baca Tulis Al-Qur'an (BTA). Memfasilitasi pendaftaran, penilaian, dan pelaporan secara digital dan terintegrasi.
            </p>
          </div>
          <div className="text-white text-sm opacity-80">
            &copy; 2026 UNUHA. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;