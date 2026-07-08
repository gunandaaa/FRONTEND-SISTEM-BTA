import { NavLink, Outlet } from "react-router-dom";

function RektoratLayout() {
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
            Rektorat
          </p>
        </div>

        <nav className="p-5 space-y-3">
          <NavLink
            to="/rektorat/dashboard"
            className={menuClass}
          >
            Dashboard Eksekutif
          </NavLink>

          <NavLink
            to="/rektorat/laporan-akademik"
            className={menuClass}
          >
            Laporan Akademik
          </NavLink>

          <NavLink
            to="/rektorat/laporan-keuangan"
            className={menuClass}
          >
            Laporan Keuangan
          </NavLink>

          {/* Tombol Logout di bawah menu navigasi */}
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
              Panel Eksekutif Rektorat
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">
                Pimpinan
              </p>
              <p className="text-sm text-gray-500">
                Universitas Nurul Huda
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              R
            </div>
          </div>
        </header>

        <section className="p-8">
          {/* Tempat render konten dashboard, laporan akademik, dll */}
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default RektoratLayout;