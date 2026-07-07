import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [activeTab, setActiveTab] = useState('Masuk');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = credentials.username.trim().toLowerCase();
    const password = credentials.password;

    if (password !== '123') {
      alert('Password salah!');
      return;
    }

    switch (username) {
      case 'mahasiswa01':
        navigate('/mahasiswa/dashboard');
        break;

      case 'tutor01':
        navigate('/tutor/dashboard');
        break;

      case 'admin01':
        navigate('/admin/dashboard');
        break;

      case 'kepala01':
        navigate('/kepala/dashboard');
        break;

      case 'rektorat01':
        navigate('/rektorat/dashboard');
        break;

      default:
        alert('Username tidak ditemukan!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8">

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-slate-50 rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px]">

        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center relative bg-slate-50 animate-fade-in-left z-20">

          <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8">

            <div className="flex justify-center space-x-6 mb-8 border-b border-gray-100">
              <button
                onClick={() => setActiveTab('Masuk')}
                className={`pb-3 font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'Masuk'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Masuk Sistem
              </button>

              <button
                onClick={() => setActiveTab('Bantuan')}
                className={`pb-3 font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'Bantuan'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Bantuan
              </button>
            </div>

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
                    placeholder="Masukkan Username"
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
                  <a
                    href="#"
                    className="text-xs text-emerald-500 font-medium hover:text-emerald-700 transition-colors"
                  >
                    Lupa Password?
                  </a>
                </div>
              </form>
            )}

            {activeTab === 'Bantuan' && (
              <div className="text-center text-sm text-gray-500 py-8 animate-fade-in-left">
                <p>
                  Seluruh pengguna dapat login menggunakan akun yang telah
                  diberikan oleh administrator sistem.
                </p>

                <div className="mt-6 text-left bg-slate-50 rounded-xl p-4 text-xs space-y-2 border">
                  <p><strong>Mahasiswa</strong> : 23110001 / 123</p>
                  <p><strong>Tutor</strong> : tutor01 / 123</p>
                  <p><strong>Admin BTA</strong> : admin01 / 123</p>
                  <p><strong>Kepala Pusat</strong> : kepala01 / 123</p>
                  <p><strong>Rektorat</strong> : rektorat01 / 123</p>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="md:w-1/2 bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-white animate-fade-in-right">

          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

          <div className="flex items-center justify-end space-x-3 z-10">
            <span className="font-bold text-xl tracking-wide">Al Mukarom</span>

            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332477-4.5 1.253"></path>
              </svg>
            </div>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center z-10">
            <h1 className="text-4xl font-bold text-center">
              Sistem Informasi BTA
            </h1>

            <p className="mt-4 text-center text-green-100 max-w-sm">
              Platform digital untuk mendukung pengelolaan kegiatan Baca Tulis
              Al-Qur'an Universitas Nurul Huda.
            </p>
          </div>

          <div className="text-xs text-green-50 text-center md:text-right opacity-80">
            Copyright © 2026, SIM BTA UNUHA. All rights reserved
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;