import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const menuClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition-all duration-200 ${
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
            Admin / Staff
          </p>
        </div>

        {/* flex-1 dihilangkan agar konten tidak dipaksa melebar ke bawah */}
        <nav className="p-5 space-y-3">
          <NavLink
            to="/admin/dashboard"
            className={menuClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/validasi-administrasi"
            className={menuClass}
          >
            Validasi Administrasi
          </NavLink>

          <NavLink
            to="/admin/tes-penempatan"
            className={menuClass}
          >
            Tes Penempatan
          </NavLink>

          <NavLink
            to="/admin/manajemen-kelas"
            className={menuClass}
          >
            Manajemen Kelas
          </NavLink>

          <NavLink
            to="/admin/validasi-nilai"
            className={menuClass}
          >
            Validasi Nilai
          </NavLink>

          {/* Tombol Logout dipindah ke sini, tepat di bawah menu terakhir */}
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

      <main className="flex-1">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Sistem Informasi BTA
            </h2>
            <p className="text-gray-500 text-sm">
              Panel Admin / Staff
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">
                Admin BTA
              </p>
              <p className="text-sm text-gray-500">
                Universitas Nurul Huda
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              A
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

export default AdminLayout;