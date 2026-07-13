import { useState, useEffect, useRef } from "react"; 
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MahasiswaLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { pathname } = useLocation(); 
  const scrollRef = useRef(null);     

  // Setiap kali pathname berubah, scroll section ke atas
  useEffect(() => {;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth"});
    }
  }, [pathname]);

  return (
    // FIX PENTING: min-h-screen diubah menjadi h-screen agar tinggi aplikasi terkunci persis 100% layar
    <div className="h-screen w-full bg-gray-50 flex font-sans text-bta-black overflow-hidden relative">
      
      {/* Overlay Gelap Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* SIDEBAR KIRI */}
      <Sidebar 
        isOpen={isMobileOpen} 
        closeSidebar={() => setIsMobileOpen(false)}
        role="mahasiswa"       
        roleTitle="Mahasiswa"  
      />

      {/* MAIN KONTEN */}
      {/* FIX: Menggunakan h-full agar kontainer utama selaras dengan tinggi layar */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        {/* Header Atas */}
        <header className="bg-white shadow-sm px-4 md:px-8 py-4 md:py-5 flex justify-between items-center z-10 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-bta-green hover:bg-green-50 rounded-lg transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div>
              <h2 className="text-lg md:text-2xl font-extrabold text-bta-green truncate">Sistem Informasi BTA</h2>
              <p className="text-gray-500 text-xs md:text-sm font-medium mt-0.5">Dashboard Mahasiswa</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-extrabold text-gray-800 tracking-tight">Gunanda Dwi Tara</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">Mahasiswa</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bta-green border-2 border-bta-yellow flex items-center justify-center text-bta-yellow font-black text-lg md:text-xl shadow-md cursor-pointer hover:scale-105 transition-transform">
              G
            </div>
          </div>
        </header>

        {/* Konten Scrollable */}
        {/* overflow-y-auto di sini memastikan hanya bagian ini yang scroll */}
        <section 
          ref={scrollRef} 
          className="p-4 md:p-8 overflow-y-auto bg-gray-50 flex-1 relative">
          <div className="absolute top-10 right-10 w-96 h-96 bg-bta-green/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <Outlet />
          </div>
        </section>

      </main>
    </div>
  );
}

export default MahasiswaLayout;