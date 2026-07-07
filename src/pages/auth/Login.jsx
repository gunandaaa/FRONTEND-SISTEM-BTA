import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

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
      case 'mahasiswa01': navigate('/mahasiswa/dashboard'); break;
      case 'tutor01': navigate('/tutor/dashboard'); break;
      case 'admin01': navigate('/admin/dashboard'); break;
      case 'kepala01': navigate('/kepala/dashboard'); break;
      case 'rektorat01': navigate('/rektorat/dashboard'); break;
      default: alert('Username tidak ditemukan!');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <style>{`
        @keyframes entrance {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-entrance {
          animation: entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Login Card dengan efek entrance */}
      <div className="w-full max-w-sm animate-entrance">
        <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">SISTEM BTA & MQ</h1>
            <p className="text-emerald-600 font-medium text-sm mt-1">UNIVERSITAS NURUL HUDA</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Username */}
            <div className="relative">
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="NIM / Username"
                required
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="Password"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Masuk Sistem
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-8 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
            Sistem Informasi Baca Tulis Al-Qur'an
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;