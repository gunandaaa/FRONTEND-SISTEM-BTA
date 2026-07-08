import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('Masuk');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mencoba login dengan: ${credentials.username}`);
  };

  return (
    // Latar belakang utama
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8">
      
      {/* Kontainer Utama (Card Besar) - Perhatikan md:flex-row agar kiri-kanan */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-slate-50 rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px]">
        
        {/* SISI KIRI (Sekarang Form Login) - Ditambah animasi masuk dari kiri */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center relative bg-slate-50 animate-fade-in-left z-20">
          
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8">
            
            {/* Header / Tabs Form */}
            <div className="flex justify-center space-x-6 mb-8 border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('Masuk')}
                className={`pb-3 font-semibold text-sm transition-all duration-300 ${activeTab === 'Masuk' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Masuk Sistem
              </button>
              <button 
                onClick={() => setActiveTab('Bantuan')}
                className={`pb-3 font-semibold text-sm transition-all duration-300 ${activeTab === 'Bantuan' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Bantuan
              </button>
            </div>

            {/* Form Inputs */}
            {activeTab === 'Masuk' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="relative group">
                  <label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider transition-colors group-hover:text-emerald-700">
                    NIM / Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full mt-1 bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-700 focus:ring-0 focus:border-emerald-500 transition-colors placeholder-gray-300"
                    placeholder="Masukkan NIM Anda"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider transition-colors group-hover:text-emerald-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full mt-1 bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-700 focus:ring-0 focus:border-emerald-500 transition-colors placeholder-gray-300 tracking-widest"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-emerald-200 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
                >
                  Masuk
                </button>

                <div className="text-center mt-6">
                   <a href="#" className="text-xs text-emerald-500 font-medium hover:text-emerald-700 transition-colors">
                     Lupa Password?
                   </a>
                </div>
              </form>
            )}

            {activeTab === 'Bantuan' && (
              <div className="text-center text-sm text-gray-500 py-8 animate-fade-in-left">
                <p>Seluruh mahasiswa baru otomatis terdaftar. Gunakan NIM sebagai username untuk mengakses SIM BTA.</p>
              </div>
            )}
          </div>
        </div>

        {/* SISI KANAN (Sekarang Branding & Ilustrasi) - Ditambah animasi masuk dari kanan */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-white animate-fade-in-right">
          
          {/* Ornamen Latar Belakang (Bubble) */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

          {/* Header Logo Kanan */}
          <div className="flex items-center justify-end space-x-3 z-10">
            <span className="font-bold text-xl tracking-wide">Al Mukarom</span>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>

          {/* Area Tengah: Ilustrasi dengan Animasi Melayang (Floating) */}
          <div className="flex-grow flex flex-col items-center justify-center z-10 py-12 md:py-0">
             <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float">
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-3xl rotate-12 backdrop-blur-sm transition-transform duration-700 hover:rotate-[24deg]"></div>
                <div className="absolute inset-0 bg-white/20 border border-white/30 rounded-3xl -rotate-6 backdrop-blur-md transition-transform duration-700 hover:-rotate-12"></div>
                <div className="relative bg-gradient-to-tr from-green-100 to-white p-6 rounded-2xl shadow-xl">
                   <svg className="w-20 h-20 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                   </svg>
                </div>
             </div>
          </div>

          {/* Footer Kanan */}
          <div className="z-10 text-xs text-green-50 text-center md:text-right opacity-80">
            Copyright © 2026, SIM BTA UNUHA. All rights reserved
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;