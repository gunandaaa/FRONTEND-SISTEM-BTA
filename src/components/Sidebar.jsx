import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { roleMenus } from "../utils/menuConfig";
import axiosInstance from "../api/axios";

const Sidebar = ({ isOpen, closeSidebar, role, roleTitle }) => {
  const menuItems = roleMenus[role] || [];
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/logout");
    } catch (err) {
      // Abaikan error jaringan saat logout
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // 1. State untuk hanya satu grup yang terbuka (Accordion)
  const [openGroup, setOpenGroup] = useState(null);

  // 2. Efek untuk otomatis membuka grup jika kita sedang berada di sub-menu tersebut
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.type === "group" && item.items.some(sub => sub.path === location.pathname)) {
        setOpenGroup(item.label);
      }
    });
  }, [location.pathname, menuItems]);

  const toggleGroup = (label) => {
    // Jika diklik yang sudah terbuka, tutup. Jika tidak, buka dan tutup yang lain
    setOpenGroup(openGroup === label ? null : label);
  };

  const menuClass = ({ isActive }) =>
    `block px-4 py-3.5 rounded-xl transition-all duration-300 font-bold whitespace-nowrap flex items-center ${
      isActive
        ? "bg-bta-yellow text-bta-black shadow-[0_4px_14px_0_rgba(250,234,41,0.39)]"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className={`fixed md:relative top-0 left-0 h-full w-72 
    bg-bta-green shadow-2xl flex flex-col z-30 transition-transform duration-300 ease-in-out
     ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
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
            {/* roleTitle akan berubah dinamis */}
            <p className="text-bta-yellow text-xs font-bold uppercase tracking-wider mt-0.5">{roleTitle}</p>
          </div>
        </div>
        
        <button 
          onClick={closeSidebar}
          className="md:hidden text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* 3. Navigasi Menu (Dinamis menggunakan map) */}
      <nav className="p-5 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          if (item.type === "group") {
            const isGroupActive = item.items.some(sub => sub.path === location.pathname);

            return (
              <div key={index} className="space-y-1">
                <button 
                  onClick={() => toggleGroup(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
                    isGroupActive 
                      ? "bg-bta-yellow text-bta-black shadow-[0_4px_14px_0_rgba(250,234,41,0.39)]" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${openGroup === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openGroup === item.label && (
                  <div className="space-y-1 pl-4 pt-1">
                    {item.items.map((sub, i) => (
                      <NavLink 
                        key={i} 
                        to={sub.path} 
                        onClick={closeSidebar} 
                        className={({ isActive }) => 
                          `block py-2.5 px-6 rounded-lg text-sm font-bold transition-all ${
                            isActive ? "text-bta-yellow" : "text-white/60 hover:text-white"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <NavLink key={index} to={item.path} onClick={closeSidebar} className={menuClass}>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Tombol Logout */}
      <div className="p-5 border-t border-white/10 mb-2">
        <button
          onClick={handleLogout}
          className="block w-full text-center bg-red-500/20 border border-red-500/40 hover:bg-red-500 text-red-100 hover:text-white py-3.5 rounded-xl font-bold transition-all shadow-sm"
        >
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;