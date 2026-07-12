import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 
import axiosInstance from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  const [activeTab, setActiveTab] = useState("Masuk");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // 1. Dapatkan CSRF Cookie (Abaikan error jika cross-domain / third-party cookies diblokir browser)
      await axiosInstance.get("/sanctum/csrf-cookie").catch(() => {});

      // 2. Kirim data login ke backend cPanel
      const response = await axiosInstance.post("/api/login", credentials);
      
      // 3. Simpan token & user di localStorage (mendukung Vercel & cPanel lintas domain)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // 4. Logika Role
      const userRole = response.data.user.role.toLowerCase().trim();

      if (userRole === "mahasiswa") {
        navigate("/mahasiswa/dashboard");
      } else if (userRole === "tutor") {
        navigate("/tutor/dashboard");
      } else if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "kepala pusat") {
        navigate("/kepala/dashboard");
      } else if (userRole === "rektorat") {
        navigate("/rektorat/dashboard");
      } else {
        setErrorMessage("Role akun tidak dikenali sistem.");
      }
    } catch (error) {
      // 4. Penanganan Error yang Lebih Spesifik
      if (error.response) {
        const backendMsg = error.response.data?.message;
        if (error.response.status === 422 || error.response.status === 401) {
          setErrorMessage(backendMsg || "Username atau password salah.");
        } else {
          setErrorMessage(backendMsg || "Terjadi kesalahan pada server. Silakan coba lagi.");
        }
      } else {
        setErrorMessage("Gagal terhubung ke server backend.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
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

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px]">
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center relative bg-bta-green animate-fade-in-left z-20">
          <div className="w-full max-w-sm rounded-3xl p-8 text-white">
            <div className="flex justify-center space-x-6 mb-8 border-b border-white/20">
              <button
                onClick={() => setActiveTab("Masuk")}
                className={`pb-3 font-bold text-sm transition-all duration-300 ${
                  activeTab === "Masuk"
                    ? "text-bta-yellow border-b-2 border-bta-yellow"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Masuk Sistem
              </button>
              <button
                onClick={() => setActiveTab("Bantuan")}
                className={`pb-3 font-bold text-sm transition-all duration-300 ${
                  activeTab === "Bantuan"
                    ? "text-bta-yellow border-b-2 border-bta-yellow"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Bantuan
              </button>
            </div>

            {errorMessage && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-400 text-red-200 text-sm font-bold text-center">
                {errorMessage}
              </div>
            )}

            {activeTab === "Masuk" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <label className="text-xs font-bold text-bta-yellow uppercase tracking-wider transition-colors">
                    Alamat Email / Username
                  </label>
                  <input
                    type="text" 
                    name="login" 
                    value={credentials.login} 
                    onChange={handleChange}
                    className="w-full mt-1 bg-transparent border-0 border-b-2 border-white/30 px-0 py-2 text-white focus:ring-0 focus:border-bta-yellow transition-colors placeholder-white/40 focus:outline-none"
                    placeholder="Contoh: admin@example.com"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="text-xs font-bold text-bta-yellow uppercase tracking-wider transition-colors">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className={`w-full mt-1 bg-transparent border-0 border-b-2 border-white/30 px-0 py-2 pr-10 text-white focus:ring-0 focus:border-bta-yellow transition-colors placeholder-white/40 focus:outline-none ${!showPassword ? "tracking-widest" : ""}`}
                      placeholder="Masukkan password Anda"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 top-1/2 -translate-y-1/2 mt-0.5 text-white/50 hover:text-white transition-colors focus:outline-none p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-8 font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md flex justify-center items-center ${
                    isLoading
                      ? "bg-yellow-600/50 text-white/50 cursor-not-allowed"
                      : "bg-bta-yellow text-bta-black hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white/80"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Masuk Sekarang"
                  )}
                </button>

                <div className="text-center mt-6">
                  <a
                    href="#"
                    className="text-xs font-bold text-white hover:text-bta-yellow transition-colors"
                  >
                    Lupa Password?
                  </a>
                </div>
              </form>
            )}

            {activeTab === "Bantuan" && (
              <div className="text-center text-sm text-gray-200 py-8 animate-fade-in-left">
                <p className="mb-4">
                  Hubungi Administrator jika Anda mengalami kesulitan:
                </p>
                <div className="text-left font-mono bg-white/10 p-4 rounded-xl border border-white/20 text-xs leading-loose">
                  <p>Email: it-support@unuha.ac.id</p>
                  <p>WhatsApp: 0812-XXXX-XXXX</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden animate-fade-in-right">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-bta-green/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-bta-yellow/10 rounded-full blur-3xl"></div>

          <div className="flex items-center justify-end space-x-3 z-10">
            <span className="font-extrabold text-xl tracking-wide text-bta-green">
              Al Mukarom
            </span>
            <div className="bg-bta-green p-2 rounded-lg shadow-md">
              <svg
                className="w-6 h-6 text-bta-yellow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center z-10 py-12 md:py-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float">
              <div className="absolute inset-0 bg-bta-yellow/20 border border-bta-yellow/40 rounded-3xl rotate-12 transition-transform duration-700 hover:rotate-[24deg]"></div>
              <div className="absolute inset-0 bg-bta-green/10 border border-bta-green/20 rounded-3xl -rotate-6 transition-transform duration-700 hover:-rotate-12"></div>

              <div className="relative bg-bta-green p-6 rounded-2xl shadow-xl">
                <svg
                  className="w-20 h-20 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="z-10 text-xs text-gray-400 text-center md:text-right font-medium">
            Copyright © 2026, SIM BTA UNUHA. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;