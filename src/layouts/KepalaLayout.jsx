import { NavLink, Outlet } from "react-router-dom";

function KepalaLayout() {
  // Tambahan whitespace-nowrap agar teks tidak turun ke baris baru
  const menuClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-emerald-600 text-white shadow-md"
        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-72 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-emerald-600">
            SIM BTA
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kepala Pusat
          </p>
        </div>

        <nav className="p-5 space-y-3">
          <NavLink
            to="/kepala/dashboard"
            className={menuClass}
          >
            Dashboard Eksekutif
          </NavLink>

          <NavLink
            to="/kepala/pengesahan-kelulusan"
            className={menuClass}
          >
            Pengesahan Kelulusan
          </NavLink>

          <NavLink
            to="/kepala/pelaporan"
            className={menuClass}
          >
            Pelaporan & Ekspor
          </NavLink>

          <NavLink
            to="/kepala/manajemen-pengguna"
            className={menuClass}
          >
            Manajemen Pengguna
          </NavLink>

          {/* Tombol Logout dipindah ke bawah */}
          <div className="pt-6 mt-6 border-t border-gray-100">
            <NavLink
              to="/"
              className="block w-full text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Logout
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-hidden">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Sistem Informasi BTA
            </h2>
            <p className="text-gray-500 text-sm">
              Panel Eksekutif Kepala Pusat
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">
                Pak Ulin
              </p>
              <p className="text-sm text-gray-500">
                Kepala Pusat BTA
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              U
            </div>
          </div>
        </header>

        <section className="p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default KepalaLayout;