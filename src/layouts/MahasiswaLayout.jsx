import { NavLink, Outlet } from "react-router-dom";

function MahasiswaLayout() {
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
            Mahasiswa
          </p>
        </div>

        <nav className="p-5 space-y-3">
          <NavLink
            to="/mahasiswa/dashboard"
            className={menuClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/mahasiswa/administrasi"
            className={menuClass}
          >
            Administrasi
          </NavLink>

          <NavLink
            to="/mahasiswa/kelasku"
            className={menuClass}
          >
            Kelasku
          </NavLink>

          <NavLink
            to="/mahasiswa/hasil-studi"
            className={menuClass}
          >
            Hasil Studi
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
              Dashboard Mahasiswa
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">
                Gunanda Dwi Tara
              </p>
              <p className="text-sm text-gray-500">
                Mahasiswa
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              G
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

export default MahasiswaLayout;