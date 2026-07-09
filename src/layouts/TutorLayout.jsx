import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function TutorLayout() {
  // Tambahan state UI untuk responsivitas Mobile
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Kelas menu disesuaikan dengan palet premium BTA
  const menuClass = ({ isActive }) =>
    `block px-4 py-3.5 rounded-xl transition-all duration-300 font-bold whitespace-nowrap flex items-center ${
      isActive
        ? "bg-bta-yellow text-bta-black shadow-[0_4px_14px_0_rgba(250,234,41,0.39)]" 
        : "text-white/70 hover:bg-white/10 hover:text-white" 
    }`;

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    // Menggunakan h-screen agar tinggi sistem solid
    <div className="h-screen w-full bg-gray-50 flex font-sans text-bta-black overflow-hidden relative">
      
      {/* ==========================================
          OVERLAY GELAP UNTUK MOBILE
      ========================================== */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMobileSidebar}
        ></div>
      )}

      {/* ==========================================
          SIDEBAR KIRI (Portal Tutor)
      ========================================== */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full w-72 bg-bta-green shadow-2xl flex flex-col z-30 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        
        {/* Header / Logo Sidebar */}
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2.5 rounded-xl text-bta-green shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-wide">SIM BTA</h1>
              <p className="text-bta-yellow text-xs font-bold uppercase tracking-wider mt-0.5">Tutor</p>
            </div>
          </div>
          
          {/* Tombol Tutup (X) khusus di HP */}
          <button 
            onClick={closeMobileSidebar}
            className="md:hidden text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Navigasi Menu */}
        <nav className="p-5 space-y-2 flex-1 overflow-y-auto">
          <NavLink to="/tutor/dashboard" onClick={closeMobileSidebar} className={menuClass}>
            Dashboard
          </NavLink>

          <NavLink to="/tutor/kelasku" onClick={closeMobileSidebar} className={menuClass}>
            Kelasku
          </NavLink>

          <NavLink to="/tutor/presensi" onClick={closeMobileSidebar} className={menuClass}>
            Monitoring Presensi
          </NavLink>

          <NavLink to="/tutor/penilaian" onClick={closeMobileSidebar} className={menuClass}>
            Penilaian
          </NavLink>
        </nav>

        {/* Tombol Logout */}
        <div className="p-5 border-t border-white/10 mb-2">
          <NavLink
            to="/"
            className="block w-full text-center bg-red-500/20 border border-red-500/40 hover:bg-red-500 text-red-100 hover:text-white py-3.5 rounded-xl font-bold transition-all shadow-sm"
          >
            Keluar Sistem
          </NavLink>
        </div>
      </aside>

      {/* ==========================================
          MAIN KONTEN (Area Kanan)
      ========================================== */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        {/* Header Atas */}
        <header className="bg-white shadow-sm px-4 md:px-8 py-4 md:py-5 flex justify-between items-center z-10 border-b border-gray-100">
          
          <div className="flex items-center gap-4">
            {/* Tombol Hamburger Mobile */}
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-bta-green hover:bg-green-50 rounded-lg transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>

            <div>
              <h2 className="text-lg md:text-2xl font-extrabold text-bta-green truncate">Sistem Informasi BTA</h2>
              <p className="text-gray-500 text-xs md:text-sm font-medium mt-0.5">Portal Tutor & Pengajar</p>
            </div>
          </div>

          {/* Profil Tutor */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-extrabold text-gray-800 tracking-tight">Dr. Ahmad Ulin Niam</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">Tutor BTA</p>
            </div>
            {/* Avatar */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bta-green border-2 border-bta-yellow flex items-center justify-center text-bta-yellow font-black text-lg md:text-xl shadow-md cursor-pointer hover:scale-105 transition-transform">
              A
            </div>
          </div>
        </header>

        {/* Konten Scrollable (Outlet) */}
        <section className="p-4 md:p-8 overflow-y-auto bg-gray-50 flex-1 relative">
          {/* Ornamen Latar */}
          <div className="absolute top-10 right-10 w-96 h-96 bg-bta-green/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <Outlet />
          </div>
        </section>

      </main>
    </div>
  );
}

export default TutorLayout;