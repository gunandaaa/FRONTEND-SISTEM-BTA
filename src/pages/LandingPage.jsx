import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import abahImg from '../assets/abah.png'; 

// ==========================================
// KOMPONEN PINTAR: ANIMASI REVEAL ON SCROLL
// ==========================================
const RevealOnScroll = ({ children, direction = "up", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); 
        }
      },
      { threshold: 0.1 } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0";
    switch (direction) {
      case "up": return "translate-y-12";
      case "down": return "-translate-y-12";
      case "left": return "-translate-x-12";
      case "right": return "translate-x-12";
      default: return "translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getTransform()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ==========================================
// HALAMAN UTAMA: LANDING PAGE
// ==========================================
const LandingPage = () => {
  // State untuk mendeteksi apakah halaman sedang di-scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk memantau posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault(); 
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // Menghapus overflow-hidden dari pembungkus utama agar animasi dan layout berjalan lancar
    <div className="min-h-screen bg-gray-50 font-sans text-bta-black selection:bg-bta-yellow selection:text-bta-green flex flex-col relative overflow-x-hidden">
      
      {/* 1. NAVBAR PUBLIK - Fixed dengan Glassmorphism Dinamis */}
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-lg shadow-md py-0 border-b border-gray-200' 
            : 'bg-white/60 backdrop-blur-sm shadow-none py-2 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-bta-green p-2.5 rounded-xl text-bta-yellow shadow-md hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <span className="font-extrabold text-2xl text-bta-green tracking-tight">Selamat Datang!</span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <a href="#beranda" onClick={(e) => scrollToSection(e, 'beranda')} className="text-sm font-bold text-gray-700 hover:text-bta-green transition-colors">Beranda</a>
              <a href="#visimisi" onClick={(e) => scrollToSection(e, 'visimisi')} className="text-sm font-bold text-gray-700 hover:text-bta-green transition-colors">Visi & Misi</a>
              <a href="#dokumentasi" onClick={(e) => scrollToSection(e, 'dokumentasi')} className="text-sm font-bold text-gray-700 hover:text-bta-green transition-colors">Dokumentasi</a>
              
              <Link to="/login" className="bg-bta-yellow text-bta-black px-7 py-2.5 rounded-full font-extrabold hover:bg-yellow-400 transition-all duration-300 shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5">
                Masuk Sistem
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      {/* Menambahkan padding-top ekstra (pt-32) karena Navbar sekarang menggunakan posisi fixed */}
      <section id="beranda" className="relative bg-bta-green pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-bta-yellow/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between z-10">
          <div className="md:w-1/2 mb-16 md:mb-0 w-full">
            <RevealOnScroll direction="left" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                SISTEM <br/> BACA TULIS AL-QUR'AN <br/> <span className="text-bta-yellow">DAN MQ</span>
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={300}>
              <h2 className="text-lg md:text-xl font-bold text-gray-300 mb-10 tracking-wide uppercase">
                Universitas Nurul Huda
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="left" delay={500}>
              <Link to="/login" className="inline-flex items-center justify-center bg-bta-yellow text-bta-black px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group">
                Mulai Akses
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </Link>
            </RevealOnScroll>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative mt-4 md:mt-0 w-full">
             <RevealOnScroll direction="right" delay={300}>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-bta-yellow rounded-full mix-blend-overlay filter blur-[70px] opacity-60 animate-pulse"></div>
               
               <div className="absolute z-0 w-full max-w-[320px] aspect-[4/5] bg-gradient-to-br from-bta-yellow to-yellow-600 rounded-t-[10rem] rounded-b-3xl translate-x-4 translate-y-4 opacity-90 shadow-2xl"></div>
               
               <div className="relative z-10 w-full max-w-[320px] aspect-[4/5] bg-white/10 backdrop-blur-md rounded-t-[10rem] rounded-b-3xl border-2 border-white/30 shadow-2xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-bta-green/90 via-bta-green/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={abahImg} 
                    alt="Tokoh BTA UNUHA" 
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 relative z-0"
                  />
                  <div className="absolute bottom-8 left-0 right-0 text-center z-20 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-bta-yellow text-bta-black text-xs font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_14px_0_rgba(250,234,41,0.5)] uppercase tracking-widest">
                      Pusat Keaswajaan
                    </span>
                  </div>
               </div>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. VISI DAN MISI SECTION */}
      <section id="visimisi" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-bta-green uppercase tracking-wider mb-4">Visi dan Misi</h2>
              <div className="w-24 h-1.5 bg-bta-yellow mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Card Visi */}
            <div className="md:w-1/2 w-full">
              <RevealOnScroll direction="up" delay={200}>
                <div className="bg-white p-10 md:p-12 rounded-3xl h-full relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-bta-green">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-bta-green mb-4">VISI</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Menjadi pusat pengembangan Aqidah Islam Ahlissunnah wal Jama’ah (Aswaja) Annahdliyah dan ilmu kepesantrenan sebagai komponen dasar pendidikan di Pondok PesantrenNurul Huda (PPNH) Sukaraja di Universitas Nurul Huda (UNUHA) yang terbuka bagi pengembangan ilmu pengetahuan dan teknologi yang berorientasi melestarikan dan mengembangkan lingkungan.
                  </p>
                  <div className="absolute -bottom-4 -right-2 text-8xl text-bta-yellow opacity-30 font-serif group-hover:scale-110 transition-transform">❞</div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Card Misi */}
            <div className="md:w-1/2 w-full">
              <RevealOnScroll direction="up" delay={400}>
                <div className="bg-white p-10 md:p-12 rounded-3xl h-full relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-bta-green">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-bta-green mb-4">MISI</h3>
                  <ul className="text-gray-600 leading-relaxed list-none space-y-4 text-lg">
                    <li className="flex items-start">
                      <span className="text-bta-yellow mr-3 font-bold">✓</span>
                      Menyelenggarakan kegiatan pembelajaran Al Quran bagi mahasiswa UNUHA melalui Madrasah Murotilil Qur’an.
                    </li>
                    <li className="flex items-start">
                      <span className="text-bta-yellow mr-3 font-bold">✓</span>
                      Menyiapkan, mengembangkan, mengkordinir dan membina penerapan kurikulum pembelajaran Aswaja Annahdliyah dan ilmu kepesantrenan bagi mahasiswa UNUHA yang relevan dengan Kurikulum PPNH Sukaraja dan Kurikulum UNUHA.
                    </li>
                    <li className="flex items-start">
                      <span className="text-bta-yellow mr-3 font-bold">✓</span>
                      Membina kerjasama dengan para pihak terkait penjaminan dan peningkatan mutu pendidikan Aswaja Annahdliyah dan ilmu kepesantrenan bagi mahasiswa UNUHA.
                    </li>
                    <li className="flex items-start">
                      <span className="text-bta-yellow mr-3 font-bold">✓</span>
                      Mengkordinir kegiatan pembinaan Aswaja Annahdliyah dan ilmu kepesantrenan bagi para dosen dan karyawan UNUHA.
                    </li>
                  </ul>
                  <div className="absolute -bottom-4 -right-2 text-8xl text-bta-yellow opacity-30 font-serif group-hover:scale-110 transition-transform">❞</div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOKUMENTASI SECTION */}
      <section id="dokumentasi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-bta-green uppercase tracking-wider mb-4">Dokumentasi Kegiatan</h2>
              <div className="w-24 h-1.5 bg-bta-yellow mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <RevealOnScroll key={item} direction="up" delay={index * 150}>
                <div className="bg-gray-100 aspect-[4/3] rounded-2xl flex items-center justify-center shadow-inner hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200 hover:border-bta-yellow">
                   <div className="text-gray-400 font-bold group-hover:scale-110 group-hover:text-bta-green transition-all duration-300 flex flex-col items-center">
                      <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      Foto {item}
                   </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-bta-green pt-16 pb-8 border-t-8 border-bta-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up" delay={0}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 max-w-md text-center md:text-left">
                <h3 className="text-bta-yellow font-black text-xl mb-3 flex items-center justify-center md:justify-start">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  Pusat Keaswajaan UNUHA
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Sistem Informasi Manajemen Baca Tulis Al-Qur'an (BTA). Memfasilitasi pendaftaran, penilaian, dan pelaporan secara digital, cepat, dan terintegrasi.
                </p>
              </div>
              <div className="text-white/60 text-sm font-medium">
                &copy; 2026 UNUHA. All rights reserved.
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;