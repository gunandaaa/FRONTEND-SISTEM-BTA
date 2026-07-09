import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // State milik Gunanda
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  
  // State UI dari desain lama kita
  const [activeTab, setActiveTab] = useState('Masuk');

  // Fungsi onChange milik Gunanda
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi submit dan validasi logika milik Gunanda UTUH
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = credentials.username.trim().toLowerCase();
    const password = credentials.password;

    if (password !== '123') {
      alert('Password salah!');
      return;
    }

    switch (username) {
      case 'mahasiswa01': navigate('/mahasiswa/dashboard'); break;
      case 'tutor01': navigate('/tutor/dashboard'); break;
      case 'admin01': navigate('/admin/dashboard'); break;
      case 'kepala01': navigate('/kepala/dashboard'); break;
      case 'rektorat01': navigate('/rektorat/dashboard'); break;
      default: alert('Username tidak ditemukan!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      
      {/* Animasi Kustom yang dibutuhkan */}
      <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Kontainer Utama (Card Besar Split Screen) */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px]">
        
        {/* SISI KIRI (Form Login) - WARNA HIJAU BTA */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center relative bg-bta-green animate-fade-in-left z-20">
          
          <div className="w-full max-w-sm rounded-3xl p-8 text-white">
            
            {/* Header / Tabs Form */}
            <div className="flex justify-center space-x-6 mb-8 border-b border-white/20">
              <button 
                onClick={() => setActiveTab('Masuk')}
                className={`pb-3 font-bold text-sm transition-all duration-300 ${
                  activeTab === 'Masuk' 
                    ? 'text-bta-yellow border-b-2 border-bta-yellow' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Masuk Sistem
              </button>
              <button 
                onClick={() => setActiveTab('Bantuan')}
                className={`pb-3 font-bold text-sm transition-all duration-300 ${
                  activeTab === 'Bantuan' 
                    ? 'text-bta-yellow border-b-2 border-bta-yellow' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Bantuan
              </button>
            </div>

            {/* Form Inputs */}
            {activeTab === 'Masuk' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="relative group">
                  <label className="text-xs font-bold text-bta-yellow uppercase tracking-wider transition-colors">
                    NIM / Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full mt-1 bg-transparent border-0 border-b-2 border-white/30 px-0 py-2 text-white focus:ring-0 focus:border-bta-yellow transition-colors placeholder-white/40 focus:outline-none"
                    placeholder="Masukkan Username Dummy"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="text-xs font-bold text-bta-yellow uppercase tracking-wider transition-colors">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full mt-1 bg-transparent border-0 border-b-2 border-white/30 px-0 py-2 text-white focus:ring-0 focus:border-bta-yellow transition-colors placeholder-white/40 tracking-widest focus:outline-none"
                    placeholder="Masukkan '123'"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-bta-yellow text-bta-black font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
                >
                  Masuk
                </button>

                <div className="text-center mt-6">
                   <a href="#" className="text-xs font-bold text-white hover:text-bta-yellow transition-colors">
                     Lupa Password?
                   </a>
                </div>
              </form>
            )}

            {/* Tab Bantuan */}
            {activeTab === 'Bantuan' && (
              <div className="text-center text-sm text-gray-200 py-8 animate-fade-in-left">
                <p className="mb-4">Daftar Akun Dummy (Password: 123):</p>
                <ul className="text-left font-mono bg-white/10 p-4 rounded-xl border border-white/20">
                  <li>- mahasiswa01</li>
                  <li>- tutor01</li>
                  <li>- admin01</li>
                  <li>- kepala01</li>
                  <li>- rektorat01</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* SISI KANAN (Branding & Ilustrasi) - WARNA PUTIH */}
        <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden animate-fade-in-right">
          
          {/* Ornamen Latar Belakang */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-bta-green/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-bta-yellow/10 rounded-full blur-3xl"></div>

          {/* Header Logo Kanan */}
          <div className="flex items-center justify-end space-x-3 z-10">
            <span className="font-extrabold text-xl tracking-wide text-bta-green">Al Mukarom</span>
            <div className="bg-bta-green p-2 rounded-lg shadow-md">
              <svg className="w-6 h-6 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>

          {/* Area Tengah: Ilustrasi Animasi Float */}
          <div className="flex-grow flex flex-col items-center justify-center z-10 py-12 md:py-0">
             <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float">
                <div className="absolute inset-0 bg-bta-yellow/20 border border-bta-yellow/40 rounded-3xl rotate-12 transition-transform duration-700 hover:rotate-[24deg]"></div>
                <div className="absolute inset-0 bg-bta-green/10 border border-bta-green/20 rounded-3xl -rotate-6 transition-transform duration-700 hover:-rotate-12"></div>
                
                <div className="relative bg-bta-green p-6 rounded-2xl shadow-xl">
                   <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                   </svg>
                </div>
             </div>
          </div>

          {/* Footer Kanan */}
          <div className="z-10 text-xs text-gray-400 text-center md:text-right font-medium">
            Copyright © 2026, SIM BTA UNUHA. All rights reserved
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;